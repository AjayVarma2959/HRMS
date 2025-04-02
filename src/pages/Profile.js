import React from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";

const Profile = () => {
  return (
    <Box sx={{ padding: 3 }}>
      
      <Box
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          padding: 3,
          marginBottom: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          My Profile
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <Avatar
            src="/profile.png" 
            sx={{ width: 80, height: 80, marginRight: 3 }}
          />
          <Box>
            <Typography variant="h6">Prasanth M</Typography>
            <Typography variant="body2" color="textSecondary">
              prasanth@example.com
            </Typography>
            <Button variant="text" sx={{ marginTop: 1 }}>
              Change Password
            </Button>
          </Box>
        </Box>

        
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="body2" color="textSecondary">
              Full Name
            </Typography>
            <Typography>Prasanth M</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="textSecondary">
              Display Name
            </Typography>
            <Typography>Prasanth</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="textSecondary">
              Gender
            </Typography>
            <Typography>Male</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="textSecondary">
              Country/Region
            </Typography>
            <Typography>
              🇮🇳 India
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="textSecondary">
              State
            </Typography>
            <Typography>Andhra Pradesh</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="textSecondary">
              Language
            </Typography>
            <Typography>Telugu</Typography>
          </Box>
        </Box>
      </Box>

     
      <Box
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          padding: 3,
          marginBottom: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          My Email Addresses
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
          You can use the following email addresses to sign in to your account and also to
          reset your password if you ever forget it.
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid #e0e0e0",
            padding: 2,
            borderRadius: "6px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ backgroundColor: "#ff5722", marginRight: 2 }}>M</Avatar>
            <Box>
              <Typography>prasanth@example.com</Typography>
              <Typography variant="body2" color="error">
                This email address is unverified.
              </Typography>
              <Typography variant="body2" sx={{ cursor: "pointer", color: "#1e88e5" }}>
                Verify Now
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="error">
            ⚠
          </Typography>
        </Box>
        <Button variant="text" sx={{ marginTop: 2 }}>
          + Add Email Address
        </Button>
      </Box>

    
      <Box
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          padding: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          My Mobile Numbers
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
          View and manage all of the mobile numbers associated with your account.
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid #e0e0e0",
            padding: 2,
            borderRadius: "6px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ backgroundColor: "#4caf50", marginRight: 2 }}>📞</Avatar>
            <Box>
              <Typography>+91 8008022330</Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="error">
            ⚠
          </Typography>
        </Box>
        <Button variant="text" sx={{ marginTop: 2 }}>
          + Add Mobile Number
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
