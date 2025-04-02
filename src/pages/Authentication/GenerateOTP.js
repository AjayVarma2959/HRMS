import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HrmsImage from '../../assets/Hrms.png';
import axios from 'axios';
import { localAxios, localAxiosPut } from '../../Axios/axios';
import Loader from '../../components/Loader';
import { useSearchParams } from 'react-router-dom';


const GenerateOTP = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [verifyOTPDone, setVerifyOTPDone] = useState(false);
  const [generateOtp, setGenerateotp] = useState(true);
  const [createPassword, setCreatePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  console.log(userDetails);

  useEffect(() => {
    const userEmail = searchParams.get('email');
    if (userEmail) {
        setEmail(userEmail);
    }
}, [searchParams]);

  const handleGenerateOTPButton = async () => {
    setIsLoading(true); // Show loader
    const data = { email: email };
    console.log('Request Data:', data);

    try {
      const response = await axios(localAxios('/organization/generateOtp', data));
      console.log('Generated OTP Response:', response.data);
      setOtpSent(true);
      setGenerateotp(false);
    } catch (error) {
      console.log('OTP Generation Error:', error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  const handleVerifyOTPButton = async () => {
    setIsLoading(true); // Show loader
    console.log('otp', otpInput);
    try {
      const response = await axios(
        localAxios('/organization/verifyOtp', { email: email, otp: otpInput })
      );
      console.log('Verify OTP Response:', response.data);
      setVerifyOTPDone(true);
      setGenerateotp(false);
      setOtpSent(false);
    } catch (error) {
      console.log('Verify OTP Error:', error.response ? error.response.data : error.message);
      setVerifyOTPDone(false);
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  const handlePasswordConfirmButton = async () => {
    setIsLoading(true); // Show loader
    const data = {
      email: email,
      newPassword: createPassword,
      confirmPassword: confirmPassword,
    };
    console.log('password data', data);
    try {
      const response = await axios(localAxiosPut('/organization/updatePassword', data));
      console.log('change password', response.data);
      navigate('/login');
    } catch (error) {
      console.log('Change Password Response', error.message);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(41, 41, 41, 1)',
      }}
    >
      {isLoading && <Loader />}
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url(${HrmsImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: { xs: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            width: { xs: '90%', md: '60%' },
            maxWidth: '350px',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: '#ffffff',
              textAlign: 'center',
            }}
          >
            Welcome to HRMS
          </Typography>
          <form>
            <TextField
              fullWidth
              value={email}
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: '4px',
                mb: 2,
              }}
              InputProps={{
                style: { color: '#000000' },
              }}
            />
            {generateOtp && (
              <Button
                fullWidth
                variant="contained"
                onClick={handleGenerateOTPButton}
                sx={{
                  backgroundColor: '#1a237e',
                  color: '#fff',
                  padding: '10px',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  '&:hover': {
                    backgroundColor: '#0d47a1',
                  },
                }}
              >
                Generate OTP
              </Button>
            )}
            {otpSent && (
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Enter OTP"
                  variant="outlined"
                  size="small"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: '4px',
                    mb: 2,
                  }}
                  InputProps={{
                    style: { color: '#000000' },
                  }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleVerifyOTPButton}
                  sx={{
                    backgroundColor: '#1a237e',
                    color: '#fff',
                    padding: '10px',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    '&:hover': {
                      backgroundColor: '#0d47a1',
                    },
                  }}
                >
                  Verify OTP
                </Button>
              </Box>
            )}

            {verifyOTPDone && (
              <>
                <TextField
                  fullWidth
                  placeholder="Create password"
                  variant="outlined"
                  size="small"
                  type="password"
                  value={createPassword}
                  onChange={(e) => setCreatePassword(e.target.value)}
                  sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: '4px',
                    mb: 2,
                  }}
                  InputProps={{
                    style: { color: '#000000' },
                  }}
                />
                <TextField
                  fullWidth
                  placeholder="Confirm password"
                  variant="outlined"
                  size="small"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: '4px',
                    mb: 2,
                  }}
                  InputProps={{
                    style: { color: '#000000' },
                  }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handlePasswordConfirmButton}
                  sx={{
                    backgroundColor: '#1a237e',
                    color: '#fff',
                    padding: '10px',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    '&:hover': {
                      backgroundColor: '#0d47a1',
                    },
                  }}
                >
                  Set Password
                </Button>
              </>
            )}
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default GenerateOTP;