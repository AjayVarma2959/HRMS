import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    Pagination,
    FormControl,
    Select,
    MenuItem,
    TextField,
    InputAdornment,
    IconButton,
    Stack,
    Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ProjectCard from './ProjectCard';

import { ProjectDialog,ProjectDetailsDialog,ResourceManagementDialog, AddResourceDialog  } from './ProjectDialog';
// import { MOCK_PROJECTS, MOCK_RESOURCES } from './mockData';
const MOCK_PROJECTS = [
    {
        id: 'PRO-0004',
        name: 'Hospital Administration',
        client: 'EcoVision Enterprises',
        type: 'Development',
        department: 'Technology',
        startDate: new Date('2024-03-01'),
        deadline: new Date('2024-06-30'),
        budget: '1400',
        priority: 'High',
        status: 'In Progress',
        description: 'The Enhanced Patient Management System (EPMS) project aims to modernize and streamline the patient management processes within. By integrating advanced technologies and optimizing existing workflows, the project seeks to improve patient care, enhance operational efficiency, and ensure compliance with regulatory standards.',
        teamMembers: ['Lewis', 'Leona', 'Pineiro', 'Moseley'],
        teamLeads: ['Ruth', 'Meredith'],
        projectManager: 'Dwight',
        tags: ['Admin Panel', 'High Tech']
    },
    {
        id: 'PRO-0005',
        name: 'E-Commerce Platform Redesign',
        client: 'ShopMax International',
        type: 'Design',
        department: 'UX/UI',
        startDate: new Date('2024-04-15'),
        deadline: new Date('2024-08-15'),
        budget: '75000',
        priority: 'High',
        status: 'Planning',
        description: 'Complete overhaul of the ShopMax e-commerce platform with focus on mobile-first design, improved user experience, and enhanced performance metrics.',
        teamMembers: ['Sarah', 'Mike', 'Jessica', 'Alex'],
        teamLeads: ['Diana', 'Tom'],
        projectManager: 'Rachel',
        tags: ['E-commerce', 'UI/UX', 'Mobile']
    },
    {
        id: 'PRO-0006',
        name: 'AI Customer Service Bot',
        client: 'TechCorp Solutions',
        type: 'Development',
        department: 'AI/ML',
        startDate: new Date('2024-02-01'),
        deadline: new Date('2024-07-30'),
        budget: '120000',
        priority: 'Medium',
        status: 'In Progress',
        description: 'Development of an AI-powered customer service chatbot using natural language processing to handle customer inquiries and support tickets automatically.',
        teamMembers: ['David', 'Emma', 'Ryan', 'Sophie'],
        teamLeads: ['James', 'Linda'],
        projectManager: 'Michael',
        tags: ['AI', 'Machine Learning', 'Customer Service']
    },
    {
        id: 'PRO-0007',
        name: 'Financial Dashboard',
        client: 'Global Banking Corp',
        type: 'Development',
        department: 'Finance',
        startDate: new Date('2024-05-01'),
        deadline: new Date('2024-09-30'),
        budget: '95000',
        priority: 'High',
        status: 'Planning',
        description: 'Creating a comprehensive financial dashboard for real-time monitoring of market trends, portfolio performance, and risk analytics.',
        teamMembers: ['Robert', 'Lisa', 'Kevin', 'Julia'],
        teamLeads: ['Mark', 'Anna'],
        projectManager: 'Christopher',
        tags: ['Finance', 'Analytics', 'Real-time']
    },
    {
        id: 'PRO-0008',
        name: 'Mobile Fitness App',
        client: 'FitLife International',
        type: 'Development',
        department: 'Mobile',
        startDate: new Date('2024-03-15'),
        deadline: new Date('2024-08-15'),
        budget: '85000',
        priority: 'Medium',
        status: 'In Progress',
        description: 'Developing a comprehensive fitness tracking application with personalized workout plans, nutrition tracking, and social features.',
        teamMembers: ['Brian', 'Emily', 'Jason', 'Maria'],
        teamLeads: ['Paul', 'Sandra'],
        projectManager: 'Andrew',
        tags: ['Mobile', 'Health', 'Social']
    },
    {
        id: 'PRO-0009',
        name: 'Supply Chain Optimization',
        client: 'LogisticsPro',
        type: 'Consulting',
        department: 'Operations',
        startDate: new Date('2024-06-01'),
        deadline: new Date('2024-11-30'),
        budget: '150000',
        priority: 'High',
        status: 'Planning',
        description: 'Implementing an advanced supply chain management system with real-time tracking, predictive analytics, and automated inventory management.',
        teamMembers: ['Daniel', 'Sophie', 'William', 'Nina'],
        teamLeads: ['George', 'Helen'],
        projectManager: 'Victoria',
        tags: ['Supply Chain', 'Analytics', 'Automation']
    },
    {
        id: 'PRO-0010',
        name: 'Educational Platform',
        client: 'EduTech Solutions',
        type: 'Development',
        department: 'Education',
        startDate: new Date('2024-04-01'),
        deadline: new Date('2024-10-31'),
        budget: '110000',
        priority: 'Medium',
        status: 'In Progress',
        description: 'Building an interactive online learning platform with video conferencing, course management, and student progress tracking capabilities.',
        teamMembers: ['Peter', 'Laura', 'Steve', 'Karen'],
        teamLeads: ['Matthew', 'Alice'],
        projectManager: 'Elizabeth',
        tags: ['Education', 'Video', 'Learning']
    },
    {
        id: 'PRO-0011',
        name: 'Smart Home Integration',
        client: 'HomeTech Innovations',
        type: 'IoT',
        department: 'Technology',
        startDate: new Date('2024-07-01'),
        deadline: new Date('2024-12-31'),
        budget: '130000',
        priority: 'High',
        status: 'Planning',
        description: 'Developing a unified smart home control system integrating various IoT devices and providing a seamless user experience through mobile and voice controls.',
        teamMembers: ['Frank', 'Hannah', 'Oscar', 'Lucy'],
        teamLeads: ['Nathan', 'Isabella'],
        projectManager: 'William',
        tags: ['IoT', 'Smart Home', 'Mobile']
    },
    {
        id: 'PRO-0012',
        name: 'Marketing Analytics Platform',
        client: 'MarketPro Agency',
        type: 'Analytics',
        department: 'Marketing',
        startDate: new Date('2024-05-15'),
        deadline: new Date('2024-09-15'),
        budget: '90000',
        priority: 'Medium',
        status: 'In Progress',
        description: 'Creating a comprehensive marketing analytics platform for campaign tracking, audience analysis, and ROI measurement across multiple channels.',
        teamMembers: ['Grace', 'Henry', 'Olivia', 'Jack'],
        teamLeads: ['Sophie', 'Lucas'],
        projectManager: 'Emma',
        tags: ['Marketing', 'Analytics', 'Reporting']
    },
    {
        id: 'PRO-0013',
        name: 'Cybersecurity Enhancement',
        client: 'SecureNet Defense',
        type: 'Security',
        department: 'IT Security',
        startDate: new Date('2024-06-15'),
        deadline: new Date('2024-11-15'),
        budget: '180000',
        priority: 'High',
        status: 'Planning',
        description: 'Implementing advanced cybersecurity measures including threat detection, incident response, and security awareness training programs.',
        teamMembers: ['Max', 'Sophia', 'Leo', 'Ava'],
        teamLeads: ['Benjamin', 'Charlotte'],
        projectManager: 'Oliver',
        tags: ['Security', 'Training', 'Infrastructure']
    }
];
const MOCK_RESOURCES = [
    {
        id: 'RES-001',
        projectId: 'PRJ-001',
        name: 'John Doe',
        role: 'Developer',
        email: 'john@example.com',
        allocation: 100,
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-06-30'),
        cost: 5000,
        skills: ['React', 'Node.js'],
        status: 'Active'
    }
];

