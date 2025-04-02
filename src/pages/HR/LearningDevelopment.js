import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
  LinearProgress,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Paper,
  Divider,
} from '@mui/material';
import {
  School,
  Assignment,
  Timeline,
  Star,
  PlayCircle,
  Download,
  BookmarkBorder,
  Share,
  MenuBook,
  WorkspacePremium,
  TrendingUp,
  Person,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';


const skillGapsData = [
  { skill: 'Leadership', current: 65, required: 85 },
  { skill: 'Technical', current: 80, required: 90 },
  { skill: 'Communication', current: 75, required: 80 },
  { skill: 'Project Management', current: 70, required: 85 },
  { skill: 'Problem Solving', current: 85, required: 90 },
];

const courseProgress = [
  { name: 'Project Management', progress: 75, total: 10, completed: 7 },
  { name: 'Leadership Skills', progress: 60, total: 8, completed: 5 },
  { name: 'Technical Skills', progress: 90, total: 12, completed: 11 },
  { name: 'Soft Skills', progress: 40, total: 6, completed: 2 },
];

const certifications = [
  {
    name: 'Project Management Professional (PMP)',
    issuer: 'PMI',
    date: '2023',
    status: 'Active',
  },
  {
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon',
    date: '2023',
    status: 'In Progress',
  },
  {
    name: 'Scrum Master Certification',
    issuer: 'Scrum Alliance',
    date: '2022',
    status: 'Active',
  },
];

const recommendedCourses = [
  {
    title: 'Advanced Leadership Skills',
    duration: '4 weeks',
    level: 'Advanced',
    rating: 4.8,
  },
  {
    title: 'Digital Transformation',
    duration: '6 weeks',
    level: 'Intermediate',
    rating: 4.6,
  },
  {
    title: 'Data Analytics Fundamentals',
    duration: '8 weeks',
    level: 'Beginner',
    rating: 4.9,
  },
];

const LearningDevelopment = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const SkillGapsChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={skillGapsData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="skill" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="current" fill="#82ca9d" name="Current Level" />
        <Bar dataKey="required" fill="#8884d8" name="Required Level" />
      </BarChart>
    </ResponsiveContainer>
  );

  const ProgressCard = ({ title, progress, total, completed }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{title}</Typography>
          <Chip
            label={`${completed}/${total} Modules`}
            color="primary"
            size="small"
          />
        </Box>
        <Box mt={2}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ height: 10, borderRadius: 5 }}
          />
          <Typography variant="body2" color="textSecondary" mt={1}>
            {progress}% Complete
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">
          Learning and Development
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<School />}
        >
          Start New Course
        </Button>
      </Box>

      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        <Tab icon={<Timeline />} label="Dashboard" />
        <Tab icon={<MenuBook />} label="Courses" />
        <Tab icon={<WorkspacePremium />} label="Certifications" />
        <Tab icon={<TrendingUp />} label="Skill Gaps" />
      </Tabs>

      {currentTab === 0 && (
        <Grid container spacing={3}>
         
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Learning Progress
                </Typography>
                <Box display="flex" alignItems="center">
                  <Typography variant="h3" color="primary">
                    75%
                  </Typography>
                  <TrendingUp color="success" sx={{ ml: 1 }} />
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Overall completion rate
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Active Courses
                </Typography>
                <Typography variant="h3" color="primary">
                  4
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Courses in progress
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Certifications
                </Typography>
                <Typography variant="h3" color="primary">
                  3
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Active certifications
                </Typography>
              </CardContent>
            </Card>
          </Grid>

         
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Current Progress
              </Typography>
              {courseProgress.map((course) => (
                <ProgressCard key={course.name} {...course} />
              ))}
            </Paper>
          </Grid>

         
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Recommended for You
              </Typography>
              <List>
                {recommendedCourses.map((course) => (
                  <ListItem
                    key={course.title}
                    secondaryAction={
                      <IconButton edge="end">
                        <PlayCircle />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <School />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={course.title}
                      secondary={`${course.duration} • ${course.level}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      )}

      {currentTab === 1 && (
        <Grid container spacing={3}>
          
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Active Courses
            </Typography>
            {courseProgress.map((course) => (
              <Card key={course.name} sx={{ mb: 2 }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6">{course.name}</Typography>
                      <Typography color="textSecondary">
                        {course.completed} of {course.total} modules completed
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <LinearProgress
                        variant="determinate"
                        value={course.progress}
                        sx={{ height: 10, borderRadius: 5 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Button
                        variant="contained"
                        startIcon={<PlayCircle />}
                        fullWidth
                      >
                        Continue
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      )}

      {currentTab === 2 && (
        <Grid container spacing={3}>
          
          {certifications.map((cert) => (
            <Grid item xs={12} md={4} key={cert.name}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between">
                    <WorkspacePremium color="primary" fontSize="large" />
                    <Chip
                      label={cert.status}
                      color={cert.status === 'Active' ? 'success' : 'warning'}
                    />
                  </Box>
                  <Typography variant="h6" mt={2}>
                    {cert.name}
                  </Typography>
                  <Typography color="textSecondary">
                    Issued by {cert.issuer}
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Issued: {cert.date}
                  </Typography>
                  <Box mt={2} display="flex" gap={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Download />}
                    >
                      Download
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Share />}
                    >
                      Share
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {currentTab === 3 && (
        <Grid container spacing={3}>
          
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Skill Gaps Analysis
              </Typography>
              <SkillGapsChart />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Recommended Training
              </Typography>
              <List>
                {skillGapsData.map((skill) => (
                  <ListItem key={skill.skill}>
                    <ListItemText
                      primary={skill.skill}
                      secondary={`Gap: ${skill.required - skill.current}%`}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<BookmarkBorder />}
                    >
                      Train
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default LearningDevelopment;