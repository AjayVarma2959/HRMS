import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  Divider,
} from "@mui/material";
import {
  Notifications,
  Info,
  CalendarToday,
  Dashboard,
  People,
  WorkOutline,
  Assessment,
  AccessTime,
  BarChart,
  School,
  AttachMoney,
  Gavel,
} from "@mui/icons-material";


import EmployeeManagement from "./EmployeeManagement";
import Recruitment from "./Recruitment";
import PerformanceManagement from "./PerformanceManagement";
import Attendance from "./Attendance";
import Analytics from "./Analytics";
import LearningDevelopment from "./LearningDevelopment";
import CompensationBenefits from "./CompensationBenefits";
import Compliance from "./Compliance";
import HRHomeDashboard from './HRHomeDashboard';

import hrmsDashboardImage from '../../assets/Hmrs_Hashstack.png'
const HRDashboard = () => {
  

  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [notifications, setNotifications] = useState([
    "Policy updated for leave management",
    "Employee survey results published",
    "New candidate added to talent pool",
  ]);
  const [anchorEl, setAnchorEl] = useState(null);

  const currentDate = new Date().toLocaleDateString();

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { name: "Dashboard", icon: <Dashboard />, component: <HRHomeDashboard setSelectedMenu={setSelectedMenu} />},
    { name: "Employee Management", icon: <People />, component: <EmployeeManagement selectedMenu={setSelectedMenu} /> },
    { name: "Recruitment and Hiring", icon: <WorkOutline />, component: <Recruitment /> },
    { name: "Performance Management", icon: <Assessment />, component: <PerformanceManagement /> },
    { name: "Attendance and Time Tracking", icon: <AccessTime />, component: <Attendance selectedMenu={setSelectedMenu} /> },
    { name: "Analytics and Reporting", icon: <BarChart />, component: <Analytics /> },
    { name: "Learning and Development", icon: <School />, component: <LearningDevelopment /> },
    { name: "Compensation and Benefits", icon: <AttachMoney />, component: <CompensationBenefits /> },
    { name: "Compliance Tracking", icon: <Gavel />, component: <Compliance /> },
  ];

  const renderContent = () => {
    const selectedItem = menuItems.find(item => item.name === selectedMenu);
    if (selectedItem && selectedItem.component) {
      return selectedItem.component;
    }
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          {selectedMenu}
        </Typography>
        <Typography mt={2}>
          Feature for "{selectedMenu}" is currently under development.
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
      }}
    >
      
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
              onClick={() => setSelectedMenu(item.name)}
              sx={{
                justifyContent: "flex-start",
                color: selectedMenu === item.name ? "#FFFFFF" : "#BDC3C7",
                backgroundColor:
                  selectedMenu === item.name ? "#2980B9" : "transparent",
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
            p: "15px 30px",
            bgcolor: "#34495E",
            color: "#ECF0F1",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {selectedMenu}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
            >
              <CalendarToday fontSize="small" />
              <Typography ml={1}>{currentDate}</Typography>
            </Box>
            <Typography>HR</Typography>
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

        
        <Box sx={{ flex: 1, p: 3 }}>{renderContent()}</Box>
      </Box>
    </Box>
  );
};

export default HRDashboard;