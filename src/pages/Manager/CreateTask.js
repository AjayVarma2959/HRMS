// import React, { useState, useEffect } from 'react';
// import {
//     Box,
//     Avatar,
//     TextField,
//     Button,
//     Typography,
//     MenuItem,
//     Grid,
//     FormControl,
//     InputLabel,
//     Select,
//     Stack,
//     Stepper,
//     Step,
//     StepLabel,
//     Divider,
//     Chip,
//     IconButton,
//     Alert,
// } from '@mui/material';
// import {
//     Assignment as TaskIcon,
//     Group as TeamIcon,
//     Description as DescIcon,
//     Flag as PriorityIcon,
//     Save as SaveIcon,
//     ArrowBack as BackIcon,
//     ArrowForward as NextIcon,
//     Add as AddIcon,
//     Delete as DeleteIcon,
//     Code as CodeIcon,
//     Brush as DesignIcon,
//     BugReport as TestingIcon,
//     Article as DocIcon,
//     Science as ResearchIcon,
// } from '@mui/icons-material';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import Back from '../../assets/Back.png';
// const CreateTask = ({ onClose }) => {
//     const taskTypes = [
//         { value: 'development', label: 'Development Task', icon: <CodeIcon /> },
//         { value: 'design', label: 'Design Task', icon: <DesignIcon /> },
//         { value: 'testing', label: 'Testing Task', icon: <TestingIcon /> },
//         { value: 'documentation', label: 'Documentation Task', icon: <DocIcon /> },
//         { value: 'research', label: 'Research Task', icon: <ResearchIcon /> }
//     ];
    
//     const developmentTypes = [
//         { value: 'frontend', label: 'Frontend Development' },
//         { value: 'backend', label: 'Backend Development' },
//         { value: 'fullstack', label: 'Full Stack Development' }
//     ];
    
//     const priorities = [
//         { value: 'low', label: 'Low', color: '#22c55e' },
//         { value: 'medium', label: 'Medium', color: '#eab308' },
//         { value: 'high', label: 'High', color: '#ef4444' }
//     ];
    
//     const projects = [
//         { id: 1, name: 'E-commerce Platform' },
//         { id: 2, name: 'Mobile Banking App' },
//         { id: 3, name: 'CRM System' }
//     ];
    
//     const teamMembers = [
//         { 
//             id: 1, 
//             name: 'John Doe', 
//             role: 'Frontend Developer', 
//             skills: ['frontend'],
//             avatar: 'JD'
//         },
//         { 
//             id: 2, 
//             name: 'Sarah Smith', 
//             role: 'Backend Developer', 
//             skills: ['backend'],
//             avatar: 'SS'
//         },
//         { 
//             id: 3, 
//             name: 'Mike Johnson', 
//             role: 'Full Stack Developer', 
//             skills: ['frontend', 'backend'],
//             avatar: 'MJ'
//         }
//     ];
//     const [activeStep, setActiveStep] = useState(0);
//     const [errors, setErrors] = useState({});
//     const [taskData, setTaskData] = useState({
//         projectId: '',
//         taskName: '',
//         description: '',
//         taskType: '',
//         developmentType: '',
//         assignmentType: 'single',
//         startDate: null,
//         endDate: null,
//         priority: 'medium',
//         assignees: [],
//         subtasks: [],
//         estimatedHours: '',
//         status: 'pending'
//     });

//     const steps = ['Basic Info', 'Task Type', 'Team & Timeline', 'Subtasks', 'Review'];

//     // Validation function
//     const validateStep = (step) => {
//         const newErrors = {};
        
//         switch (step) {
//             case 0:
//                 if (!taskData.projectId) newErrors.projectId = 'Project is required';
//                 if (!taskData.taskName) newErrors.taskName = 'Task name is required';
//                 if (!taskData.description) newErrors.description = 'Description is required';
//                 break;
//             case 1:
//                 if (!taskData.taskType) newErrors.taskType = 'Task type is required';
//                 if (taskData.taskType === 'development' && !taskData.developmentType) {
//                     newErrors.developmentType = 'Development type is required';
//                 }
//                 break;
//             case 2:
//                 if (!taskData.startDate) newErrors.startDate = 'Start date is required';
//                 if (!taskData.endDate) newErrors.endDate = 'End date is required';
//                 if (taskData.assignmentType === 'single' && taskData.assignees.length === 0) {
//                     newErrors.assignees = 'Please select an assignee';
//                 }
//                 break;
//             case 3:
//                 if (taskData.assignmentType === 'multiple' && taskData.subtasks.length === 0) {
//                     newErrors.subtasks = 'At least one subtask is required';
//                 }
//                 break;
//             default:
//                 break;
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     // Handle changes
//     const handleChange = (field) => (event) => {
//         const value = event.target.value;
//         setTaskData(prev => ({
//             ...prev,
//             [field]: value,
//             // Reset related fields when certain values change
//             ...(field === 'taskType' && value !== 'development' && { developmentType: '' }),
//             ...(field === 'assignmentType' && value === 'single' && { subtasks: [] })
//         }));
//     };

    
//     const handleSubtaskChange = (index, field, value) => {
//         const newSubtasks = [...taskData.subtasks];
//         newSubtasks[index] = { ...newSubtasks[index], [field]: value };
//         setTaskData({ ...taskData, subtasks: newSubtasks });
//     };

//     const addSubtask = () => {
//         setTaskData({
//             ...taskData,
//             subtasks: [
//                 ...taskData.subtasks,
//                 {
//                     name: '',
//                     type: taskData.developmentType || '',
//                     assigneeId: '',
//                     status: 'pending'
//                 }
//             ]
//         });
//     };

//     const removeSubtask = (index) => {
//         const newSubtasks = taskData.subtasks.filter((_, i) => i !== index);
//         setTaskData({ ...taskData, subtasks: newSubtasks });
//     };

//     // Navigation
//     const handleNext = () => {
//         if (validateStep(activeStep)) {
//             setActiveStep((prev) => prev + 1);
//         }
//     };

//     const handleBack = () => {
//         setActiveStep((prev) => prev - 1);
//     };

 
//     const handleSubmit = () => {
//         if (validateStep(activeStep)) {
//             const newTask = {
//                 id: Date.now(),
//                 title: taskData.taskName,
//                 type: taskData.taskType,
//                 developmentType: taskData.developmentType,
//                 deadline: taskData.endDate ? new Date(taskData.endDate).toLocaleDateString() : '',
//                 priority: priorities.find(p => p.value === taskData.priority)?.label || 'Medium',
//                 project: projects.find(p => p.id === taskData.projectId)?.name || '',
//                 progress: 0,
//                 status: 'In Progress',
//                 description: taskData.description,
//                 assignmentType: taskData.assignmentType,
//                 assignees: taskData.assignees.map(id => teamMembers.find(m => m.id === id)?.name).join(', '),
//                 subtasks: taskData.subtasks.map(subtask => ({
//                     ...subtask,
//                     assignedTo: teamMembers.find(m => m.id === subtask.assigneeId)?.name
//                 }))
//             };
//             onClose(newTask);
//         }
//     };

//     const renderStepContent = (step) => {
//         switch (step) {
//             case 0:
//                 return (
//                     <Stack spacing={3}>
//                         <FormControl fullWidth error={!!errors.projectId}>
//                             <InputLabel>Project</InputLabel>
//                             <Select
//                                 value={taskData.projectId}
//                                 onChange={handleChange('projectId')}
//                                 startAdornment={<TaskIcon sx={{ mr: 1, color: '#3b82f6' }} />}
//                             >
//                                 {projects.map((project) => (
//                                     <MenuItem key={project.id} value={project.id}>
//                                         {project.name}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                             {errors.projectId && (
//                                 <Typography color="error" variant="caption">
//                                     {errors.projectId}
//                                 </Typography>
//                             )}
//                         </FormControl>

//                         <TextField
//                             fullWidth
//                             label="Task Name"
//                             value={taskData.taskName}
//                             onChange={handleChange('taskName')}
//                             error={!!errors.taskName}
//                             helperText={errors.taskName}
//                             InputProps={{
//                                 startAdornment: <TaskIcon sx={{ mr: 1, color: '#3b82f6' }} />
//                             }}
//                         />

//                         <TextField
//                             fullWidth
//                             multiline
//                             rows={4}
//                             label="Description"
//                             value={taskData.description}
//                             onChange={handleChange('description')}
//                             error={!!errors.description}
//                             helperText={errors.description}
//                             InputProps={{
//                                 startAdornment: <DescIcon sx={{ mr: 1, color: '#3b82f6' }} />
//                             }}
//                         />
//                     </Stack>
//                 );

