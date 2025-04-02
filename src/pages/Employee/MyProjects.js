import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  LinearProgress,
  Card,
  CardContent,
  Avatar,
  Chip,
  Switch,
  FormControlLabel,
  Tab,
  Tabs,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';


import {
  CheckCircle as CheckCircleIcon,
  HourglassEmpty as HourglassEmptyIcon,
  Refresh as RefreshIcon,
  Code as CodeIcon,
  BugReport as BugReportIcon,
  Task as TaskIcon,
  Star as StarIcon,
  Assessment as AssessmentIcon,
  Analytics, Event, TrendingUp,
  Dashboard
} from '@mui/icons-material';
import { } from '@mui/material';
import { Commit, Task, BugReport } from '@mui/icons-material'; // Import icons
import { Assignment, CheckCircle, AccessTime, Block } from '@mui/icons-material';

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';

import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Bold } from 'lucide-react';

const styles = {
  headerPaper: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
  },
  metricCard: {
    background: 'white',
    borderRadius: '10px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },
  techChip: {
    margin: '4px',
    background: '#e3f2fd',
    color: '#1976d2',
  },
  taskCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  }
};


const myData = {
  name: 'John Dev',
  projects: [
    { name: 'E-Commerce', role: 'Frontend Developer' },
    { name: 'CRM System', role: 'Full Stack Developer' },
    { name: 'Mobile App', role: 'React Native Developer' }
  ],
  commits: 156,
  tasks: 45,
  bugsFixed: 23,
  efficiency: 85,
  technologies: ['React', 'JavaScript', 'Node.js', 'React Native']
};


const projectsData = [
  {
    id: 1,
    name: "E-Commerce Platform",
    startDate: "01-01-2024",
    endDate: "30-06-2024",
    type: "Web Application",
    priority: "High",
    role: "Frontend Developer",
    phases: {
      planning: true,
      design: true,
      development: true,
      testing: false,
      deployment: false
    },
    techStack: ["React", "Node.js", "MongoDB", "AWS"],
    myTasks: {
      assigned: 15,
      completed: 9,
      inProgress: 4,
      blocked: 2
    }
  },
  {
    id: 2,
    name: "Mobile Banking App",
    startDate: "15-01-2024",
    endDate: "31-12-2024",
    type: "Mobile Application",
    priority: "Critical",
    role: "React Native Developer",
    phases: {
      planning: true,
      design: true,
      development: false,
      testing: false,
      deployment: false
    },
    techStack: ["React Native", "Firebase", "Node.js", "MongoDB"],
    myTasks: {
      assigned: 12,
      completed: 5,
      inProgress: 5,
      blocked: 2
    }
  }
];


const enhancedMyData = {
  ...myData,
  codeQuality: {
    score: 92,
    trend: [88, 90, 89, 91, 92],
    lastUpdate: '2024-03-15'
  },
  weeklyActivity: [
    { day: 'Mon', commits: 12, tasks: 3 },
    { day: 'Tue', commits: 8, tasks: 4 },
    { day: 'Wed', commits: 15, tasks: 5 },
    { day: 'Thu', commits: 10, tasks: 2 },
    { day: 'Fri', commits: 9, tasks: 3 }
  ],
  recentTasks: [
    {
      id: 1,
      title: 'Implement User Authentication',
      status: 'completed',
      date: '2024-03-14'
    },
    {
      id: 2,
      title: 'Design Dashboard Layout',
      status: 'in-progress',
      date: '2024-03-15'
    },
    {
      id: 3,
      title: 'API Integration',
      status: 'upcoming',
      date: '2024-03-16'
    }
  ]
};


const enhancedProjectsData = projectsData.map(project => ({
  ...project,
  timeline: [
    {
      date: '2024-03-01',
      title: 'Sprint Planning',
      status: 'completed'
    },
    {
      date: '2024-03-15',
      title: 'Feature Development',
      status: 'in-progress'
    },
    {
      date: '2024-03-30',
      title: 'Testing Phase',
      status: 'upcoming'
    }
  ]
}));


