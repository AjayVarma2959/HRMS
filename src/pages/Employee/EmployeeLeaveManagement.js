import React, { useState } from 'react';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { styled } from '@mui/material/styles';
import {
    Box,
    Typography,
    Grid,
    Button,
    Paper,  // ✅ Keep only one Paper import
    Divider,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContentText,
    DialogContent,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    MenuItem,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    InputLabel, Select,

} from '@mui/material';

import AssignmentIcon from '@mui/icons-material/Assignment';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EventIcon from '@mui/icons-material/Event';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import {
    BarChart,
    PendingActions,
    LocalHospital,
    Spa,
    KeyboardDoubleArrowRight
} from "@mui/icons-material"

const StyledGridItem = styled(Grid)(({ theme }) => ({
    marginBottom: theme.spacing(3),
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    marginRight: theme.spacing(3),
    '& .MuiRadio-root': {
        color: theme.palette.primary.main,
    },
    '& .MuiRadio-root.Mui-checked': {
        color: theme.palette.secondary.main,
    },
}));

const EmployeeLeaveManagement = () => {

    const [isLeavesPopupOpen, setIsLeavesPopupOpen] = useState(false);
    const [isDaysFormOpen, setIsDaysFormOpen] = useState(false);
   const [startDate, setStartDate] = useState(dayjs());
   const [endDate, setEndDate] = useState(dayjs());
      const [isHolidaysPopupOpen, setIsHolidaysPopupOpen] = useState(false);
    const [leaveType, setLeaveType] = useState('');
const [showEndDate, setShowEndDate] = useState(false);
const [leaveReason, setLeaveReason] = useState('');
const [leaveReasonOtherFieldDisplay, setLeaveReasonOtherFieldDisplay] = useState(false);
const [otherReason, setOtherReason] = useState('');


    // Pagination states
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);



    const indianHolidays = [
        { id: 1, date: "01-01-2024", day: "Monday", festival: "New Year's Day" },
        { id: 2, date: "14-01-2024", day: "Sunday", festival: "Makar Sankranti / Pongal" },
        { id: 3, date: "26-01-2024", day: "Friday", festival: "Republic Day" },
        { id: 4, date: "08-03-2024", day: "Friday", festival: "Maha Shivaratri" },
        { id: 5, date: "25-03-2024", day: "Monday", festival: "Holi" },
        { id: 6, date: "29-03-2024", day: "Friday", festival: "Good Friday" },
        { id: 7, date: "09-04-2024", day: "Tuesday", festival: "Gudi Padwa / Ugadi" },
        { id: 8, date: "14-04-2024", day: "Sunday", festival: "Ambedkar Jayanti / Baisakhi" },
        { id: 9, date: "17-04-2024", day: "Wednesday", festival: "Ram Navami" },
        { id: 10, date: "21-04-2024", day: "Sunday", festival: "Mahavir Jayanti" },
        { id: 11, date: "10-05-2024", day: "Friday", festival: "Eid ul-Fitr (Ramadan Eid)" },
        { id: 12, date: "17-06-2024", day: "Monday", festival: "Bakrid (Eid al-Adha)" },
        { id: 13, date: "17-07-2024", day: "Wednesday", festival: "Muharram" },
        { id: 14, date: "15-08-2024", day: "Thursday", festival: "Independence Day / Raksha Bandhan" },
        { id: 15, date: "07-09-2024", day: "Saturday", festival: "Ganesh Chaturthi" },
        { id: 16, date: "02-10-2024", day: "Wednesday", festival: "Gandhi Jayanti" },
        { id: 17, date: "12-10-2024", day: "Saturday", festival: "Dussehra" },
        { id: 18, date: "31-10-2024", day: "Thursday", festival: "Diwali (Deepavali)" },
        { id: 19, date: "01-11-2024", day: "Friday", festival: "Govardhan Puja" },
        { id: 20, date: "02-11-2024", day: "Saturday", festival: "Bhai Dooj" },
        { id: 21, date: "15-11-2024", day: "Friday", festival: "Guru Nanak Jayanti" },
        { id: 22, date: "25-12-2024", day: "Wednesday", festival: "Christmas" }
    ];

    const handleLeaveTypeSelection = (event) =>{
        setIsDaysFormOpen(true);
        const selectedLeaveType = event.target.value;
        setLeaveType(selectedLeaveType);
        setShowEndDate(selectedLeaveType === 'more-than-one')
        
    }
    const handleLeaveTypeReason =(e) =>{
        const selectLeaveReason = e.target.value;
        setLeaveReason(selectLeaveReason)
        setLeaveReasonOtherFieldDisplay(selectLeaveReason === 'Other') ;
    }
    const handleLeavesPopup = () => {
        setIsLeavesPopupOpen(true)
    }

    const handleLeavesPopupcloseButton = () => {
        setIsLeavesPopupOpen(false);
        setLeaveType('');
        setIsDaysFormOpen('');
       setLeaveReason('');
        setLeaveReasonOtherFieldDisplay('');
        setOtherReason('');
    }

    const handleHolidaysList = () => {
        setIsHolidaysPopupOpen(true)
    }

    const handleHolidaysListCloseButton = () => {
        setIsHolidaysPopupOpen(false);
    }

    // ✅ Handle Pagination
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page when rows per page changes
    };
    return (
        <div>
            <Box sx={{ padding: 0, height: '80vh' }}>

                <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
                    Manage Leaves
                </Typography>
                <Grid container spacing={3} sx={{ mb: 4 }}>

                    <Grid item xs={12} sm={6} md={2.8}>
                        <Paper sx={{ p: 2, bgcolor: '#fff0f6' }}>
                            <Typography variant="h6">Total Leaves</Typography>
                            <Typography variant="h4" fontWeight="bold">12</Typography>
                            <BarChart sx={{ color: '#ff6b6b', fontSize: 40 }} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3.5}>
                        <Paper sx={{ p: 2, bgcolor: '#e6fcf5' }}>
                            <Typography variant="h6">Remaining Casual Leaves</Typography>
                            <Typography variant="h4" fontWeight="bold">3</Typography>
                            <Spa sx={{ color: '#38d9a9', fontSize: 40 }} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 2, bgcolor: '#fff9db' }}>
                            <Typography variant="h6">Remaining Sick Leaves</Typography>
                            <Typography variant="h4" fontWeight="bold">4</Typography>
                            <LocalHospital sx={{ color: '#ffd43b', fontSize: 40 }} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.7}>
                        <Paper sx={{ p: 2, bgcolor: '#f0f4ff' }}>
                            <Typography variant="h6">Pending Requests</Typography>
                            <Typography variant="h4" fontWeight="bold">1</Typography>
                            <PendingActions sx={{ color: '#ffd43b', fontSize: 40 }} />
                        </Paper>
                    </Grid>
                </Grid>

                {/* Apply for leave Button */}
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" flexDirection="row" gap={2}> {/* Align buttons in a row */}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleLeavesPopup}
                                sx={{
                                    flex: 1,
                                    padding: 2,
                                    textAlign: "left",
                                }}
                                endIcon={<KeyboardDoubleArrowRight sx={{ fontSize: "2.5rem", width: 30, height: 30 }} />}
                            >
                                <Typography>Apply for Leave</Typography>
                            </Button>

                            <Dialog open={isLeavesPopupOpen} onClose={handleLeavesPopupcloseButton} fullWidth>
                                <DialogTitle variant='h5' fontWeight='Bold'>Application For Leave</DialogTitle>
                                <DialogContent>
                                    {/* ✅ Two-column structure for labels and inputs */}
                                    <Grid container display="flex" flexDirection="row" alignItems='center'>
                                        {/* Label Column */}
                                        <Grid item xs={4} sx={{ mb: 2,pt:1, display: "flex", alignItems: "center" }}> {/* ✅ Added margin-bottom for spacing */}
                                            <FormLabel id="leave-application-request-for">Leave Application Request For</FormLabel>
                                        </Grid>

                                        {/* Input Column */}
                                        <Box width='258px'sx={{ mb: 2, pt:'10px'}}>
                                            <TextField 
                                                label='Select Leave Type'
                                                select
                                                fullWidth
                                                value={leaveType}
                                                onChange={handleLeaveTypeSelection}
                                            >
                                                <MenuItem value='half-day'>Half Day</MenuItem>
                                                <MenuItem value='one-day'>One Day</MenuItem>
                                                <MenuItem value='more-than-one'>More than One Day</MenuItem>
                                            </TextField>
                                        </Box>

                                        {/* <StyledGridItem xs={8} sx={{ mb: 3 }}>
                                            <RadioGroup name="leave-for-days" row>
                                                <StyledFormControlLabel
                                                    control={<Radio />}
                                                    label="Days"
                                                    value="Days"
                                                    onClick={() => (setIsDaysFormOpen(true))}
                                                />                                                
                                            </RadioGroup>
                                        </StyledGridItem> */}

                                        {/* Days Form (Date Picker) */}
                                        {isDaysFormOpen && (
                                            <>
                                                <Grid item xs={4} sx={{ mb: 3 }}> {/* ✅ More spacing before input */}
                                                    <FormLabel id="no-of-days">Leave Start</FormLabel>
                                                </Grid>
                                                <Grid item xs={8} sx={{ mb: 3 }}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            label="Select Start Date"
                                                            value={startDate}
                                                            format="DD-MM-YYYY"
                                                            onChange={(newValue) => setStartDate(newValue)}
                                                            renderInput={(params) => <TextField {...params} />}
                                                            
                                                        />
                                                    </LocalizationProvider>
                                                </Grid>
                                                {showEndDate && (
                                                    <>
                                                <Grid item xs={4} sx={{ mb: 3 }}> {/* ✅ More spacing before input */}
                                                    <FormLabel id="no-of-days">Leave End</FormLabel>
                                                </Grid>
                                                <Grid item xs={8} sx={{ mb: 3 }}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            label="Select Start Date"
                                                            value={endDate}
                                                            format="DD-MM-YYYY"
                                                            onChange={(newValue) => setEndDate(newValue)}
                                                            renderInput={(params) => <TextField {...params} />}
                                                        />
                                                    </LocalizationProvider>
                                                </Grid>
                                                </>
                                                )}
                                                <Grid item xs={4} sx={{ mb: 3 }}> {/* ✅ More spacing before input */}
                                                    <FormLabel>Leave Type</FormLabel>
                                                </Grid>
                                                <Grid item xs={8} sx={{ mb: 2 }}>
                                                    <RadioGroup 
                                                        name="leave-for-days-hours" 
                                                        row 
                                                        onChange={handleLeaveTypeReason}
                                                        value={leaveReason}                                                       
                                                        >
                                                        <FormControlLabel
                                                            control={<Radio />}
                                                            label="Causal"
                                                            value="Causal"

                                                        />
                                                        <FormControlLabel
                                                            control={<Radio />}
                                                            label="Sick"
                                                            value="Sick"

                                                        />
                                                        <FormControlLabel
                                                            control={<Radio />}
                                                            label="Personal"
                                                            value="Personal"

                                                        />
                                                        <FormControlLabel
                                                            control={<Radio />}
                                                            label="Other"
                                                            value="Other"

                                                        />
                                                    </RadioGroup>
                                                    {leaveReasonOtherFieldDisplay &&(
                                                    <TextField label='leave For'
                                                        value={otherReason}
                                                         onChange={(e)=>setOtherReason(e.target.value)}
                                                         sx={{ width: '280px', mt:1 }}
                                                    ></TextField>
                                                       ) }
                                                </Grid>

                                                <Grid item xs={4} sx={{ mb: 2 }}> {/* ✅ More spacing before input */}
                                                    <FormLabel>Comments</FormLabel>
                                                </Grid>
                                                <Grid item xs={8} sx={{}}>
                                                    <TextField
                                                        multiline
                                                        minRows={3} // ✅ Increases default height
                                                        placeholder="Enter your comments..."
                                                        sx={{ width: '280px' }}
                                                    />
                                                </Grid>

                                            </>
                                        
                                    )}
                                        {/* Hours Form */}
                                      
                                    </Grid>

                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleLeavesPopupcloseButton} variant='contained' color='primary' sx={{mr:1, mb:2}}>Apply</Button>
                                    <Button onClick={handleLeavesPopupcloseButton} variant='outlined' color="secondary" sx={{mr:4, mb:2}}>Close</Button>
                                </DialogActions>
                                
                            </Dialog>

                            {/* Holidays List */}
                            <Button
                                variant="contained"
                                sx={{ flex: 1, padding: 4, backgroundColor: '#b841d0' }}
                                onClick={handleHolidaysList}
                                endIcon={<KeyboardDoubleArrowRight sx={{ fontSize: "2.5rem", width: 30, height: 30 }} />}
                            >
                                <Typography >Holidays List</Typography>
                            </Button>
                            <Dialog
                                open={isHolidaysPopupOpen}
                                onClose={handleHolidaysListCloseButton} fullWidth maxWidth='md' sx={{ margin: 4 }}>
                                <DialogTitle>Holidays List</DialogTitle>
                                <DialogContent>
                                    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
                                        <Table sx={{ minWidth: 650 }}>
                                            <TableHead sx={{ backgroundColor: '#E0BBE4' }}>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#333' }}>
                                                            <AssignmentIcon /> S.No
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#333' }}>
                                                            <DateRangeIcon /> Date
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#333' }}>
                                                            <EventIcon /> Name
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#333' }}>
                                                            <WbSunnyIcon /> Day
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {indianHolidays.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((day) => (
                                                    <TableRow key={day.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#EDE7F6' } }}>
                                                        <TableCell sx={{ color: '#555' }}>{day.id}</TableCell>
                                                        <TableCell sx={{ color: '#555' }}>{day.date}</TableCell>
                                                        <TableCell sx={{ color: '#555' }}>{day.festival}</TableCell>
                                                        <TableCell sx={{ color: '#555' }}>{day.day}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 15]}
                                            component="div"
                                            count={indianHolidays.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handlePageChange}
                                            onRowsPerPageChange={handleRowsPerPageChange}
                                            sx={{ borderTop: '1px solid #e0e0e0' }}
                                        />
                                    </TableContainer>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={handleHolidaysListCloseButton}
                                        sx={{
                                            backgroundColor: '#800080', // Default background color
                                            color: 'white', // Default text color
                                            '&:hover': {
                                                backgroundColor: '#4B0082', // Darker background on hover
                                            },
                                        }}
                                    >
                                        Close
                                    </Button>
                                </DialogActions>
                            </Dialog>

                        </Box>
                    </Grid>
                </Grid>


            </Box>
        </div>
    )
}

export default EmployeeLeaveManagement;