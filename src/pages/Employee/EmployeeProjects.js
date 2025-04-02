import React, { useState } from "react";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    LinearProgress,
    Chip,
    TablePagination,
    TextField,
    Select,
    MenuItem,
    Tabs,
    Tab,
} from "@mui/material";
import {
    Work, CheckCircle, HourglassTop, Assignment, Dashboard, Folder, Insights, AssignmentTurnedIn, Category, CalendarToday, Event, Timeline

} from "@mui/icons-material";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";



// Import Components
import MyProjects from "./MyProjects";  // Another component for Tab 2

const projectData = [
    { id: 1, name: "Mobile App Redesign", category: "Ongoing", startdate: "15-01-2025", deadline: "15-06-2025", progress: 65 },
    { id: 2, name: "Backend Revamp", category: "Upcoming", startdate: "20-02-2025", deadline: "20-07-2025", progress: 10 },
    { id: 3, name: "Client Outreach", category: "Completed", startdate: "15-01-2025", deadline: "10-04-2025", progress: 100 },
    { id: 4, name: "QA Process", category: "Ongoing", startdate: "05-02-2025", deadline: "05-09-2025", progress: 50 },
    { id: 5, name: "Infrastructure Upgrade", category: "Upcoming", startdate: "04-03-2025", deadline: "10-10-2025", progress: 0 },
    { id: 6, name: "Feature Rollout", category: "Completed", startdate: "20-01-2025", deadline: "15-03-2025", progress: 100 },
    { id: 7, name: "Product Launch", category: "Upcoming", startdate: "20-01-2025", deadline: "15-03-2025", progress: 0 },
    { id: 8, name: "Compliance", category: "Ongoing", startdate: "20-01-2025", deadline: "15-03-2025", progress: 50 },
];


// ✅ Count Project Types for Overview Cards
const totalProjects = projectData.length;
const ongoingProjects = projectData.filter((p) => p.category === "Ongoing").length;
const upcomingProjects = projectData.filter((p) => p.category === "Upcoming").length;
const completedProjects = projectData.filter((p) => p.category === "Completed").length;

const MyProjectsDashboard = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [tabIndex, setTabIndex] = useState(0); // ✅ Tracks the active tab
    const navigate = useNavigate();

    // ✅ Pagination Handlers
    const handlePageChange = (event, newPage) => setPage(newPage);
    const handleRowsPerPageChange = (event) => setRowsPerPage(parseInt(event.target.value, 10));

    // ✅ Tab Change Handler
    const handleTabChange = (event, newIndex) => setTabIndex(newIndex);

    const projectsStatus = [
        { label: "Total Projects", count: totalProjects, icon: <Work />, color: "#2196F3" },
        { label: "Ongoing", count: ongoingProjects, icon: <HourglassTop />, color: "#FF9800" },
        // { label: "Upcoming", count: upcomingProjects, icon: <Assignment />, color: "#4CAF50" },
        { label: "Completed", count: completedProjects, icon: <CheckCircle />, color: "#2196F3" },
    ];

    // ✅ Filtered Projects based on Search & Category
    const filteredProjects = projectData
        .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
        .filter((p) => (categoryFilter === "All" ? true : p.category === categoryFilter));

    return (
        <Box sx={{}}>
            {/* <Box sx={{ mb: 2 }}>
                <KeyboardDoubleArrowLeftIcon
                    sx={{ fontSize: 40, color: '#333' }}
                    onClick
                />

            </Box> */}
            <Typography variant="h4" fontWeight="bold" marginBottom={2}>
                Projects
            </Typography>

            {/* ✅ Tabs for Switching */}
            <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                sx={{
                    mb: 2,
                    minHeight: "50px",
                }}
            >
                <Tab
                    icon={
                        <Insights
                            sx={{
                                fontSize: 32,
                                color: tabIndex === 0 ? "#1976d2" : "#001881", // Active color change
                            }}
                        />
                    }
                    label="Dashboard"
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
                        <AssignmentTurnedIn
                            sx={{
                                fontSize: 32,
                                color: tabIndex === 1 ? "#1976d2" : "#001881", // Active color change
                            }}
                        />
                    }
                    label="My Projects"
                    sx={{
                        textTransform: "none",
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: tabIndex === 1 ? "#1976d2" : "#001881", // Active color change
                        "&.Mui-selected": { color: "#1976d2" }, // Override default selected color
                    }}
                />
            </Tabs>



            {/* ✅ Conditionally Render Components Based on Active Tab */}
            {tabIndex === 0 && (
                <>
                    {/* ✅ Overview Cards */}
                    <Grid container spacing={5} >
                        {projectsStatus.map((item, index) => (
                            <Grid item xs={12} sm={4} ey={index} mt={2}>
                                <Card
                                    sx={{
                                        background: `linear-gradient(to right, ${item.color}33, ${item.color}11)`,
                                        boxShadow: 3,
                                         padding:2                                    }}
                                >
                                    <CardContent sx={{ display: 'flex', flexDirection: 'row',gap:2, justifyContent: 'space-between', alignItems:'center' }}>
                                        <Box>
                                            <Typography variant="h6">{item.label}</Typography>
                                            <Typography variant="h4" fontWeight="bold">
                                                {item.count}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ '& .MuiSvgIcon-root': { fontSize: 50, color: item.color } }}>
                                            {item.icon}
                                        </Box>

                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* ✅ Filters & Search */}
                    <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                        <TextField label="Search Projects" fullWidth onChange={(e) => setSearch(e.target.value)} />
                        <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} displayEmpty>
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="Ongoing">Ongoing</MenuItem>
                            <MenuItem value="Upcoming">Upcoming</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                        </Select>
                    </Box>

                    {/* ✅ Projects Table */}
                    <TableContainer component={Paper} sx={{ mt: 3 }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: '#a8fdf5' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Assignment /> {/* Replace with your desired icon */}
                                            Project Name
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Category /> {/* Replace with your desired icon */}
                                            Category
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <CalendarToday /> {/* Replace with your desired icon */}
                                            Start Date
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Event /> {/* Replace with your desired icon */}
                                            Deadline
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Timeline /> {/* Replace with your desired icon */}
                                            Progress
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredProjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((project) => (
                                    <TableRow key={project.id}>
                                        <TableCell>{project.name}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={project.category}
                                                color={
                                                    project.category === "Ongoing"
                                                        ? "warning"
                                                        : project.category === "Upcoming"
                                                            ? "success"
                                                            : "primary"
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>{project.startdate}</TableCell>
                                        <TableCell>{project.deadline}</TableCell>
                                        <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={project.progress}
                                                sx={{ width: "100%", height: 10, borderRadius: 5 }}
                                            />
                                            <Typography variant="body2">{project.progress}%</Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            page={page}
                            rowsPerPage={rowsPerPage}
                            count={filteredProjects.length}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                        />
                    </TableContainer>
                </>
            )}

            {/* ✅ Tab 2: My Projects */}
            {tabIndex === 1 && <MyProjects />}
        </Box>
    );
};

export default MyProjectsDashboard;
