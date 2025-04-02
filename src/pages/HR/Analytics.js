import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Tab,
  Tabs,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { motion } from "framer-motion";


const COLORS = {
  primary: "#2196f3",
  secondary: "#ff4081",
  success: "#4caf50",
  warning: "#ff9800",
  error: "#f44336",
  chart1: "#8884d8",
  chart2: "#82ca9d",
  chart3: "#ffc658",
  chart4: "#ff7300",
};


const attritionData = [
  { month: "Jan", rate: 2.1, industry: 2.5 },
  { month: "Feb", rate: 2.3, industry: 2.4 },
  { month: "Mar", rate: 1.9, industry: 2.3 },
  { month: "Apr", rate: 2.4, industry: 2.5 },
  { month: "May", rate: 2.0, industry: 2.4 },
  { month: "Jun", rate: 1.8, industry: 2.3 },
];

const engagementData = [
  { name: "Highly Engaged", value: 45, color: COLORS.success },
  { name: "Engaged", value: 30, color: COLORS.primary },
  { name: "Neutral", value: 15, color: COLORS.warning },
  { name: "Disengaged", value: 10, color: COLORS.error },
];

const diversityData = [
  { department: "Engineering", male: 60, female: 40, other: 5 },
  { department: "Sales", male: 45, female: 55, other: 3 },
  { department: "Marketing", male: 40, female: 58, other: 2 },
  { department: "HR", male: 35, female: 62, other: 3 },
];

const skillsData = [
  { skill: "Technical", score: 80 },
  { skill: "Leadership", score: 70 },
  { skill: "Communication", score: 90 },
  { skill: "Problem Solving", score: 85 },
  { skill: "Teamwork", score: 95 },
];


const MetricCard = ({ title, value, subtitle, trend, color }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card sx={{ height: "100%", background: `linear-gradient(45deg, ${color}22, white)` }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Typography variant="h4" component="div" sx={{ color: color }}>
            {value}
          </Typography>
          <Box display="flex" alignItems="center" mt={1}>
            {trend > 0 ? (
              <TrendingUpIcon sx={{ color: COLORS.success }} />
            ) : (
              <TrendingDownIcon sx={{ color: COLORS.error }} />
            )}
            <Typography color="textSecondary" ml={1}>
              {subtitle}
            </Typography>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem>View Details</MenuItem>
            <MenuItem>Export Data</MenuItem>
            <MenuItem>Set Alert</MenuItem>
          </Menu>
        </CardContent>
      </Card>
    </motion.div>
  );
};


const Analytics = () => {
  const [timeRange, setTimeRange] = useState(0);
  const theme = useTheme();

  const handleTimeRangeChange = (event, newValue) => {
    setTimeRange(newValue);
  };

  return (
    <Box p={3}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" fontWeight="bold">
            Analytics and Reporting
          </Typography>
          <Tabs value={timeRange} onChange={handleTimeRangeChange}>
            <Tab label="Daily" />
            <Tab label="Weekly" />
            <Tab label="Monthly" />
            <Tab label="Yearly" />
          </Tabs>
        </Box>

        
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Current Attrition Rate"
              value="1.8%"
              subtitle="-0.2% vs last month"
              trend={-0.2}
              color={COLORS.primary}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Employee Engagement"
              value="75%"
              subtitle="+5% vs last quarter"
              trend={5}
              color={COLORS.success}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Diversity Score"
              value="82/100"
              subtitle="+3 points vs target"
              trend={3}
              color={COLORS.secondary}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Hiring Progress"
              value="133%"
              subtitle="+33% vs target"
              trend={33}
              color={COLORS.warning}
            />
          </Grid>
        </Grid>

        
        <Grid container spacing={3}>
        
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.01 }}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <Typography variant="h6" mb={2}>Attrition Rate Trend</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={attritionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke={COLORS.primary}
                      strokeWidth={2}
                      dot={{ fill: COLORS.primary }}
                    />
                    <Line
                      type="monotone"
                      dataKey="industry"
                      stroke={COLORS.secondary}
                      strokeWidth={2}
                      dot={{ fill: COLORS.secondary }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </motion.div>
          </Grid>

         
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.01 }}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <Typography variant="h6" mb={2}>Employee Engagement Distribution</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={engagementData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {engagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </motion.div>
          </Grid>

         
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.01 }}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <Typography variant="h6" mb={2}>Team Skills Assessment</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={skillsData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="skill" />
                    <PolarRadiusAxis />
                    <Radar
                      name="Skills"
                      dataKey="score"
                      stroke={COLORS.primary}
                      fill={COLORS.primary}
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </Paper>
            </motion.div>
          </Grid>

          
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.01 }}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <Typography variant="h6" mb={2}>Diversity by Department</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={diversityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="male" fill={COLORS.chart1} />
                    <Bar dataKey="female" fill={COLORS.chart2} />
                    <Bar dataKey="other" fill={COLORS.chart3} />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
};

export default Analytics;