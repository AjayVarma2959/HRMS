import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Grid,
    Typography,
    Paper,
    Chip,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Alert,
    Snackbar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CancelIcon from '@mui/icons-material/Cancel';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessIcon from '@mui/icons-material/Business';
import FlagIcon from '@mui/icons-material/Flag';
import SpeedIcon from '@mui/icons-material/Speed';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    height: '100%',
    background: 'linear-gradient(135deg, #E3EEFF 0%, #F3E7FF 100%)', 
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 24px rgba(59, 130, 246, 0.2)'
    }
}));

const ProjectDetails = ({ project: initialProject, onBackToList }) => {
    const [isLoading,setIsLoading] = useState(false);

   
    const [project, setProject] = useState(initialProject);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [teamAssignment, setTeamAssignment] = useState({
        projectManager: '',
        teamLead: '',
        frontendDevelopers: [],
        backendDevelopers: []
    });
    const LoadingOverlay = styled(Box)(({ theme }) => ({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    }));
    const LoadingSpinner = styled(Box)(({ theme }) => ({
        width: '40px',
        height: '40px',
        border: '3px solid #f3f3f3',
        borderTop: '3px solid #3b82f6',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
        }
    }));
    
    const LoadingAnimation = styled(Box)(({ theme }) => ({
        width: '120px',
        height: '120px',
        perspective: '1000px',
        position: 'relative',
        animation: 'float 3s ease-in-out infinite',
        '@keyframes float': {
            '0%': {
                transform: 'translateY(0px)',
            },
            '50%': {
                transform: 'translateY(-20px)',
            },
            '100%': {
                transform: 'translateY(0px)',
            },
        },
    }));
    const Cube = styled(Box)(({ theme }) => ({
        width: '100%',
        height: '100%',
        position: 'relative',
        transformStyle: 'preserve-3d',
        animation: 'rotate 2s linear infinite',
        '@keyframes rotate': {
            '0%': {
                transform: 'rotateX(0deg) rotateY(0deg)',
            },
            '100%': {
                transform: 'rotateX(360deg) rotateY(360deg)',
            },
        },
        '& > div': {
            position: 'absolute',
            width: '100%',
            height: '100%',
            border: '2px solid #3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            backdropFilter: 'blur(4px)',
        },
        '& > div:nth-of-type(1)': { // front
            transform: 'translateZ(60px)',
        },
        '& > div:nth-of-type(2)': { // back
            transform: 'translateZ(-60px) rotateY(180deg)',
        },
        '& > div:nth-of-type(3)': { // right
            transform: 'rotateY(-90deg) translateZ(60px)',
        },
        '& > div:nth-of-type(4)': { // left
            transform: 'rotateY(90deg) translateZ(60px)',
        },
        '& > div:nth-of-type(5)': { // top
            transform: 'rotateX(90deg) translateZ(60px)',
        },
        '& > div:nth-of-type(6)': { // bottom
            transform: 'rotateX(-90deg) translateZ(60px)',
        },
    }));
    

    
    const managers = ['John Doe', 'Jane Smith', 'Mike Johnson'];
    const teamLeads = ['Sarah Wilson', 'David Brown', 'Emily Davis'];
    const developers = [
        'Alex Thompson',
        'Lisa Anderson',
        'Tom Wilson',
        'Maria Garcia',
        'James Taylor',
        'Emma White'
    ];

    useEffect(() => {
        if (initialProject) {
            setProject(initialProject);
            setTeamAssignment({
                projectManager: initialProject.projectManager || '',
                teamLead: initialProject.teamLead || '',
                frontendDevelopers: initialProject.teamMembers
                    ?.filter(m => m.role === 'frontend')
                    .map(m => m.name) || [],
                backendDevelopers: initialProject.teamMembers
                    ?.filter(m => m.role === 'backend')
                    .map(m => m.name) || []
            });
        }
    }, [initialProject]);


    const handleAssignTeam = async () => {
    try {
        setIsLoading(true); // Start loading

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        const updatedProject = {
            ...project,
            projectManager: teamAssignment.projectManager,
            teamLead: teamAssignment.teamLead,
            teamMembers: [
                ...teamAssignment.frontendDevelopers.map(dev => ({ 
                    name: dev, 
                    role: 'frontend'
                })),
                ...teamAssignment.backendDevelopers.map(dev => ({ 
                    name: dev, 
                    role: 'backend'
                }))
            ]
        };

        setProject(updatedProject);
        localStorage.setItem('currentProject', JSON.stringify(updatedProject));

        const projectsData = JSON.parse(localStorage.getItem('projectsData') || '{}');
        const category = localStorage.getItem('projectCategory');
        
        if (category) {
            const updatedProjects = {
                ...projectsData,
                [category]: projectsData[category].map(p => 
                    p.id === updatedProject.id ? updatedProject : p
                )
            };
            
            localStorage.setItem('projectsData', JSON.stringify(updatedProjects));
            
            window.dispatchEvent(new StorageEvent('storage', {
                key: 'projectsData',
                newValue: JSON.stringify(updatedProjects)
            }));
        }

        setSnackbar({
            open: true,
            message: 'Team assigned successfully!',
            severity: 'success'
        });
    } catch (error) {
        console.error('Error assigning team:', error);
        setSnackbar({
            open: true,
            message: 'Error assigning team',
            severity: 'error'
        });
    } finally {
        setIsLoading(false); // Stop loading
    }
};



    const handleRemoveMember = (member, type) => {
        const updatedTeamAssignment = {
            ...teamAssignment,
            [type]: teamAssignment[type].filter(dev => dev !== member)
        };
        
        setTeamAssignment(updatedTeamAssignment);
        
        const updatedProject = {
            ...project,
            teamMembers: [
                ...updatedTeamAssignment.frontendDevelopers.map(dev => ({ name: dev, role: 'frontend' })),
                ...updatedTeamAssignment.backendDevelopers.map(dev => ({ name: dev, role: 'backend' }))
            ]
        };

        setProject(updatedProject);
        localStorage.setItem('currentProject', JSON.stringify(updatedProject));

        const projectsData = JSON.parse(localStorage.getItem('projectsData') || '{}');
        const category = localStorage.getItem('projectCategory') || project.status.toLowerCase();
        
        const updatedProjects = {
            ...projectsData,
            [category]: projectsData[category].map(p => 
                p.id === updatedProject.id ? updatedProject : p
            )
        };
        
        localStorage.setItem('projectsData', JSON.stringify(updatedProjects));

        setSnackbar({
            open: true,
            message: `Removed ${member} from the team`,
            severity: 'info'
        });
    };

    const LeftSection = () => (
        <StyledPaper>
           <Typography variant="h5" sx={{ 
    mb: 3, 
    fontWeight: 600,
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    padding: '12px',
    borderRadius: '8px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: 1
}}>
    <AssignmentIcon />
    Project Details
</Typography>
            
            <TableContainer component={Box} sx={{ mb: 3 }}>
                <Table>
                    <TableBody>
                    <TableRow>
    <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AssignmentIcon sx={{ color: '#3b82f6' }} />
            Project Name
        </Box>
    </TableCell>
    <TableCell>
        <Chip
            label={project?.name || 'Not Assigned'}
            sx={{
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6'
            }}
        />
    </TableCell>
</TableRow>
<TableRow>
    <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SupervisorAccountIcon sx={{ color: '#3b82f6' }} />
            Manager
        </Box>
    </TableCell>
    <TableCell>
        <Chip
            label={project?.projectManager || 'Not Assigned'}
            sx={{
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6'
            }}
        />
    </TableCell>
</TableRow>
<TableRow>
    <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccountCircleIcon sx={{ color: '#6366f1' }} />
            Team Lead
        </Box>
    </TableCell>
    <TableCell>
        <Chip
            label={project?.teamLead || 'Not Assigned'}
            sx={{
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                color: '#6366f1'
            }}
        />
    </TableCell>
</TableRow>

<TableRow>
    <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GroupsIcon sx={{ color: '#22c55e' }} />
            Team Members
        </Box>
    </TableCell>
    <TableCell>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {project?.teamMembers?.length > 0 ? (
                project.teamMembers.map((member, index) => (
                    <Chip
                        key={index}
                        label={`${member.name} (${member.role})`} 
                        sx={{
                            backgroundColor: member.role === 'frontend' 
                                ? 'rgba(34, 197, 94, 0.1)' 
                                : 'rgba(234, 179, 8, 0.1)',
                            color: member.role === 'frontend' 
                                ? '#22c55e' 
                                : '#eab308',
                            margin: '2px',
                            '& .MuiChip-label': {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }
                        }}
                        icon={member.role === 'frontend' ? <CodeIcon /> : <StorageIcon />}
                    />
                ))
            ) : (
                <Typography variant="body2" color="text.secondary">
                    No team members assigned
                </Typography>
            )}
        </Box>
    </TableCell>
</TableRow>
<TableRow>
    <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BusinessIcon sx={{ color: '#6366f1' }} />
            Client
        </Box>
    </TableCell>
    <TableCell>
        <Chip
            label={project?.client || 'Not Assigned'}
            sx={{
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                color: '#6366f1'
            }}
        />
    </TableCell>
</TableRow>
<TableRow>
    <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FlagIcon sx={{ color: '#eab308' }} />
            Priority
        </Box>
    </TableCell>
    <TableCell>
        <Chip
            label={project?.priority || 'Not Set'}
            sx={{
                backgroundColor: 'rgba(234, 179, 8, 0.1)',
                color: '#eab308'
            }}
        />
    </TableCell>
</TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

           

            <Box sx={{ mt: 4 }}>
    <Typography variant="subtitle2" color="text.secondary" sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1 
    }}>
        <SpeedIcon sx={{ color: '#3b82f6' }} />
        Progress
    </Typography>
    <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2, 
        mt: 1 
    }}>
        <Box sx={{ flexGrow: 1 }}>
            <LinearProgress 
                variant="determinate" 
                value={project?.progress || 0}
                sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #3b82f6, #2563eb)',
                        borderRadius: 4
                    }
                }}
            />
        </Box>
        <Typography
            variant="caption"
            sx={{
                color: '#3b82f6',
                fontWeight: 600,
                minWidth: '40px'
            }}
        >
            {project?.progress || 0}%
        </Typography>
    </Box>
