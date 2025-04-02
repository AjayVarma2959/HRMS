import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Typography,
    Card,
    CardContent,
    Chip,
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
    Grid,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    LinearProgress,
    Avatar,
    AvatarGroup,
    Tooltip,

} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { styled } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TimelineIcon from '@mui/icons-material/Timeline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';


const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: '12px',
        padding: theme.spacing(2),
        minWidth: '500px'
    }
}));

export const ProjectList = ({ onProjectSelect }) => {
    const navigate = useNavigate();


    const defaultProjects = {
        todo: [
            {
                id: 1,
                name: 'Build a React App',
                status: 'Todo',
                description: 'Create a basic React application.',
                client: 'Internal',
                startDate: new Date().toISOString(),
                endDate: new Date(Date.now() + 864000000).toISOString(),
                priority: 'High',
                progress: 0,
                projectManager: '',
                teamLead: '',
                teamMembers: []
            },
            {
                id: 2,
                name: 'Write Documentation',
                status: 'Todo',
                description: 'Document the project requirements.',
                client: 'Internal',
                startDate: new Date().toISOString(),
                endDate: new Date(Date.now() + 864000000).toISOString(),
                priority: 'Medium',
                progress: 0,
                projectManager: '',
                teamLead: '',
                teamMembers: []
            }
        ],
        ongoing: [
            {
                id: 3,
                name: 'Develop API',
                status: 'Ongoing',
                description: 'Work on the backend API development.',
                client: 'External',
                startDate: new Date().toISOString(),
                endDate: new Date(Date.now() + 864000000).toISOString(),
                priority: 'High',
                progress: 50,
                projectManager: '',
                teamLead: '',
                teamMembers: []
            }
        ],
        completed: [
            {
                id: 4,
                name: 'Project Setup',
                status: 'Completed',
                description: 'Set up the project structure and environment.',
                client: 'Internal',
                startDate: new Date().toISOString(),
                endDate: new Date().toISOString(),
                priority: 'Low',
                progress: 100,
                projectManager: '',
                teamLead: '',
                teamMembers: []
            }
        ]
    };

    const [projects, setProjects] = useState(defaultProjects);
    const [selectedCategory, setSelectedCategory] = useState('todo');
    const [openDialog, setOpenDialog] = useState(false);
    const [newProject, setNewProject] = useState({
        name: '',
        client: '',
        startDate: null,
        endDate: null,
        status: 'Todo',
        description: '',
        priority: 'Medium',
        progress: 0
    });

    useEffect(() => {
        const loadProjects = () => {
            try {
                const savedProjects = localStorage.getItem('projectsData');
                if (savedProjects) {
                    const parsedProjects = JSON.parse(savedProjects);
                    const initializedProjects = {
                        todo: Array.isArray(parsedProjects.todo) ? parsedProjects.todo : defaultProjects.todo,
                        ongoing: Array.isArray(parsedProjects.ongoing) ? parsedProjects.ongoing : defaultProjects.ongoing,
                        completed: Array.isArray(parsedProjects.completed) ? parsedProjects.completed : defaultProjects.completed
                    };
                    setProjects(initializedProjects);
                } else {
                    localStorage.setItem('projectsData', JSON.stringify(defaultProjects));
                }

                const savedCategory = localStorage.getItem('projectCategory');
                if (savedCategory && ['todo', 'ongoing', 'completed'].includes(savedCategory)) {
                    setSelectedCategory(savedCategory);
                }
            } catch (error) {
                console.error('Error loading projects:', error);
                setProjects(defaultProjects);
                localStorage.setItem('projectsData', JSON.stringify(defaultProjects));
            }
        };

        const handleStorageChange = (e) => {
            if (e.key === 'projectsData' && e.newValue) {
                try {
                    const updatedProjects = JSON.parse(e.newValue);
                    setProjects({
                        todo: Array.isArray(updatedProjects.todo) ? updatedProjects.todo : defaultProjects.todo,
                        ongoing: Array.isArray(updatedProjects.ongoing) ? updatedProjects.ongoing : defaultProjects.ongoing,
                        completed: Array.isArray(updatedProjects.completed) ? updatedProjects.completed : defaultProjects.completed
                    });
                } catch (error) {
                    console.error('Error updating projects:', error);
                    setProjects(defaultProjects);
                }
            }
        };

        loadProjects();
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const cardData = [
        {
            title: 'Todo',
            count: projects?.todo?.length || 0,
            icon: <AssignmentIcon sx={{ fontSize: 40, color: 'white' }} />,
            gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)',
            key: 'todo'
        },
        {
            title: 'Ongoing',
            count: projects?.ongoing?.length || 0,
            icon: <TimelineIcon sx={{ fontSize: 40, color: 'white' }} />,
            gradient: 'linear-gradient(135deg, #4ECDC4 0%, #556270 100%)',
            key: 'ongoing'
        },
        {
            title: 'Completed',
            count: projects?.completed?.length || 0,
            icon: <CheckCircleIcon sx={{ fontSize: 40, color: 'white' }} />,
            gradient: 'linear-gradient(135deg, #52c234 0%, #061700 100%)',
            key: 'completed'
        }
    ];

    const handleEdit = (id) => {
        alert(`Edit Project ID: ${id}`);
    };

    const handleDelete = (id) => {
        try {
            const updatedProjects = {
                ...projects,
                [selectedCategory]: projects[selectedCategory].filter(project => project.id !== id)
            };
            setProjects(updatedProjects);
            localStorage.setItem('projectsData', JSON.stringify(updatedProjects));
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewProject({
            name: '',
            client: '',
            startDate: null,
            endDate: null,
            status: 'Todo',
            description: '',
            priority: 'Medium',
            progress: 0
        });
    };

    const handleCreateProject = () => {
        try {
            if (newProject.name && newProject.client && newProject.startDate && newProject.endDate) {
                const targetCategory = newProject.status.toLowerCase();
                const currentProjects = projects[targetCategory] || [];

                const newProjectItem = {
                    id: Math.max(...currentProjects.map(p => p.id || 0), 0) + 1,
                    ...newProject,
                    startDate: newProject.startDate.toISOString(),
                    endDate: newProject.endDate.toISOString(),
                    teamMembers: []
                };

                const updatedProjects = {
                    ...projects,
                    [targetCategory]: [...currentProjects, newProjectItem]
                };

                setProjects(updatedProjects);
                localStorage.setItem('projectsData', JSON.stringify(updatedProjects));
                handleCloseDialog();
            } else {
                alert('Please fill in all required fields!');
            }
        } catch (error) {
            console.error('Error creating project:', error);
            alert('Error creating project. Please try again.');
        }
    };


    const handleProjectClick = (project) => {
        try {
            localStorage.setItem('currentProject', JSON.stringify(project));
            localStorage.setItem('projectCategory', selectedCategory);
            onProjectSelect(project);
        } catch (error) {
            console.error('Error selecting project:', error);
        }
    };
    return (
        <Box sx={{ p: 3 }}>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 4
            }}>
                <Typography variant="h5" sx={{ fontWeight: 500, color: '#1e293b' }}>
                    Projects Overview
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenDialog}
                    sx={{
                        backgroundColor: '#3b82f6',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: '#2563eb'
                        }
                    }}
                >
                    New Project
                </Button>
            </Box>


            <Grid container spacing={3} sx={{ mb: 4 }}>
                {cardData.map((card) => (
                    <Grid item xs={12} sm={4} key={card.title}>
                        <Card
                            onClick={() => setSelectedCategory(card.key)}
                            sx={{
                                background: '#ffffff',
                                cursor: 'pointer',
                                borderRadius: '16px',
                                position: 'relative',
                                overflow: 'hidden',
                                minHeight: '160px',
                                transition: 'all 0.3s ease',
                                border: selectedCategory === card.key ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                    '& .card-bg': {
                                        transform: 'scale(1.1)',
                                    },
                                    '& .card-icon': {
                                        transform: 'rotate(10deg) scale(1.1)',
                                    }
                                }
                            }}
                        >
                            {/* Background Gradient Overlay */}
                            <Box
                                className="card-bg"
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    opacity: 0.1,
                                    background: card.gradient,
                                    transition: 'transform 0.3s ease',
                                    zIndex: 1
                                }}
                            />

                            <CardContent sx={{ position: 'relative', zIndex: 2, p: 3 }}>
                                {/* Card Header */}
                                <Box sx={{ mb: 2 }}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: '#64748b',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            fontSize: '0.75rem',
                                            fontWeight: 600
                                        }}
                                    >
                                        Projects
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            color: '#1e293b',
                                            fontWeight: 700,
                                            mt: 0.5
                                        }}
                                    >
                                        {card.title}
                                    </Typography>
                                </Box>

                                {/* Card Content */}
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <Box>
                                        <Typography
                                            variant="h3"
                                            sx={{
                                                color: '#3b82f6',
                                                fontWeight: 800,
                                                lineHeight: 1
                                            }}
                                        >
                                            {card.count}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: '#64748b',
                                                mt: 1
                                            }}
                                        >
                                            Total Count
                                        </Typography>
                                    </Box>

                                    {/* Icon Container */}
                                    <Box
                                        className="card-icon"
                                        sx={{
                                            width: '52px',
                                            height: '52px',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: card.gradient,
                                            transition: 'all 0.3s ease',
                                            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        {React.cloneElement(card.icon, {
                                            sx: {
                                                fontSize: 28,
                                                color: 'white'
                                            }
                                        })}
                                    </Box>
                                </Box>

                                {/* Progress Bar */}
                                <Box sx={{ mt: 3 }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={(card.count / Math.max(...cardData.map(c => c.count))) * 100}
                                        sx={{
                                            height: 6,
                                            borderRadius: 3,
                                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                            '& .MuiLinearProgress-bar': {
                                                background: card.gradient,
                                                borderRadius: 3
                                            }
                                        }}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    animation: 'fadeIn 0.3s ease-in-out',
                    overflow: 'hidden'
                }}
            >
                <Box sx={{ 
    borderRadius: '24px', 
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    boxShadow: '0 0 20px rgba(0,0,0,0.05)'
}}>
    <Table>
        {/* Modern Minimal Header */}
        <TableHead>
            <TableRow>
                {[
                    'Project', 'Manager', 'Team Lead', 'Team', 
                    'Client', 'Priority', 'Progress', 'Actions'
                ].map((header) => (
                    <TableCell
                        key={header}
                        sx={{
                            backgroundColor: '#f8fafc',
                            color: '#64748b',
                            fontSize: '13px',
                            fontWeight: 600,
                            padding: '16px 20px',
                            borderBottom: '2px solid #e2e8f0',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {header}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>

        <TableBody>
            {projects[selectedCategory].map((project) => (
                <TableRow
                    key={project.id}
                    onClick={() => handleProjectClick(project)}
                    sx={{
                        '&:hover': {
                            backgroundColor: '#fafafa',
                            '& .action-cell': { opacity: 1 }
                        },
                        transition: 'all 0.2s ease',
                        cursor:"pointer"
                    }}
                >
                    {/* Project Name Cell */}
                    <TableCell sx={{ padding: '20px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#f1f5f9',
                                color: '#3b82f6'
                            }}>
                                {project.name.charAt(0).toUpperCase()}
                            </Box>
                            <Box>
                                <Typography sx={{ 
                                    fontWeight: 600, 
                                    color: '#1e293b',
                                    fontSize: '14px'
                                }}>
                                    {project.name}
                                </Typography>
                                <Typography sx={{ 
                                    color: '#94a3b8',
                                    fontSize: '12px',
                                    mt: 0.5
                                }}>
                                    Created 2 days ago
                                </Typography>
                            </Box>
                        </Box>
                    </TableCell>

                    {/* Manager Cell */}
                    <TableCell sx={{ padding: '20px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar
                                sx={{ 
                                    width: 32, 
                                    height: 32,
                                    backgroundColor: '#e0f2fe',
                                    color: '#0ea5e9',
                                    fontSize: '14px'
                                }}
                            >
                                {project.projectManager?.charAt(0) || '?'}
                            </Avatar>
                            <Typography sx={{ 
                                color: '#334155',
                                fontSize: '14px'
                            }}>
                                {project.projectManager || 'Unassigned'}
                            </Typography>
                        </Box>
                    </TableCell>

                    {/* Team Lead Cell */}
                    <TableCell sx={{ padding: '20px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar
                                sx={{ 
                                    width: 32, 
                                    height: 32,
                                    backgroundColor: '#fae8ff',
                                    color: '#d946ef',
                                    fontSize: '14px'
                                }}
                            >
                                {project.teamLead?.charAt(0) || '?'}
                            </Avatar>
                            <Typography sx={{ 
                                color: '#334155',
                                fontSize: '14px'
                            }}>
                                {project.teamLead || 'Unassigned'}
                            </Typography>
                        </Box>
                    </TableCell>

                    {/* Team Members Cell */}
                    <TableCell sx={{ padding: '20px' }}>
                        <AvatarGroup
                            max={3}
                            sx={{
                                '& .MuiAvatar-root': {
                                    width: 30,
                                    height: 30,
                                    fontSize: '13px',
                                    border: '2px solid #fff'
                                }
                            }}
                        >
                            {(project.teamMembers || []).map((member, idx) => (
                                <Tooltip key={idx} title={member.name}>
                                    <Avatar 
                                        src={member.avatar}
                                        sx={{
                                            backgroundColor: `hsl(${idx * 40}, 70%, 50%)`
                                        }}
                                    >
                                        {member.name.charAt(0)}
                                    </Avatar>
                                </Tooltip>
                            ))}
                        </AvatarGroup>
                    </TableCell>

                    {/* Client Cell */}
                    <TableCell sx={{ padding: '20px' }}>
                        <Box sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            backgroundColor: '#f1f5f9',
                            borderRadius: '20px',
                            padding: '6px 12px'
                        }}>
                            <Typography sx={{ 
                                color: '#334155',
                                fontSize: '13px',
                                fontWeight: 500
                            }}>
                                {project.client || 'No Client'}
                            </Typography>
                        </Box>
                    </TableCell>

                    {/* Priority Cell */}
                    <TableCell sx={{ padding: '20px' }}>
                        <Box sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 1,
                            borderRadius: '20px',
                            padding: '6px 12px',
                            ...({
                                'High': {
                                    backgroundColor: '#fef2f2',
                                    color: '#ef4444',
                                },
                                'Medium': {
                                    backgroundColor: '#fefce8',
                                    color: '#eab308',
                                },
                                'Low': {
                                    backgroundColor: '#f0fdf4',
                                    color: '#22c55e',
                                }
                            }[project.priority])
                        }}>
                            <Box sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                backgroundColor: 'currentColor'
                            }} />
                            <Typography sx={{ 
                                fontSize: '13px',
                                fontWeight: 600
                            }}>
                                {project.priority}
                            </Typography>
                        </Box>
                    </TableCell>

                    {/* Progress Cell */}
                    <TableCell sx={{ padding: '20px' }}>
                        <Box sx={{ position: 'relative', width: '150px' }}>
                            <Box sx={{
                                width: '100%',
                                height: '6px',
                                backgroundColor: '#f1f5f9',
                                borderRadius: '10px',
                                overflow: 'hidden'
                            }}>
                                <Box 
                                    sx={{
                                        height: '100%',
                                        width: `${project.progress}%`,
                                        backgroundColor: project.progress >= 80 ? '#22c55e' :
                                                       project.progress >= 40 ? '#3b82f6' : 
                                                       '#ef4444',
                                        transition: 'width 0.3s ease'
                                    }}
                                />
                            </Box>
                            <Typography sx={{
                                position: 'absolute',
                                right: -30,
                                top: -10,
                                fontSize: '12px',
                                fontWeight: 600,
                                color: '#64748b'
                            }}>
                                {project.progress}%
                            </Typography>
                        </Box>
                    </TableCell>

                    {/* Actions Cell */}
                    <TableCell 
                        className="action-cell"
                        sx={{ 
                            padding: '20px',
                            opacity: 0,
                            transition: 'opacity 0.2s ease'
                        }}
                    >
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(project.id);
                                }}
                                sx={{
                                    width: 34,
                                    height: 34,
                                    backgroundColor: '#f8fafc',
                                    '&:hover': {
                                        backgroundColor: '#f1f5f9'
                                    }
                                }}
                            >
                                <EditIcon sx={{ fontSize: 18, color: '#64748b' }} />
                            </IconButton>
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(project.id);
                                }}
                                sx={{
                                    width: 34,
                                    height: 34,
                                    backgroundColor: '#fef2f2',
                                    '&:hover': {
                                        backgroundColor: '#fee2e2'
                                    }
                                }}
                            >
                                <DeleteIcon sx={{ fontSize: 18, color: '#ef4444' }} />
                            </IconButton>
                        </Box>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
</Box>
            </TableContainer>


            <StyledDialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        background: 'linear-gradient(to right bottom, #ffffff, #f8f9ff)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    }
                }}
            >
                <DialogTitle>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        p: 2,
                        borderRadius: '12px',
                        color: 'white'
                    }}>
                        <AddIcon sx={{ mr: 1, color: 'white', fontSize: 28 }} />
                        <Typography variant="h5" component="span" sx={{ fontWeight: 600 }}>
                            Create New Project
                        </Typography>
                    </Box>
                </DialogTitle>

                <DialogContent sx={{ mt: 2 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Project Name"
                                fullWidth
                                required
                                value={newProject.name}
                                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                InputProps={{
                                    sx: {
                                        borderRadius: '8px',
                                        '&:hover': {
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#3b82f6'
                                            }
                                        }
                                    }
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#3b82f6'
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#3b82f6'
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Client"
                                fullWidth
                                required
                                value={newProject.client}
                                onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                                InputProps={{
                                    sx: {
                                        borderRadius: '8px',
                                        '&:hover': {
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#3b82f6'
                                            }
                                        }
                                    }
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#3b82f6'
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#3b82f6'
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Start Date"
                                    value={newProject.startDate}
                                    onChange={(date) => setNewProject({ ...newProject, startDate: date })}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            required
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '8px',
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#3b82f6'
                                                    }
                                                },
                                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#3b82f6'
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: '#3b82f6'
                                                }
                                            }}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="End Date"
                                    value={newProject.endDate}
                                    onChange={(date) => setNewProject({ ...newProject, endDate: date })}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            required
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '8px',
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#3b82f6'
                                                    }
                                                },
                                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#3b82f6'
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: '#3b82f6'
                                                }
                                            }}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>



                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel sx={{ '&.Mui-focused': { color: '#3b82f6' } }}>Priority</InputLabel>
                                <Select
                                    value={newProject.priority}
                                    label="Priority"
                                    onChange={(e) => setNewProject({ ...newProject, priority: e.target.value })}
                                    sx={{
                                        borderRadius: '8px',
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#3b82f6'
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#3b82f6'
                                        }
                                    }}
                                >
                                    <MenuItem value="Low" sx={{ color: '#4caf50' }}>Low</MenuItem>
                                    <MenuItem value="Medium" sx={{ color: '#ff9800' }}>Medium</MenuItem>
                                    <MenuItem value="High" sx={{ color: '#f44336' }}>High</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                fullWidth
                                multiline
                                rows={4}
                                value={newProject.description}
                                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                InputProps={{
                                    sx: {
                                        borderRadius: '8px',
                                        '&:hover': {
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#3b82f6'
                                            }
                                        }
                                    }
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#3b82f6'
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#3b82f6'
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{
                                p: 2,
                                borderRadius: '12px',
                                background: 'linear-gradient(to right, #f8f9ff, #ffffff)',
                                border: '1px solid #e0e7ff'
                            }}>
                                <Typography variant="subtitle2" gutterBottom sx={{ color: '#3b82f6', fontWeight: 600 }}>
                                    Project Progress
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={newProject.progress}
                                    sx={{
                                        height: 10,
                                        borderRadius: 5,
                                        backgroundColor: '#e0e7ff',
                                        '& .MuiLinearProgress-bar': {
                                            background: 'linear-gradient(to right, #3b82f6, #2563eb)'
                                        }
                                    }}
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                    <Typography variant="caption" sx={{ color: '#64748b' }}>0%</Typography>
                                    <Typography variant="caption" sx={{ color: '#64748b' }}>100%</Typography>
                                </Box>
                                <TextField
                                    type="number"
                                    label="Progress Percentage"
                                    value={newProject.progress}
                                    onChange={(e) => setNewProject({
                                        ...newProject,
                                        progress: Math.min(100, Math.max(0, parseInt(e.target.value) || 0))
                                    })}
                                    InputProps={{
                                        inputProps: { min: 0, max: 100 },
                                        sx: { borderRadius: '8px' }
                                    }}
                                    sx={{
                                        mt: 2,
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#3b82f6'
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: '#3b82f6'
                                        }
                                    }}
                                    fullWidth
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions sx={{ p: 3, background: '#f8f9ff' }}>
                    <Button
                        onClick={handleCloseDialog}
                        variant="outlined"
                        sx={{
                            borderRadius: '8px',
                            textTransform: 'none',
                            borderColor: '#94a3b8',
                            color: '#94a3b8',
                            px: 4,
                            '&:hover': {
                                borderColor: '#64748b',
                                backgroundColor: 'transparent'
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreateProject}
                        variant="contained"
                        sx={{
                            borderRadius: '8px',
                            textTransform: 'none',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            px: 4,
                            '&:hover': {
                                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
                            }
                        }}
                    >
                        Create Project
                    </Button>
                </DialogActions>
            </StyledDialog>
        </Box>
    );
};

export default ProjectList;