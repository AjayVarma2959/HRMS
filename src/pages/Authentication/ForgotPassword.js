import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HrmsImage from '../../assets/Hrms.png';
import axios from 'axios';
import { localAxios, localAxiosPut } from '../../Axios/axios';
import Loader from '../../components/Loader';

const ForgotPasswordPage = () => {
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [otpInput, setOtpInput] = useState('')
  const [verifyOTPDone, setVerifyOTPDone] = useState(false);
  const [emailGenerateOtp, setEmailGenerateOtp] = useState(true);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateOtp = async () => {
    setIsLoading(true)

    try {
      const response = await axios(localAxios('/organization/generateOtp', { email: email }));
      console.log('Generated OTP Response:', response.data);
      setIsOtpGenerated(true);
      setVerifyOTPDone(false);
      setEmailGenerateOtp(false);
    } catch (error) {
      console.log("OTP Generation Error:", error.response ? error.response.data : error.message);
    }finally{
      setIsLoading(false);
    }
  };

  const handleVerifyOTPButton = async () => {
    setIsLoading(true)
    console.log('otp', otpInput);
    try {
      const response = await axios(localAxios('/organization/verifyOtp', { email: email, otp: otpInput }));
      console.log("Verify OTP Response:", response.data);
      setVerifyOTPDone(true); // Set verifyOTPDone only on success
      setIsOtpGenerated(false);
      setEmailGenerateOtp(false);

    } catch (error) {
      console.log("Verify OTP Error:", error.response ? error.response.data : error.message);
      setVerifyOTPDone(false); // Make sure to set verifyOTPDone to false on error.
    }finally{
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setIsLoading(true);
    const data ={
      email: email,
      newPassword: newPassword,
      confirmPassword: confirmPassword
  }
    console.log('password data', data)
    try {
      const response = await axios(localAxiosPut('/organization/updatePassword', data));
      console.log('change password', response.data);
      navigate('/login');
    } catch (error) {
      console.log('Change Password Response', error.message);
    }finally{
      setIsLoading(false);
       }
    console.log('Password changed');
    alert('Password has been successfully changed.');
      navigate('/login');
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

          {isOtpGenerated && (

            <Box sx={{ mt: 2 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  color: '#ffffff',
                  textAlign: 'center',
                }}
              >
                Forgot Password?
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 3,
                  color: '#bbbbbb',
                  textAlign: 'center',
                }}
              >
                Please enter your email address below, and we will send you an OTP
                to your registered email.
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter OTP"
                variant="outlined"
                size="small"
                value={otpInput} // Controlled input
                onChange={(e) => setOtpInput(e.target.value)} // Update state on change
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
                onClick={handleVerifyOTPButton} // Call verify function
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


          <>

            <form>
              {emailGenerateOtp && (
                <>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 'bold',
                      mb: 2,
                      color: '#ffffff',
                      textAlign: 'center',
                    }}
                  >
                    Forgot Password?
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 3,
                      color: '#bbbbbb',
                      textAlign: 'center',
                    }}
                  >
                    Please enter your email address below, and we will send you an OTP
                    to your registered email.
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter email address"
                    variant="outlined"
                    size="small"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    onClick={handleGenerateOtp}
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
                </>
              )}
              {verifyOTPDone && (
                <>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 'bold',
                      mb: 2,
                      color: '#ffffff',
                      textAlign: 'center',
                    }}
                  >
                    Forgot Password?
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 3,
                      color: '#bbbbbb',
                      textAlign: 'center',
                    }}
                  >
                    Please create a new password to log in to your account.
                  </Typography>
                  <form>
                    <TextField
                      fullWidth
                      placeholder="Enter email address"
                      variant="outlined"
                      size="small"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      placeholder="Create new password"
                      variant="outlined"
                      size="small"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
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
                      placeholder="Confirm new password"
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
                      onClick={handleChangePassword}
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
                      Change Password
                    </Button>
                  </form>
                </>
              )}

            </form>
          </>


        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