</Box>
        </StyledPaper>
    );

    const RightSection = () => (
        <StyledPaper>
            <Typography variant="h5" sx={{ 
    mb: 4,
    fontWeight: 600,
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    padding: '12px',
    borderRadius: '8px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: 1
}}>
    <GroupsIcon />
    Assign Team
</Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel>Project Manager</InputLabel>
                        <Select
                            value={teamAssignment.projectManager}
                            label="Project Manager"
                            onChange={(e) => setTeamAssignment({
                                ...teamAssignment,
                                projectManager: e.target.value
                            })}
                            sx={{ 
                                borderRadius: '8px',
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#3b82f6'
                                }
                            }}
                        >
                            {managers.map((manager) => (
                                <MenuItem key={manager} value={manager}>{manager}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel>Team Lead</InputLabel>
                        <Select
                            value={teamAssignment.teamLead}
                            label="Team Lead"
                            onChange={(e) => setTeamAssignment({
                                ...teamAssignment,
                                teamLead: e.target.value
                            })}
                            sx={{ 
                                borderRadius: '8px',
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#3b82f6'
                                }
                            }}
                        >
                            {teamLeads.map((lead) => (
                                <MenuItem key={lead} value={lead}>{lead}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel>Frontend Developers</InputLabel>
                        <Select
                            multiple
                            value={teamAssignment.frontendDevelopers}
                            label="Frontend Developers"
                            onChange={(e) => setTeamAssignment({
                                ...teamAssignment,
                                frontendDevelopers: e.target.value
                            })}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip
                                            key={value}
                                            label={value}
                                            onDelete={() => handleRemoveMember(value, 'frontendDevelopers')}
                                            deleteIcon={<CancelIcon />}
                                            sx={{ 
                                                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                                                color: '#22c55e',
                                                '& .MuiChip-deleteIcon': {
                                                    color: '#22c55e'
                                                }
                                            }}
                                        />
                                    ))}
                                </Box>
                            )}
                            sx={{ 
                                borderRadius: '8px',
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#3b82f6'
                                }
                            }}
                        >
                            {developers.map((dev) => (
                                <MenuItem key={dev} value={dev}>{dev}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel>Backend Developers</InputLabel>
                        <Select
                            multiple
                            value={teamAssignment.backendDevelopers}
                            label="Backend Developers"
                            onChange={(e) => setTeamAssignment({
                                ...teamAssignment,
                                backendDevelopers: e.target.value
                            })}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip
                                            key={value}
                                            label={value}
                                            onDelete={() => handleRemoveMember(value, 'backendDevelopers')}
                                            deleteIcon={<CancelIcon />}
                                            sx={{ 
                                                backgroundColor: 'rgba(234, 179, 8, 0.1)',
                                                color: '#eab308',
                                                '& .MuiChip-deleteIcon': {
                                                    color: '#eab308'
                                                }
                                            }}
                                        />
                                    ))}
                                </Box>
                            )}
                            sx={{ 
                                borderRadius: '8px',
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#3b82f6'
                                }
                            }}
                        >
                            {developers.map((dev) => (
                                <MenuItem key={dev} value={dev}>{dev}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                        <Button
                            variant="outlined"
                            onClick={() => setTeamAssignment({
                                projectManager: '',
                                teamLead: '',
                                frontendDevelopers: [],
                                backendDevelopers: []
                            })}
                            sx={{
                                borderColor: '#94a3b8',
                                color: '#94a3b8',
                                '&:hover': {
                                    borderColor: '#64748b',
                                    backgroundColor: 'transparent'
                                }
                            }}
                        >
                            Reset
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleAssignTeam}
                            sx={{
                                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
                                }
                            }}
                        >
                            Assign Team
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </StyledPaper>
    );

    

    if (!project) {
        return (
            <Box sx={{ 
                p: 3, 
                textAlign: 'center',
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
                <Typography variant="h5" sx={{ mb: 2, color: '#1e293b' }}>
                    Project not found
                </Typography>
                {/* <Button
                    variant="outlined"
                    onClick={onBackToList}
                    sx={{
                        borderColor: '#3b82f6',
                        color: '#3b82f6',
                        '&:hover': {
                            borderColor: '#2563eb',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)'
                        }
                    }}
                >
                    Back to Projects
                </Button> */}
            </Box>
        );
    }
    return (
        <Box sx={{ p: 3, backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            <Box sx={{ 
                mb: 4, 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
               <Typography variant="h4" sx={{ 
    fontWeight: 700,
    padding: '12px 24px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2)',
}}>
    <AssignmentIcon sx={{ fontSize: 32 }} />
    {project.name}
</Typography>


{/* <Button
        variant="outlined"
        onClick={() => {
            try {
                const projectsData = JSON.parse(localStorage.getItem('projectsData') || '{}');
                const category = localStorage.getItem('projectCategory');
                
                if (category && project && projectsData[category]) {
                    const updatedProjects = {
                        ...projectsData,
                        [category]: projectsData[category].map(p => 
                            p.id === project.id ? project : p
                        )
                    };
                    localStorage.setItem('projectsData', JSON.stringify(updatedProjects));
                }
            } catch (error) {
                console.error('Error saving project data:', error);
            } finally {
                localStorage.removeItem('currentProject');
                onBackToList();
            }
        }}
        sx={{
            borderColor: '#3b82f6',
            color: '#3b82f6',
            '&:hover': {
                borderColor: '#2563eb',
                backgroundColor: 'rgba(59, 130, 246, 0.1)'
            }
        }}
    >
        Back to Projects
    </Button> */}
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <LeftSection />
                </Grid>
                <Grid item xs={12} md={8}>
                    <RightSection />
                </Grid>
            </Grid>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert 
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ 
                        width: '100%',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px'
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
            
            {isLoading && (
    <LoadingOverlay>
        <LoadingSpinner />
    </LoadingOverlay>
)}
        </Box>
    );
};

export default ProjectDetails;