import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    IconButton,
    Stack,
    Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const ProjectCard = ({ project, onManageResources, onEdit, onDelete }) => {
    const [openDetails, setOpenDetails] = useState(false);

    return (
        <>
            <Card onClick={() => setOpenDetails(true)} sx={{
                height: '100%',
                cursor: "pointer",
                background:"orange",
                minHeight: 220,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                '&:hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                }
            }}>
                <CardContent sx={{ p: 2.5, flex: 1 }}>
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        mb: 2 
                    }}>
                        <Typography variant="h6" sx={{ 
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            color: '#2c3e50'
                        }}>
                            {project.name || 'Untitled'}
                        </Typography>
                        <Box>
                            <IconButton 
                                size="small" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(e, project);
                                }}
                                sx={{ color: '#7f8c8d' }}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton 
                                size="small" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(e, project.id);
                                }}
                                sx={{ color: '#7f8c8d' }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>

                    <Typography variant="body2" sx={{ 
                        color: '#7f8c8d',
                        mb: 2
                    }}>
                        {project.type} • {project.department}
                    </Typography>

                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        <Chip
                            label={project.status}
                            size="small"
                            color={
                                project.status === 'In Progress' ? 'primary' :
                                project.status === 'Planning' ? 'info' :
                                project.status === 'Completed' ? 'success' : 'default'
                            }
                        />
                        <Chip
                            label={project.priority}
                            size="small"
                            color={
                                project.priority === 'High' ? 'error' :
                                project.priority === 'Medium' ? 'warning' : 'success'
                            }
                        />
                    </Stack>

                    <Typography variant="body2" sx={{ mb: 2, color: '#34495e' }}>
                        Budget: ${Number(project.budget).toLocaleString()}
                    </Typography>

                    <Box sx={{ mt: 'auto' }}>
                        <Button
                            startIcon={<GroupAddIcon />}
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                onManageResources(e, project);
                            }}
                            sx={{ color: '#3498db' }}
                        >
                            Manage Resources
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
};

export default ProjectCard;