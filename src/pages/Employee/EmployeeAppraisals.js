import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Grid,
  Paper,
  TextField,
  Button, Rating,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  BugReport, 
  Code, 
  People, 
  Star, 
  TrendingUp, 
  MonetizationOn, 
  WorkspacePremium 
} from "@mui/icons-material";


const EmployeeAppraisals = () => {

  const [timeRange, setTimeRange] = useState(0);

  const metrics = [
    { id: 1, title: "Projects Completed", value: 8, icon: <CheckCircle sx={{ color: "#4CAF50", fontSize: 40 }} />, bg: "linear-gradient(to right, #E3F2FD, #BBDEFB)" },
    { id: 2, title: "Bugs Resolved", value: 24, icon: <BugReport sx={{ color: "#FF5722", fontSize: 40 }} />, bg: "linear-gradient(to right, #FFEBEE, #FFCDD2)" },
    { id: 3, title: "Code Quality Score", value: "92%", icon: <Code sx={{ color: "#673AB7", fontSize: 40 }} />, bg: "linear-gradient(to right, #EDE7F6, #D1C4E9)" },
    { id: 4, title: "Collaboration Score", value: "85%", icon: <People sx={{ color: "#03A9F4", fontSize: 40 }} />, bg: "linear-gradient(to right, #E1F5FE, #B3E5FC)" },
    { id: 5, title: "Client Feedback", value: "4.5/5", icon: <Star sx={{ color: "#FFC107", fontSize: 40 }} />, bg: "linear-gradient(to right, #FFF8E1, #FFECB3)" },
  ];

  const feedbackCategories = [
    { id: 1, title: "Technical Skills", maxScore: 10, rating: 8 },
    { id: 2, title: "Problem-Solving", maxScore: 10, rating: 7 },
    { id: 3, title: "Communication & Teamwork", maxScore: 10, rating: 9 },
    { id: 4, title: "Adherence to Deadlines", maxScore: 5, rating: 4 },
    { id: 5, title: "Overall Performance", maxScore: 5, rating: 5 },
  ];

 // ✅ Employee Promotion & Bonus Data
const promotionData = {
  isEligible: true, // ✅ Yes / No
  currentRole: "Software Engineer",
  newRole: "Senior Engineer",
  salaryIncrement: 12, // Percentage
  bonus: 50000, // Amount in INR
};
const gradientColors = {
  primary: "linear-gradient(to right, #BBDEFB, #E3F2FD)", // Light Blue
  secondary: "linear-gradient(to right, #FF80AB, #FFB6C1)", // Light Pink
  success: "linear-gradient(to right, #A5D6A7, #C8E6C9)", // Light Green
  warning: "linear-gradient(to right, #FFE082, #FFF3E0)", // Light Orange
};
  

  const handleTimeRangeChange = (event, newValue) => {
    setTimeRange(newValue);
  };

   // ✅ State to store employee responses
   const [appraisalData, setAppraisalData] = useState({
    contributions: "",
    deadlines: "",
    challenges: "",
    skills: "",
  });

  // ✅ Handle Input Changes
  const handleChange = (event) => {
    setAppraisalData({ ...appraisalData, [event.target.name]: event.target.value });
  };

  // ✅ Handle Form Submission
  const handleSubmit = () => {
    console.log("Submitted Data:", appraisalData);
    alert("Self-Appraisal Submitted Successfully!");
  };

  // ✅ Handle Reset
  const handleReset = () => {
    setAppraisalData({ contributions: "", deadlines: "", challenges: "", skills: "" });
  };
  return (
    <Box sx={{ }}>
       <Typography variant="h4" fontWeight="bold" marginBottom={2}>
              Appraisals
            </Typography>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box display="flex" justifyContent="end" alignItems="center" mb={4}>
            <Tabs value={timeRange} onChange={handleTimeRangeChange}>
            <Tab label="Monthly" />
            <Tab label="Yearly" />
          </Tabs>
        </Box>

        <Box sx={{ mt: 4, boxShadow: 2, borderRadius: 2, p: 4}}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
       Performance Statistics
      </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {metrics.map((metric) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={metric.id}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 3,
                  background: metric.bg,
                  textAlign: "center",
                }}
              >
                {metric.icon}
                <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold" }}>
                  {metric.title}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {metric.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        </Box>

        <Box sx={{ mt: 4, boxShadow: 2, borderRadius: 2, p: 4}}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          Feedbacks & Ratings
        </Typography>

        {/* Feedback Rating Grid */}
        <Grid container spacing={3}>
          {feedbackCategories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <Card sx={{ minWidth: 275, boxShadow: 3, borderRadius: 2, p: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {category.title}
                  </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
                    {category.rating} / {category.maxScore}
                  </Typography> */}
                  <Rating
                    value={(category.rating / category.maxScore) * 5}
                    precision={0.5}
                    readOnly
                  />


                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        </Box>

        <Box sx={{ mt: 4, boxShadow: 2, borderRadius: 2, p: 4 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          Promotion & Bonus Details
      </Typography>

      <Grid container spacing={3}>
        {/* ✅ Promotion Eligibility Card */}
        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, background: gradientColors.success }}>
            <CardContent sx={{ textAlign: "center" }}>
              <WorkspacePremium sx={{ fontSize: 40, color: promotionData.isEligible ? "#4CAF50" : "#F44336" }} />
              <Typography variant="h6" sx={{ mt: 1 }}>Promotion Eligibility</Typography>
              <Chip
                label={promotionData.isEligible ? "Yes" : "No"}
                sx={{
                  backgroundColor: promotionData.isEligible ? "#4CAF50" : "#F44336",
                  color: "#fff",
                  fontWeight: "bold",
                  mt: 1,
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* ✅ New Role Card */}
        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, background: gradientColors.primary }}>
            <CardContent sx={{ textAlign: "center" }}>
              <TrendingUp sx={{ fontSize: 40, color: "#2196F3" }} />
              <Typography variant="h6" sx={{ mt: 1 }}>New Role</Typography>
              <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                {promotionData.currentRole} → {promotionData.newRole}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* ✅ Salary Increment Card */}
        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, background: gradientColors.warning }}>
            <CardContent sx={{ textAlign: "center" }}>
              <MonetizationOn sx={{ fontSize: 40, color: "#FF9800" }} />
              <Typography variant="h6" sx={{ mt: 1 }}>Salary Increment</Typography>
              <Typography variant="body1" fontWeight="bold" color="green" sx={{ mt: 1 }}>
                +{promotionData.salaryIncrement}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* ✅ Bonus Card */}
        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, background: gradientColors.secondary }}>
            <CardContent sx={{ textAlign: "center" }}>
              <MonetizationOn sx={{ fontSize: 40, color: "#FF4081" }} />
              <Typography variant="h6" sx={{ mt: 1 }}>Bonus</Typography>
              <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                ₹{promotionData.bonus.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>

    <Box sx={{ mt: 4, boxShadow: 2, borderRadius: 2, p: 4}}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
       Self-Appraisal (Employee Inputs)
      </Typography>

      <Card sx={{  }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Employees submit their achievements for review
          </Typography>

          <Grid container spacing={3}>
            {/* ✅ Contributions */}
            <Grid item xs={12} md={6}>
              <Typography fontWeight="bold">What were your major contributions?</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="contributions"
                placeholder="Describe your contributions..."
                value={appraisalData.contributions}
                onChange={handleChange}
                fullWidth
                multiline
                minRows={3}
              />
            </Grid>

            {/* ✅ Project Deadlines */}
            <Grid item xs={12} md={6}>
              <Typography fontWeight="bold">Did you meet your project deadlines?</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="deadlines"
                placeholder="Explain any delays or on-time deliveries..."
                value={appraisalData.deadlines}
                onChange={handleChange}
                fullWidth
                multiline
                minRows={3}
              />
            </Grid>

            {/* ✅ Challenges Faced */}
            <Grid item xs={12} md={6}>
              <Typography fontWeight="bold">What challenges did you face?</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="challenges"
                placeholder="Mention any obstacles faced during work..."
                value={appraisalData.challenges}
                onChange={handleChange}
                fullWidth
                multiline
                minRows={3}
              />
            </Grid>

            {/* ✅ Skills Developed */}
            <Grid item xs={12} md={6}>
              <Typography fontWeight="bold">What skills did you develop?</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="skills"
                placeholder="Mention any new skills learned..."
                value={appraisalData.skills}
                onChange={handleChange}
                fullWidth
                multiline
                minRows={3}
              />
            </Grid>
          </Grid>

          {/* ✅ Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}>
            <Button variant="outlined" color="secondary" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>

      </motion.div>
    </Box>
  )
}

export default EmployeeAppraisals;