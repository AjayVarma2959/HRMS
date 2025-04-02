import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  Tooltip,
  Badge,
  Avatar,
  Chip,
  Select,
  FormControl,
  InputLabel,
  LinearProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  EventNote as EventNoteIcon,
  Add as AddIcon,
  Work as WorkIcon,
  DateRange as DateRangeIcon,
  Description as DescriptionIcon,
  Timeline as TimelineIcon,
  SupervisorAccount as SupervisorIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ChartTooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Styled Components
const StyledCard = styled(Card)(({ theme, type }) => ({
  height: '100%',
  backgroundColor: type === 'requests' ? '#E3F2FD' : '#FFF3E0',
  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
  },
  cursor: 'pointer',
  borderRadius: '16px',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  '& .MuiTableCell-head': {
    backgroundColor: '#1976d2',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1rem',
    padding: '16px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f8f9fa',
  },
  '&:hover': {
    backgroundColor: '#f5f5f5',
    transition: 'background-color 0.2s ease',
  },
}));

const StatusChip = styled(Chip)(({ status }) => ({
  backgroundColor: status === 'Pending' ? '#fff3e0' : status === 'Approved' ? '#e8f5e9' : '#ffebee',
  color: status === 'Pending' ? '#f57c00' : status === 'Approved' ? '#2e7d32' : '#c62828',
  fontWeight: 'bold',
}));

// Initial Data
const managers = [
  { id: 1, name: 'Michael Scott', department: 'Sales' },
  { id: 2, name: 'David Wallace', department: 'Executive' },
  { id: 3, name: 'Jan Levinson', department: 'Operations' },
];

const initialLeaveRequests = [
  {
    id: 'EMP001',
    name: 'John Doe',
    avatar: 'JD',
    workingIn: 'Project Alpha',
    leaveType: 'Casual Leave',
    reason: 'Family vacation',
    status: 'Pending',
    duration: '3',
    statistics: {
      casual: { total: 12, used: 5, remaining: 7 },
      sick: { total: 10, used: 3, remaining: 7 },
      vacation: { total: 15, used: 8, remaining: 7 }
    }
  },
  {
    id: 'EMP002',
    name: 'Jane Smith',
    avatar: 'JS',
    workingIn: 'Project Beta',
    leaveType: 'Sick Leave',
    reason: 'Medical appointment',
    status: 'Pending',
    duration: '1',
    statistics: {
      casual: { total: 12, used: 2, remaining: 10 },
      sick: { total: 10, used: 1, remaining: 9 },
      vacation: { total: 15, used: 5, remaining: 10 }
    }
  },
];

const EmployeeLeaves = () => {
  // States
  const [openApplyLeave, setOpenApplyLeave] = useState(false);
  const [showLeaveRequests, setShowLeaveRequests] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [leaveFormData, setLeaveFormData] = useState({
    startDate: '',
    endDate: '',
    leaveType: '',
    reason: '',
    manager: '',
  });

  // Handlers
  const handleEmployeeSelect = (employee) => {
    const updatedEmployee = {
      ...employee,
      statistics: {
        casual: { ...employee.statistics.casual },
        sick: { ...employee.statistics.sick },
        vacation: { ...employee.statistics.vacation }
      }
    };
    setSelectedEmployee(updatedEmployee);
    setShowStatistics(true);
  };

  const handleLeaveApproval = (employeeId, action) => {
    setLeaveRequests(prevRequests =>
      prevRequests.map(request => {
        if (request.id === employeeId) {
          const updatedStatistics = { ...request.statistics };
          if (action === 'approve') {
            const leaveType = request.leaveType.toLowerCase().split(' ')[0];
            const durationDays = parseInt(request.duration);
            if (updatedStatistics[leaveType]) {
              updatedStatistics[leaveType].used += durationDays;
              updatedStatistics[leaveType].remaining = 
                updatedStatistics[leaveType].total - updatedStatistics[leaveType].used;
            }
          }

          // Update selected employee if currently viewing their statistics
          if (selectedEmployee && selectedEmployee.id === employeeId) {
            setSelectedEmployee({
              ...request,
              status: action === 'approve' ? 'Approved' : 'Rejected',
              statistics: updatedStatistics
            });
          }

          return {
            ...request,
            status: action === 'approve' ? 'Approved' : 'Rejected',
            statistics: updatedStatistics
          };
        }
        return request;
      })
    );

    setSnackbar({
      open: true,
      message: `Leave ${action === 'approve' ? 'approved' : 'rejected'} successfully`,
      severity: action === 'approve' ? 'success' : 'error'
    });
  };

  const handleSubmitLeave = () => {
    // Validate form data
    if (!leaveFormData.startDate || !leaveFormData.endDate || 
        !leaveFormData.leaveType || !leaveFormData.reason || 
        !leaveFormData.manager) {
      setSnackbar({
        open: true,
        message: 'Please fill all required fields',
        severity: 'error'
      });
      return;
    }

    // Calculate duration
    const start = new Date(leaveFormData.startDate);
    const end = new Date(leaveFormData.endDate);
    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    // Create new leave request
    const newRequest = {
      id: `EMP${leaveRequests.length + 1}`.padStart(6, '0'),
      name: 'Current User', // Replace with actual user name
      avatar: 'CU',
      workingIn: 'Current Project', // Replace with actual project
      leaveType: `${leaveFormData.leaveType.charAt(0).toUpperCase() + leaveFormData.leaveType.slice(1)} Leave`,
      reason: leaveFormData.reason,
      status: 'Pending',
      duration: `${duration}`,
      statistics: {
        casual: { total: 12, used: 0, remaining: 12 },
        sick: { total: 10, used: 0, remaining: 10 },
        vacation: { total: 15, used: 0, remaining: 15 }
      }
    };

    setLeaveRequests(prev => [...prev, newRequest]);
    setOpenApplyLeave(false);
    setLeaveFormData({
      startDate: '',
      endDate: '',
      leaveType: '',
      reason: '',
      manager: '',
    });

    setSnackbar({
      open: true,
      message: 'Leave request submitted successfully',
      severity: 'success'
    });
  };

  const getEmployeeStatisticsData = (employee) => {
    if (!employee) return [];
    
    return [
      { name: 'Casual', ...employee.statistics.casual },
      { name: 'Sick', ...employee.statistics.sick },
      { name: 'Vacation', ...employee.statistics.vacation }
    ];
  };
// Continue from previous part...

return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4,
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a1a1a', mb: 1 }}>
            Manage Leaves
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Track and manage employee leave requests
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenApplyLeave(true)}
          sx={{
            backgroundColor: '#1976d2',
            color: 'white',
            borderRadius: '8px',
            padding: '10px 24px',
            '&:hover': {
              backgroundColor: '#1565c0',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            },
          }}
        >
          Apply Leave
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <StyledCard type="requests" onClick={() => setShowLeaveRequests(true)}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Badge badgeContent={leaveRequests.filter(req => req.status === 'Pending').length} color="error">
                  <EventNoteIcon sx={{ fontSize: 48, color: '#1565C0' }} />
                </Badge>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h6" sx={{ color: '#1565C0', fontWeight: 'bold' }}>
                    Employee Leave Requests
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {leaveRequests.filter(req => req.status === 'Pending').length} pending requests
                  </Typography>
                </Box>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={(leaveRequests.filter(req => req.status === 'Pending').length / leaveRequests.length) * 100} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: '#e3f2fd',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#1565C0',
                  }
                }} 
              />
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledCard onClick={() => setShowStatistics(true)}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TimelineIcon sx={{ fontSize: 48, color: '#F57C00' }} />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h6" sx={{ color: '#F57C00', fontWeight: 'bold' }}>
                    Leave Statistics
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    View leave balance and history
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ height: 100 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={selectedEmployee ? getEmployeeStatisticsData(selectedEmployee) : []}>
                    <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                    <YAxis />
                    <ChartTooltip />
                    <Bar dataKey="remaining" fill="#F57C00" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Leave Requests Table */}
      {showLeaveRequests && (
        <TableContainer component={Paper} sx={{ mt: 4, borderRadius: '12px', boxShadow: 3 }}>
          <Table>
            <StyledTableHead>
              <TableRow>
                <TableCell>Employee</TableCell>
                <TableCell>Working In</TableCell>
                <TableCell>Leave Type</TableCell>
                <TableCell>Reason for Leave</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {leaveRequests.map((request) => (
                <StyledTableRow key={request.id}>
                  <TableCell>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        cursor: 'pointer' 
                      }}
                      onClick={() => handleEmployeeSelect(request)}
                    >
                      <Avatar sx={{ mr: 2, bgcolor: '#1976d2' }}>{request.avatar}</Avatar>
                      <Box>
                        <Typography variant="subtitle2">{request.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{request.id}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{request.workingIn}</TableCell>
                  <TableCell>{request.leaveType}</TableCell>
                  <TableCell>{request.reason}</TableCell>
                  <TableCell>{request.duration} day(s)</TableCell>
                  <TableCell>
                    <StatusChip label={request.status} status={request.status} />
                  </TableCell>
                  <TableCell>
                    {request.status === 'Pending' && (
                      <Box>
                        <Tooltip title="Approve">
                          <IconButton 
                            color="success" 
                            size="small"
                            onClick={() => handleLeaveApproval(request.id, 'approve')}
                          >
                            <CheckCircleIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Reject">
                          <IconButton 
                            color="error" 
                            size="small"
                            onClick={() => handleLeaveApproval(request.id, 'reject')}
                          >
                            <CancelIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )}
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Apply Leave Dialog */}
      <Dialog 
        open={openApplyLeave} 
        onClose={() => setOpenApplyLeave(false)}
        maxWidth="md" 
        fullWidth
        PaperProps={{
          style: {
            borderRadius: '16px',
          },
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(45deg, #1976d2 30%, #1565c0 90%)',
          color: 'white',
          p: 3,
        }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            Apply for Leave
          </Typography>
          <Typography variant="subtitle2" sx={{ mt: 1, opacity: 0.8 }}>
            Fill in the details below to submit your leave request
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                name="startDate"
                value={leaveFormData.startDate}
                onChange={(e) => setLeaveFormData({ ...leaveFormData, startDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                name="endDate"
                value={leaveFormData.endDate}
                onChange={(e) => setLeaveFormData({ ...leaveFormData, endDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Leave Type</InputLabel>
                <Select
                  value={leaveFormData.leaveType}
                  label="Leave Type"
                  onChange={(e) => setLeaveFormData({ ...leaveFormData, leaveType: e.target.value })}
                  sx={{ borderRadius: '8px' }}
                >
                  <MenuItem value="casual">Casual Leave</MenuItem>
                  <MenuItem value="sick">Sick Leave</MenuItem>
                  <MenuItem value="vacation">Vacation Leave</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Reporting Manager</InputLabel>
                <Select
                  value={leaveFormData.manager}
                  label="Reporting Manager"
                  onChange={(e) => setLeaveFormData({ ...leaveFormData, manager: e.target.value })}
                  sx={{ borderRadius: '8px' }}
                >
                  {managers.map((manager) => (
                    <MenuItem key={manager.id} value={manager.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SupervisorIcon sx={{ mr: 1, color: '#1976d2' }} />
                        <Box>
                          <Typography variant="subtitle2">{manager.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {manager.department}
                          </Typography>
                        </Box>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Reason for Leave"
                name="reason"
                value={leaveFormData.reason}
                onChange={(e) => setLeaveFormData({ ...leaveFormData, reason: e.target.value })}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, backgroundColor: '#f8f9fa' }}>
          <Button 
            onClick={() => setOpenApplyLeave(false)}
            variant="outlined"
            color="error"
            sx={{ borderRadius: '8px' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: '8px',
              background: 'linear-gradient(45deg, #1976d2 30%, #1565c0 90%)',
              color: 'white',
              padding: '8px 24px',
              '&:hover': {
                background: 'linear-gradient(45deg, #1565c0 30%, #0d47a1 90%)',
              }
            }}
            onClick={handleSubmitLeave}
          >
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>

      {/* Leave Statistics Dialog */}
      <Dialog
        open={showStatistics}
        onClose={() => {
          setShowStatistics(false);
          setSelectedEmployee(null);
        }}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: '16px',
          },
        }}
      >
        <DialogTitle sx={{
          background: 'linear-gradient(45deg, #F57C00 30%, #FF9800 90%)',
          color: 'white',
          p: 3,
        }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            {selectedEmployee ? `${selectedEmployee.name}'s Leave Statistics` : 'Leave Statistics'}
          </Typography>
          <Typography variant="subtitle2" sx={{ mt: 1, opacity: 0.8 }}>
            {selectedEmployee ? `Employee ID: ${selectedEmployee.id}` : 'Overall leave statistics'}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {selectedEmployee ? (
            <Grid container spacing={3}>
              {getEmployeeStatisticsData(selectedEmployee).map((leave) => (
                <Grid item xs={12} md={4} key={leave.name}>
                  <Card sx={{ 
                    p: 2, 
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    height: '100%'
                  }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {leave.name} Leave
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Total
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {leave.total} days
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Used
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" color="error">
                        {leave.used} days
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Remaining
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" color="success.main">
                        {leave.remaining} days
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(leave.used / leave.total) * 100}
                      sx={{
                        mt: 2,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#e3f2fd',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#F57C00',
                        }
                      }}
                    />
                  </Card>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Card sx={{ p: 3, borderRadius: '12px', mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Leave History
                  </Typography>
                  <Box sx={{ height: 300, mt: 2 }}>
                    <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getEmployeeStatisticsData(selectedEmployee)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip />
                        <Legend />
                        <Bar dataKey="total" fill="#1976d2" name="Total" />
                        <Bar dataKey="used" fill="#F57C00" name="Used" />
                        <Bar dataKey="remaining" fill="#2E7D32" name="Remaining" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          ) : (
            <Typography variant="body1" color="text.secondary" align="center">
              Select an employee to view their leave statistics
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, backgroundColor: '#f8f9fa' }}>
          <Button
            onClick={() => {
              setShowStatistics(false);
              setSelectedEmployee(null);
            }}
            variant="contained"
            sx={{
              borderRadius: '8px',
              background: 'linear-gradient(45deg, #F57C00 30%, #FF9800 90%)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(45deg, #FF9800 30%, #F57C00 90%)',
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EmployeeLeaves;