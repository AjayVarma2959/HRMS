import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './VerifyEmail.css';

function VerifyEmail() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [step, setStep] = useState('initial');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        try {
            const tokenData = JSON.parse(atob(token.split('.')[1]));
            setEmail(tokenData.email);
        } catch (error) {
            setMessage('Invalid verification link');
        }
    }, [token]);

    const requestOTP = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/verify-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            const data = await response.json();
            
            if (response.ok) {
                setStep('otp');
                setMessage('OTP has been sent to your email');
            } else {
                setMessage(data.message || 'Failed to send OTP');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while requesting OTP');
        }
    };

    const verifyOTPAndSetPassword = async () => {
      if (password !== confirmPassword) {
          setMessage("Passwords don't match!");
          return;
      }
  
      if (password.length < 6) {
          setMessage("Password must be at least 6 characters long");
          return;
      }
  
      try {
          const response = await fetch('http://localhost:5000/api/verify-otp', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  email,
                  otp,
                  password
              }),
          });
  
          const data = await response.json();
          
          if (response.ok) {
              setMessage('Password set successfully!');
              setTimeout(() => {
                  navigate('/login'); 
              }, 2000);
          } else {
              setMessage(data.message || 'Verification failed');
          }
      } catch (error) {
          console.error('Error:', error);
          setMessage('An error occurred during verification');
      }
  };

    return (
        <div className="verify-container">
            <h2>Email Verification</h2>
            
            {message && <div className={message.includes('success') ? 'success-message' : 'error-message'}>
                {message}
            </div>}

            {step === 'initial' && (
                <div className="verification-step">
                    <p>Click below to receive your OTP</p>
                    <button onClick={requestOTP} className="verify-button">
                        Request OTP
                    </button>
                </div>
            )}

            {step === 'otp' && (
                <div className="verification-step">
                    <div className="form-group">
                        <label>Enter OTP:</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter 6-digit OTP"
                            maxLength="6"
                        />
                    </div>

                    <div className="form-group">
                        <label>New Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                        />
                    </div>

                    <button onClick={verifyOTPAndSetPassword} className="verify-button">
                        Verify & Set Password
                    </button>
                </div>
            )}
        </div>
    );
}

export default VerifyEmail;