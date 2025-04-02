import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const SetPasswordPage = ({ email }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSetPassword = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // API call to set password
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Password set successfully! You can now log in.");
    } catch (error) {
      alert("Failed to set password. Try again.");
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>Set New Password</Typography>
      <Typography>Email: <b>{email}</b></Typography>

      <TextField 
        label="New Password" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        fullWidth 
        sx={{ my: 2 }}
      />

      <TextField 
        label="Confirm Password" 
        type="password" 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth 
      />

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSetPassword}
        sx={{ mt: 3 }}
      >
        Set Password
      </Button>
    </Box>
  );
};

export default SetPasswordPage;
