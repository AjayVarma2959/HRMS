// ScheduleMeetingDialog.jsx
import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    OutlinedInput,
    FormHelperText,
    Button,
    Box,
    Stack,
    Grid,
    Typography,
    Alert,
    Snackbar,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {
    Schedule,
    LocationOn,
    Group,
    Description,
    Title,
    Timer,
    VideoCall,
    MeetingRoom,
} from '@mui/icons-material';

const ScheduleMeetingDialog = ({ open, onClose }) => {
    // Form State
    const [meetingForm, setMeetingForm] = useState({
        title: '',
        description: '',
        date: new Date(),
        duration: 30,
        participants: [],
        meetingType: 'online',
        location: '',
        platform: 'zoom', // for online meetings
        agenda: '',
        recurring: 'no',
        reminderTime: 15,
    });

    // Error State
    const [formErrors, setFormErrors] = useState({});
    
    // Success Snackbar State
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

    // Sample Team Members Data
    const teamMembers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Manager' },
        { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'QA' },
        { id: 5, name: 'Alex Brown', email: 'alex@example.com', role: 'Developer' },
    ];

    // Meeting Platforms
    const platforms = [
        { value: 'zoom', label: 'Zoom' },
        { value: 'teams', label: 'Microsoft Teams' },
        { value: 'meet', label: 'Google Meet' },
        { value: 'webex', label: 'Cisco Webex' },
    ];

    // Reminder Times
    const reminderTimes = [
        { value: 5, label: '5 minutes before' },
        { value: 15, label: '15 minutes before' },
        { value: 30, label: '30 minutes before' },
        { value: 60, label: '1 hour before' },
    ];

    // Form Change Handler
    const handleFormChange = (field) => (event) => {
        setMeetingForm({
            ...meetingForm,
            [field]: event.target.value
        });
        // Clear error when user starts typing
        if (formErrors[field]) {
            setFormErrors({
                ...formErrors,
                [field]: ''
            });
        }
    };

    // Date Change Handler
    const handleDateChange = (newDate) => {
        setMeetingForm({
            ...meetingForm,
            date: newDate
        });
    };

    // Form Validation
    const validateForm = () => {
        const errors = {};
        if (!meetingForm.title.trim()) errors.title = 'Title is required';
        if (!meetingForm.description.trim()) errors.description = 'Description is required';
        if (!meetingForm.participants.length) errors.participants = 'Select at least one participant';
        if (meetingForm.meetingType === 'physical' && !meetingForm.location.trim()) {
            errors.location = 'Location is required for physical meetings';
        }
        if (meetingForm.meetingType === 'online' && !meetingForm.platform) {
            errors.platform = 'Please select a meeting platform';
        }
        return errors;
    };

    // Handle Meeting Schedule
    const handleScheduleMeeting = () => {
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        // Here you would typically make an API call to save the meeting
        console.log('Meeting scheduled:', meetingForm);
        
        // Show success message
        setShowSuccessSnackbar(true);
        
        // Close dialog after delay
        setTimeout(() => {
            handleClose();
        }, 1500);
    };

    // Handle Dialog Close
    const handleClose = () => {
        setMeetingForm({
            title: '',
            description: '',
            date: new Date(),
            duration: 30,
            participants: [],
            meetingType: 'online',
            location: '',
            platform: 'zoom',
            agenda: '',
            recurring: 'no',
            reminderTime: 15,
        });
        setFormErrors({});
        onClose();
    };

    return (
        <>
            <Dialog 
                open={open} 
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    }
                }}
            >
                <DialogTitle sx={{ 
                    pb: 1,
                    borderBottom: '1px solid #eee',
                    bgcolor: '#f8f9fa',
                }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Schedule sx={{ color: '#1976d2' }} />
                        <Typography variant="h6" component="span">
                            Schedule New Meeting
                        </Typography>
                    </Stack>
                </DialogTitle>

                <DialogContent sx={{ mt: 2 }}>
                    <Stack spacing={3}>
                        {/* Meeting Title */}
                        <TextField
                            label="Meeting Title"
                            fullWidth
                            value={meetingForm.title}
                            onChange={handleFormChange('title')}
                            error={!!formErrors.title}
                            helperText={formErrors.title}
                            InputProps={{
                                startAdornment: <Title sx={{ mr: 1, color: 'action.active' }} />,
                            }}
                        />

                        {/* Description */}
                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            rows={3}
                            value={meetingForm.description}
                            onChange={handleFormChange('description')}
                            error={!!formErrors.description}
                            helperText={formErrors.description}
                            InputProps={{
                                startAdornment: <Description sx={{ mr: 1, color: 'action.active' }} />,
                            }}
                        />

                        {/* Date, Time and Duration */}
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        label="Date & Time"
                                        value={meetingForm.date}
                                        onChange={handleDateChange}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                        minDate={new Date()}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Duration</InputLabel>
                                    <Select
                                        value={meetingForm.duration}
                                        onChange={handleFormChange('duration')}
                                        label="Duration"
                                        startAdornment={<Timer sx={{ mr: 1, color: 'action.active' }} />}
                                    >
                                        <MenuItem value={15}>15 minutes</MenuItem>
                                        <MenuItem value={30}>30 minutes</MenuItem>
                                        <MenuItem value={45}>45 minutes</MenuItem>
                                        <MenuItem value={60}>1 hour</MenuItem>
                                        <MenuItem value={90}>1.5 hours</MenuItem>
                                        <MenuItem value={120}>2 hours</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        {/* Participants Selection */}
                        <FormControl fullWidth error={!!formErrors.participants}>
                            <InputLabel>Participants</InputLabel>
                            <Select
                                multiple
                                value={meetingForm.participants}
                                onChange={handleFormChange('participants')}
                                input={<OutlinedInput label="Participants" />}
                                startAdornment={<Group sx={{ mr: 1, color: 'action.active' }} />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip 
                                                key={value} 
                                                label={teamMembers.find(tm => tm.id === value)?.name}
                                                sx={{ 
                                                    backgroundColor: '#e3f2fd',
                                                    '& .MuiChip-label': { color: '#1976d2' }
                                                }}
                                            />
                                        ))}
                                    </Box>
                                )}
                            >
                                {teamMembers.map((member) => (
                                    <MenuItem key={member.id} value={member.id}>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <Typography>{member.name}</Typography>
                                            <Chip 
                                                label={member.role} 
                                                size="small"
                                                sx={{ bgcolor: '#f5f5f5' }}
                                            />
                                        </Stack>
                                    </MenuItem>
                                ))}
                            </Select>
                            {formErrors.participants && (
                                <FormHelperText>{formErrors.participants}</FormHelperText>
                            )}
                        </FormControl>

                        {/* Meeting Type Selection */}
                        <FormControl fullWidth>
                            <InputLabel>Meeting Type</InputLabel>
                            <Select
                                value={meetingForm.meetingType}
                                onChange={handleFormChange('meetingType')}
                                label="Meeting Type"
                                startAdornment={
                                    meetingForm.meetingType === 'online' 
                                        ? <VideoCall sx={{ mr: 1, color: 'action.active' }} />
                                        : <MeetingRoom sx={{ mr: 1, color: 'action.active' }} />
                                }
                            >
                                <MenuItem value="online">Online Meeting</MenuItem>
                                <MenuItem value="physical">Physical Meeting</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Conditional Fields Based on Meeting Type */}
                        {meetingForm.meetingType === 'physical' ? (
                            <TextField
                                label="Location"
                                fullWidth
                                value={meetingForm.location}
                                onChange={handleFormChange('location')}
                                error={!!formErrors.location}
                                helperText={formErrors.location}
                                InputProps={{
                                    startAdornment: <LocationOn sx={{ mr: 1, color: 'action.active' }} />,
                                }}
                            />
                        ) : (
                            <FormControl fullWidth error={!!formErrors.platform}>
                                <InputLabel>Platform</InputLabel>
                                <Select
                                    value={meetingForm.platform}
                                    onChange={handleFormChange('platform')}
                                    label="Platform"
                                >
                                    {platforms.map((platform) => (
                                        <MenuItem key={platform.value} value={platform.value}>
                                            {platform.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {formErrors.platform && (
                                    <FormHelperText>{formErrors.platform}</FormHelperText>
                                )}
                            </FormControl>
                        )}

                        {/* Recurring Meeting Option */}
                        <FormControl fullWidth>
                            <InputLabel>Recurring Meeting</InputLabel>
                            <Select
                                value={meetingForm.recurring}
                                onChange={handleFormChange('recurring')}
                                label="Recurring Meeting"
                            >
                                <MenuItem value="no">No</MenuItem>
                                <MenuItem value="daily">Daily</MenuItem>
                                <MenuItem value="weekly">Weekly</MenuItem>
                                <MenuItem value="monthly">Monthly</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Reminder Time */}
                        <FormControl fullWidth>
                            <InputLabel>Reminder</InputLabel>
                            <Select
                                value={meetingForm.reminderTime}
                                onChange={handleFormChange('reminderTime')}
                                label="Reminder"
                            >
                                {reminderTimes.map((time) => (
                                    <MenuItem key={time.value} value={time.value}>
                                        {time.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Agenda */}
                        <TextField
                            label="Agenda (Optional)"
                            fullWidth
                            multiline
                            rows={2}
                            value={meetingForm.agenda}
                            onChange={handleFormChange('agenda')}
                            placeholder="List the meeting agenda points..."
                        />
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ p: 3, borderTop: '1px solid #eee' }}>
                    <Button 
                        onClick={handleClose}
                        sx={{ color: 'text.secondary' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleScheduleMeeting}
                        startIcon={<Schedule />}
                        sx={{
                            bgcolor: '#4caf50',
                            '&:hover': {
                                bgcolor: '#43a047'
                            }
                        }}
                    >
                        Schedule Meeting
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Success Snackbar */}
            <Snackbar
                open={showSuccessSnackbar}
                autoHideDuration={3000}
                onClose={() => setShowSuccessSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert 
                    onClose={() => setShowSuccessSnackbar(false)} 
                    severity="success"
                    variant="filled"
                >
                    Meeting scheduled successfully!
                </Alert>
            </Snackbar>
        </>
    );
};

export default ScheduleMeetingDialog;