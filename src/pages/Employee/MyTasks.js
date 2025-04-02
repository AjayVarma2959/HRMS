import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Tabs,
    Tab,
    Paper,
    Chip,
    CardActionArea,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button, Modal,
    LinearProgress,
    TextField
} from '@mui/material';
import { AlarmClock, Clock } from "lucide-react";
import { Analytics } from "@mui/icons-material";
import {
    Assignment,
    CheckCircle,
    HourglassEmpty,
    Loop,
    Warning,
    Task, Work,
} from '@mui/icons-material';
import {
    Assignment as AssignmentIcon,
    CalendarToday as CalendarTodayIcon,
    Event as EventIcon,
    PriorityHigh as PriorityHighIcon,
    Info as InfoIcon,
} from '@mui/icons-material';
import { progress } from 'framer-motion';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



const tasks = [
    {
        name: "Design Wireframes",
        description: "Create initial wireframes for the new mobile application.Create initial wireframes for the new mobile application. Create initial wireframes for the new mobile application.Create initial wireframes for the new mobile application Create initial wireframes for the new mobile applicationCreate initial wireframes for the new mobile applicationCreate initial wireframes for the new mobile applicationCreate initial wireframes for the new mobile application",
        projectName: "Mobile App Redesign",
        assignedTo: "Alex Johnson",
        assignedDate: "2025-01-10",
        deadline: "2025-01-20",
        priority: "High",
        status: "Completed",
    },
    {
        name: "Backend API Development",
        description: "Develop RESTful APIs for user authentication and data retrieval.",
        projectName: "Backend Revamp",
        assignedTo: "Alex Johnson",
        assignedDate: "2025-01-05",
        deadline: "2025-01-25",
        priority: "Medium",
        status: "Completed",
    },
    {
        name: "Client Presentation",
        description: "Prepare and deliver a presentation for the upcoming client meeting.",
        projectName: "Client Outreach",
        assignedTo: "Alex Johnson",
        assignedDate: "2025-01-12",
        deadline: "2025-01-15",
        priority: "High",
        status: "Completed",
    },
    {
        name: "Code Review",
        description: "Review code submissions from the development team for quality assurance.",
        projectName: "QA Process",
        assignedTo: "Alex Johnson",
        assignedDate: "2025-01-08",
        deadline: "2025-01-14",
        priority: "Low",
        status: "Overdue",
    },
    {
        name: "Database Migration",
        description: "Migrate the existing database to a new server with updated configurations.",
        projectName: "Infrastructure Upgrade",
        assignedTo: "Alex Johnson",
        assignedDate: "2025-01-15",
        deadline: "2025-01-22",
        priority: "High",
        status: "Overdue",
    },
    {
        name: "User Testing",
        description: "Conduct user testing sessions to gather feedback on the new features.",
        projectName: "Feature Rollout",
        assignedTo: "Alex Johnson",
        assignedDate: "2025-01-18",
        deadline: "2025-01-25",
        priority: "Medium",
        status: "In Progress",
    },
    {
        name: "Marketing Campaign",
        description: "Develop and launch a marketing campaign for the new product line.",
        projectName: "Product Launch",
        assignedTo: "Alex Johnson",
        assignedDate: "2025-01-20",
        deadline: "2025-02-10",
        priority: "High",
        status: "Pending",
    },
    {
        name: "Security Audit",
        description: "Perform a comprehensive security audit of the company's IT infrastructure.",
        projectName: "Compliance",
        assignedTo: "Alex Johnson",
        assignedDate: "2025-01-22",
        deadline: "2025-01-30",
        priority: "High",
        status: "In Progress",
    },
    {
        name: "Content Creation",
        description: "Write and edit content for the upcoming blog series.",
        projectName: "Content Strategy",
        assignedTo: "Alex Johnson",
        assignedDate: "2025-01-25",
        deadline: "2025-02-05",
        priority: "Medium",
        status: "Pending",
    },
    {
        name: "System Upgrade",
        description: "Upgrade the operating systems on all company workstations.",
        projectName: "IT Maintenance",
        assignedTo: "Alex Johnson",
        assignedDate: "2025-01-28",
        deadline: "2025-02-15",
        priority: "Low",
        status: "Pending",
    },
];


