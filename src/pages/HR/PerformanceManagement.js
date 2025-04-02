import React, { useState, useReducer } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  TextField,
  Button,
  Avatar,
  IconButton,
  Snackbar,
  Alert
} from "@mui/material";
import {
  ExpandMore,
  InsertChart,
  RateReview,
  Feedback,
  Star,
  StarBorder,
  Send
} from "@mui/icons-material";


const feedbackReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FEEDBACK':
      return [...state, action.payload];
    case 'SET_FEEDBACK':
      return action.payload;
    default:
      return state;
  }
};

const PerformanceManagement = () => {
  const [feedback, setFeedback] = useState("");
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [submittedFeedback, dispatchFeedback] = useReducer(feedbackReducer, []);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  
  const performanceReviews = [
    { date: "2024-03-15", rating: 4.5, reviewer: "Project Manager", comments: "Excellent problem-solving skills and team collaboration." },
    { date: "2023-12-20", rating: 4.0, reviewer: "Team Lead", comments: "Consistently meets deadlines with high quality work." }
  ];

  const okrs = [
    {
      objective: "Improve Software Delivery Speed",
      kpis: [
        { metric: "Deployment Frequency", target: "15/week", current: "12/week", progress: 80 },
        { metric: "Lead Time", target: "<2 days", current: "1.5 days", progress: 100 }
      ]
    },
    {
      objective: "Enhance Code Quality",
      kpis: [
        { metric: "Test Coverage", target: "85%", current: "78%", progress: 92 },
        { metric: "Critical Bugs", target: "0/month", current: "2/month", progress: 50 }
      ]
    }
  ];

  const handleFeedbackSubmit = () => {
    if (feedback.trim() && rating > 0) {
      dispatchFeedback({
        type: 'ADD_FEEDBACK',
        payload: {
          text: feedback,
          date: new Date().toISOString().split('T')[0],
          rating: rating
        }
      });
      setFeedback("");
      setRating(0);
      setShowFeedbackForm(false);
      setSnackbarMessage("Feedback submitted successfully!");
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage("Please provide both feedback and a rating.");
      setSnackbarOpen(true);
    }
  };

  const renderRatingStars = (rating, interactive = false, onChange) => {
    return [...Array(5)].map((_, index) => (
      <IconButton key={index} onClick={() => interactive && onChange(index + 1)}>
        {index < Math.floor(rating) ? <Star color="warning" /> : <StarBorder />}
      </IconButton>
    ));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: 'primary.main' }}>
        <InsertChart sx={{ verticalAlign: 'middle', mr: 1, fontSize: '2rem' }} />
        Performance Management
      </Typography>

     
      <Card sx={{ mb: 3, bgcolor: '#f5f5f5' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ color: 'secondary.main' }}>
            <RateReview sx={{ mr: 1 }} />
            Performance Reviews
          </Typography>
          {performanceReviews.map((review, index) => (
            <Accordion key={index} sx={{ mb: 1 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>{new Date(review.date).toLocaleDateString()}</Typography>
                  <Box>
                    {renderRatingStars(review.rating)}
                    <Chip label={review.reviewer} variant="outlined" size="small" sx={{ ml: 2 }} />
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{review.comments}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </CardContent>
      </Card>

     
      <Card sx={{ mb: 3, bgcolor: '#fff8e1' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ color: 'secondary.main' }}>
            <InsertChart sx={{ mr: 1 }} />
            OKRs & KPIs Tracking
          </Typography>
          <Grid container spacing={3}>
            {okrs.map((okr, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ color: 'primary.dark' }}>
                    {okr.objective}
                  </Typography>
                  {okr.kpis.map((kpi, kpiIndex) => (
                    <Box key={kpiIndex} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">{kpi.metric}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {kpi.current} / {kpi.target}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={kpi.progress}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 5,
                            backgroundColor: index % 2 === 0 ? 'primary.main' : 'secondary.main'
                          }
                        }}
                      />
                    </Box>
                  ))}
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      
      <Card sx={{ bgcolor: '#e8f5e9' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ color: 'secondary.main' }}>
            <Feedback sx={{ mr: 1 }} />
            Feedback System
          </Typography>
          
          {!showFeedbackForm && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowFeedbackForm(true)}
              sx={{ mb: 2 }}
            >
              Give Feedback
            </Button>
          )}

          {showFeedbackForm && (
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write your feedback..."
                variant="outlined"
              />
              <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  {renderRatingStars(rating, true, setRating)}
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<Send />}
                  onClick={handleFeedbackSubmit}
                  sx={{ mt: 1 }}
                >
                  Submit Feedback
                </Button>
              </Box>
            </Box>
          )}

          {submittedFeedback.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'start', mb: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>U</Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {item.date}
                </Typography>
                <Typography variant="body1" sx={{ bgcolor: 'white', p: 2, borderRadius: 2 }}>
                  {item.text}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  {renderRatingStars(item.rating)}
                </Box>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PerformanceManagement;