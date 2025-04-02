import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, IconButton, Avatar, Grid } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import p1 from "../assets/p1.avif";

export const Header = () => {
    const [currentDate, setCurrentDate] = useState('');
    const userName = "Venku velle"; 

    useEffect(() => {
        const date = new Date();
        const formattedDate = `${String(date.getDate()).padStart(2, '0')} - ${String(date.getMonth() + 1).padStart(2, '0')} - ${date.getFullYear()}`;
        setCurrentDate(formattedDate);
    }, []);

    return (
        <Box
        sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: "15px 30px",
            bgcolor: "#34495E",
            color: "#ECF0F1",
        }}
        >
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{ color: "white" }}>Welcome back, {userName}</Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>{currentDate}</Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                        <TextField
                            variant="outlined"
                            placeholder="Search anything here..."
                            size="small"
                            sx={{ 
                                width: { xs: "100%", sm: "300px" }, 
                                margin: "0 20px", 
                                backgroundColor: "#FFFFFF", 
                                borderRadius: "20px", 
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        border: 'none', 
                                    },
                                },
                            }}
                        />
                        <IconButton sx={{ color: "white" }}>
                            <Notifications />
                        </IconButton>
                        <IconButton sx={{ color: "white" }}>
                            <Avatar src={p1} alt="User" sx={{ width: 30, height: 30 }} />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};