const enhancedStyles = {
  ...styles,
  timelineCard: {
    p: 2,
    mb: 2,
    // borderLeft: '4px solid #1976d2',
    background: 'linear-gradient(135deg, #b2ebf2, #d1f8d6)', // Even lighter shades of teal and green
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Light shadow for depth
    '&:hover': {
      transform: 'translateX(5px)',
      transition: 'transform 0.2s, box-shadow 0.2s', // Transition for transform and shadow on hover
      boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)', // Deeper shadow on hover
    },
    borderRadius: '8px', // Rounded corners for a smoother look
  },
  activityChart: {
    mt: 2,
    p: 2,
    borderRadius: 2,
    bgcolor: 'background.paper',
  },
};







class MyProjects extends React.Component {
  state = {
    selectedProject: enhancedProjectsData[0],
    projects: enhancedProjectsData,
    isLoading: false,
    selectedTab: 0,
    showTaskDialog: false,
    selectedTask: null
  };

  handleProjectChange = (event) => {
    const selected = this.state.projects.find(p => p.id === event.target.value);
    this.setState({ selectedProject: selected, isLoading: true });
    setTimeout(() => this.setState({ isLoading: false }), 500);
  };

  handleRefresh = () => {
    this.setState({ isLoading: true });
    setTimeout(() => this.setState({ isLoading: false }), 1000);
  };

  handleTabChange = (event, newValue) => {
    this.setState({ selectedTab: newValue });
  };

  handleTaskClick = (task) => {
    this.setState({ showTaskDialog: true, selectedTask: task });
  };

  renderWeeklyActivityChart = () => (
    <Card sx={enhancedStyles.activityChart}>
      <Typography variant="h6" sx={{ mb: 2 }}>Weekly Activity</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={enhancedMyData.weeklyActivity}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <RechartsTooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="commits"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="tasks"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );

