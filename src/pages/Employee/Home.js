import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Box,
  Button,
  Paper, IconButton
} from "@mui/material";
//import { Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

import { Home as HomeIcon, Plus, TrendingUp, ClipboardList, CalendarCheck } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
} from "chart.js";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import BarChartIcon from '@mui/icons-material/BarChart';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ChecklistIcon from '@mui/icons-material/Checklist';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
//import  ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import EastOutlinedIcon   from '@mui/icons-material/ArrowRightAltOutlined';
import MyProjectsDashboard from "./EmployeeProjects";
import EmployeeLeaveManagment from "./EmployeeLeaveManagement";
import EmployeeApparisals from "./EmployeeAppraisals";
import MyTasks from "./MyTasks";
import EmployeeAttendance from "./EmployeeAttendance";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  // Tooltip,
  Legend
);


const data = [
  { name: "Jan", performance: 4000, leaves: 2, salary: 5000 },
  { name: "Feb", performance: 3000, leaves: 3, salary: 5200 },
  { name: "Mar", performance: 2000, leaves: 1, salary: 5400 },
  { name: "Apr", performance: 2780, leaves: 2, salary: 5600 },
  { name: "May", performance: 1890, leaves: 3, salary: 5800 },
  { name: "Jun", performance: 2390, leaves: 1, salary: 6000 },
  { name: "Jul", performance: 3490, leaves: 2, salary: 6200 },
  { name: "Aug", performance: 3490, leaves: 3, salary: 6400 },
  { name: "Sep", performance: 3490, leaves: 1, salary: 6600 },
  { name: "Oct", performance: 3490, leaves: 2, salary: 6800 },
  { name: "Nov", performance: 3490, leaves: 3, salary: 7000 },
  { name: "Dec", performance: 3490, leaves: 1, salary: 7200 },
];


const lineChartData = {
  labels: data.map((d) => d.name),
  datasets: [
    {
      label: "Salary Growth",
      data: data.map((d) => d.salary),
      borderColor: "#ff7300",
      backgroundColor: "rgba(255, 115, 0, 0.2)",
      fill: true,
    },
  ],
};

const projectStats = {
  total: 8,
  ongoing: 3,
  upcoming: 3,
  completed: 2,
};

// Convert data into pie chart format
const analyticsData = [
  { name: "Ongoing", value: projectStats.ongoing },
  { name: "Upcoming", value: projectStats.upcoming },
  { name: "Completed", value: projectStats.completed },
];

const COLORS = ["#42A5F5", "#FFA726", "#66BB6A"]; // Colors for Ongoing, Upcoming, Completed

