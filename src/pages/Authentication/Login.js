import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import HrmsImage from "../../assets/Hrms.png";
import axios from "axios";
import { localAxios } from "../../Axios/axios"; // Import localAxios
import Loader from '../../components/Loader';



const LoginPage = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [isLoading, setIsLoading] = useState(false);

    // const handleLogin = async () => {
    //     setIsLoading(true);
    //     const data = {
    //         email: email,
    //         password: password
    //     }
    //     console.log("Login Data:", data);
    
    //     try {
    //         const response = await axios(
    //             localAxios("/organization/userLogin", data)
    //         );
    //         console.log("Login Response:", response.data);
            
    //         // Store the complete response data including user and organization details
    //         localStorage.setItem("userDetails", JSON.stringify(response.data.message));
            
    //         // Optionally store specific fields for easier access
    //         if (response.data.message && response.data.message.user) {
    //             localStorage.setItem("userId", response.data.message.user.id);
    //             localStorage.setItem("organizationId", response.data.message.user.organization_id);
    //         }
            
    //         navigate('/HRDashboard');
    //     } catch (error) {
    //         console.log(
    //             "Login Error:",
    //             error.response ? error.response.data : error.message
    //         );
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };
    const handleLogin = async () => {
        setIsLoading(true);
        const data = {
            email: email,
            password: password
        }
        console.log("Login Data:", data);
    
        try {
            const response = await axios(localAxios("/organization/userLogin", data));
            
            
            console.log("Complete Login Response:", response);
            
            console.log("Response data:", response.data);
            console.log("Message:", response.data.message);
            
            if (response.data.message) {
                if (response.data.message.accessToken) {
                    localStorage.setItem("accessToken", response.data.message.accessToken);
                    localStorage.setItem("refreshToken", response.data.message.refreshToken);
                    
                    try {
                        const tokenPayload = response.data.message.accessToken.split('.')[1];
                        const decodedPayload = JSON.parse(atob(tokenPayload));
                        console.log("Decoded Token Payload:", decodedPayload);
                        
                        console.log("User ID from token:", decodedPayload.userId);
                        console.log("Organization ID from token:", decodedPayload.organizationId);
                        
                        localStorage.setItem("userId", decodedPayload.userId);
                        localStorage.setItem("organizationId", decodedPayload.organizationId);
                    } catch (tokenError) {
                        console.error("Error decoding token:", tokenError);
                    }
                }
                
                
                if (response.data.message.user) {
                    console.log("User details from response:", response.data.message.user);
                    localStorage.setItem("userDetails", JSON.stringify(response.data.message.user));
                    localStorage.setItem("userId", response.data.message.user.id);
                    localStorage.setItem("organizationId", response.data.message.user.organization_id);
                    localStorage.setItem("userFirstName", response.data.message.user.first_name);
                    localStorage.setItem("userLastName", response.data.message.user.last_name);
                    localStorage.setItem("userType", response.data.message.user.user_type);
                }
            }
            
            navigate('/HRDashboard');
            // navigate('/Manager')
        } catch (error) {
            console.error("Login Error:", error.response ? error.response.data : error.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                height: "100vh",
                width: "100vw",
                backgroundColor: "rgba(41, 41, 41, 1)",
            }}
        >
            {isLoading && <Loader />}
            <Box
                sx={{
                    flex: 1,
                    backgroundImage: `url(${HrmsImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            ></Box>

            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: { xs: 3, md: 4 },
                }}
            >
                <Box
                    sx={{
                        width: { xs: "90%", md: "60%" },
                        maxWidth: "350px",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "bold",
                            mb: 2,
                            color: "#ffffff",
                            textAlign: "center",
                        }}
                    >
                        Account Login
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            mb: 3,
                            color: "#bbbbbb",
                            textAlign: "center",
                        }}
                    >
                        If you are already a member you can login with your user
                        ID and password.
                    </Typography>

                    <form>
                        <TextField
                            fullWidth
                            placeholder="User ID"
                            variant="outlined"
                            size="small"
                            value={email} // Bind to email state
                            onChange={(e) => setEmail(e.target.value)} // Update email state
                            sx={{
                                backgroundColor: "#ffffff",
                                borderRadius: "4px",
                                mb: 2,
                            }}
                            InputProps={{
                                style: { color: "#000000" },
                            }}
                        />
                        <TextField
                            fullWidth
                            placeholder="Password"
                            variant="outlined"
                            size="small"
                            type="password"
                            value={password} // Bind to password state
                            onChange={(e) => setPassword(e.target.value)} // Update password state
                            sx={{
                                backgroundColor: "#ffffff",
                                borderRadius: "4px",
                                mb: 2,
                            }}
                            InputProps={{
                                style: { color: "#000000" },
                            }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    sx={{
                                        color: "#ffffff",
                                        "&.Mui-checked": {
                                            color: "#ffffff",
                                        },
                                    }}
                                />
                            }
                            label={
                                <Typography
                                    variant="caption"
                                    sx={{ color: "#bbbbbb" }}
                                >
                                    Remember me
                                </Typography>
                            }
                            sx={{
                                mb: 2,
                            }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleLogin} // Call handleLogin on click
                            sx={{
                                backgroundColor: "#1a237e",
                                color: "#fff",
                                padding: "10px",
                                fontWeight: "bold",
                                fontSize: "0.9rem",
                                "&:hover": {
                                    backgroundColor: "#0d47a1",
                                },
                            }}
                        >
                            Login
                        </Button>

                        <Typography
                            variant="caption"
                            sx={{
                                mt: 2,
                                color: "#bbbbbb",
                                textAlign: "right",
                                display: "block",
                            }}
                        >
                            <a
                                href="#"
                                style={{ color: "#bbbbbb", textDecoration: "none" }}
                                onClick={() => navigate("/forgot-password")}
                            >
                                Forgot Password?
                            </a>
                        </Typography>
                    </form>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginPage;