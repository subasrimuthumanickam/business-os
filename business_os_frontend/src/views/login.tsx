import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import '../index.css';
import { useNavigate } from 'react-router-dom'; 
// Define interfaces for TypeScript typings
interface Company {
  id: number;
  name: string;
  subdomain: string;
}

interface FormData {
  companyName: string;
  name: string;
  email: string;
  password: string;
  twoFACode: string;
}

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    name: '',
    email: '',
    password: '',
    twoFACode: ''
  });
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [company, setCompany] = useState<Company | null>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  
  // Forgot Password State
  const [forgotPasswordMode, setForgotPasswordMode] = useState<boolean>(false);
  const [forgotStep, setForgotStep] = useState<string>('email');
  const [forgotEmail, setForgotEmail] = useState<string>('');
  const [resetToken, setResetToken] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  // 2FA States
  const [show2FAInput, setShow2FAInput] = useState<boolean>(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState<boolean>(false);
  const [show2FASetup, setShow2FASetup] = useState<boolean>(false);
  const [twoFASecret, setTwoFASecret] = useState<string>('');
  const [twoFAQRCode, setTwoFAQRCode] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');

  // Fetch 2FA status when token changes
  const check2FAStatus = async (): Promise<void> => {
    if (!token) return;
    try {
      const response = await fetch('http://localhost:5000/api/2fa/status', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setTwoFAEnabled(data.enabled);
    } catch (err) {
      console.error('Error checking 2FA:', err);
    }
  };

  // Check 2FA status when logged in
  useEffect(() => {
    if (token) {
      check2FAStatus();
    }
  }, [token]);

  const setup2FA = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:5000/api/2fa/enable', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setTwoFASecret(data.secret);
        setTwoFAQRCode(data.qrCode);
        setShow2FASetup(true);
      }
    } catch (err) {
      setError('Failed to setup 2FA');
    }
  };

  const verify2FA = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:5000/api/2fa/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ code: verificationCode })
      });
      const data = await response.json();
      if (data.success) {
        setSuccess('2FA enabled successfully!');
        setShow2FASetup(false);
        setTwoFAEnabled(true);
        setVerificationCode('');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Verification failed');
    }
  };

  const disable2FA = async (): Promise<void> => {
    const code = prompt('Enter your 2FA code to disable:');
    if (!code) return;
    
    try {
      const response = await fetch('http://localhost:5000/api/2fa/disable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ code })
      });
      const data = await response.json();
      if (data.success) {
        setSuccess('2FA disabled successfully');
        setTwoFAEnabled(false);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to disable 2FA');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: formData.companyName,
          admin_name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setCompany(data.company);
        setSuccess('Company registered successfully!');
        navigate('/client/dashboard');  // 
      } else {
        setError(data.error || data.message || 'Registration failed.');
      }
    } catch (err) {
      setError('Network error. Is backend running?');
    }
  };

  // const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
  //   e.preventDefault();
  //   setError('');
  //   setSuccess('');

  //   try {
  //     const response = await fetch('http://localhost:5000/api/login-2fa', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         email: formData.email,
  //         password: formData.password,
  //         twoFACode: formData.twoFACode
  //       })
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       localStorage.setItem('token', data.token);
  //       setToken(data.token);
  //       setCompany(data.company);
  //       setSuccess('Login successful!');
  //       setShow2FAInput(false);
  //       navigate('/dashboard'); 
  //     } else if (data.requires2FA) {
  //       setShow2FAInput(true);
  //       setError('2FA required. Enter your verification code:');
  //     } else {
  //       setError(data.error || 'Login failed.');
  //     }
  //   } catch (err) {
  //     setError('Network error. Is backend running?');
  //   }
  // };

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/login-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          twoFACode: formData.twoFACode
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setCompany(data.company);
        setSuccess('Login successful!');
        setShow2FAInput(false);
        
        // 🚀 ROLE BASED REDIRECT LOGIC START
        // Check if backend returns data.role or data.user.role (adjust according to your backend response structure)
        const userRole = data.role || (data.user && data.user.role); 

        if (userRole === 'superadmin') {
          navigate('/superadmin-dashboard'); // Or whatever your SuperAdmin route path is
        } else {
          navigate('/client/dashboard'); // Dynamic redirecting directly to Client Side Dashboard!
        }
        // 🚀 ROLE BASED REDIRECT LOGIC END

      } else if (data.requires2FA) {
        setShow2FAInput(true);
        setError('2FA required. Enter your verification code:');
      } else {
        setError(data.error || 'Login failed.');
      }
    } catch (err) {
      setError('Network error. Is backend running?');
    }
  };
  const handleForgotPassword = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail })
      });

      const data = await response.json();

      if (response.ok) {
        setResetToken(data.resetToken || '');
        setForgotStep('reset');
        setSuccess(data.message || 'Password reset token generated.');
      } else {
        setError(data.error || 'Unable to process password reset request');
      }
    } catch (err) {
      setError('Network error. Is backend running?');
    }
  };

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!resetToken) {
      setError('Reset token is missing. Please request a new one.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: resetToken, newPassword })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Password updated successfully! You can now sign in.');
        setForgotPasswordMode(false);
        setForgotStep('email');
        setForgotEmail('');
        setNewPassword('');
        setConfirmPassword('');
        setResetToken('');
        setIsLogin(true);
      } else {
        setError(data.error || 'Unable to reset password');
      }
    } catch (err) {
      setError('Network error. Is backend running?');
    }
  };

  const handleLogout = (): void => {
    localStorage.removeItem('token');
    setToken(null);
    setCompany(null);
    setTwoFAEnabled(false);
    setShow2FAInput(false);
  };

 

  // Authentication View (Sign In / Sign Up Forms)
  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        {/* <div className="auth-header">
          <p className="auth-subtitle">Multi-Tenant ERP Platform with 2FA Security</p>
        </div> */}
        <div className="auth-header">
  <div className="auth-logo">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"/>
    </svg>
  </div>
  <h2 className="auth-title">Sign in with email</h2>
  <p className="auth-subtitle">Make a new doc to bring your words, data, and teams together. For free</p>
