import { Box, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import { HomeWork, Work, Checklist, AccessTime, Event, EmojiEvents, AccountBalance, ArrowBack } from '@mui/icons-material';
import Home from './Home';
import MyProjectsDashboard from './EmployeeProjects';
import MyTasks from './MyTasks';
import EmployeeAttendance from './EmployeeAttendance';
import EmployeeLeaveManagement from './EmployeeLeaveManagement';
import EmployeeAppraisals from './EmployeeAppraisals';
import Payroll from './Payroll';
import hrmsDashboardImage from "../../assets/Hrms_Hashstack.png";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
    Typography,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Badge,
    Tooltip,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Avatar, Stack
} from "@mui/material";

//import HomeIcon from '@mui/icons-material/Home';
import {
    Notifications,
    Info,
    CalendarToday,
    Assessment,
    Login, Output,
    HourglassBottom, PlayArrow, // Icon for Start
    Replay, Edit as EditIcon, PauseCircleOutline
} from "@mui/icons-material";

import Back from '../../assets/Back.png';
//import CloseIcon from '@mui/icons-material/Close';
import { Coffee, LogOut } from "lucide-react";
import profile_pic from "../../assets/profile_pic.png";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import dayjs from 'dayjs';
import EmployeeCheckIn from './EmployeeCheckIn';

const menuItems = [
    { name: 'Home', icon: <HomeWork />, component: <Home /> },
    { name: 'My Projects', icon: <Work />, component: <MyProjectsDashboard /> },
    { name: 'My Tasks', icon: <Checklist />, component: <MyTasks /> },
    { name: 'My Attendance', icon: <AccessTime />, component: <EmployeeAttendance /> },
    { name: 'Leaves Management', icon: <Event />, component: <EmployeeLeaveManagement /> },
    { name: 'Appraisals', icon: <EmojiEvents />, component: <EmployeeAppraisals /> },
    { name: 'Payroll', icon: <AccountBalance />, component: <Payroll /> },
];

const labelStyleForProfile = { fontWeight: '600', fontSize: '0.875rem', marginRight: 2 };
const valueBoxStyleForProfile = {
    border: '1px solid',
    borderColor: 'grey.400',
    bgcolor: 'grey.200',
    padding: 1,
    borderRadius: 1,
    fontSize: '0.5rem',
};


