import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Back from '../assets/Back.png';
import Back from '../../assets/Back.png'

import {
    Box,
    Grid,
    Typography,
    Card,
    Container,
    alpha,
    styled
} from '@mui/material';

import UpcomingDeadlines from "./deadlines";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TaskIcon from "@mui/icons-material/TaskAlt";
import EventIcon from "@mui/icons-material/Event";
import UpcomingIcon from '@mui/icons-material/Upcoming';
import RecentActivityIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';


import ProjectsList1 from "./ProjectsList2";



import TasksPage from "./newtask";
import ReportsAnalytics from "./reports";

import AttendancePage from "./Leave";
import EmployeeLeaves from "./LeaveManagement";


export const AllCards = ({ setSelectedMenu }) => {
    const navigate = useNavigate();
    const [selectedCardId, setSelectedCardId] = useState(null);

    const handleViewAllClick = (id) => {
        setSelectedCardId(id);
        if (id === 1) setSelectedMenu("Projects");
        else if (id === 2) setSelectedMenu("Tasks Management");
        else if(id === 3) setSelectedMenu("Attendance Management");
        // else if (id === 5) setSelectedMenu("Reports & Analytics");
        else if (id === 4) setSelectedMenu("Leave Management");
        else if(id === 6) setSelectedMenu("Deadlines");
    };

    const cards = [
        {
            id: 1,
            icon: <CalendarTodayIcon />,
            title: "Total Projects",
            count: "24",
            primaryColor: "#4158D0",
            secondaryColor: "#C850C0",
            accent: "#FFCC70"
        },
        {
            id: 2,
            icon: <TaskIcon />,
            title: "Active Tasks",
            count: "12",
            primaryColor: "#0093E9",
            secondaryColor: "#80D0C7",
            accent: "#FF9A8B"
        },
        {
            id: 3,
            icon: <EventIcon />,
            title: "Attendance Management",
            count: "89%",
            primaryColor: "#8EC5FC",
            secondaryColor: "#E0C3FC",
            accent: "#FAD0C4"
        },
        {
            id: 4,
            icon: <GroupIcon />,
            title: "Leave Management",
            count: "45",
            primaryColor: "#FF3CAC",
            secondaryColor: "#784BA0",
            accent: "#2B86C5"
        },
        {
            id: 5,
            icon: <RecentActivityIcon />,
            title: "Reports&Analytics",
            count: "08",
            primaryColor: "#FA8BFF",
            secondaryColor: "#2BD2FF",
            accent: "#2BFF88"
        },
        
        {
            id: 6,
            icon: <UpcomingIcon />,
            title: "Upcoming Deadlines",
            count: "05",
            primaryColor: "#43E97B",
            secondaryColor: "#38F9D7",
            accent: "#A8EDEA"
        },
    ];

    const DashboardCard = ({ card }) => (
        <Card
            onClick={() => handleViewAllClick(card.id)}
            sx={{
                background: '#ffffff',
                borderRadius: '20px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                minHeight: '180px',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(135deg, ${alpha(card.primaryColor, 0.1)}, ${alpha(card.secondaryColor, 0.1)})`,
                    clipPath: 'circle(80% at 100% 0%)',
                    transition: 'all 0.6s ease-in-out',
                },
                '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: `0 20px 40px ${alpha(card.primaryColor, 0.2)}`,
                    '&:before': {
                        clipPath: 'circle(120% at 100% 0%)',
                    },
                    '& .card-icon': {
                        transform: 'scale(0.5) rotate(10deg)',
                        background: `linear-gradient(135deg, ${card.primaryColor}, ${card.secondaryColor})`,
                    },
                    '& .card-count': {
                        transform: 'scale(1.1)',
                        background: `linear-gradient(135deg, ${card.primaryColor}, ${card.secondaryColor})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }
                }
            }}
        >
            <Box sx={{ p: 3, position: 'relative', zIndex: 1 }}>
                <Box
                    className="card-icon"
                    sx={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `linear-gradient(135deg, ${alpha(card.primaryColor, 0.9)}, ${alpha(card.secondaryColor, 0.9)})`,
                        boxShadow: `0 8px 16px ${alpha(card.primaryColor, 0.3)}`,
                        transition: 'all 0.4s ease',
                        mb: 2
                    }}
                >
                    {React.cloneElement(card.icon, {
                        sx: {
                            fontSize: '28px',
                            color: '#ffffff'
                        }
                    })}
                </Box>

                <Typography
                    className="card-count"
                    variant="h3"
                    sx={{
                        fontSize: '2.5rem',
                        fontWeight: 700,
                        mb: 1,
                        transition: 'all 0.3s ease',
                        color: card.primaryColor
                    }}
                >
                    {card.count}
                </Typography>

                <Typography
                    variant="subtitle1"
                    sx={{
                        color: '#666',
                        fontWeight: 500,
                        fontSize: '1rem',
                        letterSpacing: '0.5px'
                    }}
                >
                    {card.title}
                </Typography>

                <Box
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${alpha(card.accent, 0.2)}, ${alpha(card.accent, 0.1)})`,
                        opacity: 0.6
                    }}
                />
            </Box>
        </Card>
    );

    const BackNavigation = () => (
        <Box
            onClick={() => setSelectedCardId(null)}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 4,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateX(-5px)'
                }
            }}
        >
            <img
                src={Back}
                alt="back"
                style={{
                    width: 24,
                    height: 24,
                    filter: 'brightness(0.7)'
                }}
            />
            <Typography
                variant="h6"
                sx={{
                    color: '#555',
                    fontWeight: 500
                }}
            >
                Back to Dashboard
            </Typography>
        </Box>
    );

    if (selectedCardId !== null) {
        return (
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <BackNavigation />
                {selectedCardId === 1 && <ProjectsList1 />}
                {selectedCardId === 2 && <TasksPage />}
                {selectedCardId === 3 && <AttendancePage />}
                {selectedCardId === 4 && <  EmployeeLeaves />}
                {/* {selectedCardId === 5 && <ProjectsList3 />} */}
                {selectedCardId === 5 && <ReportsAnalytics />}
                {selectedCardId === 6 && < UpcomingDeadlines/> }
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            
            <Grid container spacing={3}>
                {cards.map((card) => (
                    <Grid item xs={12} sm={6} md={4} key={card.id}>
                        <DashboardCard card={card} />
                    </Grid>
                ))}
            </Grid>

        </Container>
    );
};