</div>
        
        <div className="tab-container">
          <button 
            onClick={() => { setIsLogin(true); setShow2FAInput(false); setForgotPasswordMode(false); setError(''); setSuccess(''); }} 
            className={isLogin && !forgotPasswordMode ? 'active-tab' : 'tab'}
          >
            Login
          </button>
          <button 
            onClick={() => { setIsLogin(false); setShow2FAInput(false); setForgotPasswordMode(false); setError(''); setSuccess(''); }} 
            className={!isLogin ? 'active-tab' : 'tab'}
          >
            Register
          </button>
        </div>
        
        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}
        
        {forgotPasswordMode ? (
          forgotStep === 'email' ? (
            <form onSubmit={handleForgotPassword}>
              <p className="helper-text">Enter your email to reset your password.</p>
              <input
                type="email"
                value={forgotEmail}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setForgotEmail(e.target.value)}
                placeholder="Enter your registered email"
                required
                className="auth-input"
              />
              <button type="submit" className="auth-btn">Send Reset Link</button>
              <button
                type="button"
                className="link-btn"
                onClick={() => {
                  setForgotPasswordMode(false);
                  setForgotStep('email');
                  setForgotEmail('');
                  setError('');
                  setSuccess('');
                }}
              >Back to Login</button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword}>
              <p className="helper-text">Set a new password for {forgotEmail}.</p>
              <input
                type="password"
                value={newPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                placeholder="Enter a new password (min 6 characters)"
                required
                className="auth-input"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your new password"
                required
                className="auth-input"
              />
              <button type="submit" className="auth-btn">Update Password</button>
              <button
                type="button"
                className="link-btn"
                onClick={() => {
                  setForgotPasswordMode(false);
                  setForgotStep('email');
                  setForgotEmail('');
                  setNewPassword('');
                  setConfirmPassword('');
                  setResetToken('');
                  setError('');
                  setSuccess('');
                }}
              >Cancel</button>
            </form>
          )
        ) : isLogin ? (
          <form onSubmit={handleLogin}>
            <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} required className="auth-input" />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="auth-input" />
            
            {show2FAInput && (
              <input 
                type="text" 
                name="twoFACode" 
                placeholder="6-digit 2FA code" 
                value={formData.twoFACode}
                onChange={handleChange} 
                required 
                className="auth-input"
                maxLength={6}
              />
            )}
            
            <button type="submit" className="auth-btn">Sign In</button>
            <button
              type="button"
              className="link-btn"
              onClick={() => {
                setForgotPasswordMode(true);
                setForgotStep('email');
                setError('');
                setSuccess('');
              }}
            >Forgot Password?</button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} required className="auth-input" />
            <input type="text" name="name" placeholder="Your Full Name" value={formData.name} onChange={handleChange} required className="auth-input" />
            <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} required className="auth-input" />
            <input type="password" name="password" placeholder="Password (min 6 characters)" value={formData.password} onChange={handleChange} required className="auth-input" />
            <button type="submit" className="auth-btn">Create Account</button>
          </form>
        )}
        
        <p className="auth-footer">All-in-one authentication solution with JWT and 2FA security.</p>
      </div>
    </div>
  );
}

export default Login;