const ProjectsList1 = () => {
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);

    
    const [projects, setProjects] = useState([]);
    const [resources, setResources] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Dialog States
    const [openDialog, setOpenDialog] = useState(false);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [openResourceDialog, setOpenResourceDialog] = useState(false);
    const [openAddResourceDialog, setOpenAddResourceDialog] = useState(false);
    
    const [editingProject, setEditingProject] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 1000));
                setProjects(MOCK_PROJECTS);
                setResources(MOCK_RESOURCES);
                setFilteredProjects(MOCK_PROJECTS);
                setError(null);
            } catch (err) {
                setError('Failed to load data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter Projects
    useEffect(() => {
        let result = [...projects];

        // Search filter
        if (searchTerm) {
            result = result.filter(project => 
                project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.client.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Status filter
        if (filterStatus !== 'all') {
            result = result.filter(project => project.status === filterStatus);
        }

        // Priority filter
        if (filterPriority !== 'all') {
            result = result.filter(project => project.priority === filterPriority);
        }

        setFilteredProjects(result);
        setPage(0); 
    }, [projects, searchTerm, filterStatus, filterPriority]);

    // Pagination handlers
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Get paginated data
    const paginatedProjects = filteredProjects.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    // Dialog handlers
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingProject(null);
    };

    const handleEditProject = (e, project) => {
        e.stopPropagation();
        setEditingProject(project);
        setOpenDialog(true);
    };

    const handleDeleteProject = async (e, projectId) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                setLoading(true);
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 500));
                setProjects(projects.filter(p => p.id !== projectId));
                setError(null);
            } catch (err) {
                setError('Failed to delete project. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleManageResources = (e, project) => {
        e.stopPropagation();
        setSelectedProject(project);
        setOpenResourceDialog(true);
    };

    const handleSubmit = async (projectData) => {
        try {
            setLoading(true);
          
            await new Promise(resolve => setTimeout(resolve, 500));

            if (editingProject) {
                // Update existing project
                setProjects(projects.map(p => 
                    p.id === editingProject.id ? { ...projectData, id: p.id } : p
                ));
            } else {
                // Create new project
                const newProjectId = `PRJ-${Date.now()}`;
                setProjects([...projects, { ...projectData, id: newProjectId }]);
            }
            handleCloseDialog();
            setError(null);
        } catch (err) {
            setError('Failed to save project. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddResource = async (resource) => {
        try {
            setLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const newResource = {
                id: `RES-${Date.now()}`,
                projectId: selectedProject.id,
                ...resource
            };
            setResources([...resources, newResource]);
            setOpenAddResourceDialog(false);
            setError(null);
        } catch (err) {
            setError('Failed to add resource. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteResource = async (resourceId) => {
        if (window.confirm('Are you sure you want to delete this resource?')) {
            try {
                setLoading(true);
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 500));
                setResources(resources.filter(r => r.id !== resourceId));
                setError(null);
            } catch (err) {
                setError('Failed to delete resource. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    // Loading and Error states
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <Typography>Loading...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', p: 3 }}>
           
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5">Projects ({filteredProjects.length})</Typography>
                <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    onClick={() => setOpenDialog(true)}
                >
                    New Project
                </Button>
            </Box>

            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
                <TextField
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ flexGrow: 1 }}
                />
                <FormControl sx={{ minWidth: 120 }}>
                    <Select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        displayEmpty
                        size="small"
                        startAdornment={<FilterListIcon sx={{ mr: 1 }} />}
                    >
                        <MenuItem value="all">All Status</MenuItem>
                        <MenuItem value="Planning">Planning</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="On Hold">On Hold</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 120 }}>
                    <Select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        displayEmpty
                        size="small"
                        startAdornment={<FilterListIcon sx={{ mr: 1 }} />}
                    >
                        <MenuItem value="all">All Priority</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                    </Select>
                </FormControl>
            </Stack>

            
            <Grid container spacing={3}>
                {paginatedProjects.map((project) => (
                    <Grid item xs={12} sm={6} md={4} key={project.id}>
                        <ProjectCard 
                            project={project}
                            onManageResources={handleManageResources}
                            onEdit={handleEditProject}
                            onDelete={handleDeleteProject}
                            onClick={() => {
                                setSelectedProject(project);
                                setOpenDetailsDialog(true);
                            }}
                        />
                    </Grid>
                ))}
            </Grid>

            
            <Box sx={{ 
                mt: 4, 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 2
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        Rows per page:
                    </Typography>
                    <FormControl size="small">
                        <Select
                            value={rowsPerPage}
                            onChange={handleChangeRowsPerPage}
                            sx={{ height: 32 }}
                        >
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={12}>12</MenuItem>
                            <MenuItem value={24}>24</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Pagination
                    count={Math.ceil(filteredProjects.length / rowsPerPage)}
                    page={page + 1}
                    onChange={(e, newPage) => handleChangePage(e, newPage - 1)}
                    color="primary"
                    shape="rounded"
                    showFirstButton
                    showLastButton
                />

                <Typography variant="body2" color="text.secondary">
                    {`${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, filteredProjects.length)} of ${filteredProjects.length}`}
                </Typography>
            </Box>

            {/* Dialogs */}
            <ProjectDialog 
                open={openDialog}
                onClose={handleCloseDialog}
                project={editingProject}
                onSave={handleSubmit}
            />
            
            <ProjectDetailsDialog
                open={openDetailsDialog}
                onClose={() => setOpenDetailsDialog(false)}
                project={selectedProject}
            />
            
            <ResourceManagementDialog
                open={openResourceDialog}
                onClose={() => setOpenResourceDialog(false)}
                project={selectedProject}
                resources={resources.filter(r => r.projectId === selectedProject?.id)}
                onAddResource={() => setOpenAddResourceDialog(true)}
                onDeleteResource={handleDeleteResource}
            />

            <AddResourceDialog
                open={openAddResourceDialog}
                onClose={() => setOpenAddResourceDialog(false)}
                onSave={handleAddResource}
            />
        </Box>
    );
};

export default ProjectsList1;