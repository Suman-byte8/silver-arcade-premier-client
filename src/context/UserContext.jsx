import React, { createContext, useState, useEffect } from 'react';
import { loginUser, signupUser, getUserProfile } from '../services/authApi';
import { useNavigate, useLocation } from 'react-router-dom';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const getToken = () => localStorage.getItem('token');



  // 👇 Run on mount and whenever path changes
  useEffect(() => {
    const token = getToken();
    if (token) {
      // Fetch user details to validate token
      fetchUserDetails().then(() => {
        setIsAuthenticated(true);
      }).catch(() => {
        // If fetch fails (e.g., token expired), clear token and set unauthenticated
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
      });
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
  }, [location.pathname]);



  const fetchUserDetails = async () => {
    const result = await getUserProfile();
    if (result.success) {
      setUser(result.data.user);
    }
  };

  const login = async (email, password) => {
    const result = await loginUser(email, password);
    if (result.success) {
      localStorage.setItem('token', result.data.token);
      const userProfileResult = await getUserProfile();
      if (userProfileResult.success) {
        setUser(userProfileResult.data.user);
      } else {
        setUser(result.data.user);
      }
      setIsAuthenticated(true);
      return { success: true };
    } else {
      return { success: false, message: result.message };
    }
  };

  const signup = async (userData) => {
    const result = await signupUser(userData);
    if (result.success) {
      localStorage.setItem('token', result.data.token);
      const userProfileResult = await getUserProfile(result.data.token);
      if (userProfileResult.success) {
        setUser(userProfileResult.data.user);
      } else {
        setUser(result.data.user);
      }
      setIsAuthenticated(true);
      navigate('/', { replace: true });
      return { success: true };
    } else {
      return { success: false, message: result.message };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('rememberedEmail'); // Clear remembered email on logout
    navigate('/', { replace: true });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        getToken, 
        isAuthenticated, 
        login, 
        signup, 
        logout, 
        fetchUserDetails,

      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };