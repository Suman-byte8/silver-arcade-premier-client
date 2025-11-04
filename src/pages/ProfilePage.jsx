import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { updateUserProfile } from "../services/authApi";
import Toast from "../components/Toast";
import { FaSignOutAlt } from "react-icons/fa";

const ProfilePage = () => {
  const { user, getToken, fetchUserDetails, logout } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [originalData, setOriginalData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (user) {
      const userData = {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phoneNumber || "",
        whatsapp: user.whatsAppNumber || "",
        email: user.email || "",
        address: user.address || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      };
      setFormData(userData);
      setOriginalData(userData);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setMessage("");
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called");
    setLoading(true);
    setMessage("");

    // Check if any fields have changed
    const hasChanges = Object.keys(formData).some(key => {
      if (key === 'currentPassword' || key === 'newPassword' || key === 'confirmPassword') {
        return formData[key] !== ""; // Password fields are empty by default
      }
      return originalData[key] !== formData[key];
    });

    if (!hasChanges) {
      setToast({
        message: "No changes made to your profile.",
        type: "info"
      });
      setLoading(false);
      return;
    }

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setToast({
        message: "New passwords do not match.",
        type: "error"
      });
      setLoading(false);
      return;
    }

    const token = getToken();
    if (!token) {
      setToast({
        message: "No authentication token found.",
        type: "error"
      });
      setLoading(false);
      return;
    }

    const updateData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phone,
      whatsAppNumber: formData.whatsapp,
      email: formData.email,
      address: formData.address
    };

    if (formData.newPassword) {
      updateData.currentPassword = formData.currentPassword;
      updateData.newPassword = formData.newPassword;
    }

    const result = await updateUserProfile(updateData);
    if (result.success) {
      // Detect which fields were changed
      const changedFields = [];
      const fieldLabels = {
        firstName: "First Name",
        lastName: "Last Name",
        phone: "Phone Number",
        whatsapp: "WhatsApp Number",
        email: "Email",
        address: "Address"
      };

      Object.keys(fieldLabels).forEach(field => {
        if (originalData[field] !== formData[field] && formData[field].trim() !== "") {
          changedFields.push(fieldLabels[field]);
        }
      });

      // Check if password was changed
      if (formData.newPassword) {
        changedFields.push("Password");
      }

      // Create success message
      let successMessage = "Profile updated successfully!";
      if (changedFields.length === 1) {
        successMessage = `Successfully updated ${changedFields[0]}`;
      } else if (changedFields.length > 1) {
        successMessage = "Profile updated successfully";
      }

      setToast({
        message: successMessage,
        type: "success"
      });

      // Update original data and exit edit mode
      setOriginalData(formData);
      setIsEditing(false);

      await fetchUserDetails(token); // Refresh user data
    } else {
      setToast({
        message: result.message,
        type: "error"
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your personal information and update your credentials.
          </p>
          {message && <p className={`text-sm mt-2 ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              className={`w-full h-12 px-4 border border-gray-300 rounded-xl outline-none ${
                isEditing
                  ? "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  : "bg-gray-50 cursor-not-allowed"
              }`}
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              disabled={!isEditing}
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              className={`w-full h-12 px-4 border border-gray-300 rounded-xl outline-none ${
                isEditing
                  ? "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  : "bg-gray-50 cursor-not-allowed"
              }`}
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              disabled={!isEditing}
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              className={`w-full h-12 px-4 border border-gray-300 rounded-xl outline-none ${
                isEditing
                  ? "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  : "bg-gray-50 cursor-not-allowed"
              }`}
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              disabled={!isEditing}
            />
          </div>

          {/* WhatsApp Number */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">WhatsApp Number</label>
            <input
              type="text"
              name="whatsapp"
              className={`w-full h-12 px-4 border border-gray-300 rounded-xl outline-none ${
                isEditing
                  ? "focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  : "bg-gray-50 cursor-not-allowed"
              }`}
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="Enter WhatsApp number"
              disabled={!isEditing}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              className={`w-full h-12 px-4 border border-gray-300 rounded-xl outline-none ${
                isEditing
                  ? "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  : "bg-gray-50 cursor-not-allowed"
              }`}
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              disabled={!isEditing}
            />
          </div>

          {/* Address */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-gray-700 font-medium mb-2">Address</label>
            <input
              type="text"
              name="address"
              className={`w-full h-12 px-4 border border-gray-300 rounded-xl outline-none ${
                isEditing
                  ? "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  : "bg-gray-50 cursor-not-allowed"
              }`}
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              disabled={!isEditing}
            />
          </div>

          {/* Current Password */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              placeholder="Enter current password"
              className={`w-full h-12 px-4 border border-gray-300 rounded-xl outline-none ${
                isEditing
                  ? "focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  : "bg-gray-50 cursor-not-allowed"
              }`}
              value={formData.currentPassword}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* New Password */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              className={`w-full h-12 px-4 border border-gray-300 rounded-xl outline-none ${
                isEditing
                  ? "focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  : "bg-gray-50 cursor-not-allowed"
              }`}
              value={formData.newPassword}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* Confirm New Password */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-gray-700 font-medium mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              className={`w-full h-12 px-4 border border-gray-300 rounded-xl outline-none ${
                isEditing
                  ? "focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  : "bg-gray-50 cursor-not-allowed"
              }`}
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* Submit Button - Moved inside the form */}
          {isEditing && (
            <div className="md:col-span-2 flex justify-end mt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold px-6 py-3 rounded-xl transition duration-200 shadow-md"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-gray-200 flex flex-col justify-center gap-4 items-center">
          {!isEditing ? (
            <div className="text-sm text-gray-500">
              Click "Edit Profile" to make changes
            </div>
          ) : (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-xl transition duration-200 shadow-md"
            >
              Cancel
            </button>
          )}

          <div className="flex gap-3 w-full">
            {!isEditing ? (
              <button
                type="button"
                onClick={handleEditClick}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-200 shadow-md w-full"
              >
                Edit Profile
              </button>
            ) : null}
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-200 shadow-md w-full"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default ProfilePage;
