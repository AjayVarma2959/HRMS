import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Typography,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Avatar,
    Stack
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

export const ProjectDialog = ({ open, onClose, project, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        department: '',
        startDate: null,
        deadline: null,
        budget: '',
        priority: '',
        status: '',
        description: ''
    });

    useEffect(() => {
        if (project) {
            setFormData(project);
        }
    }, [project]);

    const handleChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    };

    const handleDateChange = (field, date) => {
        setFormData({
            ...formData,
            [field]: date
        });
    };

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                {project ? 'Edit Project' : 'Create New Project'}
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Project Name"
                            value={formData.name}
                            onChange={handleChange('name')}
                            required
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Type</InputLabel>
                            <Select
                                value={formData.type}
                                onChange={handleChange('type')}
                                label="Type"
                            >
                                <MenuItem value="Development">Development</MenuItem>
                                <MenuItem value="Design">Design</MenuItem>
                                <MenuItem value="Marketing">Marketing</MenuItem>
                                <MenuItem value="Research">Research</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Department</InputLabel>
                            <Select
                                value={formData.department}
                                onChange={handleChange('department')}
                                label="Department"
                            >
                                <MenuItem value="Technology">Technology</MenuItem>
                                <MenuItem value="Design">Design</MenuItem>
                                <MenuItem value="Marketing">Marketing</MenuItem>
                                <MenuItem value="Sales">Sales</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Start Date"
                                value={formData.startDate}
                                onChange={(date) => handleDateChange('startDate', date)}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        variant: 'outlined'
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Deadline"
                                value={formData.deadline}
                                onChange={(date) => handleDateChange('deadline', date)}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        variant: 'outlined'
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Budget"
                            type="number"
                            value={formData.budget}
                            onChange={handleChange('budget')}
                            InputProps={{
                                startAdornment: '$'
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Priority</InputLabel>
                            <Select
                                value={formData.priority}
                                onChange={handleChange('priority')}
                                label="Priority"
                            >
                                <MenuItem value="High">High</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={formData.status}
                                onChange={handleChange('status')}
                                label="Status"
                            >
                                <MenuItem value="Planning">Planning</MenuItem>
                                <MenuItem value="In Progress">In Progress</MenuItem>
                                <MenuItem value="On Hold">On Hold</MenuItem>
                                <MenuItem value="Completed">Completed</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            multiline
                            rows={4}
                            value={formData.description}
                            onChange={handleChange('description')}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">
                    {project ? 'Update' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export const ProjectDetailsDialog = ({ open, onClose, project }) => {
    if (!project) return null;

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="lg"
            fullWidth
        >
            <DialogContent sx={{ p: 0 }}>
                <Grid container>
                    {/* Left Panel */}
                    <Grid item xs={12} md={3} sx={{ 
                        borderRight: '1px solid #e0e0e0',
                        bgcolor: '#fff',
                        p: 3
                    }}>
                        <Typography variant="h6" sx={{ mb: 3 }}>Project Details</Typography>
                        
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary">Client</Typography>
                            <Typography>{project.client}</Typography>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary">Project Total Cost</Typography>
                            <Typography>${project.budget}</Typography>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary">Hours of Work</Typography>
                            <Typography>150 hrs</Typography>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary">Created on</Typography>
                            <Typography>{new Date(project.startDate).toLocaleDateString()}</Typography>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary">Due Date</Typography>
                            <Typography>
                                {new Date(project.deadline).toLocaleDateString()}
                                <Chip 
                                    label="Q1" 
                                    size="small" 
                                    color="error" 
                                    sx={{ ml: 1 }}
                                />
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary">Priority</Typography>
                            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ 
                                    color: project.priority === 'High' ? 'red' : 
                                           project.priority === 'Medium' ? 'orange' : 'green',
                                    marginRight: '4px'
                                }}>●</span>
                                {project.priority}
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Right Panel */}
                    <Grid item xs={12} md={9} sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                            <Avatar 
                                sx={{ 
                                    width: 50, 
                                    height: 50, 
                                    bgcolor: '#6366f1',
                                    mr: 2
                                }}
                            >
                                {project.name[0]}
                            </Avatar>
                            <Box>
                                <Typography variant="h5">{project.name}</Typography>
                                <Typography color="text.secondary">Project ID: {project.id}</Typography>
                            </Box>
                            <IconButton 
                                sx={{ ml: 'auto' }}
                                onClick={onClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{ mb: 4 }}>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Status</Typography>
                            <Chip 
                                label={project.status}
                                color={
                                    project.status === 'In Progress' ? 'primary' :
                                    project.status === 'Completed' ? 'success' :
                                    project.status === 'On Hold' ? 'warning' : 'default'
                                }
                                size="small"
                            />
                        </Box>

                        <Box sx={{ mb: 4 }}>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Team Members</Typography>
                            <Stack direction="row" spacing={1}>
                                {project.teamMembers?.map((member, index) => (
                                    <Avatar key={index}>{member[0]}</Avatar>
                                ))}
                                <IconButton size="small">
                                    <AddIcon />
                                </IconButton>
                            </Stack>
                        </Box>

                        <Box sx={{ mb: 4 }}>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Description</Typography>
                            <Typography>{project.description}</Typography>
                        </Box>

                        {project.tags && (
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Tags</Typography>
                                <Stack direction="row" spacing={1}>
                                    {project.tags.map((tag, index) => (
                                        <Chip key={index} label={tag} size="small" />
                                    ))}
                                </Stack>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export const ResourceManagementDialog = ({ open, onClose, project, resources, onAddResource, onDeleteResource }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">
                        Resources - {project?.name}
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ mb: 3, mt: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={onAddResource}
                    >
                        Add Resource
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Allocation</TableCell>
                                <TableCell>Duration</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {resources.map((resource) => (
                                <TableRow key={resource.id}>
                                    <TableCell>{resource.name}</TableCell>
                                    <TableCell>{resource.role}</TableCell>
                                    <TableCell>{resource.allocation}%</TableCell>
                                    <TableCell>
                                        {new Date(resource.startDate).toLocaleDateString()} - 
                                        {new Date(resource.endDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={resource.status}
                                            color={resource.status === 'Active' ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton 
                                            size="small" 
                                            onClick={() => onDeleteResource(resource.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
        </Dialog>
    );
};

export const AddResourceDialog = ({ open, onClose, onSave }) => {
    const [resource, setResource] = useState({
        name: '',
        role: '',
        email: '',
        allocation: 100,
        startDate: null,
        endDate: null,
        cost: '',
        skills: [],
        status: 'Active'
    });

    const handleSubmit = () => {
        onSave(resource);
        setResource({
            name: '',
            role: '',
            email: '',
            allocation: 100,
            startDate: null,
            endDate: null,
            cost: '',
            skills: [],
            status: 'Active'
        });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Resource</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Name"
                            value={resource.name}
                            onChange={(e) => setResource({...resource, name: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Role</InputLabel>
                            <Select
                                value={resource.role}
                                onChange={(e) => setResource({...resource, role: e.target.value})}
                                label="Role"
                            >
                                <MenuItem value="Developer">Developer</MenuItem>
                                <MenuItem value="Designer">Designer</MenuItem>
                                <MenuItem value="Project Manager">Project Manager</MenuItem>
                                <MenuItem value="QA Engineer">QA Engineer</MenuItem>
                                <MenuItem value="Business Analyst">Business Analyst</MenuItem>
                                <MenuItem value="DevOps Engineer">DevOps Engineer</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={resource.email}
                            onChange={(e) => setResource({...resource, email: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Start Date"
                                value={resource.startDate}
                                onChange={(date) => setResource({...resource, startDate: date})}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        variant: 'outlined'
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="End Date"
                                value={resource.endDate}
                                onChange={(date) => setResource({...resource, endDate: date})}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        variant: 'outlined'
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Allocation (%)"
                            type="number"
                            value={resource.allocation}
                            onChange={(e) => setResource({...resource, allocation: Math.min(100, Math.max(0, parseInt(e.target.value) || 0))})}
                            InputProps={{
                                inputProps: { min: 0, max: 100 }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Monthly Cost"
                            type="number"
                            value={resource.cost}
                            onChange={(e) => setResource({...resource, cost: e.target.value})}
                            InputProps={{
                                startAdornment: '$'
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={resource.status}
                                onChange={(e) => setResource({...resource, status: e.target.value})}
                                label="Status"
                            >
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                                <MenuItem value="On Leave">On Leave</MenuItem>
                                <MenuItem value="Part Time">Part Time</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Skills (comma-separated)"
                            value={resource.skills.join(', ')}
                            onChange={(e) => setResource({
                                ...resource, 
                                skills: e.target.value.split(',').map(skill => skill.trim()).filter(Boolean)
                            })}
                            helperText="Enter skills separated by commas"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={() => {
                        onClose();
                        setResource({
                            name: '',
                            role: '',
                            email: '',
                            allocation: 100,
                            startDate: null,
                            endDate: null,
                            cost: '',
                            skills: [],
                            status: 'Active'
                        });
                    }}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={handleSubmit} 
                    variant="contained"
                    disabled={!resource.name || !resource.role || !resource.email}
                >
                    Add Resource
                </Button>
            </DialogActions>
        </Dialog>
    );
};