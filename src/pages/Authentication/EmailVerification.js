import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmailVerification = ({ email, open, onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState('email'); // email, otp, password
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/generate-otp', {
        email
      });
      if (response.data.success) {
        setStep('otp');
        setError('');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error sending OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/verify-otp', {
        email,
        otp
      });
      if (response.data.success) {
        setStep('password');
        setError('');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid OTP');
    }
  };

  const handleSetPassword = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/set-password', {
        email,
        password
      });
      if (response.data.success) {
        onClose();
        navigate('/login');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error setting password');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ backgroundColor: '#1565c0', color: '#fff' }}>
        Email Verification
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {step === 'email' && (
            <>
              <Typography>
                Registered Email: {email}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendOtp}
                sx={{ mt: 2 }}
                fullWidth
              >
                Send OTP
              </Button>
            </>
          )}

          {step === 'otp' && (
            <>
              <TextField
                label="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleVerifyOtp}
                fullWidth
              >
                Verify OTP
              </Button>
            </>
          )}

          {step === 'password' && (
            <>
              <TextField
                type="password"
                label="Set Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSetPassword}
                fullWidth
              >
                Set Password
              </Button>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmailVerification;