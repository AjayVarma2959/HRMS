import React, { useState } from 'react';
import {
    Box, Typography, Card, CardContent, Grid, Select, MenuItem, FormControl,
    InputLabel,  Avatar, Chip, Dialog, DialogTitle, DialogContent,
    IconButton, LinearProgress, Button, DialogActions, Paper
} from '@mui/material';
import {
     Group,  CheckCircle, Cancel, Timer, Close
    
} from '@mui/icons-material';

export const AttendancePage = () => {
    const [selectedView, setSelectedView] = useState('all');
    const [selectedMonth, setSelectedMonth] = useState('March 2024');
    const [selectedProject, setSelectedProject] = useState('all');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

   
    const projects = [
        { id: 'all', name: 'All Projects', color: '#1a237e' },
        { id: 'p1', name: 'E-commerce Platform', color: '#2196f3' },
        { id: 'p2', name: 'Mobile Banking App', color: '#9c27b0' },
        { id: 'p3', name: 'CRM System', color: '#ff9800' }
    ];

    const employees = [
        {
            id: 1,
            name: 'John Doe',
            project: 'E-commerce Platform',
            role: 'Senior Developer',
            attendance: 92,
            present: 23,
            absent: 2,
            late: 3,
            avatar: 'J',
            dailyAttendance: generateMonthAttendance()
        },
        {
            id: 2,
            name: 'Jane Smith',
            project: 'Mobile Banking App',
            role: 'UI Designer',
            attendance: 88,
            present: 21,
            absent: 4,
            late: 2,
            avatar: 'S',
            dailyAttendance: generateMonthAttendance()
        },
        {
            id: 3,
            name: 'Mike Johnson',
            project: 'CRM System',
            role: 'Backend Developer',
            attendance: 95,
            present: 24,
            absent: 1,
            late: 1,
            avatar: 'M',
            dailyAttendance: generateMonthAttendance()
        },
        {
            id: 4,
            name: 'Sarah Wilson',
            project: 'E-commerce Platform',
            role: 'Product Manager',
            attendance: 90,
            present: 22,
            absent: 3,
            late: 2,
            avatar: 'S',
            dailyAttendance: generateMonthAttendance()
        }
    ];

    
    function generateMonthAttendance() {
        const days = [];
        for (let i = 1; i <= 31; i++) {
            const status = Math.random() > 0.8 ? 
                (Math.random() > 0.5 ? 'absent' : 'late') : 'present';
            days.push({
                date: i,
                status,
                inTime: status !== 'absent' ? '09:' + Math.floor(Math.random() * 59) : '-',
                outTime: status !== 'absent' ? '18:' + Math.floor(Math.random() * 59) : '-'
            });
        }
        return days;
    }

    const handleEmployeeClick = (employee) => {
        setSelectedEmployee(employee);
        setOpenDialog(true);
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'present': return '#4caf50';
            case 'absent': return '#f44336';
            case 'late': return '#ff9800';
            default: return '#grey';
        }
    };

    
    const getFilteredEmployees = () => {
        let filtered = [...employees];
        if (selectedView === 'project' && selectedProject !== 'all') {
            filtered = filtered.filter(emp => emp.project === projects.find(p => p.id === selectedProject)?.name);
        }
        return filtered;
    };

    return (
        <Box sx={{ p: 3, background: '#f5f5f5' }}>
           
            <Box sx={{ 
                mb: 4, 
                p: 4, 
                borderRadius: 2,
                background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
                color: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    Attendance Overview
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
                    Monitor and manage employee attendance
                </Typography>
            </Box>

            
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {[
                    { 
                        title: 'Present Today', 
                        count: '42', 
                        icon: <CheckCircle />, 
                        color: '#4caf50',
                        gradient: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)'
                    },
                    { 
                        title: 'Absent Today', 
                        count: '3', 
                        icon: <Cancel />, 
                        color: '#f44336',
                        gradient: 'linear-gradient(135deg, #f44336 0%, #c62828 100%)'
                    },
                    { 
                        title: 'Late Arrivals', 
                        count: '5', 
                        icon: <Timer />, 
                        color: '#ff9800',
                        gradient: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)'
                    },
                    { 
                        title: 'Total Employees', 
                        count: '50', 
                        icon: <Group />, 
                        color: '#2196f3',
                        gradient: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)'
                    }
                ].map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{ 
                            background: stat.gradient,
                            color: 'white',
                            transform: 'translateY(0)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                            }
                        }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box>
                                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                                            {stat.count}
                                        </Typography>
                                        <Typography variant="body1">
                                            {stat.title}
                                        </Typography>
                                    </Box>
                                    <Avatar sx={{ 
                                        bgcolor: 'rgba(255,255,255,0.2)',
                                        width: 56,
                                        height: 56
                                    }}>
                                        {stat.icon}
                                    </Avatar>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

           
            <Box sx={{ 
                mb: 4, 
                p: 3,
                backgroundColor: 'white',
                borderRadius: 2,
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                display: 'flex', 
                gap: 2, 
                alignItems: 'center',
                flexWrap: 'wrap'
            }}>
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>View Type</InputLabel>
                    <Select
                        value={selectedView}
                        onChange={(e) => setSelectedView(e.target.value)}
                        label="View Type"
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(26, 35, 126, 0.2)',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1a237e',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1a237e',
                            }
                        }}
                    >
                        <MenuItem value="all">All Employees</MenuItem>
                        <MenuItem value="project">Project Wise</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Month</InputLabel>
                    <Select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        label="Month"
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(26, 35, 126, 0.2)',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1a237e',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1a237e',
                            }
                        }}
                    >
                        <MenuItem value="March 2024">March 2024</MenuItem>
                        <MenuItem value="February 2024">February 2024</MenuItem>
                        <MenuItem value="January 2024">January 2024</MenuItem>
                    </Select>
                </FormControl>

                {selectedView === 'project' && (
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Project</InputLabel>
                        <Select
                            value={selectedProject}
                            onChange={(e) => setSelectedProject(e.target.value)}
                            label="Project"
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(26, 35, 126, 0.2)',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#1a237e',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#1a237e',
                                }
                            }}
                        >
                            {projects.map(project => (
                                <MenuItem key={project.id} value={project.id}>
                                    {project.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            </Box>

            
            <Grid container spacing={3}>
                {getFilteredEmployees().map(employee => (
                    <Grid item xs={12} sm={6} md={3} key={employee.id}>
                        <Card 
                            onClick={() => handleEmployeeClick(employee)}
                            sx={{ 
                                cursor: 'pointer',
                                background: 'white',
                                height: '100%',
                                transform: 'translateY(0)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                                }
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <Avatar 
                                        sx={{ 
                                            bgcolor: '#1a237e',
                                            width: 50,
                                            height: 50,
                                            fontSize: '1.2rem'
                                        }}
                                    >
                                        {employee.avatar}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h6" noWrap>{employee.name}</Typography>
                                        <Typography variant="body2" color="text.secondary" noWrap>
                                            {employee.role}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Chip 
                                    size="small"
                                    label={employee.project}
                                    sx={{ 
                                        mb: 2,
                                        bgcolor: `${projects.find(p => p.name === employee.project)?.color}15`,
                                        color: projects.find(p => p.name === employee.project)?.color,
                                        borderRadius: '4px'
                                    }}
                                />

                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="body2" color="text.secondary" mb={1}>
                                        Attendance Rate
                                    </Typography>
                                    <LinearProgress 
                                        variant="determinate" 
                                        value={employee.attendance}
                                        sx={{ 
                                            height: 8, 
                                            borderRadius: 4,
                                            bgcolor: '#e0e0e0',
                                            '& .MuiLinearProgress-bar': {
                                                background: `linear-gradient(90deg, 
                                                    ${employee.attendance > 90 ? '#4caf50' : 
                                                    employee.attendance > 80 ? '#ff9800' : '#f44336'} 0%,
                                                    ${employee.attendance > 90 ? '#2e7d32' : 
                                                    employee.attendance > 80 ? '#f57c00' : '#c62828'} 100%)`
                                            }
                                        }}
                                    />
                                </Box>

                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <Chip 
                                        size="small"
                                        icon={<CheckCircle />} 
                                        label={employee.present}
                                        sx={{ bgcolor: '#4caf5015', color: '#4caf50' }}
                                    />
                                    <Chip 
                                        size="small"
                                        icon={<Cancel />} 
                                        label={employee.absent}
                                        sx={{ bgcolor: '#f4433615', color: '#f44336' }}
                                    />
                                    <Chip 
                                        size="small"
                                        icon={<Timer />} 
                                        label={employee.late}
                                        sx={{ bgcolor: '#ff980015', color: '#ff9800' }}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

           
            <Dialog 
                open={openDialog} 
                onClose={() => setOpenDialog(false)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                  sx: {
                      borderRadius: 2,
                      overflow: 'hidden'
                  }
              }}
          >
              {selectedEmployee && (
                  <>
                      <DialogTitle sx={{ 
                          background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
                          color: 'white',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          p: 3
                      }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar 
                                  sx={{ 
                                      bgcolor: 'rgba(255,255,255,0.2)',
                                      width: 50,
                                      height: 50
                                  }}
                              >
                                  {selectedEmployee.avatar}
                              </Avatar>
                              <Box>
                                  <Typography variant="h6">{selectedEmployee.name}</Typography>
                                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                      {selectedEmployee.role} - {selectedEmployee.project}
                                  </Typography>
                              </Box>
                          </Box>
                          <IconButton 
                              onClick={() => setOpenDialog(false)}
                              sx={{ color: 'white' }}
                          >
                              <Close />
                          </IconButton>
                      </DialogTitle>
                      <DialogContent sx={{ p: 3 }}>
                         
                          <Box sx={{ mb: 4, mt: 3 }}> 
                              <Typography variant="h6" sx={{ mb: 2, color: '#1a237e' }}>
                                  Monthly Overview - {selectedMonth}
                              </Typography>
                              <Grid container spacing={2} sx={{ mb: 2 }}>
                                  <Grid item xs={4}>
                                      <Paper sx={{ 
                                          p: 2, 
                                          textAlign: 'center',
                                          background: '#4caf5015',
                                          border: '1px solid #4caf5030'
                                      }}>
                                          <CheckCircle sx={{ color: '#4caf50', fontSize: 32, mb: 1 }} />
                                          <Typography variant="h6" sx={{ color: '#4caf50' }}>
                                              {selectedEmployee.present}
                                          </Typography>
                                          <Typography variant="body2" color="text.secondary">
                                              Present Days
                                          </Typography>
                                      </Paper>
                                  </Grid>
                                  <Grid item xs={4}>
                                      <Paper sx={{ 
                                          p: 2, 
                                          textAlign: 'center',
                                          background: '#f4433615',
                                          border: '1px solid #f4433630'
                                      }}>
                                          <Cancel sx={{ color: '#f44336', fontSize: 32, mb: 1 }} />
                                          <Typography variant="h6" sx={{ color: '#f44336' }}>
                                              {selectedEmployee.absent}
                                          </Typography>
                                          <Typography variant="body2" color="text.secondary">
                                              Absent Days
                                          </Typography>
                                      </Paper>
                                  </Grid>
                                  <Grid item xs={4}>
                                      <Paper sx={{ 
                                          p: 2, 
                                          textAlign: 'center',
                                          background: '#ff980015',
                                          border: '1px solid #ff980030'
                                      }}>
                                          <Timer sx={{ color: '#ff9800', fontSize: 32, mb: 1 }} />
                                          <Typography variant="h6" sx={{ color: '#ff9800' }}>
                                              {selectedEmployee.late}
                                          </Typography>
                                          <Typography variant="body2" color="text.secondary">
                                              Late Days
                                          </Typography>
                                      </Paper>
                                  </Grid>
                              </Grid>
                          </Box>

                          
                          <Box sx={{ mt: 4 }}>
                              <Typography variant="h6" sx={{ mb: 2, color: '#1a237e' }}>
                                  Daily Attendance
                              </Typography>
                              <Grid container spacing={2}>
                                  {selectedEmployee.dailyAttendance.map((day, index) => (
                                      <Grid item xs={4} sm={3} md={2} key={index}>
                                          <Paper 
                                              elevation={3}
                                              sx={{ 
                                                  p: 1.5,
                                                  textAlign: 'center',
                                                  background: `${getStatusColor(day.status)}15`,
                                                  border: `1px solid ${getStatusColor(day.status)}30`,
                                                  borderRadius: 2,
                                                  transition: 'transform 0.2s ease',
                                                  '&:hover': {
                                                      transform: 'scale(1.05)',
                                                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                                  }
                                              }}
                                          >
                                              <Typography variant="h6" sx={{ color: getStatusColor(day.status) }}>
                                                  {day.date}
                                              </Typography>
                                              <Typography variant="caption" display="block" color="text.secondary">
                                                  {day.status.charAt(0).toUpperCase() + day.status.slice(1)}
                                              </Typography>
                                              {day.status !== 'absent' && (
                                                  <>
                                                      <Typography variant="caption" display="block" color="text.secondary">
                                                          In: {day.inTime}
                                                      </Typography>
                                                      <Typography variant="caption" display="block" color="text.secondary">
                                                          Out: {day.outTime}
                                                      </Typography>
                                                  </>
                                              )}
                                          </Paper>
                                      </Grid>
                                  ))}
                              </Grid>
                          </Box>
                      </DialogContent>
                      <DialogActions sx={{ p: 2, background: '#f5f5f5' }}>
                          <Button 
                              onClick={() => setOpenDialog(false)}
                              variant="contained"
                              sx={{ 
                                  background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
                                  '&:hover': {
                                      background: 'linear-gradient(135deg, #0d47a1 0%, #1a237e 100%)'
                                  }
                              }}
                          >
                              Close
                          </Button>
                      </DialogActions>
                  </>
              )}
          </Dialog>
      </Box>
  );
};
export default AttendancePage;