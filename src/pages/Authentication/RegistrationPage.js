  import React, { useState } from 'react';
  import {
    Box,
    Grid,
    TextField,
    Button,
    Typography,
    Checkbox,
    FormControlLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert
  } from '@mui/material';
  import { useNavigate } from 'react-router-dom';
  import HrmsImage from '../../assets/Hrms.png';
  import { localAxios } from '../../Axios/axios';
  import axios from 'axios';
  import Loader from '../../components/Loader';

  const RegisterPage1 = () => {
    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState({
      firstName: '',
      lastName: '',
      organizationName: '',
      contactNumber: '',
      email: '',
      password: '',
    });

    const handleChange = (field) => (event) => {
      setInputValues({ ...inputValues, [field]: event.target.value });
    };
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // Add state for success popup
    const [openSuccessPopup, setOpenSuccessPopup] = useState(false);

    const handleRegister = async () => {
      setIsLoading(true);
      const requestData = {
        first_name: inputValues.firstName,
        last_name: inputValues.lastName,
        email: inputValues.email,
        password: inputValues.password,
        organization_name: inputValues.organizationName,
        department: 1,
        team: 1,
        designation: 1,
        doj: "2020-11-18",
        status: "active",
        user_type: "Hr",
      };
      
      console.log("Sending registration data:", requestData);
      
      try {
        const response = await axios(localAxios('/organization/hrSignup', requestData));
        
        // Log the full response for debugging
        console.log("Registration Response:", response.data);
        
        // Log the user object
        console.log("User Details:", response.data.message.user);
        
        // Specifically log the IDs we're interested in
        console.log("User ID:", response.data.message.user.id);
        console.log("Organization ID:", response.data.message.user.organization_id);
        
        // Store the complete user object
        localStorage.setItem('userDetails', JSON.stringify(response.data.message.user));
        
        // Also store specific IDs for easier access
        if (response.data.message.user) {
          localStorage.setItem('userId', response.data.message.user.id);
          localStorage.setItem('organizationId', response.data.message.user.organization_id);
          
          // Store tokens if needed
          if (response.data.message.accessToken) {
            localStorage.setItem('accessToken', response.data.message.accessToken);
            console.log("Access Token stored");
          }
          if (response.data.message.refreshToken) {
            localStorage.setItem('refreshToken', response.data.message.refreshToken);
            console.log("Refresh Token stored");
          }
        }
        
        // Log what was stored in localStorage
        console.log("Stored in localStorage - userId:", localStorage.getItem('userId'));
        console.log("Stored in localStorage - organizationId:", localStorage.getItem('organizationId'));
        
        setRegistrationSuccess(true);
        setIsButtonDisabled(true);
        // Open success popup
        setOpenSuccessPopup(true);
      } catch (error) {
        console.error("Registration Error:", error.response ? error.response.data : error.message);
        
        // More detailed error logging
        if (error.response) {
          console.error("Error Status:", error.response.status);
          console.error("Error Data:", error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Handle close popup
    const handleClosePopup = () => {
      setOpenSuccessPopup(false);
      // Optionally navigate to login page after closing popup
      // navigate('/login');
    };

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          height: '100vh',
          width: '100vw',
          backgroundColor: 'rgba(41, 41, 41, 1)',
          overflow: 'hidden',
        }}
      >
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
            <Typography
              variant="body2"
              sx={{
                mb: 3,
                color: '#bbbbbb',
                textAlign: 'center',
              }}
            >
              Create an account to get started with HRMS and start managing your
              business.
            </Typography>

            <form>
              <Grid container spacing={2}>
                {[
                  { field: 'firstName', placeholder: 'Enter first name' },
                  { field: 'lastName', placeholder: 'Enter last name' },
                  { field: 'organizationName', placeholder: 'Enter Organization name' },
                  { field: 'contactNumber', placeholder: 'Enter contact number' },
                  { field: 'email', placeholder: 'Enter email address' },
                  { field: 'password', placeholder: 'Enter password', type: 'password' },
                ].map(({ field, placeholder, type }) => (
                  <Grid item xs={12} key={field}>
                    <TextField
                      fullWidth
                      placeholder={placeholder}
                      variant="outlined"
                      size="small"
                      type={type || 'text'}
                      value={inputValues[field]}
                      onChange={handleChange(field)}
                      InputProps={{
                        style: { color: '#000000' },
                      }}
                      sx={{
                        backgroundColor: '#ffffff',
                        borderRadius: '4px',
                      }}
                    />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          color: '#ffffff',
                          '&.Mui-checked': {
                            color: '#ffffff',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography variant="caption" sx={{ color: '#bbbbbb' }}>
                        I agree to the Terms of Service and Privacy Policy
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
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
                    onClick={handleRegister}
                    disabled={isButtonDisabled}
                  >
                    Register
                  </Button>
                  <Grid item xs={12} sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#bbbbbb' }}>
                      Already have an account?{' '}
                      <Box
                        component="span"
                        sx={{
                          color: '#ffffff',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          '&:hover': {
                            color: '#1a237e',
                          },
                        }}
                        onClick={() => navigate('/login')}
                      >
                        Login here
                      </Box>
                    </Typography>
                  </Grid>
                </Grid>
                {registrationSuccess && (
                  <Grid item xs={12} sx={{ mt: 1, textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#bbbbbb' }}>
                      A Register link has been sent to your email.
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </form>
          </Box>
        </Box>
        
        {/* Success Popup Dialog */}
        <Dialog 
          open={openSuccessPopup} 
          onClose={handleClosePopup}
          PaperProps={{
            sx: {
              borderRadius: '8px',
              maxWidth: '400px',
              width: '90%'
            }
          }}
        >
          <DialogTitle sx={{ 
            backgroundColor: '#1a237e', 
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
            Registration Successful!
          </DialogTitle>
          <DialogContent sx={{ pt: 3, pb: 2 }}>
            <Typography variant="body1" sx={{ textAlign: 'center', mb: 2 }}>
              Your account has been created successfully.
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', color: '#666' }}>
              A verification link has been sent to your email address.
              Please check your inbox and verify your account.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
            <Button 
              onClick={handleClosePopup} 
              variant="contained"
              sx={{
                backgroundColor: '#1a237e',
                color: '#fff',
                padding: '8px 24px',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#0d47a1',
                },
              }}
            >
              Continue to Login
            </Button>
          </DialogActions>
        </Dialog>

        {/* Alternative: Snackbar Alert */}
        {/* 
        <Snackbar
          open={openSuccessPopup}
          autoHideDuration={6000}
          onClose={handleClosePopup}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleClosePopup} 
            severity="success" 
            variant="filled"
            sx={{ width: '100%' }}
          >
            Registration successful! A verification link has been sent to your email.
          </Alert>
        </Snackbar>
        */}
        
        {isLoading && <Loader />}
      </Box>
    );
  };

  export default RegisterPage1;