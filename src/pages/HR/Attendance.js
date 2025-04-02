import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select
} from "@mui/material";
import {
  CalendarToday,
  AccessTime,
  EventAvailable,
  EventBusy,
  BarChart,
  MoreVert,
  Download,
  Sync,
  DateRange
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

const Attendance = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reportType, setReportType] = useState('monthly');

  const leaves = [
    { id: 1, employee: "John Doe", type: "Vacation", start: "2023-07-15", end: "2023-07-18", status: "approved" },
    { id: 2, employee: "Jane Smith", type: "Sick", start: "2023-07-20", end: "2023-07-21", status: "pending" },
  ];

  const overtimeData = [
    { id: 1, date: "2023-07-10", hours: 2, approved: true },
    { id: 2, date: "2023-07-15", hours: 1.5, approved: false },
  ];

  const columns = [
    { field: 'employee', headerName: 'Employee', width: 200 },
    { field: 'type', headerName: 'Leave Type', width: 150 },
    { field: 'start', headerName: 'Start Date', width: 150 },
    { field: 'end', headerName: 'End Date', width: 150 },
    { field: 'status', headerName: 'Status', width: 120,
      renderCell: (params) => (
        <Typography color={params.value === 'approved' ? 'success.main' : 'warning.main'}>
          {params.value}
        </Typography>
      )
    },
    { field: 'actions', headerName: 'Actions', width: 150,
      renderCell: () => (
        <>
          <Button size="small" color="success">Approve</Button>
          <Button size="small" color="error">Deny</Button>
        </>
      )
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
       
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" fontWeight="bold">
              Attendance Management
            </Typography>
            <Button variant="contained" startIcon={<Sync />}>
              Sync Payroll
            </Button>
          </Box>
        </Grid>

        
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <AccessTime fontSize="large" color="primary" />
            <Typography variant="h6" mt={1}>Total Hours</Typography>
            <Typography variant="h4" fontWeight="bold">160h</Typography>
            <Typography color="text.secondary">Current Month</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <EventAvailable fontSize="large" color="success" />
            <Typography variant="h6" mt={1}>Approved Leaves</Typography>
            <Typography variant="h4" fontWeight="bold">12</Typography>
            <Typography color="text.secondary">This Quarter</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <EventBusy fontSize="large" color="error" />
            <Typography variant="h6" mt={1}>Absences</Typography>
            <Typography variant="h4" fontWeight="bold">3</Typography>
            <Typography color="text.secondary">Current Month</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <BarChart fontSize="large" color="warning" />
            <Typography variant="h6" mt={1}>Overtime</Typography>
            <Typography variant="h4" fontWeight="bold">15.5h</Typography>
            <Typography color="text.secondary">Pending Approval</Typography>
          </Paper>
        </Grid>

       
        {/* <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <CalendarToday color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Attendance Calendar</Typography>
            </Box>
            <DateRange
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              showDaysOutsideCurrentMonth
              sx={{
                width: '100%',
                height: 300,
                '& .Mui-selected': { backgroundColor: 'primary.main' },
              }}
            />
          </Paper>
        </Grid> */}

        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6">Leave Requests</Typography>
              <Button variant="outlined">New Request</Button>
            </Box>
            <DataGrid
              rows={leaves}
              columns={columns}
              pageSize={5}
              sx={{
                border: 'none',
                '& .MuiDataGrid-cell': { borderBottom: 'none' },
              }}
            />
          </Paper>
        </Grid>

        
        {/* <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>Overtime Records</Typography>
            <Grid container spacing={2}>
              {overtimeData.map((record) => (
                <Grid item xs={12} md={6} key={record.id}>
                  <Paper sx={{ p: 2, bgcolor: record.approved ? 'success.light' : 'warning.light' }}>
                    <Box display="flex" justifyContent="space-between">
                      <div>
                        <Typography variant="body2">{record.date}</Typography>
                        <Typography variant="h6">{record.hours} hours</Typography>
                      </div>
                      <Button size="small" variant="contained">
                        {record.approved ? 'Approved' : 'Review'}
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid> */}

        
        {/* <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>Generate Reports</Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Report Type</InputLabel>
              <Select
                value={reportType}
                label="Report Type"
                onChange={(e) => setReportType(e.target.value)}
              >
                <MenuItem value="monthly">Monthly Attendance</MenuItem>
                <MenuItem value="leave">Leave Summary</MenuItem>
                <MenuItem value="overtime">Overtime Report</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              type="date"
              label="Start Date"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="date"
              label="End Date"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <Button
              fullWidth
              variant="contained"
              startIcon={<Download />}
            >
              Generate Report
            </Button>
          </Paper>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default Attendance;