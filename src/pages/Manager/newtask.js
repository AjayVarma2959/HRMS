// // TasksPage.js
// import React, { useState } from 'react';
// import {
//     Box,
//     Grid,
//     Card,
//     CardContent,
//     Typography,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Chip,
//     LinearProgress,
//     IconButton,
//     Button
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import PendingIcon from '@mui/icons-material/Pending';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
// import CreateTask from './CreateTask';
// import ManagerTasks from './ManagerTasks'

 
// const TasksPage = ({ onBackClick }) => {
//   const [showMyTasks, setShowMyTasks] = useState(false);
//   const navigate = useNavigate();
//     const [selectedCategory, setSelectedCategory] = useState('ongoing');
//     const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
//     const [allTasks, setAllTasks] = useState({
//       ongoing: [
//           {
//               id: 1,
//               title: "Website Redesign",
//               deadline: "2024-04-20",
//               priority: "High",
//               assignedTo: "John Doe",
//               project: "E-commerce Platform",
//               progress: 65,
//               status: "In Progress"
//           },
         
//       ],
//       pending: [
//           {
//               id: 3,
//               title: "Database Migration",
//               deadline: "2024-04-22",
//               priority: "High",
//               assignedTo: "Mike Johnson",
//               project: "System Upgrade",
//               progress: 0,
//               status: "Pending"
//           },
         
//       ],
//       completed: [
//           {
//               id: 5,
//               title: "Bug Fixes",
//               deadline: "2024-04-15",
//               priority: "Medium",
//               assignedTo: "Tom Brown",
//               project: "CRM System",
//               progress: 100,
//               status: "Completed"
//           },
         
//       ]
//   });
 
//   const handleBackToTasks = () => {
//     setShowMyTasks(false);
// };
//   const handleCreateTaskClose = (newTask) => {
//     if (newTask) {
//         setAllTasks(prev => ({
//             ...prev,
//             ongoing: [...prev.ongoing, newTask]
//         }));
//     }
//     setIsCreateTaskOpen(false);
// };
 
//   const handleCreateTask = () => {
//       setIsCreateTaskOpen(true);
//   };
//   const handleMyTasksClick = () => {
//     setShowMyTasks(true);
// };
// if (showMyTasks) {
//   return (
//       <Box sx={{ p: 3 }}>
//           <Box sx={{
//               display: 'flex',
//               alignItems: 'center',
//               mb: 4
//           }}>
              
              
//           </Box>
//           <ManagerTasks />
//       </Box>
//   );
// }
   
//     const tasks = allTasks;
 
//     if (isCreateTaskOpen) {
//         return <CreateTask onClose={handleCreateTaskClose} />;
//     }
//     const cardData = [
//       {
//           title: 'Ongoing Tasks',
//           count: allTasks.ongoing.length,
//           icon: <PlayArrowIcon sx={{ fontSize: 40, color: 'white' }} />,
//           gradient: 'linear-gradient(135deg, #4ECDC4 0%, #556270 100%)',
//           key: 'ongoing'
//       },
//       {
//           title: 'Pending Tasks',
//           count: allTasks.pending.length,
//           icon: <PendingIcon sx={{ fontSize: 40, color: 'white' }} />,
//           gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)',
//           key: 'pending'
//       },
//       {
//           title: 'Completed Tasks',
//           count: allTasks.completed.length,
//           icon: <CheckCircleIcon sx={{ fontSize: 40, color: 'white' }} />,
//           gradient: 'linear-gradient(135deg, #52c234 0%, #061700 100%)',
//           key: 'completed'
//       }
//   ];
 
//     const handleEdit = (id) => {
//         alert(`Edit Task ID: ${id}`);
//     };
 
//     const handleDelete = (id) => {
//         alert(`Delete Task ID: ${id}`);
//     };
 
//     if (isCreateTaskOpen) {
//         return <CreateTask onClose={() => setIsCreateTaskOpen(false)} />;
//     }
 
//     return (
//         <Box sx={{ p: 3 }}>
//             <Box sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 mb: 4
//             }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    
//                     <Typography
//                         variant="h5"
//                         sx={{
//                             fontWeight: 600,
//                             color: '#1e293b'
//                         }}
//                     >
//                         Tasks Overview
//                     </Typography>
//                 </Box>
 
