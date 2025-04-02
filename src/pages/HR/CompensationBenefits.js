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
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from '@mui/material';
import {
  AccountBalance,
  HealthAndSafety,
  Payments,
  Timeline,
  AttachMoney,
  LocalHospital,
  CardGiftcard,
  BusinessCenter,
  TrendingUp,
  Download,
  CalendarToday,
  Star,
  MoreVert,
  PieChart,
  Receipt,
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
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts';


const compensationHistory = [
  { month: 'Jan', base: 5000, bonus: 500, equity: 1000 },
  { month: 'Feb', base: 5000, bonus: 0, equity: 1000 },
  { month: 'Mar', base: 5000, bonus: 750, equity: 1000 },
  { month: 'Apr', base: 5200, bonus: 0, equity: 1000 },
  { month: 'May', base: 5200, bonus: 600, equity: 1000 },
  { month: 'Jun', base: 5200, bonus: 0, equity: 1200 },
];

const benefitsDistribution = [
  { name: 'Healthcare', value: 35, color: '#0088FE' },
  { name: 'Retirement', value: 25, color: '#00C49F' },
  { name: 'Insurance', value: 20, color: '#FFBB28' },
  { name: 'Other Benefits', value: 20, color: '#FF8042' },
];

const upcomingPayments = [
  {
    type: 'Salary',
    amount: 5200,
    date: '2024-03-25',
    status: 'Scheduled',
  },
  {
    type: 'Bonus',
    amount: 1000,
    date: '2024-03-31',
    status: 'Pending',
  },
  {
    type: 'Stock Vesting',
    amount: 2500,
    date: '2024-04-01',
    status: 'Scheduled',
  },
];

const benefits = [
  {
    category: 'Healthcare',
    items: [
      'Medical Insurance - Premium Plan',
      'Dental Coverage',
      'Vision Care',
      'Mental Health Support',
    ],
  },
  {
    category: 'Financial',
    items: [
      '401(k) with 6% match',
      'Stock Options',
      'Life Insurance',
      'Disability Insurance',
    ],
  },
  {
    category: 'Lifestyle',
    items: [
      'Gym Membership',
      'Professional Development',
      'Remote Work Stipend',
      'Transit Benefits',
    ],
  },
];

const CompensationBenefits = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const CompensationChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={compensationHistory}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="base" fill="#8884d8" name="Base Salary" />
        <Bar dataKey="bonus" fill="#82ca9d" name="Bonus" />
        <Bar dataKey="equity" fill="#ffc658" name="Equity" />
      </BarChart>
    </ResponsiveContainer>
  );

  const BenefitsPieChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={benefitsDistribution}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {benefitsDistribution.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">
          Compensation and Benefits
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Download />}
        >
          Download Statement
        </Button>
      </Box>

      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        <Tab icon={<Timeline />} label="Overview" />
        <Tab icon={<Payments />} label="Compensation" />
        <Tab icon={<HealthAndSafety />} label="Benefits" />
        <Tab icon={<Receipt />} label="Statements" />
      </Tabs>

      {currentTab === 0 && (
        <Grid container spacing={3}>
         
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">Total Compensation</Typography>
                  <AttachMoney color="primary" />
                </Box>
                <Typography variant="h4" color="primary" mt={2}>
                  $75,400
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Annual package including benefits
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">Next Payday</Typography>
                  <CalendarToday color="primary" />
                </Box>
                <Typography variant="h4" color="primary" mt={2}>
                  Mar 25
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  5 days remaining
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">Benefits Utilized</Typography>
                  <HealthAndSafety color="primary" />
                </Box>
                <Typography variant="h4" color="primary" mt={2}>
                  78%
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Of available benefits claimed
                </Typography>
              </CardContent>
            </Card>
          </Grid>

         
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Compensation Breakdown
              </Typography>
              <CompensationChart />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Benefits Distribution
              </Typography>
              <BenefitsPieChart />
            </Paper>
          </Grid>
        </Grid>
      )}

      {currentTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Upcoming Payments
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {upcomingPayments.map((payment) => (
                      <TableRow key={payment.type}>
                        <TableCell>{payment.type}</TableCell>
                        <TableCell>${payment.amount}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>
                          <Chip
                            label={payment.status}
                            color={payment.status === 'Scheduled' ? 'success' : 'warning'}
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
          {benefits.map((category) => (
            <Grid item xs={12} md={4} key={category.category}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {category.category}
                  </Typography>
                  <List>
                    {category.items.map((item) => (
                      <ListItem key={item}>
                        <ListItemIcon>
                          <Star color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {currentTab === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Pay Statements
              </Typography>
              <List>
                {['January', 'February', 'March'].map((month) => (
                  <React.Fragment key={month}>
                    <ListItem
                      secondaryAction={
                        <Button
                          variant="outlined"
                          startIcon={<Download />}
                          size="small"
                        >
                          Download
                        </Button>
                      }
                    >
                      <ListItemIcon>
                        <Receipt />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${month} 2024 Pay Statement`}
                        secondary="Includes base salary, bonus, and deductions"
                      />
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

export default CompensationBenefits;