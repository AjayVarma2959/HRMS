import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Typography, Grid, Paper, TextField, Card, CardContent, Chip, Divider, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import { AccessTime, ExitToApp, PauseCircleOutline, Timelapse } from "@mui/icons-material";
import attendanceData from '../../assets/attendence-sheet';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

dayjs.extend(duration);

const localizer = momentLocalizer(moment);

const statusOptions = [
    { value: '', label: 'All' },
    { value: 'present', label: 'Present' },
    { value: 'absent', label: 'Absent' },
    { value: 'late', label: 'Late' },
    { value: 'leave', label: 'On Leave' },
];

const statusColors = {
    present: 'success',
    absent: 'error',
    late: 'warning',
    leave: 'info',
};

const statusGradients = {
    present: ["#81C784", "#FFFFFF"], // Slightly more saturated Green
    absent: ["#E57373", "#FFFFFF"], // Slightly more saturated Red
    late: ["#FFD54F", "#FFFFFF"], // Slightly more saturated Yellow
    leave: ["#64B5F6", "#FFFFFF"], // Slightly more saturated Blue
    // Add more status gradients as needed
};


const EmployeeAttendance = () => {
    const [checkInTime, setCheckInTime] = useState(null);
    const [checkOutTime, setCheckOutTime] = useState(null);
    const [breakTimeIn, setBreakTimeIn] = useState(dayjs.duration(0));
    const [selectedDate, setSelectedDate] = useState(dayjs().startOf('month'));
    const [selectedStatus, setSelectedStatus] = useState(''); 

    const savedHours = localStorage.getItem("timerHours");
    const savedMinutes = localStorage.getItem("timerMinutes");
    const savedSeconds = localStorage.getItem("timerSeconds");
    
    const formattedWorkingTime = `${savedHours ? savedHours.padStart(2, '0') : '00'}:
                                  ${savedMinutes ? savedMinutes.padStart(2, '0') : '00'}:
                                  ${savedSeconds ? savedSeconds.padStart(2, '0') : '00'}`;
    

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate.startOf('month'));
    };
    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const monthKey = selectedDate.format('YYYY-MM');
    const monthlyAttendance = attendanceData[monthKey] || {};

    const filteredAttendance = Object.entries(monthlyAttendance).filter(([date, details]) => {
        return selectedStatus === '' || details.status === selectedStatus;
    });

    const selectedMonthYear = selectedDate.format('YYYY-MM');
   

    // ✅ Poll localStorage for check-in time every second
    useEffect(() => {
        const interval = setInterval(() => {
            const savedCheckIn = localStorage.getItem("checkInTime");
            if (savedCheckIn) {
                setCheckInTime(dayjs(savedCheckIn)); // Update state with stored check-in time
            }
        }, 1000); // Poll localStorage every second
    
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

   
    // ✅ Poll localStorage for check-out time every second
    useEffect(() => {
        const interval = setInterval(() => {
            const savedCheckOut = localStorage.getItem("checkOutTime");
            const savedBreakTime = localStorage.getItem("totalBreakTime");
    
            console.log("Check-out from Local Storage:", savedCheckOut);
            console.log("Breaktime from Local Storage:", savedBreakTime);
    
            if (savedCheckOut) {
                const newCheckOutTime = dayjs(savedCheckOut);
                setCheckOutTime(newCheckOutTime);
    
                if (savedBreakTime) {
                    const breakDuration = dayjs.duration(parseInt(savedBreakTime, 10));
                    setBreakTimeIn(breakDuration);
                    console.log("Break time state updated:", breakDuration.minutes(), "m", breakDuration.seconds(), "s");
                } else {
                    setBreakTimeIn(dayjs.duration(0));
                    console.log("Break time reset to 0");
                }
            }
        }, 1000);
    
        return () => clearInterval(interval);
    }, []);

  

 useEffect(() => {
    if (checkInTime && !localStorage.getItem("checkOutTime")) {
        setCheckOutTime(null);
        setBreakTimeIn(dayjs.duration(0));

        localStorage.removeItem("checkOutTime");
        localStorage.removeItem("totalBreakTime");
    }
}, [checkInTime]);




    // const totalWorkingHours = () => {
    //     if (checkInTime && checkOutTime) {
    //         const totalDuration = dayjs.duration(checkOutTime.diff(checkInTime));
    //         const netWorkingTime = totalDuration.subtract(breakTimeIn);
    //         return `${netWorkingTime.hours()}h ${netWorkingTime.minutes()}m ${netWorkingTime.seconds()}s`;
    //     }
    //     return "Not Available";
    // };

    // Map attendance data to calendar events


    // Style function for event rendering
    const eventStyleGetter = (event) => ({
        style: {
            backgroundColor: event.color,
            color: "black",
            borderRadius: "5px",
            textAlign: "center",
            fontWeight: "bold",
            padding: "3px",
        },
    });



    return (
        <Box sx={{minHeight:"75vh"}}>
            <Typography variant="h4" fontWeight="bold" marginBottom={2}>
                My Attendance
            </Typography>

            <Typography variant="h5" fontWeight="bold" marginBottom={2}>
                Today's Logs
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <Paper sx={{ p: 2, bgcolor: "#E3F2FD" }}>
                        <AccessTime sx={{ fontSize: 40, color: "#1565C0" }} />
                        <Typography variant="h6">Check-In Time</Typography>
                        <Typography variant="h6" fontWeight="bold">
                            {checkInTime ? checkInTime.format("hh:mm:ss A") : "Not Checked In"}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Paper sx={{ p: 2, bgcolor: "#E8F5E9" }}>
                        <ExitToApp sx={{ fontSize: 40, color: "#2E7D32" }} />
                        <Typography variant="h6">Check-Out Time</Typography>
                        <Typography variant="h6" fontWeight="bold">
                            {checkOutTime ? checkOutTime.format("hh:mm:ss A") : "Not Checked Out"}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Paper sx={{ p: 2, bgcolor: "#FFF3E0" }}>
                        <PauseCircleOutline sx={{ fontSize: 40, color: "#FF8F00" }} />
                        <Typography variant="h6">Total Break Time</Typography>
                        <Typography variant="h6" fontWeight="bold">
                            {breakTimeIn.asMilliseconds() > 0 ? `${breakTimeIn.minutes()}m ${breakTimeIn.seconds()}s` : "-- : --"}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Paper sx={{ p: 2, bgcolor: "#F3E5F5" }}>
                        <Timelapse sx={{ fontSize: 40, color: "#6A1B9A" }} />
                        <Typography variant="h6">Total Working Hours</Typography>
                        <Typography variant="h6" fontWeight="bold">{formattedWorkingTime}</Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Box sx={{ paddingTop: 6, backgroundColor: "#f9f9f9" }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 4 }}>
                    Monthly Attendance Calendar
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            views={['year', 'month']}
                            label="Select Month and Year"
                            minDate={dayjs('2020-01-01')}
                            maxDate={dayjs()}
                            value={selectedDate}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} helperText={null} />}
                        />
                    </LocalizationProvider>

                    <FormControl>
                        <InputLabel id="status-filter-label">Status</InputLabel>
                        <Select
                            labelId="status-filter-label"
                            value={selectedStatus}
                            label="Filter by Status"
                            onChange={handleStatusChange}
                            sx={{ width: '150px' }}
                        >
                            {statusOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Grid container spacing={2}>
                    {filteredAttendance.map(([date, details]) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={date}>
                            <Card sx={{
                                background: `linear-gradient(to right, ${statusGradients[details.status][0]}, ${statusGradients[details.status][1]})`,

                                color: '#000000', // Ensure text is readable on gradients
                            }}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="left">
                                        <Typography variant="h6">{dayjs(date).format('MMMM D, YYYY')}</Typography>

                                        <Chip
                                            label={statusOptions.find(option => option.value === details.status)?.label}
                                            color={statusColors[details.status]}
                                            size="small"
                                        />
                                    </Box>
                                    <Divider sx={{ my: 1, backgroundColor: 'rgba(255, 255, 255, 0.5)' }} />
                                    <Box display="flex" justifyContent="space-between" >
                                        <Box textAlign="left">
                                            <Typography variant="body2" color="#000000">
                                                Clock-In
                                            </Typography>
                                            <Typography variant="body2">
                                                {details.checkIn || 'N/A'}
                                            </Typography>
                                        </Box>
                                        <Box textAlign="left">
                                            <Typography variant="body2" color="#000000">
                                                Clock-Out
                                            </Typography>
                                            <Typography variant="body1">
                                                {details.checkOut || 'N/A'}
                                            </Typography>
                                        </Box>
                                        <Box textAlign="left">
                                            <Typography variant="body2" color="#000000">
                                                Break Time
                                            </Typography>
                                            <Typography variant="body2">
                                                {details.breakTime || 'N/A'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>

    );
};

export default EmployeeAttendance;