//                 <Box sx={{
//                   gap:3,
//                   display: 'flex',
//                 }}>
//                 <Button
//                     variant="contained"
//                     startIcon={
//                         <AddIcon sx={{
//                             transition: 'transform 0.3s ease',
//                             transform: 'rotate(0deg)',
//                             '.MuiButton-root:hover &': {
//                                 transform: 'rotate(90deg)'
//                             }
//                         }} />
//                     }
//                     onClick={handleCreateTask}
//                     sx={{
//                         background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
//                         textTransform: 'none',
//                         borderRadius: '12px',
//                         padding: '10px 20px',
//                         boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2), 0 2px 4px -1px rgba(59, 130, 246, 0.1)',
//                         fontWeight: '600',
//                         fontSize: '0.95rem',
//                         transition: 'all 0.3s ease',
//                         '&:hover': {
//                             background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
//                             boxShadow: '0 8px 12px -1px rgba(59, 130, 246, 0.2), 0 4px 8px -1px rgba(59, 130, 246, 0.1)',
//                             transform: 'translateY(-2px)',
//                         },
//                         '&:active': {
//                             transform: 'translateY(0)',
//                             boxShadow: '0 2px 4px -1px rgba(59, 130, 246, 0.2), 0 1px 2px -1px rgba(59, 130, 246, 0.1)',
//                         },
//                         position: 'relative',
//                         overflow: 'hidden',
//                         '&::before': {
//                             content: '""',
//                             position: 'absolute',
//                             top: 0,
//                             left: 0,
//                             width: '100%',
//                             height: '100%',
//                             background: 'linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))',
//                             transform: 'translateY(-100%)',
//                             transition: 'transform 0.3s ease',
//                         },
//                         '&:hover::before': {
//                             transform: 'translateY(0)',
//                         }
//                     }}
//                 >
//                     Create Task
//                 </Button>
//                 <Button 
//                         onClick={handleMyTasksClick} 
//                         sx={{
//                             background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
//                             textTransform: 'none',
//                             borderRadius: '12px',
//                             padding: '10px 20px',
//                             boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2), 0 2px 4px -1px rgba(59, 130, 246, 0.1)',
//                             fontWeight: '600',
//                             fontSize: '0.95rem',
//                             transition: 'all 0.3s ease',
//                             color: 'white',
//                             '&:hover': {
//                                 background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
//                                 boxShadow: '0 8px 12px -1px rgba(59, 130, 246, 0.2), 0 4px 8px -1px rgba(59, 130, 246, 0.1)',
//                                 transform: 'translateY(-2px)',
//                             },
//                             '&:active': {
//                                 transform: 'translateY(0)',
//                                 boxShadow: '0 2px 4px -1px rgba(59, 130, 246, 0.2), 0 1px 2px -1px rgba(59, 130, 246, 0.1)',
//                             },
//                             position: 'relative',
//                             overflow: 'hidden',
//                             '&::before': {
//                                 content: '""',
//                                 position: 'absolute',
//                                 top: 0,
//                                 left: 0,
//                                 width: '100%',
//                                 height: '100%',
//                                 background: 'linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))',
//                                 transform: 'translateY(-100%)',
//                                 transition: 'transform 0.3s ease',
//                             },
//                             '&:hover::before': {
//                                 transform: 'translateY(0)',
//                             }
//                         }}
//                     > 
//                         My Tasks
//                     </Button>
//                 </Box>
//             </Box>
 
