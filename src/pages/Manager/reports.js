import React from 'react';
import { Box, Typography, Grid, Paper, useTheme } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { alpha } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ReportsAnalytics = ({ primaryColor = '#3f51b5', secondaryColor = '#7986cb' }) => {
    const theme = useTheme();

    // Simulated Data (Replace with actual data fetching)
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const taskCompletionData = labels.map((_, index) =>
        Math.floor(Math.random() * (30 - 5 + 1)) + 5 // Random tasks completed between 5 and 30
    );

    
    const totalProjects = 24;
    const activeTasks = 12;
    const completionRate = 85;
    const teamSatisfaction = 7.5;

    // Chart Data
    const taskCompletionChartData = {
        labels: labels,
        datasets: [
            {
                label: "Tasks Completed",
                data: taskCompletionData,
                borderColor: primaryColor,
                backgroundColor: alpha(primaryColor, 0.3),
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: primaryColor,
                pointBorderColor: theme.palette.background.paper,
                pointHoverRadius: 7,
                pointHoverBackgroundColor: primaryColor,
                pointHoverBorderColor: theme.palette.background.paper,
            },
        ],
    };

    // Chart Options
    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
            title: {
                display: false,
                text: 'Tasks Completed Trend',
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: theme.palette.text.secondary,
                },
            },
            y: {
                grid: {
                    borderDash: [2, 2],
                    color: theme.palette.divider,
                },
                ticks: {
                    color: theme.palette.text.secondary,
                    stepSize: 5,
                },
            },
        },
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Reports & Analytics
            </Typography>

            <Grid container spacing={3}>
               
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', backgroundColor: '#e8eaf6' }}>
                        <Box mr={2}>
                            <Typography variant="h6" color="textSecondary">
                                Total Projects
                            </Typography>
                            <Typography variant="h4" fontWeight="bold">
                                {totalProjects}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

              
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', backgroundColor: '#e0f2f1' }}>
                        <Box mr={2}>
                            <Typography variant="h6" color="textSecondary">
                                Active Tasks
                            </Typography>
                            <Typography variant="h4" fontWeight="bold">
                                {activeTasks}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', backgroundColor: '#f9fbe7' }}>
                        <Box mr={2}>
                            <Typography variant="h6" color="textSecondary">
                                Completion Rate
                            </Typography>
                            <Typography variant="h4" fontWeight="bold">
                                {completionRate}%
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Team Satisfaction */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', backgroundColor: '#ede7f6' }}>
                        <Box mr={2}>
                            <Typography variant="h6" color="textSecondary">
                                Team Satisfaction
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h4" fontWeight="bold">
                                    {teamSatisfaction}
                                </Typography>
                                {teamSatisfaction > 7 ? (
                                    <TrendingUpIcon sx={{ color: 'success.main', ml: 1 }} />
                                ) : (
                                    <TrendingDownIcon sx={{ color: 'error.main', ml: 1 }} />
                                )}
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                
                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Tasks Completion Trend
                        </Typography>
                        <Box sx={{ height: 300 }}>
                            <Line data={taskCompletionChartData} options={lineChartOptions} />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ReportsAnalytics;