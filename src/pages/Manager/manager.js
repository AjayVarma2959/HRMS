import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Avatar,
    Typography,
    Stack,
    Button,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert,
    IconButton
} from "@mui/material";
import {
    Home,
    Business,
    Assignment,
    Group,
    BarChart,
    History,
    Settings,
    Help,
    TaskSharp,
    LogoutRounded,
    ExitToApp,
    Timer
} from "@mui/icons-material";
import hrmsDashboardImage from '../../assets/Hmrs_Hashstack.png'
import ProjectDetails from "./ProjectDetails";

import TasksPage from "./newtask";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "../header";
import { AllCards } from "./AllCards";
import BackIcon from '../../assets/Back.png';
import { ProjectList } from "./Pro";
import ReportsAnalytics from "./reports";
import UpcomingDeadlines from "./deadlines";
import DashboardOverview from "./dash";
import Back from '../../assets/Back.png';
import AttendancePage from "./Leave";
import EmployeeLeaves from "./LeaveManagement";


export const Manager = () => {

    const [selectedProject, setSelectedProject] = useState(null);
    const [currentView, setCurrentView] = useState('projectList');
    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = useState("Home/Dashboard");
    const [isOpen, setIsOpen] = useState(false);
    const [openPunchInDialog, setOpenPunchInDialog] = useState(true);
    const [isPunchedIn, setIsPunchedIn] = useState(false);
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
    const [punchInTime, setPunchInTime] = useState(null);
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
    const [clickEmployee, setClickEmployee] = useState(false);
    const [clickHr, setClickHr] = useState(false);


    const handleEmployeeDashboard = () => {
        setClickEmployee(true);
        navigate('/Employee-Dashboard');

    }
    const handleHrDashboard = () => {
        setClickHr(true);
        navigate('/HRDashboard');
    }

    useEffect(() => {
        const lastPunchIn = localStorage.getItem('lastPunchIn');
        if (lastPunchIn) {
            const lastPunchInDate = new Date(lastPunchIn);
            const today = new Date();
            if (lastPunchInDate.toDateString() === today.toDateString()) {
                setIsPunchedIn(true);
                setPunchInTime(lastPunchInDate);
                setOpenPunchInDialog(false);
            }
        }
    }, []);

    useEffect(() => {
        const checkLogout = () => {
            const currentTime = new Date();
            const sixThirtyPM = new Date();
            sixThirtyPM.setHours(18, 30, 0);

            if (isPunchedIn && currentTime > sixThirtyPM) {
                handleLogout();
            }
        };

        const intervalId = setInterval(checkLogout, 60000);

        return () => clearInterval(intervalId);
    }, [isPunchedIn]);

    const handlePunchIn = () => {
        const currentTime = new Date();
        setIsPunchedIn(true);
        setPunchInTime(currentTime);
        setOpenPunchInDialog(false);
        setShowSuccessSnackbar(true);
        localStorage.setItem('lastPunchIn', currentTime.toISOString());
    };

    const handleLogout = () => {
        localStorage.removeItem('lastPunchIn');
        localStorage.removeItem('userToken');
        setOpenLogoutDialog(false);
        setIsPunchedIn(false);
        navigate('/login');
    };

    const menuItems = [
        { name: "Home/Dashboard", icon: <Home /> },
        { name: "Projects", icon: <Business /> },
        { name: "Tasks Management", icon: <Assignment /> },
        { name: "Attendance Management", icon: <TaskSharp /> },
        { name: "Leave Management", icon: <Group /> },
        { name: "Reports & Analytics", icon: <BarChart /> },
        { name: "Deadlines", icon: <History /> },
        { name: "Settings", icon: <Settings /> },
        { name: "Help & Support", icon: <Help /> },
        {
            name: "Logout",
            icon: <LogoutRounded />,
            action: () => setOpenLogoutDialog(true)
        }
    ];

    const handleBackToHome = () => {
        setSelectedMenu("Home/Dashboard");
    };

    const renderContent = () => {
        switch (selectedMenu) {
            case "Home/Dashboard":
                return (
                    <Box sx={{ position: 'relative', width: '100%' }}>
                        <Box sx={{ top: 20, float: 'right', marginLeft: 'auto', zIndex: 1 }}>
                            {/* <SmartAttendanceSystem /> */}
                        </Box>
                        <AllCards setSelectedMenu={setSelectedMenu} />
                        <DashboardOverview />

                    </Box>
                );
            case "Projects":
                return currentView === 'projectList' ? (
                    <Box>
                        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                            <img
                                onClick={handleBackToHome}
                                src={Back}
                                alt="back"
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    cursor: "pointer",
                                    marginRight: "10px"
                                }}
                            />
                        </Box>
                        <ProjectList
                            onProjectSelect={(project) => {
                                setSelectedProject(project);
                                setCurrentView('projectDetails');
                            }}
                        />
                    </Box>
                ) : (
                    <Box>
                        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                            <img
                                onClick={() => {
                                    setCurrentView('projectList');
                                    setSelectedProject(null);
                                }}
                                src={Back}
                                alt="back"
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    cursor: "pointer",
                                    marginRight: "10px"
                                }}
                            />
                        </Box>
                        <ProjectDetails
                            project={selectedProject}
                            onBackToList={() => {
                                setCurrentView('projectList');
                                setSelectedProject(null);
                            }}
                        />
                    </Box>
                );
            case "Tasks Management":
                return (
                    <Box>
                        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                            <img
                                onClick={handleBackToHome}
                                src={BackIcon}
                                alt="back"
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    cursor: "pointer",
                                    marginRight: "10px"
                                }}
                            />
                        </Box>
                        <TasksPage />
                    </Box>
                );
            case "Reports & Analytics":
                return (
                    <Box>
                        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                            <img
                                src={BackIcon}
                                alt="Back"
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateX(-5px)'
                                    }
                                }}
                                onClick={handleBackToHome}
                            />
                        </Box>
                        
                    </Box>
                );
            case "Attendance Management":
                return (
                    <Box>
                        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                            <img
                                src={BackIcon}
                                alt="Back"
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateX(-5px)'
                                    }
                                }}
                                onClick={handleBackToHome}
                            />
                        </Box>
                        <AttendancePage />
                    </Box>
                );
            case "Leave Management":
                return (
                    <Box>
                        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                            <img
                                src={BackIcon}
                                alt="Back"
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateX(-5px)'
                                    }
                                }}
                                onClick={handleBackToHome}
                            />
                        </Box>
                        <EmployeeLeaves />

                    </Box>
                )
            case "Deadlines":
                return (
                    <Box>
                        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                            <img
                                src={BackIcon}
                                alt="Back"
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateX(-5px)'
                                    }
                                }}
                                onClick={handleBackToHome}
                            />
                        </Box>
                        <UpcomingDeadlines />
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f4f4f4", overflow: "hidden" }}>
            {/* Sidebar */}
            <Box
                sx={{
                    width: { xs: "100%", md: "15%" },
                    backgroundColor: "#2C3E50",
                    color: "#ECF0F1",
                    p: 2,
                }}
            >
                {/* Logo Image */}
                <Box sx={{ textAlign: "center", mb: 3 }}>
                    <img
                        src={hrmsDashboardImage}
                        alt="HRMS Dashboard"
                        style={{
                            width: "60%",
                            height: "auto",
                            maxWidth: "120px",
                            margin: "0 auto",
                        }}
                    />
                </Box>

                {/* Menu Items */}
                <Stack spacing={1.5}>
                    {menuItems.map((item) => (
                        <Button
                            key={item.name}
                            onClick={() => setSelectedMenu(item.name)}
                            sx={{
                                justifyContent: "flex-start",
                                color: selectedMenu === item.name ? "#FFFFFF" : "#BDC3C7",
                                backgroundColor: selectedMenu === item.name ? "#2980B9" : "transparent",
                                padding: "10px 15px",
                                borderRadius: 1,
                                textTransform: "none",
                                display: "flex",
                                gap: 1,
                                alignItems: "center",
                                width: "100%",
                                "&:hover": {
                                    backgroundColor: selectedMenu === item.name
                                        ? "#2980B9"
                                        : "rgba(41, 128, 185, 0.1)",
                                },
                            }}
                        >
                            <Box sx={{ minWidth: "24px" }}>
                                {React.cloneElement(item.icon, {
                                    sx: { fontSize: "20px" }
                                })}
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: "0.875rem",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {item.name}
                            </Typography>
                        </Button>
                    ))}
                </Stack>
            </Box>


            {/* Main Content */}
            <Box

                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    transition: "margin-left 0.3s ease-in-out",
                }}
            >
                <Header />
                <Box>
                    <Button>Manager DashBoard</Button>
                    <Button onClick={handleEmployeeDashboard}>Employee Dashboard</Button>
                    <Button onClick={handleHrDashboard}>Hr DashBoard</Button>
                </Box>
                <Box
                    sx={{
                        flexGrow: 1,
                        padding: "20px",
                        background: "#fff",
                        overflowY: "auto",
                    }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedMenu}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </Box>

                {/* Punch-in Dialog */}
                <Dialog
                    open={openPunchInDialog}
                    onClose={() => setOpenPunchInDialog(false)}
                    PaperProps={{
                        style: {
                            borderRadius: '12px',
                            padding: '16px',
                        },
                    }}
                >
                    <DialogTitle sx={{
                        background: 'linear-gradient(180deg, #1f1c2c, #928dab)',
                        color: '#FFFFFF',
                        borderRadius: '8px 8px 0 0'
                    }}>
                        Welcome Admin!
                    </DialogTitle>
                    <DialogContent sx={{ mt: 2 }}>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Please don't forget to punch in for today's attendance.
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={handlePunchIn}
                                    sx={{
                                        background: 'linear-gradient(180deg, #1f1c2c, #928dab)',
                                        color: '#FFFFFF',
                                        '&:hover': {
                                            background: 'linear-gradient(180deg, #928dab, #1f1c2c)',
                                        },
                                        px: 4
                                    }}
                                >
                                    Punch In Now
                                </Button>
                            </motion.div>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => setOpenPunchInDialog(false)}
                            sx={{ color: '#928dab' }}
                        >
                            Remind Me Later
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Logout Dialog */}
                <Dialog
                    open={openLogoutDialog}
                    onClose={() => setOpenLogoutDialog(false)}
                    PaperProps={{
                        style: {
                            borderRadius: '12px',
                            padding: '16px',
                        },
                    }}
                >
                    <DialogTitle sx={{
                        background: 'linear-gradient(180deg, #1f1c2c, #928dab)',
                        color: '#FFFFFF',
                        borderRadius: '8px 8px 0 0'
                    }}>
                        Confirm Logout
                    </DialogTitle>
                    <DialogContent sx={{ mt: 2 }}>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Are you sure you want to logout?
                            {!isPunchedIn && " You haven't punched in today."}
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ padding: '16px' }}>
                        <Button
                            onClick={() => setOpenLogoutDialog(false)}
                            sx={{ color: '#928dab' }}
                        >
                            Cancel
                        </Button>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button
                                onClick={handleLogout}
                                variant="contained"
                                startIcon={<ExitToApp />}
                                sx={{
                                    background: 'linear-gradient(180deg, #1f1c2c, #928dab)',
                                    color: '#FFFFFF',
                                    '&:hover': {
                                        background: 'linear-gradient(180deg, #928dab, #1f1c2c)',
                                    }
                                }}
                            >
                                Logout
                            </Button>
                        </motion.div>
                    </DialogActions>
                </Dialog>


                <Snackbar
                    open={showSuccessSnackbar}
                    autoHideDuration={3000}
                    onClose={() => setShowSuccessSnackbar(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert
                        onClose={() => setShowSuccessSnackbar(false)}
                        severity="success"
                        sx={{ width: '100%' }}
                    >
                        Successfully punched in at {punchInTime?.toLocaleTimeString()}!
                    </Alert>
                </Snackbar>


                {isPunchedIn && (
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 20,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 1000,
                            animation: 'slideDown 0.5s ease-out',
                            '@keyframes slideDown': {
                                from: {
                                    transform: 'translateX(-50%) translateY(-20px)',
                                    opacity: 0
                                },
                                to: {
                                    transform: 'translateX(-50%) translateY(0)',
                                    opacity: 1
                                }
                            }
                        }}
                    >
                        <Tooltip
                            title={`Punched in at ${punchInTime?.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}`}
                            arrow
                        >
                            <Box
                                sx={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                                    cursor: 'pointer',
                                    border: '2px solid rgba(255, 255, 255, 0.2)',
                                    position: 'relative',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)',
                                    },
                                    transition: 'all 0.3s ease',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        backgroundColor: '#fff',
                                        bottom: '3px',
                                        right: '3px',
                                        animation: 'pulse 2s infinite'
                                    },
                                    '@keyframes pulse': {
                                        '0%': {
                                            transform: 'scale(1)',
                                            opacity: 1
                                        },
                                        '50%': {
                                            transform: 'scale(1.2)',
                                            opacity: 0.5
                                        },
                                        '100%': {
                                            transform: 'scale(1)',
                                            opacity: 1
                                        }
                                    }
                                }}
                            >
                                <Timer
                                    sx={{
                                        fontSize: 24,
                                        color: '#FFFFFF',
                                        animation: 'rotate 2s infinite linear',
                                        '@keyframes rotate': {
                                            from: { transform: 'rotate(0deg)' },
                                            to: { transform: 'rotate(360deg)' }
                                        }
                                    }}
                                />
                            </Box>
                        </Tooltip>
                    </Box>
                )}


                <Box sx={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                    zIndex: 1000
                }}>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Tooltip title={isPunchedIn ? "Logout" : "Punch In"}>
                            <IconButton
                                onClick={() => isPunchedIn ? setOpenLogoutDialog(true) : setOpenPunchInDialog(true)}
                                sx={{
                                    width: 56,
                                    height: 56,
                                    backgroundColor: isPunchedIn ? '#4caf50' : '#1f1c2c',
                                    color: '#FFFFFF',
                                    '&:hover': {
                                        backgroundColor: isPunchedIn ? '#388e3c' : '#928dab',
                                    },
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                }}
                            >
                                {isPunchedIn ? <ExitToApp /> : <Timer />}
                            </IconButton>
                        </Tooltip>
                    </motion.div>
                </Box>
            </Box>
        </Box>
    );
};

export default Manager;