const Home = () => {
  const [leaveStatus, setLeaveStatus] = useState("No leaves applied");

  const [selectedItem, setSelectedItem] = useState("");

  const cardData = [
    {
      title: "Active Projects",
      count: 5,
      icon: <AssignmentTurnedInIcon sx={{ fontSize: 36, color: "green" }} />,
      background: "linear-gradient(to right, #9ccdf5, #E3F2FD)",
      color: "#0D47A1",
      onClickAction: () => setSelectedItem("My Projects"),
    },
    {
      title: "Average Performance",
      count: "82%",
      icon: <BarChartIcon sx={{ fontSize: 36, color: "orange" }} />,
      background: "linear-gradient(to right, #fbd3c8, #ffd1ff45)",
      color: "#6A1B9A",
      onClickAction: () => setSelectedItem("Appraisals"),
    },
    {
      title: "Leave Status",
      count: leaveStatus,
      icon: <EventAvailableIcon sx={{ fontSize: 36, color: "blue" }} />,
      background: "linear-gradient(to right, #f4bd6f, #f6f1e4)",
      color: "#6D071A",
      onClickAction: () => setSelectedItem("Leaves Management"),
    },
    {
      title: "My Tasks",
      count: 9,
      icon: <ChecklistIcon sx={{ fontSize: 36, color: "#4B0082" }} />,
      background: "linear-gradient(to right, #c6fbca, #f1f8e9)",
      color: "#004d00",
      onClickAction: () => setSelectedItem("My Tasks"),
    },
    {
      title: "My Attendance",
      count: 5,
      icon: <FactCheckIcon sx={{ fontSize: 36, color: "#4B0082" }} />,
      background: "linear-gradient(to right, #DDA0DD,#E6E6FA )",
      color: "#004d00",
      onClickAction: () => setSelectedItem("My Attendance"),
    },
  ];


  // Match the exact names in if conditions
  if (selectedItem === "My Projects") {
    return <MyProjectsDashboard />;
  }
  if (selectedItem === "Appraisals") {
    return <EmployeeApparisals />;
  }
  if (selectedItem === "Leaves Management") {
    return <EmployeeLeaveManagment />;
  }
  if (selectedItem === "My Tasks") {
    return <MyTasks />;
  }
  if (selectedItem === "My Attendence") {
    return <EmployeeAttendance />;
  }

  const applyLeave = () => {
    setLeaveStatus("Leave applied, status: Pending");

    setTimeout(() => {
      setLeaveStatus("Leave applied, status: Approved");
    }, 3000);
  };

  const leaveData = [
    { month: "Jan", leaves: 1 },
    { month: "Feb", leaves: 2 },
    { month: "Mar", leaves: 0.5 },
    { month: "Apr", leaves: 2 },
    { month: "May", leaves: 1 },
    { month: "Jun", leaves: 0 },
    { month: "Jul", leaves: 1 },
    { month: "Aug", leaves: 2 },
    { month: "Sep", leaves: 0 },
    { month: "Oct", leaves: 1 },
    { month: "Nov", leaves: 0.5 },
    { month: "Dec", leaves: 1 },
  ];

  const taskMetrics = [
    { name: "Completed", value: 1, color: "#4CAF50" },
    { name: "Pending", value: 3, color: "#FFC107" },
    { name: "Overdue", value: 1, color: "#F44336" },
  ];

  return (
    <Box sx={{ p:2 , bgcolor: "#f4f6f8", minHeight: "100vh" }}>

      <Box sx={{ mb: 2,  }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" component="h3" gutterBottom>
           Home
          </Typography>
         
        </Box>
      </Box>
      <Grid container spacing={3} marginBottom={3}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                background: card.background,
                transition: "transform 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              onClick={card.onClickAction}
            >
              <CardContent>
                <Box gap={1} spacing={3}>
                  {card.icon}
                  <Typography variant="h6" fontWeight="bold" color={card.color}>
                    {card.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",

                    }}
                  >
                    <Typography variant="h6" fontWeight={600} color="#3c3c3c">
                      {card.count}
                    </Typography>
                    <IconButton
                      sx={{
                        padding: '6px', // Adjust padding as needed
                        borderRadius: '50%', // Ensures the button remains circular
                        transition: 'transform 0.3s ease', // Smooth transition for transform
                        '&:hover': {
                          transform: 'scale(1.3)', // Scale up on hover
                        },
                      }}
                    >
                      <EastOutlinedIcon 
                        fontSize="large"
                        sx={{
                          color: '#333',
                        }}
                      />
                    </IconButton>

                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>


      <Grid container spacing={3} rowGap={2}>  {/* Ensures both horizontal & vertical spacing */}

        {/* Project Distribution (Pie Chart) */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: "90%", mb: 3 }}> {/* Added mb:3 for extra spacing */}
            <Typography variant="h6" mb={3} mt={1}>
              Project Distribution
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <PieChart width={300} height={200}>
                <Pie
                  data={analyticsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {analyticsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
              {analyticsData.map((entry, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, bgcolor: COLORS[index] }} />
                  <Typography variant="body2">{entry.name}</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Monthly Leave Distribution (Line Chart) */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: "90%", mb: 3 }}> {/* Added mb:3 for spacing */}
            <Typography variant="h6" mb={2} mt={1}>
              Monthly Leave Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={leaveData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} />
                <Tooltip />
                {/* Sharp Triangle Edges */}
                <Line
                  type="linear"
                  dataKey="leaves"
                  stroke="#01026b"
                  strokeWidth={4}
                  dot={{ r: 3, fill: "#01026b" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Task Distribution Pie Chart */}
        <Grid item xs={12} md={6}>
          <motion.div whileHover={{ scale: 1.01 }}>
            <Paper sx={{ p: 2, height: "90%", mb: 3 }}> {/* Added mb:3 to separate it from above elements */}
              <Typography variant="h6" mt={1}>Task Distribution</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={taskMetrics}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {taskMetrics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>

              {/* Custom Color Legend */}
              <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 1 }}>
                {taskMetrics.map((entry, index) => (
                  <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ width: 14, height: 14, bgcolor: entry.color, borderRadius: "50%" }} />
                    <Typography variant="body2">{entry.name}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </motion.div>
        </Grid>

      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          {/* <Card sx={{ height: 450, width: "100%" }}> 
            <CardHeader title="Performance Distribution" />
            <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Pie
                data={pieChartDataPerformance}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  layout: {
                    padding: 20,
                  },
                  plugins: {
                    legend: { position: "bottom" },
                  },
                  cutout: "40%", 
                }}
                style={{ width: "260px", height: "360px" }} 
              />
            </CardContent>
          </Card>
{/*  */}
          {/* <Card sx={{ height: 450, width: "100%", marginTop: 4 }}> 
            <CardHeader title="Leaves Taken Distribution" />
            <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Pie
                data={pieChartDataLeaves}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  layout: {
                    padding: 20, 
                  },
                  plugins: {
                    legend: { position: "bottom" },
                  },
                  cutout: "40%", 
                }}
                style={{ width: "260px", height: "360px" }} 
              />
            </CardContent>
          </Card> */}
        </Grid>


        {/* <Grid item xs={12} md={6}>
          <Card sx={{ height: 450, width: "100%" }}> 
            <CardHeader title="Salary Growth Over Time" />
            <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Line
                data={lineChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      ticks: {
                        autoSkip: false, 
                        maxRotation: 45, 
                        minRotation: 45,
                      },
                    },
                  },
                }}
                style={{ width: "100%", height: "300px" }} 
              />
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>


    </Box>
  );
};

export default Home;
