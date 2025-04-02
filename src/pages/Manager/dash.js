// // Create a new file named Dashboard.jsx

// import React from 'react';
// import {
//     Timeline,
//     TimelineItem,
//     TimelineSeparator,
//     TimelineConnector,
//     TimelineDot,
//     TimelineContent
// } from '@mui/lab';
// import {
//     Box,
//     Typography,
//     Grid,
//     Paper,
//     Stack,
//     LinearProgress,
//     CircularProgress,
//     Chip,
//     AvatarGroup,
//     Avatar,
// } from '@mui/material';
// import {
//     AccessTime,
//     Group as GroupIcon,
//     Assignment as AssignmentIcon,
//     Event as EventIcon,
//     Warning as WarningIcon,
//     CheckCircle as CheckCircleIcon,
// } from '@mui/icons-material';

// const Dashboard = () => {
//     return (
//         <Box sx={{ p: 3 }}>
//             {/* Project Overview Section */}
//             <Grid container spacing={3} sx={{ mb: 4 }}>
//                 <Grid item xs={12} md={3}>
//                     <Paper
//                         elevation={0}
//                         sx={{
//                             p: 3,
//                             borderRadius: 4,
//                             background: 'linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)',
//                             color: 'white',
//                         }}
//                     >
//                         <Stack spacing={2}>
//                             <GroupIcon sx={{ fontSize: 40 }} />
//                             <Typography variant="h4">24</Typography>
//                             <Typography variant="subtitle1">Total Employees</Typography>
//                         </Stack>
//                     </Paper>
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                     <Paper
//                         elevation={0}
//                         sx={{
//                             p: 3,
//                             borderRadius: 4,
//                             background: 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)',
//                             color: 'white',
//                         }}
//                     >
//                         <Stack spacing={2}>
//                             <AssignmentIcon sx={{ fontSize: 40 }} />
//                             <Typography variant="h4">12</Typography>
//                             <Typography variant="subtitle1">Active Projects</Typography>
//                         </Stack>
//                     </Paper>
//                 </Grid>
//                     <Grid item xs={12} md={3}>
//                     <Paper
//                         elevation={0}
//                         sx={{
//                             p: 3,
//                             borderRadius: 4,
//                             background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
//                             color: 'white',
//                         }}
//                     >
//                         <Stack spacing={2}>
//                             <EventIcon sx={{ fontSize: 40 }} />
//                             <Typography variant="h4">8</Typography>
//                             <Typography variant="subtitle1">Pending Tasks</Typography>
//                         </Stack>
//                     </Paper>
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                     <Paper
//                         elevation={0}
//                         sx={{
//                             p: 3,
//                             borderRadius: 4,
//                             background: 'linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)',
//                             color: 'white',
//                         }}
//                     >
//                         <Stack spacing={2}>
//                             <WarningIcon sx={{ fontSize: 40 }} />
//                             <Typography variant="h4">3</Typography>
//                             <Typography variant="subtitle1">Leave Requests</Typography>
//                         </Stack>
//                     </Paper>
//                 </Grid>
//             </Grid>

