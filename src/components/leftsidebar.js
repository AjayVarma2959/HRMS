import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  Avatar,
  Button,
  Stack,
  Divider,
  Grid,
  IconButton,
  ListItemText,
  ListItemIcon,
  Tooltip,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import {
  Notifications,
  Info,
  CalendarToday,
  Group,
  BugReport,
  TrendingUp,
  Build,
  CheckCircle,
  People,
  AccountCircle,
} from "@mui/icons-material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
// import Projects from './Projects';
// import Teams from './Teams';
 
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  ChartTooltip,
  Legend
);
 
const MuperAdminDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [activeProjects, setActiveProjects] = useState(18);
  const [activeTeams, setActiveTeams] = useState(12);
  const [openIssues, setOpenIssues] = useState(25);
  const [systemHealth, setSystemHealth] = useState(99.9);
  const [completedProjects, setCompletedProjects] = useState(45);
  const [admins, setAdmins] = useState(5);
  const [clients, setClients] = useState(30);
  const [totalEmployees, setTotalEmployees] = useState(80);
  const [notifications, setNotifications] = useState([]);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
 
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
 
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProjects((prev) => Math.max(15, Math.min(25, prev + Math.floor(Math.random() * 3) - 1)));
      setActiveTeams((prev) => Math.max(10, Math.min(15, prev + Math.floor(Math.random() * 3) - 1)));
      setOpenIssues((prev) => Math.max(0, Math.min(50, prev + Math.floor(Math.random() * 5) - 2)));
      setSystemHealth((prev) => Math.max(95, Math.min(100, prev + (Math.random() * 0.1 - 0.05))));
    }, 5000);
 
    return () => clearInterval(interval);
  }, []);
 
  useEffect(() => {
    const notificationInterval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        message: `New ${["project", "team", "issue"][Math.floor(Math.random() * 3)]} created`,
        timestamp: new Date().toLocaleTimeString(),
      };
      setNotifications((prev) => [newNotification, ...prev.slice(0, 4)]);
    }, 10000);
 
    return () => clearInterval(notificationInterval);
  }, []);
 
  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };
 
  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };
 
  const lineChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Deployments",
        data: [3, 2, 5, 4, 6, 7, 8],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
      },
    ],
  };
 
  const pieChartData = {
    labels: ["Development", "Testing", "Design", "Other"],
    datasets: [
      {
        label: "Team Allocation",
        data: [40, 30, 20, 10],
        backgroundColor: ["#2196F3", "#4CAF50", "#FF9800", "#9C27B0"],
      },
    ],
  };
 
  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, minHeight: "100vh" }}>
      <Box sx={{ width: { xs: "100%", md: "15%" }, backgroundColor: "#2C3E50", color: "#ECF0F1", p: 2 }}>
        <Box textAlign="center" mb={3}>
          <Avatar sx={{ width: 80, height: 80, mx: "auto", bgcolor: "#3498DB", color: "#FFFFFF" }}>SA</Avatar>
          <Typography variant="h6" fontWeight="bold">Super Admin</Typography>
          <Typography variant="body2" color="#ECF0F1">admin@softwarecompany.com</Typography>
        </Box>
        <Stack spacing={1.5}>
          {["Dashboard", "Projects", "Teams", "Issue Tracking", "System Health", "Settings"].map((item) => (
            <Button
              key={item}
              onClick={() => setSelectedMenu(item)}
              sx={{
                justifyContent: "flex-start",
                color: selectedMenu === item ? "#FFFFFF" : "#BDC3C7",
                backgroundColor: selectedMenu === item ? "#2980B9" : "transparent",
                padding: "10px 15px",
                borderRadius: 1,
                textTransform: "none",
              }}
            >
              {item}
            </Button>
          ))}
        </Stack>
      </Box>
 
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: "#ECF0F1" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", p: "15px 30px", bgcolor: "#34495E", color: "#ECF0F1" }}>
          <Typography variant="h6" fontWeight="bold">{selectedMenu}</Typography>
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
            <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#1ABC9C", borderRadius: 2, p: 1, color: "#FFFFFF" }}>
              <CalendarToday fontSize="small" />
              <Typography ml={1}>{currentDate}</Typography>
            </Box>
            <Avatar sx={{ bgcolor: "#3498DB" }}>SA</Avatar>
          </Box>
        </Box>
       
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
        >
          {notifications.map((notification) => (
            <MenuItem key={notification.id} onClick={handleNotificationClose}>
              <ListItemIcon>
                <Notifications sx={{ color: "#3498DB" }} />
              </ListItemIcon>
              <ListItemText
                primary={notification.message}
                secondary={notification.timestamp}
                primaryTypographyProps={{
                  fontWeight: 'bold',
                  color: '#333333',
                  variant: 'body1'
                }}
                secondaryTypographyProps={{
                  color: '#555555',
                  variant: 'body2',
                }}
              />
            </MenuItem>
          ))}
        </Menu>
 
        <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
          {selectedMenu === "Dashboard" && (
            <>
              <Grid container spacing={2}>
                {[
                  { title: "Active Projects", value: activeProjects, icon: <Build sx={{ color: "#4CAF50" }} /> },
                  { title: "Active Teams", value: activeTeams, icon: <Group sx={{ color: "#2196F3" }} /> },
                  { title: "Open Issues", value: openIssues, icon: <BugReport sx={{ color: "#F44336" }} /> },
                  { title: "System Health", value: `${systemHealth.toFixed(1)}%`, icon: <TrendingUp sx={{ color: "#FFC107" }} /> },
                  { title: "Completed Projects", value: completedProjects, icon: <CheckCircle sx={{ color: "#8E44AD" }} /> },
                  { title: "Admins", value: admins, icon: <AccountCircle sx={{ color: "#3498DB" }} /> },
                  { title: "Clients", value: clients, icon: <People sx={{ color: "#E67E22" }} /> },
                  { title: "Total Employees", value: totalEmployees, icon: <People sx={{ color: "#2ECC71" }} /> },
                ].map((item, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card sx={{ p: 2, textAlign: "center", backgroundColor: "#F9F9F9", borderRadius: 2 }}>
                      <Box>{item.icon}</Box>
                      <Typography variant="subtitle1" color="textSecondary">{item.title}</Typography>
                      <Typography variant="h5" fontWeight="bold">{item.value}</Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
 
              <Grid container spacing={2} mt={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: 300, p: 2, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Typography variant="subtitle1" color="textSecondary" mb={1}>Weekly Deployments</Typography>
                    <Box sx={{ flex: 1 }}>
                      <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
                    </Box>
                  </Card>
                </Grid>
 
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: 300, p: 2, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Typography variant="subtitle1" color="textSecondary" mb={1}>Team Allocation</Typography>
                    <Box sx={{ flex: 1 }}>
                      <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </>
          )}
          {/* {selectedMenu === "Projects" && <Projects />}
          {selectedMenu === "Teams" && <Teams />} */}
        </Box>
      </Box>
    </Box>
  );
};
 
export default MuperAdminDashboard;
 