//             <Grid container spacing={3} sx={{ mb: 4 }}>
//     {cardData.map((card) => (
//         <Grid item xs={12} sm={4} key={card.title}>
//             <Card
//                 onClick={() => setSelectedCategory(card.key)}
//                 sx={{
//                     background: selectedCategory === card.key 
//                         ? `linear-gradient(145deg, ${card.gradient}10, white)`
//                         : 'white',
//                     borderRadius: '20px',
//                     position: 'relative',
//                     minHeight: '140px',
//                     border: selectedCategory === card.key 
//                         ? `2px solid ${card.gradient}` 
//                         : '2px solid transparent',
//                     transition: 'all 0.3s ease',
//                     cursor: 'pointer',
//                     overflow: 'hidden',
//                     boxShadow: selectedCategory === card.key
//                         ? `0 10px 30px ${card.gradient}30`
//                         : '0 4px 6px rgba(0, 0, 0, 0.02)',
//                     '&:hover': {
//                         transform: 'translateY(-5px)',
//                         boxShadow: `0 20px 40px ${card.gradient}20`,
//                         '& .card-count': {
//                             transform: 'scale(1.1)',
//                             color: card.gradient
//                         }
//                     }
//                 }}
//             >
//                 <CardContent sx={{ p: 2.5 }}>
//                     {/* Header */}
//                     <Box sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: 1.5,
//                         mb: 2
//                     }}>
//                         <Box sx={{
//                             width: 40,
//                             height: 40,
//                             borderRadius: '12px',
//                             background: card.gradient,
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             boxShadow: `0 4px 8px ${card.gradient}40`
//                         }}>
//                             {React.cloneElement(card.icon, {
//                                 sx: { fontSize: 22, color: 'white' }
//                             })}
//                         </Box>
//                         <Typography sx={{
//                             fontSize: '1rem',
//                             fontWeight: 600,
//                             color: '#1e293b'
//                         }}>
//                             {card.title}
//                         </Typography>
//                     </Box>

//                     {/* Count */}
//                     <Box sx={{ 
//                         display: 'flex',
//                         alignItems: 'flex-end',
//                         justifyContent: 'space-between'
//                     }}>
//                         <Typography 
//                             className="card-count"
//                             sx={{
//                                 fontSize: '2.5rem',
//                                 fontWeight: 700,
//                                 color: '#0f172a',
//                                 lineHeight: 1,
//                                 transition: 'all 0.3s ease'
//                             }}
//                         >
//                             {card.count}
//                         </Typography>

//                         {selectedCategory === card.key && (
//                             <Box sx={{
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 gap: 1,
//                                 background: `${card.gradient}15`,
//                                 py: 0.5,
//                                 px: 1.5,
//                                 borderRadius: '20px'
//                             }}>
//                                 <Box sx={{
//                                     width: 6,
//                                     height: 6,
//                                     borderRadius: '50%',
//                                     background: card.gradient
//                                 }} />
//                                 <Typography sx={{
//                                     fontSize: '0.75rem',
//                                     fontWeight: 600,
//                                     color: card.gradient
//                                 }}>
//                                     Active
//                                 </Typography>
//                             </Box>
//                         )}
//                     </Box>

//                     {/* Progress Bar */}
//                     <Box sx={{ mt: 2 }}>
//                         <LinearProgress
//                             variant="determinate"
//                             value={selectedCategory === card.key ? 100 : 0}
//                             sx={{
//                                 height: 4,
//                                 borderRadius: 2,
//                                 backgroundColor: '#f1f5f9',
//                                 '& .MuiLinearProgress-bar': {
//                                     background: card.gradient,
//                                     transition: 'transform 0.4s ease'
//                                 }
//                             }}
//                         />
//                     </Box>
//                 </CardContent>
//             </Card>
//         </Grid>
//     ))}
// </Grid>
 