//             {/* Project Status & Team Overview */}
//             <Grid container spacing={3} sx={{ mb: 4 }}>
//                 <Grid item xs={12} md={8}>
//                     <Paper
//                         elevation={0}
//                         sx={{
//                             p: 3,
//                             borderRadius: 4,
//                             height: '100%',
//                             border: '1px solid #eee',
//                         }}
//                     >
//                         <Typography variant="h6" sx={{ mb: 3 }}>Project Status</Typography>
//                         <Stack spacing={3}>
//                             {[
//                                 { name: "E-commerce Platform", progress: 75, team: ["JD", "SK", "ML"] },
//                                 { name: "Mobile App Development", progress: 45, team: ["AK", "RJ", "PL"] },
//                                 { name: "Website Redesign", progress: 90, team: ["TK", "MN", "OP"] }
//                             ].map((project, index) => (
//                                 <Box key={index}>
//                                     <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                                         <Typography variant="subtitle1">{project.name}</Typography>
//                                         <AvatarGroup max={3}>
//                                             {project.team.map((member, idx) => (
//                                                 <Avatar 
//                                                     key={idx} 
//                                                     sx={{ 
//                                                         width: 30, 
//                                                         height: 30,
//                                                         backgroundColor: `hsl(${idx * 40}, 70%, 50%)`
//                                                     }}
//                                                 >
//                                                     {member}
//                                                 </Avatar>
//                                             ))}
//                                         </AvatarGroup>
//                                     </Box>
//                                     <LinearProgress 
//                                         variant="determinate" 
//                                         value={project.progress} 
//                                         sx={{ 
//                                             height: 8, 
//                                             borderRadius: 4,
//                                             backgroundColor: '#e0e0e0',
//                                             '& .MuiLinearProgress-bar': {
//                                                 backgroundColor: 
//                                                     project.progress >= 75 ? '#4caf50' :
//                                                     project.progress >= 45 ? '#ff9800' : '#f44336',
//                                             }
//                                         }}
//                                     />
//                                 </Box>
//                             ))}
//                         </Stack>
//                     </Paper>
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                     <Paper
//                         elevation={0}
//                         sx={{
//                             p: 3,
//                             borderRadius: 4,
//                             height: '100%',
//                             border: '1px solid #eee',
//                         }}
//                     >
//                         <Typography variant="h6" sx={{ mb: 3 }}>Team Overview</Typography>
//                         <Stack spacing={2}>
//                             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                                 <Typography>Present Today</Typography>
//                                 <Chip 
//                                     label="20/24" 
//                                     color="success"
//                                     size="small"
//                                 />
//                             </Box>
//                             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                                 <Typography>On Leave</Typography>
//                                 <Chip 
//                                     label="3" 
//                                     color="warning"
//                                     size="small"
//                                 />
//                             </Box>
//                             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                                 <Typography>Late Today</Typography>
//                                 <Chip 
//                                     label="1" 
//                                     color="error"
//                                     size="small"
//                                 />
//                             </Box>
//                             <CircularProgress 
//                                 variant="determinate" 
//                                 value={83} 
//                                 size={100}
//                                 thickness={5}
//                                 sx={{ alignSelf: 'center', mt: 2 }}
//                             />
//                             <Typography variant="caption" textAlign="center">
//                                 83% Attendance Rate
//                             </Typography>
//                         </Stack>
//                     </Paper>
//                 </Grid>
//             </Grid>

//             {/* Recent Activities */}
//             <Grid container spacing={3}>
//                 <Grid item xs={12} md={6}>
//                     <Paper
//                         elevation={0}
//                         sx={{
//                             p: 3,
//                             borderRadius: 4,
//                             border: '1px solid #eee',
//                         }}
//                     >
//                         <Typography variant="h6" sx={{ mb: 3 }}>Recent Activities</Typography>
//                         <Timeline>
//                             {[
//                                 {
//                                     action: "New Task Created",
//                                     description: "Mobile App UI Design",
//                                     time: "2 hours ago",
//                                     type: "task"
//                                 },
//                                 {
//                                     action: "Leave Request",
//                                     description: "John requested sick leave",
//                                     time: "4 hours ago",
//                                     type: "leave"
//                                 },
//                                 {
//                                     action: "Project Update",
//                                     description: "E-commerce platform 75% completed",
//                                     time: "1 day ago",
//                                     type: "project"
//                                 }
//                             ].map((activity, index) => (
//                                 <TimelineItem key={index}>
//                                     <TimelineSeparator>
//                                         <TimelineDot 
//                                             sx={{ 
//                                                 bgcolor: 
//                                                     activity.type === 'task' ? '#1f1c2c' :
//                                                     activity.type === 'leave' ? '#ff9800' : '#4caf50'
//                                             }}
//                                         />
//                                         {index < 2 && <TimelineConnector />}
//                                     </TimelineSeparator>
//                                     <TimelineContent>
//                                         <Typography variant="subtitle2">{activity.action}</Typography>
//                                         <Typography variant="body2" color="text.secondary">
//                                             {activity.description}
//                                         </Typography>
//                                         <Typography variant="caption" color="text.disabled">
//                                             {activity.time}
//                                         </Typography>
//                                     </TimelineContent>
//                                 </TimelineItem>
//                             ))}
//                         </Timeline>
//                     </Paper>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                     <Paper
//                         elevation={0}
//                         sx={{
//                             p: 3,
//                             borderRadius: 4,
//                             border: '1px solid #eee',
//                         }}
//                     >
//                         <Typography variant="h6" sx={{ mb: 3 }}>Upcoming Deadlines</Typography>
//                         <Stack spacing={2}>
//                             {[
//                                 {
//                                     task: "Client Meeting",
//                                     deadline: "Today, 2:00 PM",
//                                     priority: "High"
//                                 },
//                                 {
//                                     task: "Project Presentation",
//                                     deadline: "Tomorrow, 10:00 AM",
//                                     priority: "Medium"
//                                 },
//                                 {
//                                     task: "Team Review",
//                                     deadline: "23 Apr, 3:00 PM",
//                                     priority: "Low"
//                                 }
//                             ].map((deadline, index) => (
//                                 <Box
//                                     key={index}
//                                     sx={{
//                                         p: 2,
//                                         borderRadius: 2,
//                                         border: '1px solid #eee',
//                                         display: 'flex',
//                                         justifyContent: 'space-between',
//                                         alignItems: 'center'
//                                     }}
//                                 >
//                                     <Box>
//                                         <Typography variant="subtitle2">{deadline.task}</Typography>
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
//                                             <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
//                                             <Typography variant="caption" color="text.secondary">
//                                                 {deadline.deadline}
//                                             </Typography>
//                                         </Box>
//                                     </Box>
//                                     <Chip 
//                                         label={deadline.priority}
//                                         size="small"
//                                         color={
//                                             deadline.priority === "High" ? "error" :
//                                             deadline.priority === "Medium" ? "warning" : "success"
//                                         }
//                                     />
//                                 </Box>
//                             ))}
//                         </Stack>
//                     </Paper>
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// };

