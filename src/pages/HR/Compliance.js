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
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  Alert,
  LinearProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Gavel,
  Description,
  Notifications,
  Assignment,
  CheckCircle,
  Warning,
  Error,
  FilePresent,
  CalendarToday,
  Search,
  Download,
  Refresh,
  MoreVert,
  Timeline,
  Info  
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';


const complianceStats = [
  { month: 'Jan', compliant: 95, nonCompliant: 5 },
  { month: 'Feb', compliant: 97, nonCompliant: 3 },
  { month: 'Mar', compliant: 94, nonCompliant: 6 },
  { month: 'Apr', compliant: 98, nonCompliant: 2 },
  { month: 'May', compliant: 96, nonCompliant: 4 },
  { month: 'Jun', compliant: 99, nonCompliant: 1 },
];

const upcomingDeadlines = [
  {
    title: 'Annual Policy Review',
    dueDate: '2024-04-15',
    status: 'Pending',
    priority: 'High',
  },
  {
    title: 'Safety Training Renewal',
    dueDate: '2024-04-30',
    status: 'In Progress',
    priority: 'Medium',
  },
  {
    title: 'Regulatory Filing',
    dueDate: '2024-05-01',
    status: 'Not Started',
    priority: 'High',
  },
];

const recentDocuments = [
  {
    name: 'Employee Handbook v2.1',
    type: 'Policy',
    lastUpdated: '2024-03-01',
    status: 'Active',
  },
  {
    name: 'Safety Guidelines 2024',
    type: 'Procedure',
    lastUpdated: '2024-02-15',
    status: 'Under Review',
  },
  {
    name: 'Code of Conduct',
    type: 'Policy',
    lastUpdated: '2024-01-20',
    status: 'Active',
  },
];

const complianceAlerts = [
  {
    type: 'Warning',
    message: 'Safety training certificates expiring in 30 days',
    date: '2024-03-15',
  },
  {
    type: 'Error',
    message: 'Mandatory compliance training overdue for 5 employees',
    date: '2024-03-14',
  },
  {
    type: 'Info',
    message: 'New regulatory requirement effective from next quarter',
    date: '2024-03-13',
  },
];

const Compliance = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const ComplianceChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={complianceStats}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="compliant" fill="#4caf50" name="Compliant" />
        <Bar dataKey="nonCompliant" fill="#f44336" name="Non-Compliant" />
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">
          Compliance Tracking
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FilePresent />}
        >
          Generate Report
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
        <Tab icon={<Assignment />} label="Requirements" />
        <Tab icon={<Description />} label="Documents" />
        <Tab icon={<Notifications />} label="Alerts" />
      </Tabs>

      {currentTab === 0 && (
        <Grid container spacing={3}>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">Overall Compliance</Typography>
                  <CheckCircle color="success" />
                </Box>
                <Typography variant="h4" color="success.main" mt={2}>
                  98%
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Last updated: Today
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">Pending Tasks</Typography>
                  <Warning color="warning" />
                </Box>
                <Typography variant="h4" color="warning.main" mt={2}>
                  5
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Require attention
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">Document Status</Typography>
                  <FilePresent color="primary" />
                </Box>
                <Typography variant="h4" color="primary.main" mt={2}>
                  45/46
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Documents up to date
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Compliance Trend
              </Typography>
              <ComplianceChart />
            </Paper>
          </Grid>

         
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Upcoming Deadlines
              </Typography>
              <List>
                {upcomingDeadlines.map((deadline) => (
                  <ListItem key={deadline.title}>
                    <ListItemText
                      primary={deadline.title}
                      secondary={`Due: ${deadline.dueDate}`}
                    />
                    <Chip
                      label={deadline.priority}
                      color={deadline.priority === 'High' ? 'error' : 'warning'}
                      size="small"
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
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Compliance Requirements
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Requirement</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Priority</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {upcomingDeadlines.map((deadline) => (
                      <TableRow key={deadline.title}>
                        <TableCell>{deadline.title}</TableCell>
                        <TableCell>{deadline.dueDate}</TableCell>
                        <TableCell>
                          <Chip
                            label={deadline.status}
                            color={
                              deadline.status === 'Completed'
                                ? 'success'
                                : deadline.status === 'In Progress'
                                ? 'warning'
                                : 'error'
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={deadline.priority}
                            color={deadline.priority === 'High' ? 'error' : 'warning'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton size="small">
                            <MoreVert />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      {currentTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Document Repository
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Document Name</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Last Updated</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentDocuments.map((doc) => (
                      <TableRow key={doc.name}>
                        <TableCell>{doc.name}</TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>{doc.lastUpdated}</TableCell>
                        <TableCell>
                          <Chip
                            label={doc.status}
                            color={doc.status === 'Active' ? 'success' : 'warning'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton size="small">
                            <Download />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      {currentTab === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Compliance Alerts
              </Typography>
              <List>
                {complianceAlerts.map((alert, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        {alert.type === 'Warning' ? (
                          <Warning color="warning" />
                        ) : alert.type === 'Error' ? (
                          <Error color="error" />
                        ) : (
                          <Info color="info" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={alert.message}
                        secondary={`Reported on: ${alert.date}`}
                      />
                      <Button size="small" variant="outlined">
                        Take Action
                      </Button>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Compliance;