import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import FullLogo from "./FullLogo";
import Toast from "./Toast";

const SignupModal = ({ isOpen, onClose }) => {
  const { signup } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    whatsAppNumber: "",
    address: "",
    email: "",
    password: "",
  });
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      memberShipType: "", // Add if needed
      memberShipStartDate: "", // Add if needed
      memberShipEndDate: "", // Add if needed
      phoneNumber: formData.phoneNumber,
      whatsAppNumber: formData.whatsAppNumber,
      email: formData.email,
      address: formData.address,
      alternateNumber: "", // Add if needed
      password: formData.password,
    };
    const result = await signup(userData);
    if (result.success) {
      setToast({ message: "Signup successful!", type: "success" });
      setTimeout(() => {
        onClose();
        navigate("/", { replace: true });
      }, 1500);
    } else {
      setToast({ message: result.message, type: "error" });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full mx-4 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <FullLogo />
          <p className="text-gray-600 mt-2 text-sm">
            Create your account to get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* First Name */}
          <div className="relative flex items-center">
            <FaUser className="absolute left-4 text-gray-500" />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0d80f2]/50"
            />
          </div>

          {/* Last Name */}
          <div className="relative flex items-center">
            <FaUser className="absolute left-4 text-gray-500" />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0d80f2]/50"
            />
          </div>

          {/* Phone Numbers */}
          <div className="relative flex items-center">
            <FaPhone className="absolute left-4 text-gray-500" />
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0d80f2]/50"
            />
          </div>
          <div className="relative flex items-center">
            <FaPhone className="absolute left-4 text-gray-500" />
            <input
              type="tel"
              name="whatsAppNumber"
              value={formData.whatsAppNumber}
              onChange={handleChange}
              placeholder="WhatsApp Number"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0d80f2]/50"
            />
          </div>

          {/* Address */}
          <div className="relative flex items-center md:col-span-2">
            <FaUser className="absolute left-4 text-gray-500" />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0d80f2]/50"
            />
          </div>

          {/* Email */}
          <div className="relative flex items-center md:col-span-2">
            <FaEnvelope className="absolute left-4 text-gray-500" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0d80f2]/50"
            />
          </div>

          {/* Password */}
          <div className="relative flex items-center md:col-span-2">
            <FaLock className="absolute left-4 text-gray-500" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0d80f2]/50"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button className="w-full mt-2 bg-gradient-to-r from-[#0d80f2] to-[#0c70d2] hover:from-[#0c70d2] hover:to-[#095bb3] text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition duration-300 text-sm">
              Sign Up
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Footer */}
        <p className="text-gray-600 text-sm text-center mt-6">
          Already have an account?{" "}
          <button
            onClick={() => {
              onClose();
              // Trigger login modal open (will be handled by parent)
            }}
            className="font-medium text-[#0d80f2] underline hover:text-[#0c70d2] transition duration-150"
          >
            Log In
          </button>
        </p>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default SignupModal;
