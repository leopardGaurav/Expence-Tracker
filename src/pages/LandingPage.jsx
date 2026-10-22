import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaWallet, FaArrowRight, FaExclamationCircle, FaEye, FaEyeSlash } from 'react-icons/fa';

function LandingPage() {
  const { 
    sendOtp, 
    verifyAndRegister, 
    login, 
    requestPasswordReset, 
    confirmPasswordReset, 
    authError, 
    setAuthError, 
    isOtpStep, 
    setIsOtpStep,
    isForgotStep,
    setIsForgotStep,
    forgotOtpSent,
    setForgotOtpSent
  } = useAuth();
  
  const [activeTab, setActiveTab] = useState('login');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otp, setOtp] = useState('');

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isForgotStep) {
      if (!forgotOtpSent) {
        await requestPasswordReset(email);
      } else {
        await confirmPasswordReset(email, otp, newPassword);
      }
    } else if (activeTab === 'signup') {
      if (!isOtpStep) {
        await sendOtp(name, email, password);
      } else {
        await verifyAndRegister(name, email, password, otp);
      }
    } else {
      await login(email, password);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: '#0f172a', color: '#ffffff', fontFamily: 'sans-serif',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '40px 20px', boxSizing: 'border-box'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ backgroundColor: '#2563eb', padding: '8px', borderRadius: '8px' }}>
            <FaWallet style={{ fontSize: '20px', color: '#fff' }} />
          </div>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold' }}>ExpenseTracker</h2>
        </div>
        {!isForgotStep && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => { setActiveTab('login'); setAuthError(''); setIsOtpStep(false); }}
              style={{ backgroundColor: activeTab === 'login' ? '#2563eb' : 'transparent', border: '1px solid #334155', color: '#fff', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
              Login
            </button>
            <button onClick={() => { setActiveTab('signup'); setAuthError(''); setIsOtpStep(false); }}
              style={{ backgroundColor: activeTab === 'signup' ? '#2563eb' : 'transparent', border: '1px solid #334155', color: '#fff', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
              Sign Up
            </button>
          </div>
        )}
      </div>

      <div style={{ maxWidth: '1200px', width: '100%', margin: '40px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '40px' }}>
        <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <span style={{ backgroundColor: 'rgba(37, 99, 235, 0.1)', color: '#3b82f6', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', width: 'fit-content', border: '1px solid rgba(37, 99, 235, 0.2)' }}>
            🚀 Full-Stack Secure Finance
          </span>
          <h1 style={{ fontSize: '42px', fontWeight: 'bold', margin: 0, lineHeight: '1.2' }}>
            Take Control of Your <span style={{ color: '#3b82f6' }}>Finances</span> with Ease.
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
            Track expenses, secure your account with real email OTP verification, and manage monthly budgets seamlessly.
          </p>
        </div>

        <div style={{ backgroundColor: '#1e293b', padding: '30px', borderRadius: '16px', border: '1px solid #334155', width: '100%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}>
          
          {/* Header Switch */}
          {!isForgotStep ? (
            <div style={{ display: 'flex', marginBottom: '20px', borderBottom: '1px solid #334155', paddingBottom: '12px' }}>
              <h3 onClick={() => { setActiveTab('login'); setAuthError(''); setIsOtpStep(false); }}
                style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', color: activeTab === 'login' ? '#3b82f6' : '#94a3b8', marginRight: '20px' }}>
                Login
              </h3>
              <h3 onClick={() => { setActiveTab('signup'); setAuthError(''); setIsOtpStep(false); }}
                style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', color: activeTab === 'signup' ? '#3b82f6' : '#94a3b8' }}>
                Sign Up
              </h3>
            </div>
          ) : (
            <div style={{ marginBottom: '20px', borderBottom: '1px solid #334155', paddingBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#3b82f6' }}>
                Reset Password
              </h3>
            </div>
          )}

          {authError && (
            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '10px 12px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaExclamationCircle /> {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* FORGOT PASSWORD FORM FLOW */}
            {isForgotStep ? (
              <>
                {!forgotOtpSent ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', color: '#94a3b8' }}>Enter Your Registered Email</label>
                    <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required
                      style={{ padding: '10px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', outline: 'none' }} />
                  </div>
                ) : (
                  <>
                    <span style={{ fontSize: '13px', color: '#22c55e', fontWeight: '500' }}>OTP sent to {email}. Check your inbox!</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '12px', color: '#94a3b8' }}>Enter 4-Digit OTP</label>
                      <input type="text" placeholder="1234" value={otp} onChange={(e) => setOtp(e.target.value)} required maxLength={4}
                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', outline: 'none', textAlign: 'center', fontSize: '16px', letterSpacing: '4px' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '12px', color: '#94a3b8' }}>New Password</label>
                      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <input type={showNewPassword ? "text" : "password"} placeholder="••••••••" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required
                          style={{ width: '100%', padding: '10px', paddingRight: '40px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
                        <span onClick={() => setShowNewPassword(!showNewPassword)}
                          style={{ position: 'absolute', right: '12px', cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
                          {showNewPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <button type="submit"
                  style={{ marginTop: '10px', backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  {!forgotOtpSent ? 'Send Reset OTP' : 'Update Password'} <FaArrowRight size={12} />
                </button>

                <p onClick={() => { setIsForgotStep(false); setForgotOtpSent(false); setAuthError(''); }}
                  style={{ textAlign: 'center', fontSize: '13px', color: '#3b82f6', cursor: 'pointer', marginTop: '10px' }}>
                  Back to Login
                </p>
              </>
            ) : (
              <>
                {/* NORMAL LOGIN / SIGNUP FLOW */}
                {activeTab === 'signup' && !isOtpStep && (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '12px', color: '#94a3b8' }}>Full Name</label>
                      <input type="text" placeholder="Gaurav Kumar" value={name} onChange={(e) => setName(e.target.value)} required
                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', outline: 'none' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '12px', color: '#94a3b8' }}>Email Address</label>
                      <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required
                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', outline: 'none' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '12px', color: '#94a3b8' }}>Password</label>
                      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required
                          style={{ width: '100%', padding: '10px', paddingRight: '40px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
                        <span onClick={() => setShowPassword(!showPassword)}
                          style={{ position: 'absolute', right: '12px', cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
                          {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'signup' && isOtpStep && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ fontSize: '13px', color: '#22c55e', fontWeight: '500' }}>OTP sent to {email}. Check your inbox!</span>
                    <label style={{ fontSize: '12px', color: '#94a3b8' }}>Enter 4-Digit OTP</label>
                    <input type="text" placeholder="1234" value={otp} onChange={(e) => setOtp(e.target.value)} required maxLength={4}
                      style={{ padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', outline: 'none', textAlign: 'center', fontSize: '18px', letterSpacing: '4px' }} />
                  </div>
                )}

                {activeTab === 'login' && (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '12px', color: '#94a3b8' }}>Email Address</label>
                      <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required
                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', outline: 'none' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '12px', color: '#94a3b8' }}>Password</label>
                      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required
                          style={{ width: '100%', padding: '10px', paddingRight: '40px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
                        <span onClick={() => setShowPassword(!showPassword)}
                          style={{ position: 'absolute', right: '12px', cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
                          {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                        </span>
                      </div>
                    </div>
                    
                    {/* Forgot Password Link */}
                    <div style={{ textAlign: 'right', marginTop: '-4px' }}>
                      <span onClick={() => { setIsForgotStep(true); setAuthError(''); }}
                        style={{ fontSize: '12px', color: '#3b82f6', cursor: 'pointer' }}>
                        Forgot Password?
                      </span>
                    </div>
                  </>
                )}

                <button type="submit"
                  style={{ marginTop: '10px', backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  {activeTab === 'signup' ? (isOtpStep ? 'Verify & Register' : 'Send OTP') : 'Login to Dashboard'} <FaArrowRight size={12} />
                </button>
              </>
            )}

          </form>
        </div>
      </div>

      <div style={{ textAlign: 'center', fontSize: '12px', color: '#64748b' }}>
        &copy; 2026 Expense Tracker. Full-Stack MERN Architecture.
      </div>
    </div>
  );
}

export default LandingPage;