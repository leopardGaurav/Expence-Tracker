import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('tracker_current_user');
    if (!savedUser) return null;
    try {
      return JSON.parse(savedUser);
    } catch (e) {
      return savedUser;
    }
  });
  const [authError, setAuthError] = useState('');
  const [isOtpStep, setIsOtpStep] = useState(false);

  // Forgot Password States
  const [isForgotStep, setIsForgotStep] = useState(false);
  const [forgotOtpSent, setForgotOtpSent] = useState(false);

  const isAuthenticated = !!currentUser;

  // 1. Send OTP for Registration
  const sendOtp = async (name, email, password) => {
    setAuthError('');
    try {
      const response = await fetch('http://localhost:5000/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();

      if (data.success) {
        setIsOtpStep(true);
        return true;
      } else {
        setAuthError(data.message);
        return false;
      }
    } catch (err) {
      setAuthError('Server connection failed. Make sure backend is running.');
      return false;
    }
  };

  // 2. Verify OTP & Complete Registration
  const verifyAndRegister = async (name, email, password, otp) => {
    setAuthError('');
    try {
      const response = await fetch('http://localhost:5000/api/verify-and-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, otp })
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem('tracker_current_user', JSON.stringify(data.user));
        setCurrentUser(data.user);
        return true;
      } else {
        setAuthError(data.message);
        return false;
      }
    } catch (err) {
      setAuthError('Registration failed due to network error.');
      return false;
    }
  };

  // 3. Login
  const login = async (email, password) => {
    setAuthError('');
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem('tracker_current_user', JSON.stringify(data.user));
        setCurrentUser(data.user);
        return true;
      } else {
        setAuthError(data.message);
        return false;
      }
    } catch (err) {
      setAuthError('Login failed. Check server connection.');
      return false;
    }
  };

  // 4. Request Forgot Password OTP
  const requestPasswordReset = async (email) => {
    setAuthError('');
    try {
      const response = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();

      if (data.success) {
        setForgotOtpSent(true);
        return true;
      } else {
        setAuthError(data.message);
        return false;
      }
    } catch (err) {
      setAuthError('Network error during password reset request.');
      return false;
    }
  };

  // 5. Confirm Reset Password with OTP
  const confirmPasswordReset = async (email, otp, newPassword) => {
    setAuthError('');
    try {
      const response = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword })
      });
      const data = await response.json();

      if (data.success) {
        setIsForgotStep(false);
        setForgotOtpSent(false);
        return true;
      } else {
        setAuthError(data.message);
        return false;
      }
    } catch (err) {
      setAuthError('Failed to reset password.');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('tracker_current_user');
    setCurrentUser(null);
    setIsOtpStep(false);
    setIsForgotStep(false);
    setForgotOtpSent(false);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      currentUser, 
      authError, 
      setAuthError, 
      isOtpStep, 
      setIsOtpStep, 
      isForgotStep, 
      setIsForgotStep, 
      forgotOtpSent, 
      setForgotOtpSent, 
      sendOtp, 
      verifyAndRegister, 
      login, 
      requestPasswordReset, 
      confirmPasswordReset, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);