const statusBackgroundColors = {
    total: '#e3f2fd',       // Light Blue for Total Tasks
    completed: '#e8f5e9',   // Light Green for Completed Tasks
    pending: '#fff3e0',     // Light Orange for Pending Tasks
    inProgress: '#e3f2fd',  // Light Blue for In Progress Tasks
    overdue: '#ffebee',     // Light Red for Overdue Tasks
};

const priorityColors = {
    High: 'error', // Red
    Medium: 'warning', // Orange
    Low: 'success', // Green
};

const statusColors = {
    'In Progress': 'warning',
    Pending: 'error',
    Completed: 'success',
    Overdue: 'error',
};
const stripedStyle = {
    '&:nth-of-type(odd)': {
        backgroundColor: '#ffffff',
    },
    '&:nth-of-type(even)': {
        backgroundColor: '#f5f5f5',
    },
};
function calculateTaskMetrics(tasks) {
    const today = new Date();
    let total = tasks.length;
    let completed = 0;
    let pending = 0;
    let overdue = 0;
    let inProgress = 0;

    tasks.forEach((task) => {
        const deadlineDate = new Date(task.deadline);
        switch (task.status) {
            case "Completed":
                completed++;
                break;
            case "In Progress":
                inProgress++;
                if (deadlineDate < today) {
                    overdue++;
                }
                break;
            case "Pending":
                pending++;
                if (deadlineDate < today) {
                    overdue++;
                }
                break;
            case "Overdue":
                overdue++;
                break;
            default:
                pending++;
                if (deadlineDate < today) {
                    overdue++;
                }
                break;
        }
    });

    return {
        total,
        completed,
        inProgress,
        pending,
        overdue,
    };
}

const taskMetrics = calculateTaskMetrics(tasks);
console.log(taskMetrics);