  renderCodeQualityMetrics = () => (
    <Card sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Code Quality Metrics</Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" color="primary">
              {enhancedMyData.codeQuality.score}%
            </Typography>
            <Typography color="textSecondary">Overall Quality Score</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={enhancedMyData.codeQuality.trend}>
              <Line
                type="monotone"
                dataKey={(v) => v}
                stroke="#1976d2"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ display: 'block', textAlign: 'center' }}
          >
            Quality Trend
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );

  renderTaskTimeline = () => (
    <Card sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Project Timeline</Typography>
      <Timeline>
        {this.state.selectedProject.timeline.map((item, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent color="textSecondary">
              {item.date}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                color={
                  item.status === 'completed' ? 'success' :
                    item.status === 'in-progress' ? 'primary' : 'grey'
                }
              />
              {index < this.state.selectedProject.timeline.length - 1 && (
                <TimelineConnector />
              )}
            </TimelineSeparator>
            <TimelineContent>
              <Paper 
                sx={enhancedStyles.timelineCard}
                
                >
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="caption" color="textSecondary">
                  Status: {item.status}
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Card>
  );

  renderTaskDialog = () => (
    <Dialog
      open={this.state.showTaskDialog}
      onClose={() => this.setState({ showTaskDialog: false })}
    >
      <DialogTitle>Task Details</DialogTitle>
      <DialogContent>
        {this.state.selectedTask && (
          <Box sx={{ minWidth: 400 }}>
            <TextField
              fullWidth
              label="Title"
              value={this.state.selectedTask.title}
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <TextField
              fullWidth
              label="Status"
              value={this.state.selectedTask.status}
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <TextField
              fullWidth
              label="Date"
              value={this.state.selectedTask.date}
              margin="normal"
              InputProps={{ readOnly: true }}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => this.setState({ showTaskDialog: false })}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );

  render() {
    const { selectedProject, projects, isLoading, selectedTab } = this.state;
    const taskData = [
      { name: 'Completed', value: selectedProject.myTasks.completed, color: '#4CAF50' },
      { name: 'In Progress', value: selectedProject.myTasks.inProgress, color: '#2196F3' },
      { name: 'Blocked', value: selectedProject.myTasks.blocked, color: '#F44336' }
    ];




    return (
      <Box sx={{ p: 3, background: '#f5f5f5', minHeight: '100vh' }}>

        <Paper
          sx={{
            background: "linear-gradient(135deg, #667eea, #764ba2)",  // Gradient Background
            borderRadius: "12px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            padding: 2,
            display: "flex",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Grid container spacing={2} alignItems="center">
            {/* Project Selector */}
            <Grid item xs={5}>
              <Select
                fullWidth
                value={selectedProject.id}
                onChange={this.handleProjectChange}
                sx={{
                  bgcolor: "white",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  color: "#333",
                  padding: "10px",
                  boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)",
                  transition: "0.3s",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" }, // Removes default border
                  "&:hover": { transform: "scale(1.03)" },
                  "& .MuiSelect-select": { py: 1.2 }, // Adjusts padding inside
                }}
              >
                {projects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {/* Loading Bar (Only Shows When isLoading is True) */}
            <Grid item xs={5}>
              {isLoading && (
                <LinearProgress
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.3)",
                    borderRadius: "8px",
                    height: "6px",
                  }}
                />
              )}
            </Grid>

            {/* Refresh Button with Hover Effect */}
            <Grid item xs={2} sx={{ textAlign: "right" }}>
              <Tooltip title="Refresh Data">
                <IconButton
                  onClick={this.handleRefresh}
                  sx={{
                    color: "white",
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "10px",
                    transition: "0.3s",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.4)",
                      transform: "scale(1.15)",
                    },
                  }}
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Paper>



        <Paper sx={{ mb: 3, bgcolor: 'transparent', boxShadow: 'none', borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={selectedTab}
            onChange={this.handleTabChange}
            textColor="#FFFFFF"
            indicatorColor="#5a5bf9"
          >
            {[
              { label: "Overview", icon: <Dashboard /> },
              { label: "Timeline", icon: <Event /> },
              { label: "Metrics", icon: <TrendingUp /> }
            ].map((tab, index) => (
              <Tab
                key={tab.label}
                label={
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {tab.icon}
                    {tab.label}
                  </div>
                }
                sx={{
                  p: 2,
                  bgcolor: selectedTab === index ? "#6b6cf9" : "transparent", // Active tab background
                  color: selectedTab === index ? "#FFFFFF" : "black", // Text color
                  borderTopLeftRadius: selectedTab === index ? "8px" : "0",
                  borderTopRightRadius: selectedTab === index ? "8px" : "0",
                  border: selectedTab === index ? "1px solid #5a5bf9" : "none", // Active tab border
                  borderBottom: selectedTab === index ? "none" : "1px solid transparent",
                  transition: "all 0.3s ease",
                  fontWeight: '600'
                }}
              />
            ))}
          </Tabs>
        </Paper>





        {selectedTab === 0 && (
          <>



            <Card sx={{ ...styles.metricCard, mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: '#1976d2', mr: 2, width: 56, height: 56 }}>
                    {myData.name[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="h5">{myData.name}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {selectedProject.role} - {selectedProject.name}
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={3} sx={{ mb: 3 }}>
                  <Grid item xs={4}>
                    <Paper sx={{
                      p: 2,
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #fce4ec, #fff)',  // Lighter Baby Pink Gradient
                      borderRadius: 2
                    }}>
                      <Commit sx={{ fontSize: 30, color: '#1976d2', mb: 1 }} /> {/* Commit Icon */}
                      <Typography variant="h4">{myData.commits}</Typography>
                      <Typography variant="body2" color="textSecondary">Total Commits</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper sx={{
                      p: 2,
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #dcedc8, #fff)',  // Lighter Green Gradient
                      borderRadius: 2
                    }}>
                      <Task sx={{ fontSize: 30, color: '#388e3c', mb: 1 }} /> {/* Task Icon */}
                      <Typography variant="h4">{myData.tasks}</Typography>
                      <Typography variant="body2" color="textSecondary">Tasks Completed</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper sx={{
                      p: 2,
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #e1f5fe, #fff)',  // Lighter Blue Gradient
                      borderRadius: 2
                    }}>
                      <BugReport sx={{ fontSize: 30, color: '#d32f2f', mb: 1 }} /> {/* Bug Icon */}
                      <Typography variant="h4">{myData.bugsFixed}</Typography>
                      <Typography variant="body2" color="textSecondary">Bugs Fixed</Typography>
                    </Paper>
                  </Grid>
                </Grid>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    Performance Efficiency
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={myData.efficiency}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      bgcolor: '#e3f2fd', // Background color
                      '& .MuiLinearProgress-bar': {
                        bgcolor: '#81c784' // Light green color
                      }
                    }}
                  />
                  <Typography variant="body2" sx={{ mt: 0.5, textAlign: 'right' }}>
                    {myData.efficiency}%
                  </Typography>
                </Box>


                <Box>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    Tech Stack
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {myData.technologies.map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        sx={{
                          bgcolor: '#fff9c4',  // Light yellow background
                          color: '#fbc02d',     // Dark yellow/golden text
                          fontWeight: 'bold',
                          borderRadius: 16,
                          '&:hover': {
                            bgcolor: '#a5d6a7',  // Slightly darker green on hover
                            color: '#1b5e20',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Paper sx={{ mb: 3, p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>Current Project Tasks</Typography>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Card sx={{ ...styles.taskCard, bgcolor: '#e3f2fd' }}>
                    <Assignment sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h4" color="primary">
                      {selectedProject.myTasks.assigned}
                    </Typography>
                    <Typography color="textSecondary">Total Assigned</Typography>
                  </Card>
                </Grid>
                <Grid item xs={3}>
                  <Card sx={{ ...styles.taskCard, bgcolor: '#e8f5e9' }}>
                    <CheckCircle sx={{ fontSize: 40, color: 'success.main', mb: 2 }} />
                    <Typography variant="h4" color="success.main">
                      {selectedProject.myTasks.completed}
                    </Typography>
                    <Typography color="textSecondary">Completed</Typography>
                  </Card>
                </Grid>
                <Grid item xs={3}>
                  <Card sx={{ ...styles.taskCard, bgcolor: '#fff3e0' }}>
                    <AccessTime sx={{ fontSize: 40, color: 'warning.main', mb: 2 }} />
                    <Typography variant="h4" color="warning.main">
                      {selectedProject.myTasks.inProgress}
                    </Typography>
                    <Typography color="textSecondary">In Progress</Typography>
                  </Card>
                </Grid>
                <Grid item xs={3}>
                  <Card sx={{ ...styles.taskCard, bgcolor: '#ffebee' }}>
                    <Block sx={{ fontSize: 40, color: 'error.main', mb: 2 }} />
                    <Typography variant="h4" color="error.main">
                      {selectedProject.myTasks.blocked}
                    </Typography>
                    <Typography color="textSecondary">Blocked</Typography>
                  </Card>
                </Grid>
              </Grid>
            </Paper>


            {this.renderWeeklyActivityChart()}
          </>
        )}

        {selectedTab === 1 && (
          <>

            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Project Timeline</Typography>
              <Timeline>
                {selectedProject.timeline.map((item, index) => (
                  <TimelineItem key={index}>
                    <TimelineOppositeContent color="textSecondary">
                      {item.date}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot
                        color={
                          item.status === 'completed' ? 'success' :
                            item.status === 'in-progress' ? 'primary' : 'grey'
                        }
                      />
                      {index < selectedProject.timeline.length - 1 && (
                        <TimelineConnector />
                      )}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Paper sx={enhancedStyles.timelineCard}>
                        <Typography variant="h6">{item.title}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          Status: {item.status}
                        </Typography>
                      </Paper>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Card>


            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Recent Tasks</Typography>
              <Grid container spacing={2}>
                {enhancedMyData.recentTasks.map((task) => (
                  <Grid item xs={12} key={task.id}>
                    <Paper
                      sx={enhancedStyles.timelineCard}
                      onClick={() => this.handleTaskClick(task)}
                    >
                      <Typography variant="subtitle1">{task.title}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {task.date} - {task.status}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </>
        )}

        {selectedTab === 2 && (
          <>

            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Code Quality Metrics</Typography>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="primary">
                      {enhancedMyData.codeQuality.score}%
                    </Typography>
                    <Typography color="textSecondary">Overall Quality Score</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <ResponsiveContainer width="100%" height={100}>
                    <LineChart data={enhancedMyData.codeQuality.trend}>
                      <Line
                        type="monotone"
                        dataKey={(v) => v}
                        stroke="#1976d2"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{ display: 'block', textAlign: 'center' }}
                  >
                    Quality Trend
                  </Typography>
                </Grid>
              </Grid>
            </Card>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Task Distribution</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={taskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {taskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </>
        )}
        {this.renderTaskDialog()}
      </Box>
    );
  }
}
export default MyProjects;