const EmployeeDashboard = () => {

    const [currentView, setCurrentView] = useState("Home");
    const [notifications, setNotifications] = useState([
        "Team meeting at 3 PM",
        "New task assigned: Design Wireframes",
        "Feedback submitted for Q4",
    ]);
    const [anchorEl, setAnchorEl] = useState(null);

    const currentDate = new Date().toLocaleDateString();
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [isRunning, setisRunning] = useState(false);
    const [status, setStatus] = useState('OUT')

    //const [totalBreakTime, setTotalBreakTime] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    const [isOnBreak, setIsOnBreak] = useState(false); // Track if on break
    const [breakStartTime, setBreakStartTime] = useState(null); // Track break start time
    const [totalBreakTime, setTotalBreakTime] = useState(
        parseInt(localStorage.getItem("totalBreakTime")) || 0
    );
    const [breakHours, setBreakHours] = useState(0);
    const [breakMinutes, setBreakMinutes] = useState(0);
    const [breakSeconds, setBreakSeconds] = useState(0);

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [profilePic, setProfilePic] = useState('profile_pic'); // Default profile picture
    const [personalEmail, setPersonalEmail] = useState('john.doe@gmail.com');
    const [isEditingEmail, setIsEditingEmail] = useState(false);



    const [phoneNumber, setPhoneNumber] = useState('9494949494');
    const [isEditingPhone, setIsEditingPhone] = useState(false);

    const [address, setAddress] = useState('Door No: 120, XYZ colony, Vizag, Andhra Pradesh, PIN-535004');
    const [isEditingAddress, setIsEditingAddress] = useState(false);

    const navigate = useNavigate();

    const handleSignOutButton = () => {
        const time = new Date();
        setCheckOutTime(time);
        setisRunning(false);
        navigate('/');
    }

    const handleCheckOutButton = () => {
        const time = new Date();
        setCheckOutTime(time);
        setisRunning(false);
        setIsOnBreak(false);  // Reset break state when checking out
        setBreakStartTime(null); // Clear break start time
        setStatus('OUT');
        // Update checkOutTime in localStorage
        localStorage.setItem("checkOutTime", time.toISOString());

        // Update totalBreakTime in localStorage if it's not null
        if (totalBreakTime !== null) {
            localStorage.setItem("totalBreakTime", totalBreakTime);
        }

        localStorage.removeItem("breakStartTime");

        // Example: Logging for debugging
        console.log("Checkout performed at:", time.toISOString());
        if (totalBreakTime !== null) {
            console.log("Total break time saved:", totalBreakTime);
        } else {
            console.log("No break time to save");
        }

        // Example: Making API call to record the checkout
        // api.recordCheckout(time.toISOString(), totalBreakTime).then(() => {
        //   // Handle success
        // }).catch(() => {
        //   // Handle error
        // });

        // Example: Displaying a message to the user
        // alert("Checkout successful!");
    };


    const handleNotificationClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotificationClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (menuName) => {
        setCurrentView(menuName);
    };

    const handleBackClick = () => {
        setCurrentView("Home");
    };

    const renderContent = () => {
        const selectedItem = menuItems.find((item) => item.name === currentView);
        return selectedItem ? selectedItem.component : <Home />;
    };
    const handleOpenEditDialog = () => {
        setOpenEditDialog(true);

    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    const handleSaveProfile = () => {
        // Implement save functionality here
        handleCloseEditDialog();
    };

    const profileDetails = [
        { label: 'Work Email', value: 'xyz@123.com', editable: false },
        { label: 'Work location', value: 'Vishakapatnam', editable: false },
        // { label: 'Personal Email:', value: 'xyz@123.com', editable: true },
        // { label: 'Address:', value: 'Door No: 120, Dwarakanangar, Vishakapatnam', editable: true },
        // { label: 'Phone Number:', value: '9494949494', editable: true },
    ];
    const handleProfilePicChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfilePic(imageUrl);
        }
    };
    const handleEditToggle = (field) => {
        if (field === 'email') setIsEditingEmail(!isEditingEmail);
        if (field === 'phone') setIsEditingPhone(!isEditingPhone);
        if (field === 'address') setIsEditingAddress(!isEditingAddress);
    };



    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            {/* Sidebar */}

            <Box
                sx={{
                    width: { xs: "100%", md: "15%" },
                    backgroundColor: "#2C3E50",
                    color: "#ECF0F1",
                    p: 2,
                }}
            >

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


                <Stack spacing={1.5}>
                    {menuItems.map((item) => (
                        <Button
                            key={item.name}
                            onClick={() => handleMenuItemClick(item.name)}
                            startIcon={item.icon}
                            sx={{
                                justifyContent: "flex-start",
                                color: currentView === item.name ? "#FFFFFF" : "#BDC3C7",
                                backgroundColor: currentView === item.name ? "#2980B9" : "transparent",
                                padding: "10px 15px",
                                borderRadius: 1,
                                textTransform: "none",
                                '&:hover': {
                                    backgroundColor: "#3b5998",
                                    color: "#FFFFFF",
                                },
                            }}
                        >
                            {item.name}
                        </Button>
                    ))}
                </Stack>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#ECF0F1",

                }}
            >

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: "15px 35px",
                        bgcolor: "#2B3C4E",
                        color: "#ECF0F1",
                    }}
                ><Box>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
                            Welcome Back, Alex
                        </Typography>
                        <Typography display='flex' alignItems='center'>
                            <CalendarToday fontSize="small" sx={{ mr: 1 }} />{currentDate}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

                    <EmployeeCheckIn status={status} setStatus={setStatus} handleCheckOutButton={handleCheckOutButton} />
                        <IconButton onClick={handleNotificationClick}>
                            <Badge badgeContent={notifications.length} color="secondary">
                                <Notifications sx={{ color: "#FF5722" }} />
                            </Badge>
                        </IconButton>
                        <Tooltip title="Information">
                            <IconButton sx={{ color: "#3498DB" }}>
                                <Info />
                            </IconButton>
                        </Tooltip>
                        <Divider orientation="vertical" flexItem sx={{ borderColor: "#95A5A6" }} />
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "#1ABC9C",
                                borderRadius: 2,
                                p: 1,
                                color: "#FFFFFF",
                            }}
                        >{status}
                        </Box>

                        <Box
                            component="img"
                            src={profile_pic}
                            alt="profile_pic"
                            sx={{ width: '50px', height: '50px', cursor: 'pointer' }}
                            onClick={handleOpenEditDialog}
                        />
                        {/* Edit Profile Dialog */}
                        <Dialog open={openEditDialog} onClose={handleCloseEditDialog} sx={{ p: 4, "& .MuiPaper-root": { backgroundColor: "#d6dee5" } }}>
                            <DialogTitle variant='h5' fontWeight='Bold' >Profile Details</DialogTitle>
                            <DialogContent>
                                {/* Profile Picture Upload */}
                                <Grid container alignItems='start' sx={{ marginBottom: 3 }}>
                                    <Grid item xs={3}>
                                        <Badge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            badgeContent={
                                                <IconButton
                                                    component="label"
                                                    sx={{ bgcolor: 'background.paper', borderRadius: '50%', color: "#2b3d4f" }} // Updated color
                                                >
                                                    <EditIcon sx={{ color: "#2b3d4f" }} /> {/* Updated color */}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        hidden
                                                        onChange={handleProfilePicChange}
                                                    />
                                                </IconButton>
                                            }
                                        >
                                            <Avatar
                                                alt="Profile Picture"
                                                src={profilePic}
                                                sx={{ width: 90, height: 90, bgcolor: "#2b3d4f" }} // Updated background color
                                            />
                                        </Badge>
                                    </Grid>
                                    <Grid item xs={5.5}>
                                        <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: "1.5rem" }}>John Doe</Typography>
                                        <Typography sx={{ fontSize: "0.875rem" }}>Full Stack Developer</Typography>
                                        <Typography sx={{ fontSize: "0.875rem" }}>HS000014</Typography>
                                        <Typography sx={{ fontSize: "0.875rem" }}>DOJ:04-03-2025</Typography>
                                    </Grid>

                                    <Grid item xs={3.5}>
                                        <Button
                                            variant="contained"
                                            onClick={handleCheckOutButton}
                                            disabled={checkOutTime !== null}
                                            startIcon={<LogOut />}
                                            sx={{
                                                backgroundColor: checkOutTime ? "#BDBDBD" : "#D32F2F",
                                                color: "#fff",
                                                fontWeight: "bold",
                                                borderRadius: "8px",
                                                fontSize: '0.75rem',
                                                padding: "8px 16px", mb: 2,
                                                "&:hover": { backgroundColor: checkOutTime ? "#BDBDBD" : "#B71C1C" },
                                                "&.Mui-disabled": {
                                                    backgroundColor: "#BDBDBD",
                                                    color: "#fff",
                                                    cursor: "not-allowed",
                                                },
                                            }}
                                        >
                                            Check-Out
                                        </Button>
                                        <Button
                                            variant="contained"
                                            startIcon={<PowerSettingsNewIcon />} // Added Power Icon
                                            sx={{
                                                backgroundColor: "#2b3d4f", // Updated button background
                                                color: "#fff",
                                                fontWeight: "bold",
                                                borderRadius: "8px",
                                                fontSize: '0.75rem',
                                                padding: "8px 16px",
                                                "&:hover": { backgroundColor: "#1f2c3a" }, // Slightly darker on hover
                                            }}
                                            onClick={handleSignOutButton}
                                        >
                                            Sign Out
                                        </Button>
                                    </Grid>
                                </Grid>

                                {/* Name and Email Fields */}
                                <Box sx={{ padding: 1, display: 'flex', gap: 3, }}>
                                    {profileDetails.map((item, index) => (
                                        <Grid
                                            container
                                            columns
                                            alignItems="center"
                                            key={index}
                                            sx={{ marginBottom: 1 }}

                                        >
                                            <Grid item xs={5}>
                                                <Typography sx={labelStyleForProfile}>{item.label}</Typography>
                                                <Box
                                                    sx={valueBoxStyleForProfile}
                                                >
                                                    <Typography >{item.value}</Typography>
                                                </Box>
                                            </Grid>

                                        </Grid>
                                    ))}
                                </Box>
                                <Box sx={{ padding: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                                    {/* Personal Email */}
                                    <Grid container alignItems="center" sx={{ marginBottom: 1 }}>
                                        <Grid item xs={12}>
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <Typography sx={labelStyleForProfile}>Personal Email</Typography>
                                                <IconButton size="small" onClick={() => handleEditToggle('email')}>
                                                    <EditIcon fontSize="inherit" sx={{ color: "#2b3d4f" }} />
                                                </IconButton>
                                            </Stack>
                                            <Box sx={valueBoxStyleForProfile}>
                                                {isEditingEmail ? (
                                                    <TextField
                                                        fullWidth
                                                        value={personalEmail}
                                                        onChange={(e) => setPersonalEmail(e.target.value)}
                                                        onBlur={() => setIsEditingEmail(false)} // Save on blur
                                                    />
                                                ) : (
                                                    <Typography>{personalEmail}</Typography>
                                                )}
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    {/* Phone Number */}
                                    <Grid container alignItems="center" sx={{ marginBottom: 1 }}>
                                        <Grid item xs={12}>
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <Typography sx={labelStyleForProfile}>Phone Number</Typography>
                                                <IconButton size="small" onClick={() => handleEditToggle('phone')}>
                                                    <EditIcon fontSize="inherit" sx={{ color: "#2b3d4f" }} />
                                                </IconButton>
                                            </Stack>
                                            <Box sx={valueBoxStyleForProfile}>
                                                {isEditingPhone ? (
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        value={phoneNumber}
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                        onBlur={() => setIsEditingPhone(false)} // Save on blur
                                                    />
                                                ) : (
                                                    <Typography>{phoneNumber}</Typography>
                                                )}
                                            </Box>
                                        </Grid>
                                    </Grid>


                                    {/* Address */}
                                    <Grid container alignItems="center" sx={{ marginBottom: 1 }}>
                                        <Grid item xs={12}>
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <Typography sx={labelStyleForProfile}>Address</Typography>
                                                <IconButton size="small" onClick={() => handleEditToggle('address')}>
                                                    <EditIcon fontSize="inherit" sx={{ color: "#2b3d4f" }} />
                                                </IconButton>
                                            </Stack>
                                            <Box sx={valueBoxStyleForProfile}>
                                                {isEditingAddress ? (
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                        onBlur={() => setIsEditingAddress(false)} // Save on blur
                                                    />
                                                ) : (
                                                    <Typography>{address}</Typography>
                                                )}
                                            </Box>
                                        </Grid>
                                    </Grid>

                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Box sx={{ padding: 1 }}>
                                    <Button
                                        onClick={handleCloseEditDialog}
                                        variant="outlined" // Changed to outlined
                                        sx={{
                                            color: "#2b3d4f", // Updated text color
                                            borderColor: "#2b3d4f", // Updated border color
                                            fontWeight: "bold",
                                            "&:hover": {
                                                backgroundColor: "#2b3d4f", // Background color on hover
                                                color: "#fff" // Text turns white on hover
                                            },
                                            marginRight: 1,
                                            borderWidth: "2px",
                                            fontSize: "0.8rem"
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleSaveProfile}
                                        variant="outlined" // Changed to outlined
                                        sx={{
                                            color: "#2b3d4f", // Updated text color
                                            borderColor: "#2b3d4f", // Updated border color
                                            fontWeight: "bold",
                                            "&:hover": {
                                                backgroundColor: "#2b3d4f", // Background color on hover
                                                color: "#fff" // Text turns white on hover
                                            },
                                            borderWidth: "2px",
                                            fontSize: "0.8rem"
                                        }}
                                    >
                                        Save
                                    </Button>
                                </Box>
                            </DialogActions>

                        </Dialog>

                    </Box>
                </Box>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleNotificationClose}
                >
                    {notifications.map((note, index) => (
                        <MenuItem key={index} onClick={handleNotificationClose}>
                            {note}
                        </MenuItem>
                    ))}
                </Menu>

                {/* <Box sx={{ flex: 1, p: 3 }}>{renderContent()}</Box> */}
                {/* Main Content */}
                <Box sx={{ flex: 1, bgcolor: "#f9f9f9", pt: 4, pl: 4, pb: 6 }}>
                    {currentView !== "Home" && (
                        <Box
                            onClick={handleBackClick}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                mb: 2,
                            }}
                        >
                            <img
                                src={Back}
                                alt="Back to Dashboard"
                                style={{ width: "30px", height: "30px", marginRight: "10px" }}
                            />

                        </Box>
                    )}
                    {renderContent()}
                </Box>
            </Box>
        </Box>
    );
};

export default EmployeeDashboard;