//My tasks tab content
const MyTasks = () => {
    const [projectFilter, setProjectFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [expandedTasks, setExpandedTasks] = useState({});
    const [selectedTask, setSelectedTask] = useState(null);
    const [open, setOpen] = useState(false);
    const [taskComments, setTaskComment] = useState();
    const [selectedStatus, setSelectedStatus] = useState('');
    const [taskProgress, setTaskProgress] = useState(0);



    const handleProjectFilterChange = (event) => {
        setProjectFilter(event.target.value);
    };

    const handlePriorityFilterChange = (event) => {
        setPriorityFilter(event.target.value);
    };

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value);
    };

    // const toggleExpand = (index) => {
    //     setExpandedTasks((prev) => ({
    //         ...prev,
    //         [index]: !prev[index],
    //     }));
    // };

    const handleCardClick = (task) => {
        setSelectedTask(task);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleProgressBarLoading = (e) => {
        const value = e.target.value;
        // Ensure the value is between 0 and 100
        if (value >= 0 && value <= 100) {
            setTaskProgress(value);
        }
    }

    const filteredTasks = tasks.filter((task) => {
        return (
            (projectFilter === '' || task.projectName === projectFilter) &&
            (priorityFilter === '' || task.priority === priorityFilter) &&
            (statusFilter === '' || task.status === statusFilter)
        );
    });

    const projectNames = [...new Set(tasks.map((task) => task.projectName))];
    const priorities = [...new Set(tasks.map((task) => task.priority))];
    const statuses = [...new Set(tasks.map((task) => task.status))];

    // const renderDescription = (description, index) => {
    //     const isExpanded = expandedTasks[index];
    //     const maxLength = 100;

    //     if (description.length <= maxLength) {
    //         return <Typography>{description}</Typography>;
    //     }

    //     return (
    //         <>
    //             <Typography>
    //                 {isExpanded ? description : `${description.substring(0, maxLength)}...`}
    //             </Typography>
    //             <Button
    //                 onClick={() => toggleExpand(index)}
    //                 sx={{ textTransform: 'none', padding: 0 }}
    //             >
    //                 {isExpanded ? 'Read Less' : 'Read More'}
    //             </Button>
    //         </>
    //     );
    // };

    return (
        <Box sx={{}}>

            <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel>Project Name</InputLabel>
                        <Select
                            value={projectFilter}
                            onChange={handleProjectFilterChange}
                            label="Project Name"
                        >
                            <MenuItem value="">
                                <em>All Projects</em>
                            </MenuItem>
                            {projectNames.map((name) => (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel>Priority</InputLabel>
                        <Select
                            value={priorityFilter}
                            onChange={handlePriorityFilterChange}
                            label="Priority"
                        >
                            <MenuItem value="">
                                <em>All Priorities</em>
                            </MenuItem>
                            {priorities.map((priority) => (
                                <MenuItem key={priority} value={priority}>
                                    {priority}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={statusFilter}
                            onChange={handleStatusFilterChange}
                            label="Status"
                        >
                            <MenuItem value="">
                                <em>All Statuses</em>
                            </MenuItem>
                            {statuses.map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                {filteredTasks.map((task, index) => (
                    <Grid item xs={12} md={6} key={index}>
                        <Card
                            sx={{
                                background: task.priority === "High"
                                    ? 'linear-gradient(to right, #e8f5e9, #8BC34A)'
                                    : task.priority === "Medium"
                                        ? 'linear-gradient(to right, #fff3e0, #FFC107)'
                                        : 'linear-gradient(to right, #ffebee, #E53935)',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                },
                                cursor: 'pointer',
                            }}
                            onClick={() => handleCardClick(task)}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Box>
                                    <Typography variant="h6">{task.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Deadline: {task.deadline}
                                    </Typography>
                                    <Chip
                                        label={task.status}
                                        color={statusColors[task.status]}
                                        size="small"
                                        sx={{ mt: 1 }}
                                        variant='outlined'
                                    />
                                </Box>
                                {task.status === "Completed" ? (
                                    <CheckCircle color="success" size={36} />
                                ) : task.status === "Overdue" ? (
                                    <AlarmClock color="error" size={36} />
                                ) : task.status === "Pending" ? (
                                    <HourglassEmpty color="warning" size={36} />
                                ) : task.status === "In Progress" ? (
                                    <Loop color="info" size={36} />
                                ) : (
                                    <Clock color="warning" size={36} />
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="task-details-modal"
                aria-describedby="task-details-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    //bgcolor: '#2C3E50',
                    bgcolor: "#FFFFFF ",
                    borderRadius: '8px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)', // Darker shadow
                    p: 6,
                    outline: 'none',
                    maxHeight: '85vh',
                    overflowY: 'auto',

                }}>
                    {/* Close Button */}
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography id="task-details-modal" variant="h5" component="h2" sx={{
                        fontWeight: 'bold',
                        marginBottom: '1rem',
                        color: '#000000', // Brighter heading color (React blue)
                        textAlign: 'center',
                    }}>
                        Task Details
                    </Typography>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'auto 1fr',
                            rowGap: 1,
                            columnGap: 6,
                            mt: 2,
                            color: "#000000",
                            fontSize: '1rem',
                            lineHeight: '1.6'
                        }}
                    >
                        <Typography sx={{ fontWeight: 600 }}>Task Name:</Typography>
                        <Typography>{selectedTask?.name}</Typography>
                        <Typography sx={{ fontWeight: 600 }}>Project Name:</Typography>
                        <Typography>{selectedTask?.projectName}</Typography>
                        <Typography sx={{ fontWeight: 600 }}>Description:</Typography>
                        <Typography>{selectedTask?.description}</Typography>
                        <Typography sx={{ fontWeight: 600 }}>Assigned To:</Typography>
                        <Typography>{selectedTask?.assignedTo}</Typography>
                        <Typography sx={{ fontWeight: 600 }}>Assigned Date:</Typography>
                        <Typography>{selectedTask?.assignedDate}</Typography>
                        <Typography sx={{ fontWeight: 600 }}>Deadline</Typography>
                        <Typography>{selectedTask?.deadline}</Typography>
                        <Typography sx={{ fontWeight: 600 }}>Priority</Typography>
                        <Typography>{selectedTask?.priority}</Typography>
                        <Typography sx={{ fontWeight: 600 }}>Status</Typography>
                        <Typography>{selectedTask?.status}</Typography>


                    </Box>
                    <Grid container spacing={2} alignItems="center" fullWidth sx={{ mt: 2 }}>
                        {/* <Grid item xs={6} sm={2} md={3}>
                            <Typography sx={{ fontWeight: 600, color: '#000000' }}>Comments:</Typography>
                        </Grid> */}
                        <Grid item xs={12} >
                            <TextField
                                placeholder="Please share your comments on the task"
                                multiline
                                fullWidth
                                value={taskComments}
                                onChange={(e) => setTaskComment(e.target.value)}
                                InputProps={{
                                    style: { fontSize: '14px' },
                                }}
                                variant="outlined"
                                label='comments'
                                minRows={4}
                            />

                        </Grid>
                        {/* <Grid item xs={6} sm={2} md={3}>
                            <Typography sx={{ fontWeight: 600, color: '#000000' }}>Status:</Typography>
                        </Grid> */}
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="status-label" color="primary">Status</InputLabel>
                                <Select
                                    labelId="status-label"
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    label="Status"
                                    color="primary"
                                >
                                    <MenuItem value="none">None</MenuItem>
                                    <MenuItem value="completed">Completed</MenuItem>
                                    <MenuItem value="in-progress">In Progress</MenuItem>
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="overdue">OverDue</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* <Grid item xs={6} sm={2} md={3}>
                            <Typography>Progress Percentage</Typography>
                        </Grid> */}
                        <Grid item xs={12}>
                            <TextField
                                placeholder='0'
                                value={taskProgress}
                                onChange={handleProgressBarLoading}
                                fullWidth
                                inputProps={{ min: 0, max: 100 }}
                                variant="outlined"
                                label='Progress Percentage'
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <LinearProgress
                                variant='determinate'
                                value={taskProgress}
                                sx={{ mt: 1, borderRadius: 4, height: 10 }}
                            />

                            {/* 0% and 100% Labels Below Progress Bar */}
                            <Box display="flex" justifyContent="space-between" mt={0.5}>
                                <Typography variant="caption">0%</Typography>
                                <Typography variant="caption">100%</Typography>
                            </Box>
                        </Grid>

                    </Grid>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: '1.5rem'
                    }}>
                        <Button
                            onClick={handleClose}
                            variant="outlined"
                            color="primary"
                            sx={{
                                borderRadius: '8px',
                                borderWidth: '2px',
                                padding: '8px 16px',
                                '&:hover': {
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    borderColor: 'primary.main',
                                },
                            }}
                        >SUBMIT</Button>
                    </Box>

                </Box>
            </Modal>
        </Box>
    );
};
//Dashboard tab content
const Dashboard = () => {
    const [filter, setFilter] = useState('all'); // Default filter set to 'all'
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page
    };
    const filteredTasks = tasks.filter((task) => {
        if (filter === 'all') return true;
        if (filter === 'Overdue') return task.status === 'Overdue';
        return task.status === filter;
    });

    // Calculate the rows to display based on pagination
    const displayedTasks = filteredTasks.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );



    return (
        <Box sx={{ mt: 4 }}>
            {/* Task Metrics Cards */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                {[
                    { label: 'Total', count: taskMetrics.total, color: 'default', icon: Assignment, filter: 'all' },
                    { label: 'Completed', count: taskMetrics.completed, color: 'green', icon: CheckCircle, filter: 'Completed' },
                    { label: 'Pending', count: taskMetrics.pending, color: 'orange', icon: HourglassEmpty, filter: 'Pending' },
                    { label: 'In Progress', count: taskMetrics.inProgress, color: 'blue', icon: Loop, filter: 'In Progress' },
                    { label: 'Overdue', count: taskMetrics.overdue, color: 'red', icon: Warning, filter: 'Overdue' },
                ].map((metric, index) => (
                    <Grid item xs={12} md={3} key={index}
                        sx={{
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        <Card
                            sx={{ bgcolor: statusBackgroundColors[metric.label.toLowerCase().replace(' ', '')], cursor: 'pointer' }}
                            onClick={() => {
                                setFilter(metric.filter);
                                setPage(0); // Reset to first page when filter changes
                            }}
                        >
                            <CardActionArea onClick={() => setFilter(metric.filter)}>
                                <CardContent>
                                    <Box display="flex" flexDirection="column" alignItems="flex-start">
                                        <metric.icon sx={{ fontSize: 40, mb: 1, color: metric.color }} />
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {metric.label}
                                        </Typography>
                                        <Typography variant="h4" color={metric.color}>
                                            {metric.count}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Task Table */}
            {/* Dynamic heading based on filter */}
            <Typography variant="h5" sx={{ fontWeight: '600' }} gutterBottom>
                {`${filter.charAt(0).toUpperCase() + filter.slice(1)} Tasks`}
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{
                            background: 'linear-gradient(to right, #a8fdf5, #fff)',
                        }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Task sx={{ mr: 1, color: 'primary.main' }} />
                                    Task Name
                                </Box>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Work sx={{ mr: 1, color: 'primary.main' }} />
                                    Project Name
                                </Box>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CalendarTodayIcon sx={{ mr: 1, color: 'secondary.main' }} />
                                    Assigned Date
                                </Box>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <EventIcon sx={{ mr: 1, color: 'error.main' }} />
                                    Deadline
                                </Box>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <PriorityHighIcon sx={{ mr: 1, color: 'warning.main' }} />
                                    Priority
                                </Box>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <InfoIcon sx={{ mr: 1, color: 'info.main' }} />
                                    Status
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedTasks.map((task, index) => (
                            <TableRow key={index} sx={{ ...stripedStyle }}>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                                    {task.name}
                                </TableCell>
                                <TableCell sx={{ fontWeight: '600', fontSize: '1rem' }}>
                                    {task.projectName}
                                </TableCell>

                                <TableCell>{task.assignedDate}</TableCell>
                                <TableCell>{task.deadline}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={task.priority}
                                        color={priorityColors[task.priority]}
                                        variant="contained"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={task.status}
                                        color={statusColors[task.status]}
                                        variant="contained"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={tasks.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[6, 12, 24]}
            />

        </Box>
    );
}

//page for the tasks
const MyTasksDashboard = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    return (
        <Box sx={{ minHeight: "100vh" }}>
            <Typography variant="h4" fontWeight="bold" marginBottom={2}>
                Tasks
            </Typography>
            <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                aria-label="tabs"
                sx={{
                    mb: 2,
                    minHeight: "50px",
                }}
            >
                <Tab
                    label="Dashboard"
                    icon={
                        <Analytics
                            sx={{
                                fontSize: 32,
                                color: tabIndex === 0 ? "#1976d2" : "#001881", // Active color change
                            }}
                        />
                    }
                    sx={{
                        textTransform: "none",
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: tabIndex === 0 ? "#1976d2" : "#001881", // Active color change
                        "&.Mui-selected": { color: "#1976d2" }, // Override default selected color
                    }}

                />
                <Tab
                    icon={
                        <Assignment
                            sx={{
                                fontSize: 32,
                                color: tabIndex === 1 ? "#1976d2" : "#001881", // Active color change
                            }}
                        />
                    }
                    label="My Tasks"
                    sx={{
                        textTransform: "none",
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: tabIndex === 1 ? "#1976d2" : "#001881", // Active color change
                        "&.Mui-selected": { color: "#1976d2" }, // Override default selected color
                    }} />
            </Tabs>
            {tabIndex === 0 && <Dashboard />}
            {tabIndex === 1 && <MyTasks />}
        </Box>
    );
};

export default MyTasksDashboard;
