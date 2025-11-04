import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import FullLogo from "./FullLogo";
import Toast from "./Toast";
import { Link } from 'react-router-dom';

const AuthModal = ({ isOpen, onClose, loginOnly = false }) => {
  const { login, signup } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(loginOnly); // false for signup, true for login
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    whatsAppNumber: "",
    address: "",
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [toast, setToast] = useState(null);

  // Prefill email if remembered
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setLoginData(prev => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const result = await login(loginData.email, loginData.password);
    if (result.success) {
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', loginData.email);
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

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      memberShipType: "",
      memberShipStartDate: "",
      memberShipEndDate: "",
      phoneNumber: signupData.phoneNumber,
      whatsAppNumber: signupData.whatsAppNumber,
      email: signupData.email,
      address: signupData.address,
      alternateNumber: "",
      password: signupData.password,
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
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              {isLogin ? "Login" : "Create Account"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-4">
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    placeholder="Email"
                    className="pl-10 w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="relative">
                  <FaLock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    placeholder="Password"
                    className="pl-10 w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={signupData.firstName}
                    onChange={(e) =>
                      setSignupData({ ...signupData, firstName: e.target.value })
                    }
                    placeholder="First Name"
                    className="pl-10 w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={signupData.lastName}
                    onChange={(e) =>
                      setSignupData({ ...signupData, lastName: e.target.value })
                    }
                    placeholder="Last Name"
                    className="pl-10 w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
              <div className="relative">
                <FaPhone className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={signupData.phoneNumber}
                  onChange={(e) =>
                    setSignupData({ ...signupData, phoneNumber: e.target.value })
                  }
                  placeholder="Phone Number"
                  className="pl-10 w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="relative">
                <FaPhone className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="tel"
                  name="whatsAppNumber"
                  value={signupData.whatsAppNumber}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      whatsAppNumber: e.target.value,
                    })
                  }
                  placeholder="WhatsApp Number"
                  className="pl-10 w-full p-2 border rounded"
                />
              </div>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  placeholder="Email"
                  className="pl-10 w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                  placeholder="Password"
                  className="pl-10 w-full p-2 border rounded"
                  required
                />
              </div>
              <textarea
                name="address"
                value={signupData.address}
                onChange={(e) =>
                  setSignupData({ ...signupData, address: e.target.value })
                }
                placeholder="Address"
                className="w-full p-2 border rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Create Account
              </button>
            </form>
          )}

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:underline"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Log in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