//             <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow sx={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}>
//                             <TableCell sx={{ color: 'white', fontWeight: 700 }}>Task Name</TableCell>
//                             <TableCell sx={{ color: 'white', fontWeight: 700 }}>Project</TableCell>
//                             <TableCell sx={{ color: 'white', fontWeight: 700 }}>Assigned To</TableCell>
//                             <TableCell sx={{ color: 'white', fontWeight: 700 }}>Deadline</TableCell>
//                             <TableCell sx={{ color: 'white', fontWeight: 700 }}>Priority</TableCell>
//                             <TableCell sx={{ color: 'white', fontWeight: 700 }}>Progress</TableCell>
//                             <TableCell sx={{ color: 'white', fontWeight: 700 }}>Status</TableCell>
//                             <TableCell sx={{ color: 'white', fontWeight: 700 }}>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//     {allTasks[selectedCategory].map((task, index) => (
//         <TableRow key={task.id} sx={{
//             backgroundColor: index % 2 === 0 ? '#f8fafc' : 'white',
//             '&:hover': {
//                 backgroundColor: '#f1f5f9'
//             }
//         }}>
//             <TableCell>
//                 <Chip
//                     label={task.title}
//                     sx={{
//                         backgroundColor: 'rgba(99, 102, 241, 0.1)',
//                         color: '#6366f1',
//                         fontWeight: 600
//                     }}
//                 />
//             </TableCell>
//             <TableCell>{task.project}</TableCell>
//             <TableCell>{task.assignedTo}</TableCell>
//             <TableCell>{task.deadline}</TableCell>
//             <TableCell>
//                 <Chip
//                     label={task.priority}
//                     sx={{
//                         backgroundColor:
//                             task.priority === 'High' ? 'rgba(239, 68, 68, 0.2)' :
//                             task.priority === 'Medium' ? 'rgba(234, 179, 8, 0.2)' :
//                             'rgba(34, 197, 94, 0.2)',
//                         color:
//                             task.priority === 'High' ? '#ef4444' :
//                             task.priority === 'Medium' ? '#eab308' :
//                             '#22c55e',
//                         fontWeight: 600
//                     }}
//                 />
//             </TableCell>
//             <TableCell>
//                 <Box sx={{ position: 'relative', width: '100%' }}>
//                     <LinearProgress
//                         variant="determinate"
//                         value={task.progress}
//                         sx={{
//                             height: 8,
//                             borderRadius: 4,
//                             backgroundColor: 'rgba(59, 130, 246, 0.2)',
//                             '& .MuiLinearProgress-bar': {
//                                 background: 'linear-gradient(90deg, #3b82f6, #2563eb)',
//                                 borderRadius: 4
//                             }
//                         }}
//                     />
//                     <Typography
//                         variant="caption"
//                         sx={{
//                             position: 'absolute',
//                             right: '-40px',
//                             top: '-4px',
//                             color: '#3b82f6',
//                             fontWeight: 600
//                         }}
//                     >
//                         {task.progress}%
//                     </Typography>
//                 </Box>
//             </TableCell>
//             <TableCell>
//                 <Chip
//                     label={task.status}
//                     sx={{
//                         backgroundColor: 'rgba(59, 130, 246, 0.1)',
//                         color: '#3b82f6',
//                         fontWeight: 600
//                     }}
//                 />
//             </TableCell>
//             <TableCell>
//                 <IconButton onClick={() => handleEdit(task.id)} sx={{ color: '#eab308' }}>
//                     <EditIcon />
//                 </IconButton>
//                 <IconButton onClick={() => handleDelete(task.id)} sx={{ color: '#ef4444' }}>
//                     <DeleteIcon />
//                 </IconButton>
//             </TableCell>
//         </TableRow>
//     ))}
// </TableBody>
//                 </Table>
//             </TableContainer>
//         </Box>
//     );
// };
 
// export default TasksPage;
 

import React, { useState, useEffect } from 'react';
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
    TablePagination,
    Paper,
    Chip,
    LinearProgress,
    IconButton,
    Button,
    CircularProgress,
    Snackbar,
    Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CreateTask from './CreateTask';
import ManagerTasks from './ManagerTasks';
import axios from 'axios';