//             case 1:
//                 return (
//                     <Stack spacing={3}>
//                         <FormControl fullWidth error={!!errors.taskType}>
//                             <InputLabel>Task Type</InputLabel>
//                             <Select
//                                 value={taskData.taskType}
//                                 onChange={handleChange('taskType')}
//                             >
//                                 {taskTypes.map((type) => (
//                                     <MenuItem key={type.value} value={type.value}>
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                             {type.icon}
//                                             {type.label}
//                                         </Box>
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                             {errors.taskType && (
//                                 <Typography color="error" variant="caption">
//                                     {errors.taskType}
//                                 </Typography>
//                             )}
//                         </FormControl>

//                         {taskData.taskType === 'development' && (
//                             <FormControl fullWidth error={!!errors.developmentType}>
//                                 <InputLabel>Development Type</InputLabel>
//                                 <Select
//                                     value={taskData.developmentType}
//                                     onChange={handleChange('developmentType')}
//                                 >
//                                     {developmentTypes.map((type) => (
//                                         <MenuItem key={type.value} value={type.value}>
//                                             {type.label}
//                                         </MenuItem>
//                                     ))}
//                                 </Select>
//                                 {errors.developmentType && (
//                                     <Typography color="error" variant="caption">
//                                         {errors.developmentType}
//                                     </Typography>
//                                 )}
//                             </FormControl>
//                         )}

//                         <FormControl fullWidth>
//                             <InputLabel>Assignment Type</InputLabel>
//                             <Select
//                                 value={taskData.assignmentType}
//                                 onChange={handleChange('assignmentType')}
//                             >
//                                 <MenuItem value="single">Single Member</MenuItem>
//                                 <MenuItem value="multiple">Multiple Members (Create Subtasks)</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </Stack>
//                 );

//             case 2:
//                 return (
//                     <Stack spacing={3}>
//                         {taskData.assignmentType === 'single' && (
//                             <FormControl fullWidth error={!!errors.assignees}>
//                                 <InputLabel>Assignee</InputLabel>
//                                 <Select
//                                     value={taskData.assignees[0] || ''}
//                                     onChange={(e) => setTaskData({
//                                         ...taskData,
//                                         assignees: [e.target.value]
//                                     })}
//                                 >
//                                     {teamMembers
//                                         .filter(member => 
//                                             !taskData.developmentType || 
//                                             member.skills.includes(taskData.developmentType)
//                                         )
//                                         .map((member) => (
//                                             <MenuItem key={member.id} value={member.id}>
//                                                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                                     <Avatar>{member.avatar}</Avatar>
//                                                     <Box>
//                                                         <Typography>{member.name}</Typography>
//                                                         <Typography variant="caption" color="textSecondary">
//                                                             {member.role}
//                                                         </Typography>
//                                                     </Box>
//                                                 </Box>
//                                             </MenuItem>
//                                         ))}
//                                 </Select>
//                                 {errors.assignees && (
//                                     <Typography color="error" variant="caption">
//                                         {errors.assignees}
//                                     </Typography>
//                                 )}
//                             </FormControl>
//                         )}

//                         <LocalizationProvider dateAdapter={AdapterDateFns}>
//                             <Grid container spacing={2}>
//                                 <Grid item xs={6}>
//                                     <DatePicker
//                                         label="Start Date"
//                                         value={taskData.startDate}
//                                         onChange={(newValue) => {
//                                             setTaskData({ ...taskData, startDate: newValue });
//                                         }}
//                                         renderInput={(params) => (
//                                             <TextField
//                                                 {...params}
//                                                 fullWidth
//                                                 error={!!errors.startDate}
//                                                 helperText={errors.startDate}
//                                             />
//                                         )}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <DatePicker
//                                         label="End Date"
//                                         value={taskData.endDate}
//                                         onChange={(newValue) => {
//                                             setTaskData({ ...taskData, endDate: newValue });
//                                         }}
//                                         renderInput={(params) => (
//                                             <TextField
//                                                 {...params}
//                                                 fullWidth
//                                                 error={!!errors.endDate}
//                                                 helperText={errors.endDate}
//                                             />
//                                         )}
//                                     />
//                                 </Grid>
//                             </Grid>
//                         </LocalizationProvider>

//                         <FormControl fullWidth>
//                             <InputLabel>Priority</InputLabel>
//                             <Select
//                                 value={taskData.priority}
//                                 onChange={handleChange('priority')}
//                             >
//                                 {priorities.map((priority) => (
//                                     <MenuItem key={priority.value} value={priority.value}>
//                                         <Box sx={{ display: 'flex', alignItems: 'center', color: priority.color }}>
//                                             <PriorityIcon sx={{ mr: 1 }} />
//                                             {priority.label}
//                                         </Box>
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Stack>
//                 );

//             // Continuing with case 3 in renderStepContent:
//             case 3:
//                 return taskData.assignmentType === 'multiple' ? (
//                     <Stack spacing={3}>
//                         {errors.subtasks && (
//                             <Alert severity="error">{errors.subtasks}</Alert>
//                         )}
                        
//                         {taskData.subtasks.map((subtask, index) => (
//                             <Box 
//                                 key={index} 
//                                 sx={{ 
//                                     p: 2, 
//                                     border: '1px solid rgba(59, 130, 246, 0.2)', 
//                                     borderRadius: 1,
//                                     position: 'relative'
//                                 }}
//                             >
//                                 <IconButton
//                                     size="small"
//                                     onClick={() => removeSubtask(index)}
//                                     sx={{
//                                         position: 'absolute',
//                                         right: 8,
//                                         top: 8,
//                                         color: 'error.main'
//                                     }}
//                                 >
//                                     <DeleteIcon />
//                                 </IconButton>

//                                 <Typography variant="subtitle1" gutterBottom>
//                                     Subtask {index + 1}
//                                 </Typography>

//                                 <Grid container spacing={2}>
//                                     <Grid item xs={12}>
//                                         <TextField
//                                             fullWidth
//                                             label="Subtask Name"
//                                             value={subtask.name}
//                                             onChange={(e) => handleSubtaskChange(index, 'name', e.target.value)}
//                                         />
//                                     </Grid>

//                                     <Grid item xs={12}>
//                                         <FormControl fullWidth>
//                                             <InputLabel>Assignee</InputLabel>
//                                             <Select
//                                                 value={subtask.assigneeId}
//                                                 onChange={(e) => handleSubtaskChange(index, 'assigneeId', e.target.value)}
//                                             >
//                                                 {teamMembers
//                                                     .filter(member => 
//                                                         !taskData.developmentType || 
//                                                         member.skills.includes(taskData.developmentType)
//                                                     )
//                                                     .map((member) => (
//                                                         <MenuItem key={member.id} value={member.id}>
//                                                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                                                 <Box sx={{
//                                                                     width: 32,
//                                                                     height: 32,
//                                                                     borderRadius: '50%',
//                                                                     bgcolor: 'primary.main',
//                                                                     color: 'white',
//                                                                     display: 'flex',
//                                                                     alignItems: 'center',
//                                                                     justifyContent: 'center',
//                                                                     fontSize: '0.875rem'
//                                                                 }}>
//                                                                     {member.avatar}
//                                                                 </Box>
//                                                                 <Box>
//                                                                     <Typography>{member.name}</Typography>
//                                                                     <Typography variant="caption" color="textSecondary">
//                                                                         {member.role}
//                                                                     </Typography>
//                                                                 </Box>
//                                                             </Box>
//                                                         </MenuItem>
//                                                     ))}
//                                             </Select>
//                                         </FormControl>
//                                     </Grid>
//                                 </Grid>
//                             </Box>
//                         ))}

//                         <Button
//                             variant="outlined"
//                             startIcon={<AddIcon />}
//                             onClick={addSubtask}
//                             sx={{
//                                 borderColor: 'primary.main',
//                                 color: 'primary.main',
//                                 '&:hover': {
//                                     borderColor: 'primary.dark',
//                                     backgroundColor: 'rgba(59, 130, 246, 0.08)'
//                                 }
//                             }}
//                         >
//                             Add Subtask
//                         </Button>
//                     </Stack>
//                 ) : null;

//             case 4:
//                 return (
//                     <Box sx={{
//                         p: 3,
//                         backgroundColor: 'rgba(59, 130, 246, 0.05)',
//                         borderRadius: 2,
//                         border: '1px solid rgba(59, 130, 246, 0.1)'
//                     }}>
//                         <Typography variant="h6" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
//                             Task Summary
//                         </Typography>

//                         <Grid container spacing={3}>
//                             <Grid item xs={6}>
//                                 <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1 }}>
//                                     Project
//                                 </Typography>
//                                 <Typography variant="body1" sx={{ color: '#1e293b' }}>
//                                     {projects.find(p => p.id === taskData.projectId)?.name || '-'}
//                                 </Typography>
//                             </Grid>

//                             <Grid item xs={6}>
//                                 <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1 }}>
//                                     Task Name
//                                 </Typography>
//                                 <Typography variant="body1" sx={{ color: '#1e293b' }}>
//                                     {taskData.taskName || '-'}
//                                 </Typography>
//                             </Grid>

//                             <Grid item xs={12}>
//                                 <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1 }}>
//                                     Description
//                                 </Typography>
//                                 <Typography variant="body1" sx={{ color: '#1e293b' }}>
//                                     {taskData.description || '-'}
//                                 </Typography>
//                             </Grid>

//                             <Grid item xs={6}>
//                                 <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1 }}>
//                                     Task Type
//                                 </Typography>
//                                 <Typography variant="body1" sx={{ color: '#1e293b' }}>
//                                     {taskTypes.find(t => t.value === taskData.taskType)?.label || '-'}
//                                     {taskData.developmentType && ` (${developmentTypes.find(t => t.value === taskData.developmentType)?.label})`}
//                                 </Typography>
//                             </Grid>

//                             <Grid item xs={6}>
//                                 <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1 }}>
//                                     Assignment Type
//                                 </Typography>
//                                 <Typography variant="body1" sx={{ color: '#1e293b' }}>
//                                     {taskData.assignmentType === 'single' ? 'Single Member' : 'Multiple Members'}
//                                 </Typography>
//                             </Grid>

//                             <Grid item xs={12}>
//                                 <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1 }}>
//                                     {taskData.assignmentType === 'single' ? 'Assignee' : 'Team Members'}
//                                 </Typography>
//                                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//                                     {taskData.assignmentType === 'single' ? (
//                                         <Chip
//                                             label={teamMembers.find(m => m.id === taskData.assignees[0])?.name || '-'}
//                                             color="primary"
//                                             variant="outlined"
//                                         />
//                                     ) : (
//                                         taskData.subtasks.map((subtask, index) => (
//                                             <Chip
//                                                 key={index}
//                                                 label={`${subtask.name}: ${teamMembers.find(m => m.id === subtask.assigneeId)?.name || '-'}`}
//                                                 color="primary"
//                                                 variant="outlined"
//                                             />
//                                         ))
//                                     )}
//                                 </Box>
//                             </Grid>

//                             <Grid item xs={6}>
//                                 <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1 }}>
//                                     Timeline
//                                 </Typography>
//                                 <Typography variant="body1" sx={{ color: '#1e293b' }}>
//                                     {taskData.startDate ? new Date(taskData.startDate).toLocaleDateString() : '-'} to{' '}
//                                     {taskData.endDate ? new Date(taskData.endDate).toLocaleDateString() : '-'}
//                                 </Typography>
//                             </Grid>

//                             <Grid item xs={6}>
//                                 <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1 }}>
//                                     Priority
//                                 </Typography>
//                                 <Box sx={{
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     gap: 1,
//                                     color: priorities.find(p => p.value === taskData.priority)?.color
//                                 }}>
//                                     <PriorityIcon sx={{ fontSize: 18 }} />
//                                     <Typography variant="body1">
//                                         {priorities.find(p => p.value === taskData.priority)?.label || '-'}
//                                     </Typography>
//                                 </Box>
//                             </Grid>
//                         </Grid>
//                     </Box>
//                 );

//             default:
//                 return null;
//         }
//     };

//     // Main render
//     return (
//         <Box sx={{
//             p: 3,
//             minHeight: '100vh',
//             background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #dbeafe 100%)'
//         }}>
//             <Box sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 2,
//                 mb: 4,
//                 p: 2,
//                 background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
//                 borderRadius: 2,
//                 boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2)'
//             }}>
//                 <img
//                     onClick={onClose}
//                     src={Back}
//                     alt="back"
//                     style={{
//                         width: "30px",
//                         height: "30px",
//                         cursor: "pointer",
//                         filter: "brightness(0) invert(1)"
//                     }}
//                 />
//                 <Typography variant="h5" sx={{ fontWeight: 600, color: 'white' }}>
//                     Create New Task
//                 </Typography>
//             </Box>

//             <Box sx={{
//                 maxWidth: 800,
//                 margin: '0 auto',
//                 backgroundColor: 'rgba(255, 255, 255, 0.9)',
//                 backdropFilter: 'blur(10px)',
//                 borderRadius: 3,
//                 boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
//                 p: 4
//             }}>
//                 <Stepper
//                     activeStep={activeStep}
//                     sx={{
//                         mb: 4,
//                         '& .MuiStepIcon-root.Mui-active': {
//                             color: '#3b82f6',
//                         },
//                         '& .MuiStepIcon-root.Mui-completed': {
//                             color: '#2563eb',
//                         },
//                     }}
//                 >
//                     {steps.map((label) => (
//                         <Step key={label}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     ))}
//                 </Stepper>

//                 {renderStepContent(activeStep)}

//                 <Box sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     mt: 4,
//                     pt: 3,
//                     borderTop: '1px solid rgba(59, 130, 246, 0.1)'
//                 }}>
//                     <Button
//                         onClick={activeStep === 0 ? onClose : handleBack}
//                         startIcon={<BackIcon />}
//                         sx={{
//                             color: '#3b82f6',
//                             '&:hover': {
//                                 backgroundColor: 'rgba(59, 130, 246, 0.08)',
//                             },
//                         }}
//                     >
//                         {activeStep === 0 ? 'Cancel' : 'Back'}
//                     </Button>

//                     {activeStep === steps.length - 1 ? (
//                         <Button
//                             variant="contained"
//                             onClick={handleSubmit}
//                             startIcon={<SaveIcon />}
//                             sx={{
//                                 background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
//                                 boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2)',
//                                 '&:hover': {
//                                     background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
//                                 },
//                                 px: 4,
//                             }}
//                         >
//                             Create Task
//                         </Button>
//                     ) : (
//                         <Button
//                             variant="contained"
//                             onClick={handleNext}
//                             endIcon={<NextIcon />}
//                             sx={{
//                                 background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
//                                 boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2)',
//                                 '&:hover': {
//                                     background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
//                                 },
//                                 px: 4,
//                             }}
//                         >
//                             Next
//                         </Button>
//                     )}
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default CreateTask;



import React, { useState, useEffect } from 'react';
import {
    Box,
    Avatar,
    TextField,
    Button,
    Typography,
    MenuItem,
    Grid,
    FormControl,
    InputLabel,
    Select,
    Stack,
    Stepper,
    Step,
    StepLabel,
    Divider,
    Chip,
    IconButton,
    Alert,
    CircularProgress,
    Snackbar,
} from '@mui/material';
import {
    Assignment as TaskIcon,
    Group as TeamIcon,
    Description as DescIcon,
    Flag as PriorityIcon,
    Save as SaveIcon,
    ArrowBack as BackIcon,
    ArrowForward as NextIcon,
    Add as AddIcon,
    Delete as DeleteIcon,
    Code as CodeIcon,
    Brush as DesignIcon,
    BugReport as TestingIcon,
    Article as DocIcon,
    Science as ResearchIcon,
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import Back from '../../assets/Back.png';

const CreateTask = ({ onClose }) => {
    const taskTypes = [
        { value: 'development', label: 'Development Task', icon: <CodeIcon /> },
        { value: 'design', label: 'Design Task', icon: <DesignIcon /> },
        { value: 'testing', label: 'Testing Task', icon: <TestingIcon /> },
        { value: 'documentation', label: 'Documentation Task', icon: <DocIcon /> },
        { value: 'research', label: 'Research Task', icon: <ResearchIcon /> }
    ];
    
    const developmentTypes = [
        { value: 'frontend', label: 'Frontend Development' },
        { value: 'backend', label: 'Backend Development' },
        { value: 'fullstack', label: 'Full Stack Development' }
    ];
    
    const priorities = [
        { value: 'low', label: 'Low', color: '#22c55e' },
        { value: 'medium', label: 'Medium', color: '#eab308' },
        { value: 'high', label: 'High', color: '#ef4444' }
    ];
    
    
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    
    
    const [teamMembers, setTeamMembers] = useState([]);
    
    const [activeStep, setActiveStep] = useState(0);
    const [errors, setErrors] = useState({});
    const [taskData, setTaskData] = useState({
        projectId: '',
        taskName: '',
        description: '',
        taskType: '',
        developmentType: '',
        assignmentType: 'single',
        startDate: null,
        endDate: null,
        priority: 'medium',
        assignees: [],
        subtasks: [],
        estimatedHours: '',
        status: 'pending'
    });

    const steps = ['Basic Info', 'Task Type', 'Team & Timeline', 'Subtasks', 'Review'];

    
    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:3900/api/project/getProjectsByManagerId/2');
                if (response.data.status === "SUCCESS") {
                    setProjects(response.data.data);
                } else {
                    setError('Failed to fetch projects');
                }
            } catch (err) {
                setError('Error connecting to server');
                console.error('Error fetching projects:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    
    useEffect(() => {
        if (taskData.projectId) {
            const selectedProject = projects.find(p => p.id === taskData.projectId);
            if (selectedProject && selectedProject.team_members) {
                
                const formattedTeamMembers = selectedProject.team_members
                    .filter(member => member !== null)
                    .map(member => ({
                        id: member.id,
                        name: `${member.first_name} ${member.last_name}`,
                        role: member.designation === 1 ? 'Developer' : 'Team Member', 
                        skills: ['frontend', 'backend'], 
                        avatar: `${member.first_name.charAt(0)}${member.last_name.charAt(0)}`
                    }));
                
                
                const uniqueMembers = Array.from(
                    new Map(formattedTeamMembers.map(item => [item.id, item])).values()
                );
                
                setTeamMembers(uniqueMembers);
            }
        }
    }, [taskData.projectId, projects]);

    
    const handleSnackbarClose = () => {
        setSnackbar({...snackbar, open: false});
    };

    
    const validateStep = (step) => {
        const newErrors = {};
        
        switch (step) {
            case 0:
                if (!taskData.projectId) newErrors.projectId = 'Project is required';
                if (!taskData.taskName) newErrors.taskName = 'Task name is required';
                if (!taskData.description) newErrors.description = 'Description is required';
                break;
            case 1:
                if (!taskData.taskType) newErrors.taskType = 'Task type is required';
                if (taskData.taskType === 'development' && !taskData.developmentType) {
                    newErrors.developmentType = 'Development type is required';
                }
                break;
            case 2:
                if (!taskData.startDate) newErrors.startDate = 'Start date is required';
                if (!taskData.endDate) newErrors.endDate = 'End date is required';
                if (taskData.assignmentType === 'single' && taskData.assignees.length === 0) {
                    newErrors.assignees = 'Please select an assignee';
                }
                break;
            case 3:
                if (taskData.assignmentType === 'multiple' && taskData.subtasks.length === 0) {
                    newErrors.subtasks = 'At least one subtask is required';
                } else if (taskData.assignmentType === 'multiple') {
                    taskData.subtasks.forEach((subtask, index) => {
                        if (!subtask.name) {
                            newErrors[`subtask_${index}_name`] = 'Subtask name is required';
                        }
                        if (!subtask.assigneeId) {
                            newErrors[`subtask_${index}_assignee`] = 'Assignee is required';
                        }
                    });
                }
                break;
            default:
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    
    const handleChange = (field) => (event) => {
        const value = event.target.value;
        setTaskData(prev => ({
            ...prev,
            [field]: value,
            
            ...(field === 'taskType' && value !== 'development' && { developmentType: '' }),
            ...(field === 'assignmentType' && value === 'single' && { subtasks: [] }),
            
            ...(field === 'projectId' && { assignees: [] })
        }));
    };

    const handleSubtaskChange = (index, field, value) => {
        const newSubtasks = [...taskData.subtasks];
        newSubtasks[index] = { ...newSubtasks[index], [field]: value };
        setTaskData({ ...taskData, subtasks: newSubtasks });
    };

    const addSubtask = () => {
        setTaskData({
            ...taskData,
            subtasks: [
                ...taskData.subtasks,
                {
                    name: '',
                    type: taskData.developmentType || '',
                    assigneeId: '',
                    status: 'pending'
                }
            ]
        });
    };

    const removeSubtask = (index) => {
        const newSubtasks = taskData.subtasks.filter((_, i) => i !== index);
        setTaskData({ ...taskData, subtasks: newSubtasks });
    };

    
    const handleNext = () => {
        if (validateStep(activeStep)) {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    
    const handleSubmit = async () => {
        if (validateStep(activeStep)) {
            setSubmitting(true);
            
            try {
                
                const taskTypeLabel = taskTypes.find(t => t.value === taskData.taskType)?.label || '';
                const developmentTypeLabel = developmentTypes.find(t => t.value === taskData.developmentType)?.label || '';
                const priorityLabel = priorities.find(p => p.value === taskData.priority)?.label || 'Medium';
                
                
                const payload = {
                    project_id: taskData.projectId,
                    task_title: taskData.taskName,
                    description: taskData.description,
                    task_type: taskTypeLabel.replace(' Task', ''), 
                    development_type: developmentTypeLabel.split(' ')[0], 
                    assign_type: taskData.assignmentType === 'single' ? 'Single' : 'Multiple',
                    priority: priorityLabel,
                    start_date: taskData.startDate,
                    due_date: taskData.endDate,
                    manager_id: 101, 
                    status: 'Pending',
                    progress: 0
                };
                
                
                if (taskData.assignmentType === 'single' && taskData.assignees.length > 0) {
                    payload.assignee_id = taskData.assignees[0];
                }
                
                
                if (taskData.assignmentType === 'multiple' && taskData.subtasks.length > 0) {
                    payload.subtasks = taskData.subtasks.map(subtask => ({
                        title: subtask.name,
                        assignee_id: subtask.assigneeId,
                        status: 'Pending',
                        progress: 0
                    }));
                }
                
                
                const response = await axios.post('http://localhost:3900/api/task/createTask', payload);
                
                console.log('Task created successfully:', response.data);
                
                
                setSnackbar({
                    open: true,
                    message: 'Task created successfully!',
                    severity: 'success'
                });
                
                
                setTimeout(() => {
                    const newTask = {
                        id: response.data.task.id,
                        title: response.data.task.task_title,
                        type: response.data.task.task_type,
                        developmentType: response.data.task.development_type,
                        deadline: new Date(response.data.task.due_date).toLocaleDateString(),
                        priority: response.data.task.priority,
                        project: projects.find(p => p.id === taskData.projectId)?.project_title || '',
                        progress: 0,
                        status: 'Pending',
                        description: response.data.task.description,
                        assignmentType: response.data.task.assign_type,
                        assignees: taskData.assignees.map(id => teamMembers.find(m => m.id === id)?.name).join(', '),
                        subtasks: response.data.sub_tasks || []
                    };
                    onClose(newTask);
                }, 1500);
                
            } catch (err) {
                console.error('Error creating task:', err);
                setSnackbar({
                    open: true,
                    message: `Error creating task: ${err.response?.data?.message || err.message}`,
                    severity: 'error'
                });
            } finally {
                setSubmitting(false);
            }
        }
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Stack spacing={3}>
                        <FormControl fullWidth error={!!errors.projectId}>
                            <InputLabel>Project</InputLabel>
                            <Select
                                value={taskData.projectId}
                                onChange={handleChange('projectId')}
                                startAdornment={<TaskIcon sx={{ mr: 1, color: '#3b82f6' }} />}
                                disabled={loading}
                            >
                                {loading ? (
                                    <MenuItem disabled>
                                        <CircularProgress size={20} />
                                        Loading projects...
                                    </MenuItem>
                                ) : (
                                    projects.map((project) => (
                                        <MenuItem key={project.id} value={project.id}>
                                            {project.project_title}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                            {errors.projectId && (
                                <Typography color="error" variant="caption">
                                    {errors.projectId}
                                </Typography>
                            )}
                            {error && (
                                <Typography color="error" variant="caption">
                                    {error}
                                </Typography>
                            )}
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Task Name"
                            value={taskData.taskName}
                            onChange={handleChange('taskName')}
                            error={!!errors.taskName}
                            helperText={errors.taskName}
                            InputProps={{
                                startAdornment: <TaskIcon sx={{ mr: 1, color: '#3b82f6' }} />
                            }}
                        />

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Description"
                            value={taskData.description}
                            onChange={handleChange('description')}
                            error={!!errors.description}
                            helperText={errors.description}
                            InputProps={{
                                startAdornment: <DescIcon sx={{ mr: 1, color: '#3b82f6' }} />
                            }}
                        />
                    </Stack>
                );

            case 1:
                return (
                    <Stack spacing={3}>
                        <FormControl fullWidth error={!!errors.taskType}>
                            <InputLabel>Task Type</InputLabel>
                            <Select
                                value={taskData.taskType}
                                onChange={handleChange('taskType')}
                            >
                               {taskTypes.map((type) => (
    <MenuItem key={type.value} value={type.value}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {type.icon}
            {type.label}
        </Box>
    </MenuItem>
))}
</Select>
{errors.taskType && (
    <Typography color="error" variant="caption">
        {errors.taskType}
    </Typography>
)}
</FormControl>

{taskData.taskType === 'development' && (
    <FormControl fullWidth error={!!errors.developmentType}>
        <InputLabel>Development Type</InputLabel>
        <Select
            value={taskData.developmentType}
            onChange={handleChange('developmentType')}
        >
            {developmentTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                    {type.label}
                </MenuItem>
            ))}
        </Select>
        {errors.developmentType && (
            <Typography color="error" variant="caption">
                {errors.developmentType}
            </Typography>
        )}
    </FormControl>
)}

<FormControl fullWidth>
    <InputLabel>Assignment Type</InputLabel>
    <Select
        value={taskData.assignmentType}
        onChange={handleChange('assignmentType')}
    >
        <MenuItem value="single">Single Member</MenuItem>
        <MenuItem value="multiple">Multiple Members (Create Subtasks)</MenuItem>
    </Select>
</FormControl>
</Stack>
);

case 2:
    return (
        <Stack spacing={3}>
            {taskData.assignmentType === 'single' && (
                <FormControl fullWidth error={!!errors.assignees}>
                    <InputLabel>Assignee</InputLabel>
                    <Select
                        value={taskData.assignees[0] || ''}
                        onChange={(e) => setTaskData({
                            ...taskData,
                            assignees: [e.target.value]
                        })}
                    >
                        {teamMembers.length === 0 ? (
                            <MenuItem disabled>No team members available</MenuItem>
                        ) : (
                            teamMembers
                                .filter(member => 
                                    !taskData.developmentType || 
                                    member.skills.includes(taskData.developmentType)
                                )
                                .map((member) => (
                                    <MenuItem key={member.id} value={member.id}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Avatar>{member.avatar}</Avatar>
                                            <Box>
                                                <Typography>{member.name}</Typography>
                                                <Typography variant="caption" color="textSecondary">
                                                    {member.role}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </MenuItem>
                                ))
                        )}
                    </Select>
                    {errors.assignees && (
                        <Typography color="error" variant="caption">
                            {errors.assignees}
                        </Typography>
                    )}
                </FormControl>
            )}

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <DatePicker
                            label="Start Date"
                            value={taskData.startDate}
                            onChange={(newValue) => {
                                setTaskData({ ...taskData, startDate: newValue });
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    error={!!errors.startDate}
                                    helperText={errors.startDate}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <DatePicker
                            label="End Date"
                            value={taskData.endDate}
                            onChange={(newValue) => {
                                setTaskData({ ...taskData, endDate: newValue });
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    error={!!errors.endDate}
                                    helperText={errors.endDate}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </LocalizationProvider>

            <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                    value={taskData.priority}
                    onChange={handleChange('priority')}
                >
                    {priorities.map((priority) => (
                        <MenuItem key={priority.value} value={priority.value}>
                            <Box sx={{ display: 'flex', alignItems: 'center', color: priority.color }}>
                                <PriorityIcon sx={{ mr: 1 }} />
                                {priority.label}
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Stack>
    );

case 3:
    return taskData.assignmentType === 'multiple' ? (
        <Stack spacing={3}>
            {errors.subtasks && (
                <Alert severity="error">{errors.subtasks}</Alert>
            )}
            
            {taskData.subtasks.map((subtask, index) => (
                <Box 
                    key={index} 
                    sx={{ 
                        p: 2, 
                        border: '1px solid rgba(59, 130, 246, 0.2)', 
                        borderRadius: 1,
                        position: 'relative'
                    }}
                >
                    <IconButton
                        size="small"
                        onClick={() => removeSubtask(index)}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: 'error.main'
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>

                    <Typography variant="subtitle1" gutterBottom>
                        Subtask {index + 1}
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Subtask Name"
                                value={subtask.name}
                                onChange={(e) => handleSubtaskChange(index, 'name', e.target.value)}
                                error={!!errors[`subtask_${index}_name`]}
                                helperText={errors[`subtask_${index}_name`]}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl 
                                fullWidth
                                error={!!errors[`subtask_${index}_assignee`]}
                            >
                                <InputLabel>Assignee</InputLabel>
                                <Select
                                    value={subtask.assigneeId}
                                    onChange={(e) => handleSubtaskChange(index, 'assigneeId', e.target.value)}
                                >
                                    {teamMembers.length === 0 ? (
                                        <MenuItem disabled>No team members available</MenuItem>
                                    ) : (
                                        teamMembers
                                            .filter(member => 
                                                !taskData.developmentType || 
                                                member.skills.includes(taskData.developmentType)
                                            )
                                            .map((member) => (
                                                <MenuItem key={member.id} value={member.id}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Box sx={{
                                                            width: 32,
                                                            height: 32,
                                                            borderRadius: '50%',
                                                            bgcolor: 'primary.main',
                                                            color: 'white',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '0.875rem'
                                                        }}>
                                                            {member.avatar}
                                                        </Box>
                                                        <Box>
                                                            <Typography>{member.name}</Typography>
                                                            <Typography variant="caption" color="textSecondary">
                                                                {member.role}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </MenuItem>
                                            ))
                                    )}
                                </Select>
                                {errors[`subtask_${index}_assignee`] && (
                                    <Typography color="error" variant="caption">
                                        {errors[`subtask_${index}_assignee`]}
                                    </Typography>
                                )}
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            ))}

            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={addSubtask}
                sx={{
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                        borderColor: 'primary.dark',
                        backgroundColor: 'rgba(59, 130, 246, 0.08)'
                    }
                }}
            >
                Add Subtask
            </Button>
        </Stack>
    ) : null;

case 4:
    return (
        <Box sx={{
            p: 3,
            backgroundColor: 'rgba(59, 130, 246, 0.05)',
            borderRadius: 2,
            border: '1px solid rgba(59, 130, 246, 0.1)'
        }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
                Task Summary
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1 }}>
                        Project
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#1e293b' }}>
                        {projects.find(p => p.id === taskData.projectId)?.project_title || '-'}
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1 }}>
                        Task Name
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#1e293b' }}>
                        {taskData.taskName || '-'}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1 }}>
                        Description
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#1e293b' }}>
                        {taskData.description || '-'}
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1 }}>
                        Task Type
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#1e293b' }}>
                        {taskTypes.find(t => t.value === taskData.taskType)?.label || '-'}
                        {taskData.developmentType && ` (${developmentTypes.find(t => t.value === taskData.developmentType)?.label})`}
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1 }}>
                        Assignment Type
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#1e293b' }}>
                        {taskData.assignmentType === 'single' ? 'Single Member' : 'Multiple Members'}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1 }}>
                        {taskData.assignmentType === 'single' ? 'Assignee' : 'Team Members'}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {taskData.assignmentType === 'single' ? (
                            <Chip
                                label={teamMembers.find(m => m.id === taskData.assignees[0])?.name || '-'}
                                color="primary"
                                variant="outlined"
                            />
                        ) : (
                            taskData.subtasks.map((subtask, index) => (
                                <Chip
                                    key={index}
                                    label={`${subtask.name}: ${teamMembers.find(m => m.id === subtask.assigneeId)?.name || '-'}`}
                                    color="primary"
                                    variant="outlined"
                                />
                            ))
                        )}
                    </Box>
                </Grid>

                <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1 }}>
                        Timeline
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#1e293b' }}>
                        {taskData.startDate ? new Date(taskData.startDate).toLocaleDateString() : '-'} to{' '}
                        {taskData.endDate ? new Date(taskData.endDate).toLocaleDateString() : '-'}
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1 }}>
                        Priority
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: priorities.find(p => p.value === taskData.priority)?.color
                    }}>
                        <PriorityIcon sx={{ fontSize: 18 }} />
                        <Typography variant="body1">
                            {priorities.find(p => p.value === taskData.priority)?.label || '-'}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );

default:
    return null;
}
};


return (
    <Box sx={{
        p: 3,
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #dbeafe 100%)'
    }}>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 4,
            p: 2,
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            borderRadius: 2,
            boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2)'
        }}>
            <img
                onClick={onClose}
                src={Back}
                alt="back"
                style={{
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                    filter: "brightness(0) invert(1)"
                }}
            />
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'white' }}>
                Create New Task
            </Typography>
        </Box>

        <Box sx={{
    maxWidth: 800,
    margin: '0 auto',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: 3,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    p: 4
}}>
    <Stepper
        activeStep={activeStep}
        sx={{
            mb: 4,
            '& .MuiStepIcon-root.Mui-active': {
                color: '#3b82f6',
            },
            '& .MuiStepIcon-root.Mui-completed': {
                color: '#2563eb',
            },
        }}
    >
        {steps.map((label) => (
            <Step key={label}>
                <StepLabel>{label}</StepLabel>
            </Step>
        ))}
    </Stepper>

    {renderStepContent(activeStep)}

    <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mt: 4,
        pt: 3,
        borderTop: '1px solid rgba(59, 130, 246, 0.1)'
    }}>
        <Button
            onClick={activeStep === 0 ? onClose : handleBack}
            startIcon={<BackIcon />}
            sx={{
                color: '#3b82f6',
                '&:hover': {
                    backgroundColor: 'rgba(59, 130, 246, 0.08)',
                },
            }}
            disabled={submitting}
        >
            {activeStep === 0 ? 'Cancel' : 'Back'}
        </Button>

        {activeStep === steps.length - 1 ? (
            <Button
                variant="contained"
                onClick={handleSubmit}
                startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                sx={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    },
                    px: 4,
                }}
                disabled={submitting}
            >
                {submitting ? 'Creating...' : 'Create Task'}
            </Button>
        ) : (
            <Button
                variant="contained"
                onClick={handleNext}
                endIcon={<NextIcon />}
                sx={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    },
                    px: 4,
                }}
                disabled={submitting}
            >
                Next
            </Button>
        )}
    </Box>
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

export default CreateTask;