// export default Dashboard;


// DashboardOverview.jsx
import React from 'react';
import {
    Box,
    Card,
    Grid,
    Typography,
    Avatar,
    LinearProgress,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    Chip,
    Stack,
    IconButton,
} from '@mui/material';
import ScheduleMeetingDialog from '../HR/schdue';
import { useState } from 'react';

import {
    TrendingUp,
    Assignment,
    People,
    Schedule,
    Add,
    MoreVert,
    CheckCircle,
    Warning,
    Info,
    AccessTime,
    ArrowUpward,
    ArrowDownward,
} from '@mui/icons-material';

const DashboardOverview = () => {
    const [openMeetingDialog, setOpenMeetingDialog] = useState(false);
    // Sample data for recent activities
    const recentActivities = [
        {
            type: 'task',
            title: 'New Task Assigned',
            description: 'Mobile App Development - UI Design',
            time: '2 hours ago',
            status: 'pending',
            icon: <Assignment sx={{ color: '#2196f3' }} />,
        },
        {
            type: 'project',
            title: 'Project Milestone Achieved',
            description: 'E-commerce Platform - Phase 1 Complete',
            time: '4 hours ago',
            status: 'completed',
            icon: <CheckCircle sx={{ color: '#4caf50' }} />,
        },
        {
            type: 'alert',
            title: 'Deadline Approaching',
            description: 'Website Redesign Project Due',
            time: '1 day ago',
            status: 'warning',
            icon: <Warning sx={{ color: '#ff9800' }} />,
        },
    ];

    // Sample data for project progress
    const projectProgress = [
        {
            name: 'E-commerce Platform',
            progress: 75,
            status: 'On Track',
            trend: '+5%',
            color: '#4caf50',
        },
        {
            name: 'Mobile App Development',
            progress: 45,
            status: 'Delayed',
            trend: '-2%',
            color: '#ff9800',
        },
        {
            name: 'CRM System Update',
            progress: 90,
            status: 'Ahead',
            trend: '+8%',
            color: '#2196f3',
        },
    ];

    // Sample data for team performance
    const teamPerformance = {
        overview: {
            totalTasks: 156,
            completedTasks: 127,
            pendingReviews: 8,
            upcomingDeadlines: 5,
        },
        metrics: [
            {
                label: 'Productivity Rate',
                value: '87%',
                trend: '+12%',
                color: '#4caf50',
            },
            {
                label: 'Task Completion',
                value: '92%',
                trend: '+5%',
                color: '#2196f3',
            },
            {
                label: 'Team Collaboration',
                value: '78%',
                trend: '+15%',
                color: '#9c27b0',
            },
        ],
    };

    // Quick actions list
    const quickActions = [
        {
            label: 'Create New Task',
            icon: <Assignment />,
            color: '#2196f3',
            action: () => console.log('Create task clicked')
        },
        {
            label: 'Schedule Meeting',
            icon: <Schedule />,
            color: '#4caf50',
            action: () => setOpenMeetingDialog(true)
        },
        {
            label: 'Add Team Member',
            icon: <People />,
            color: '#ff9800',
            action: () => console.log('Add team member clicked')
        },
    ];
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
                Overview & Analytics
            </Typography>
            <Grid container spacing={3}>
                {/* Recent Activity Card */}
                <Grid item xs={12} md={6}>
                    <Card sx={{
                        p: 3,
                        height: '100%',
                        borderRadius: 2,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6">Recent Activity</Typography>
                            <IconButton size="small">
                                <MoreVert />
                            </IconButton>
                        </Box>
                        <List>
                            {recentActivities.map((activity, index) => (
                                <React.Fragment key={index}>
                                    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: 'background.paper' }}>
                                                {activity.icon}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                    {activity.title}
                                                </Typography>
                                            }
                                            secondary={
                                                <Box>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {activity.description}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                                        <AccessTime sx={{ fontSize: 14, mr: 0.5, color: 'text.disabled' }} />
                                                        <Typography variant="caption" color="text.disabled">
                                                            {activity.time}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            }
                                        />
                                        <Chip
                                            label={activity.status}
                                            size="small"
                                            color={
                                                activity.status === 'completed' ? 'success' :
                                                activity.status === 'warning' ? 'warning' : 'primary'
                                            }
                                            sx={{ ml: 1 }}
                                        />
                                    </ListItem>
                                    {index < recentActivities.length - 1 && <Divider variant="inset" component="li" />}
                                </React.Fragment>
                            ))}
                        </List>
                    </Card>
                </Grid>

                {/* Project Progress Card */}
                <Grid item xs={12} md={6}>
                    <Card sx={{
                        p: 3,
                        height: '100%',
                        borderRadius: 2,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h6">Project Progress</Typography>
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={<Add />}
                                sx={{ borderRadius: 2 }}
                            >
                                New Project
                            </Button>
                        </Box>
                        <Stack spacing={3}>
                            {projectProgress.map((project, index) => (
                                <Box key={index}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="subtitle2">{project.name}</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: project.trend.includes('+') ? 'success.main' : 'error.main',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                {project.trend.includes('+') ? <ArrowUpward sx={{ fontSize: 12 }} /> : <ArrowDownward sx={{ fontSize: 12 }} />}
                                                {project.trend}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={project.progress}
                                        sx={{
                                            height: 8,
                                            borderRadius: 4,
                                            bgcolor: `${project.color}20`,
                                            '& .MuiLinearProgress-bar': {
                                                bgcolor: project.color,
                                            },
                                        }}
                                    />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                                        <Typography variant="caption" color="text.secondary">
                                            Progress
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {project.progress}%
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Stack>
                    </Card>
                </Grid>

                {/* Team Performance Card */}
                <Grid item xs={12} md={8}>
                    <Card sx={{
                        p: 3,
                        borderRadius: 2,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    }}>
                        <Typography variant="h6" sx={{ mb: 3 }}>Team Performance</Typography>
                        <Grid container spacing={2} sx={{ mb: 4 }}>
                            {Object.entries(teamPerformance.overview).map(([key, value], index) => (
                                <Grid item xs={6} sm={3} key={index}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h4" sx={{ mb: 1, color: 'primary.main' }}>
                                            {value}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {key.split(/(?=[A-Z])/).join(' ')}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                        <Divider sx={{ my: 3 }} />
                        <Grid container spacing={2}>
                            {teamPerformance.metrics.map((metric, index) => (
                                <Grid item xs={12} sm={4} key={index}>
                                    <Box sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        bgcolor: `${metric.color}10`,
                                    }}>
                                        <Typography variant="h4" sx={{ color: metric.color, mb: 1 }}>
                                            {metric.value}
                                        </Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="body2" color="text.secondary">
                                                {metric.label}
                                            </Typography>
                                            <Chip
                                                label={metric.trend}
                                                size="small"
                                                sx={{
                                                    bgcolor: `${metric.color}20`,
                                                    color: metric.color,
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Card>
                </Grid>

                {/* Quick Actions Card */}
                <Grid item xs={12} md={4}>
                    <Card sx={{
                        p: 3,
                        borderRadius: 2,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    }}>
                        <Typography variant="h6" sx={{ mb: 3 }}>Quick Actions</Typography>
                        <Stack spacing={2}>
                            {quickActions.map((action, index) => (
                                <Button
                                    key={index}
                                    variant="outlined"
                                    startIcon={action.icon}
                                    sx={{
                                        borderColor: `${action.color}50`,
                                        color: action.color,
                                        '&:hover': {
                                            borderColor: action.color,
                                            bgcolor: `${action.color}10`,
                                        },
                                        justifyContent: 'flex-start',
                                        px: 2,
                                        py: 1.5,
                                    }}
                                >
                                    {action.label}
                                </Button>
                            ))}
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
            <ScheduleMeetingDialog 
                open={openMeetingDialog}
                onClose={() => setOpenMeetingDialog(false)}
            />
        </Box>
    );
};

export default DashboardOverview;