const TasksPage = ({ onBackClick }) => {
    const [showMyTasks, setShowMyTasks] = useState(false);
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('pending'); 
    const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
    const [allTasks, setAllTasks] = useState({
        ongoing: [],
        pending: [],
        completed: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:3900/api/task/getAllMainTasksByManagerId/101');
            
            if (response.data.statusCode === 200) {
                const tasks = response.data.message.projects;
                
                let projectsData = [];
                try {
                    const projectsResponse = await axios.get('http://localhost:3900/api/project/getProjectsByManagerId/2');
                    if (projectsResponse.data.status === "SUCCESS") {
                        projectsData = projectsResponse.data.data;
                    }
                } catch (err) {
                    console.error("Error fetching projects:", err);
                }
                
                const categorizedTasks = {
                    ongoing: [],
                    pending: [],
                    completed: []
                };
                
                tasks.forEach(task => {
                    let progress = 0;
                    if (task.status === 'Completed') {
                        progress = 100;
                    } else if (task.status === 'In Progress') {
                        progress = Math.floor(Math.random() * 80) + 10; 
                    }
                    
                    const projectName = projectsData.find(p => p.id === task.project_id)?.project_title || "Project Name";
                    
                    const formattedTask = {
                        id: task.task_id,
                        title: task.task_title,
                        deadline: new Date(task.due_date).toISOString().split('T')[0],
                        priority: task.priority,
                        assignedTo: task.assignee_name || "Team Member", 
                        project: projectName,
                        progress: progress,
                        status: task.status,
                        description: task.description
                    };
                    
                    if (task.status === 'Completed') {
                        categorizedTasks.completed.push(formattedTask);
                    } else if (task.status === 'Pending') {
                        categorizedTasks.pending.push(formattedTask);
                    } else {
                        categorizedTasks.ongoing.push(formattedTask);
                    }
                });
                
                setAllTasks(categorizedTasks);
                
                setPage(0);
            } else {
                setSnackbar({
                    open: true,
                    message: 'Failed to fetch tasks',
                    severity: 'error'
                });
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setSnackbar({
                open: true,
                message: 'Error connecting to server',
                severity: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToTasks = () => {
        setShowMyTasks(false);
    };

    const handleCreateTaskClose = (newTask) => {
        setIsCreateTaskOpen(false);
        
        if (newTask) {
            fetchTasks();
            
            setSnackbar({
                open: true,
                message: 'Task created successfully!',
                severity: 'success'
            });
        }
    };

    const handleCreateTask = () => {
        setIsCreateTaskOpen(true);
    };

    const handleMyTasksClick = () => {
        setShowMyTasks(true);
    };

    const handleSnackbarClose = () => {
        setSnackbar({...snackbar, open: false});
    };

    const handleEdit = (id) => {
        alert(`Edit Task ID: ${id}`);
    };

    const handleDelete = (id) => {
        alert(`Delete Task ID: ${id}`);
    };
    
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (showMyTasks) {
        return (
            <Box sx={{ p: 3 }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 4
                }}>
                    <Button 
                        onClick={handleBackToTasks}
                        sx={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            color: 'white',
                            borderRadius: '12px',
                            padding: '8px 16px',
                            textTransform: 'none',
                            fontWeight: '600',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                            }
                        }}
                    >
                        Back to Tasks
                    </Button>
                </Box>
                <ManagerTasks />
            </Box>
        );
    }

    if (isCreateTaskOpen) {
        return <CreateTask onClose={handleCreateTaskClose} />;
    }

    const cardData = [
        {
            title: 'Ongoing Tasks',
            count: allTasks.ongoing.length,
            icon: <PlayArrowIcon sx={{ fontSize: 40, color: 'white' }} />,
            gradient: 'linear-gradient(135deg, #4ECDC4 0%, #556270 100%)',
            key: 'ongoing'
        },
        {
            title: 'Pending Tasks',
            count: allTasks.pending.length,
            icon: <PendingIcon sx={{ fontSize: 40, color: 'white' }} />,
            gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)',
            key: 'pending'
        },
        {
            title: 'Completed Tasks',
            count: allTasks.completed.length,
            icon: <CheckCircleIcon sx={{ fontSize: 40, color: 'white' }} />,
            gradient: 'linear-gradient(135deg, #52c234 0%, #061700 100%)',
            key: 'completed'
        }
    ];
    
   
    const currentTasks = isLoading ? [] : 
        allTasks[selectedCategory].slice(
            page * rowsPerPage, 
            page * rowsPerPage + rowsPerPage
        );

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 4
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 600,
                            color: '#1e293b'
                        }}
                    >
                        Tasks Overview
                    </Typography>
                </Box>

                <Box sx={{
                    gap: 3,
                    display: 'flex',
                }}>
                    <Button
                        variant="contained"
                        startIcon={
                            <AddIcon sx={{
                                transition: 'transform 0.3s ease',
                                transform: 'rotate(0deg)',
                                '.MuiButton-root:hover &': {
                                    transform: 'rotate(90deg)'
                                }
                            }} />
                        }
                        onClick={handleCreateTask}
                        sx={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            textTransform: 'none',
                            borderRadius: '12px',
                            padding: '10px 20px',
                            boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2), 0 2px 4px -1px rgba(59, 130, 246, 0.1)',
                            fontWeight: '600',
                            fontSize: '0.95rem',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                boxShadow: '0 8px 12px -1px rgba(59, 130, 246, 0.2), 0 4px 8px -1px rgba(59, 130, 246, 0.1)',
                                transform: 'translateY(-2px)',
                            },
                            '&:active': {
                                transform: 'translateY(0)',
                                boxShadow: '0 2px 4px -1px rgba(59, 130, 246, 0.2), 0 1px 2px -1px rgba(59, 130, 246, 0.1)',
                            },
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))',
                                transform: 'translateY(-100%)',
                                transition: 'transform 0.3s ease',
                            },
                            '&:hover::before': {
                                transform: 'translateY(0)',
                            }
                        }}
                    >
                        Create Task
                    </Button>
                    <Button
                        onClick={handleMyTasksClick}
                        sx={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            textTransform: 'none',
                            borderRadius: '12px',
                            padding: '10px 20px',
                            boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2), 0 2px 4px -1px rgba(59, 130, 246, 0.1)',
                            fontWeight: '600',
                            fontSize: '0.95rem',
                            transition: 'all 0.3s ease',
                            color: 'white',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                boxShadow: '0 8px 12px -1px rgba(59, 130, 246, 0.2), 0 4px 8px -1px rgba(59, 130, 246, 0.1)',
                                transform: 'translateY(-2px)',
                            },
                            '&:active': {
                                transform: 'translateY(0)',
                                boxShadow: '0 2px 4px -1px rgba(59, 130, 246, 0.2), 0 1px 2px -1px rgba(59, 130, 246, 0.1)',
                            },
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))',
                                transform: 'translateY(-100%)',
                                transition: 'transform 0.3s ease',
                            },
                            '&:hover::before': {
                                transform: 'translateY(0)',
                            }
                        }}
                    >
                        My Tasks
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                {cardData.map((card) => (
                    <Grid item xs={12} sm={4} key={card.title}>
                        <Card
                            onClick={() => {
                                setSelectedCategory(card.key);
                                setPage(0); 
                            }}
                            sx={{
                                background: selectedCategory === card.key
                                    ? `linear-gradient(145deg, ${card.gradient}10, white)`
                                    : 'white',
                                borderRadius: '20px',
                                position: 'relative',
                                minHeight: '140px',
                                border: selectedCategory === card.key
                                    ? `2px solid ${card.gradient}`
                                    : '2px solid transparent',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                overflow: 'hidden',
                                boxShadow: selectedCategory === card.key
                                    ? `0 10px 30px ${card.gradient}30`
                                    : '0 4px 6px rgba(0, 0, 0, 0.02)',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: `0 20px 40px ${card.gradient}20`,
                                    '& .card-count': {
                                        transform: 'scale(1.1)',
                                        color: card.gradient
                                    }
                                }
                            }}
                        >
                            <CardContent sx={{ p: 2.5 }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5,
                                    mb: 2
                                }}>
                                                    <Box sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: '12px',
                                        background: card.gradient,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: `0 4px 8px ${card.gradient}40`
                                    }}>
                                        {React.cloneElement(card.icon, {
                                            sx: { fontSize: 22, color: 'white' }
                                        })}
                                    </Box>
                                    <Typography sx={{
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        color: '#1e293b'
                                    }}>
                                        {card.title}
                                    </Typography>
                                </Box>

                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'space-between'
                                }}>
                                    <Typography
                                        className="card-count"
                                        sx={{
                                            fontSize: '2.5rem',
                                            fontWeight: 700,
                                            color: '#0f172a',
                                            lineHeight: 1,
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {card.count}
                                    </Typography>

                                    {selectedCategory === card.key && (
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            background: `${card.gradient}15`,
                                            py: 0.5,
                                            px: 1.5,
                                            borderRadius: '20px'
                                        }}>
                                            <Box sx={{
                                                width: 6,
                                                height: 6,
                                                borderRadius: '50%',
                                                background: card.gradient
                                            }} />
                                            <Typography sx={{
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                color: card.gradient
                                            }}>
                                                Active
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>

                                <Box sx={{ mt: 2 }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={selectedCategory === card.key ? 100 : 0}
                                        sx={{
                                            height: 4,
                                            borderRadius: 2,
                                            backgroundColor: '#f1f5f9',
                                            '& .MuiLinearProgress-bar': {
                                                background: card.gradient,
                                                transition: 'transform 0.4s ease'
                                            }
                                        }}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
                <TableContainer component={Paper} sx={{ borderRadius: '12px 12px 0 0' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}>
                                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Task Name</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Project</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Assigned To</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Deadline</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Priority</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Progress</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Status</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                                            <CircularProgress size={40} sx={{ color: '#3b82f6' }} />
                                        </Box>
                                        <Typography sx={{ textAlign: 'center', color: '#64748b' }}>
                                            Loading tasks...
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : allTasks[selectedCategory].length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        <Typography sx={{ py: 3, color: '#64748b' }}>
                                            No {selectedCategory} tasks found
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                currentTasks.map((task, index) => (
                                    <TableRow key={task.id} sx={{
                                        backgroundColor: index % 2 === 0 ? '#f8fafc' : 'white',
                                        '&:hover': {
                                            backgroundColor: '#f1f5f9'
                                        }
                                    }}>
                                        <TableCell>
                                            <Chip
                                                label={task.title}
                                                sx={{
                                                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                                    color: '#6366f1',
                                                    fontWeight: 600
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>{task.project}</TableCell>
                                        <TableCell>{task.assignedTo}</TableCell>
                                        <TableCell>{task.deadline}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={task.priority}
                                                sx={{
                                                    backgroundColor:
                                                        task.priority === 'High' ? 'rgba(239, 68, 68, 0.2)' :
                                                        task.priority === 'Medium' ? 'rgba(234, 179, 8, 0.2)' :
                                                        'rgba(34, 197, 94, 0.2)',
                                                    color:
                                                        task.priority === 'High' ? '#ef4444' :
                                                        task.priority === 'Medium' ? '#eab308' :
                                                        '#22c55e',
                                                    fontWeight: 600
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ position: 'relative', width: '100%' }}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={task.progress}
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
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        position: 'absolute',
                                                        right: '-40px',
                                                        top: '-4px',
                                                        color: '#3b82f6',
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    {task.progress}%
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={task.status}
                                                sx={{
                                                    backgroundColor: 
                                                        task.status === 'Completed' ? 'rgba(34, 197, 94, 0.1)' :
                                                        task.status === 'Pending' ? 'rgba(234, 179, 8, 0.1)' :
                                                        'rgba(59, 130, 246, 0.1)',
                                                    color: 
                                                        task.status === 'Completed' ? '#22c55e' :
                                                        task.status === 'Pending' ? '#eab308' :
                                                        '#3b82f6',
                                                    fontWeight: 600
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleEdit(task.id)} sx={{ color: '#eab308' }}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(task.id)} sx={{ color: '#ef4444' }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                
               
                <TablePagination
                    rowsPerPageOptions={[6, 12, 24]}
                    component="div"
                    count={allTasks[selectedCategory].length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                        backgroundColor: '#f8fafc',
                        borderTop: '1px solid #e2e8f0',
                        '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                            color: '#64748b',
                            fontWeight: 500
                        },
                        '& .MuiTablePagination-select': {
                            color: '#3b82f6',
                            fontWeight: 600
                        },
                        '& .MuiTablePagination-actions': {
                            '& .MuiIconButton-root': {
                                color: '#3b82f6',
                                '&.Mui-disabled': {
                                    color: '#cbd5e1'
                                }
                            }
                        }
                    }}
                />
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleSnackbarClose} 
                    severity={snackbar.severity} 
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default TasksPage;