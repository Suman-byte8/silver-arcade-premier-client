import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FaEnvelope, FaUser, FaLock } from "react-icons/fa";
import FullLogo from "./FullLogo";
import Toast from "./Toast";

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [toast, setToast] = useState(null);

  // Prefill email if remembered
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);
    if (result.success) {
      // Handle Remember Me
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      setToast({ message: "Login successful!", type: "success" });
      setTimeout(() => {
        onClose();
        navigate("/");
      }, 1500);
    } else {
      setToast({ message: result.message, type: "error" });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 relative">
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
          <p className="text-gray-600 text-sm mt-2">
            Login to continue your journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email / Username */}
          <div className="relative mb-5">
            <FaUser className="absolute top-4 left-3 text-gray-500" />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email or Username"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white placeholder-gray-500 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d80f2]/50 shadow-sm"
            />
          </div>

          {/* Password */}
          <div className="relative mb-4">
            <FaLock className="absolute top-4 left-3 text-gray-500" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white placeholder-gray-500 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d80f2]/50 shadow-sm"
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="text-gray-700 text-sm">
              Remember Me
            </label>
          </div>

          {/* Login Button */}
          <button className="w-full bg-gradient-to-r from-[#0d80f2] to-[#0c70d2] hover:from-[#0c70d2] hover:to-[#095bb3] text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition duration-300 text-sm">
            Log In
          </button>
        </form>

        {/* Sign Up Redirect */}
        <p className="text-gray-600 text-sm text-center mt-6">
          Don't have an account?{" "}
          <button
            onClick={() => {
              onClose();
              // Trigger signup modal open (will be handled by parent)
            }}
            className="font-medium text-[#0d80f2] underline hover:text-[#0c70d2] transition duration-150"
          >
            Sign Up
          </button>
        </p>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default LoginModal;
