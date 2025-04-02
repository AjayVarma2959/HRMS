import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Chip,
  Grid,
  Card,
  LinearProgress,
  IconButton,
  Avatar,
  AvatarGroup,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const localizer = momentLocalizer(moment);

const UpcomingDeadlines = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deadlinesForDate, setDeadlinesForDate] = useState([]);

  // Sample deadline data
  const deadlines = [
    // High Priority Project Milestones
    {
      id: 1,
      title: "Mobile App Phase 1 Completion",
      start: new Date(2024, 3, 15),
      end: new Date(2024, 3, 15),
      type: "Project Milestone",
      priority: "Critical",
      team: [
        { name: "Alex Chen", role: "Lead Dev", attendance: "Present" },
        { name: "Sarah Kim", role: "UI/UX", attendance: "On Leave" },
        { name: "Mike Ross", role: "Backend", attendance: "Present" }
      ],
      status: "At Risk",
      color: "#FF4842",
      progress: 85,
      metrics: {
        tasksCompleted: "18/20",
        teamAttendance: "85%",
        pendingLeaves: 2
      },
      alerts: [
        "2 team members on leave next week",
        "3 critical tasks pending"
      ]
    },
  
    // Urgent Task Deadlines
    {
      id: 2,
      title: "Database Migration Sprint",
      start: new Date(2024, 3, 16),
      end: new Date(2024, 3, 16),
      type: "Critical Task",
      priority: "High",
      team: [
        { name: "John Smith", role: "DBA", attendance: "Present" },
        { name: "Lisa Wong", role: "DevOps", attendance: "Late" }
      ],
      status: "In Progress",
      color: "#FFA726",
      progress: 60,
      metrics: {
        tasksCompleted: "5/8",
        teamAttendance: "90%",
        pendingLeaves: 1
      },
      alerts: [
        "Overtime required this weekend",
        "Resource allocation needed"
      ]
    },
  
    // Team Performance Reviews
    {
      id: 3,
      title: "Q1 Performance Reviews Due",
      start: new Date(2024, 3, 18),
      end: new Date(2024, 3, 18),
      type: "HR Deadline",
      priority: "High",
      team: [
        { name: "All Team Leads", role: "Reviewers", attendance: "Required" }
      ],
      status: "Pending",
      color: "#2196F3",
      progress: 30,
      metrics: {
        reviewsCompleted: "4/12",
        pendingFeedback: 8
      },
      alerts: [
        "5 reviews pending from Backend team",
        "3 reviews pending from Frontend team"
      ]
    },
  
    // Leave Management Deadline
    {
      id: 4,
      title: "Holiday Season Leave Approvals",
      start: new Date(2024, 3, 20),
      end: new Date(2024, 3, 20),
      type: "Leave Management",
      priority: "Medium",
      status: "Attention Needed",
      color: "#7C4DFF",
      metrics: {
        pendingRequests: 12,
        conflictingRequests: 3,
        criticalPeriod: "Year-End"
      },
      alerts: [
        "8 overlapping leave requests",
        "Critical resource shortage possible"
      ]
    },
  
    // Resource Allocation Deadline
    {
      id: 5,
      title: "New Project Team Formation",
      start: new Date(2024, 3, 22),
      end: new Date(2024, 3, 22),
      type: "Resource Planning",
      priority: "High",
      status: "Planning",
      color: "#00C853",
      requiredRoles: [
        "2 Senior Developers",
        "1 UI/UX Designer",
        "1 Project Lead"
      ],
      metrics: {
        availableResources: "15/20",
        onLeave: "3",
        skillGaps: "2"
      },
      alerts: [
        "Critical skill gap in AI development",
        "Need backup for lead developer"
      ]
    },
  
    // Attendance Monitoring Alert
    {
      id: 6,
      title: "Monthly Attendance Review",
      start: new Date(2024, 3, 25),
      end: new Date(2024, 3, 25),
      type: "Attendance",
      priority: "Medium",
      status: "Needs Review",
      color: "#EF5350",
      metrics: {
        averageAttendance: "92%",
        lateArrivals: 15,
        unexpectedLeaves: 5
      },
      departmentBreakdown: [
        { dept: "Development", attendance: "95%" },
        { dept: "Design", attendance: "88%" },
        { dept: "QA", attendance: "93%" }
      ],
      alerts: [
        "3 team members below 85% attendance",
        "Frequent late arrivals in Design team"
      ]
    },
  
    // Sprint Deadline
    {
      id: 7,
      title: "Sprint 23 Completion",
      start: new Date(2024, 3, 28),
      end: new Date(2024, 3, 28),
      type: "Sprint Deadline",
      priority: "Critical",
      team: [
        { name: "Development Team A", attendance: "90%" },
        { name: "QA Team", attendance: "95%" }
      ],
      status: "On Track",
      color: "#00BCD4",
      progress: 70,
      metrics: {
        tasksCompleted: "28/35",
        bugsClosed: "12/15",
        teamVelocity: "85%"
      },
      alerts: [
        "2 critical features pending",
        "QA resource shortage next week"
      ]
    },
  
    // Team Productivity Review
    {
      id: 8,
      title: "Team Productivity Analysis",
      start: new Date(2024, 4, 1),
      end: new Date(2024, 4, 1),
      type: "Performance Metrics",
      priority: "High",
      status: "Upcoming",
      color: "#9C27B0",
      metrics: {
        projectsOnTrack: "5/6",
        teamUtilization: "88%",
        deliveryAccuracy: "92%"
      },
      teamMetrics: [
        { team: "Frontend", efficiency: "94%", leaves: "Low" },
        { team: "Backend", efficiency: "87%", leaves: "Medium" },
        { team: "DevOps", efficiency: "91%", leaves: "Low" }
      ],
      alerts: [
        "Backend team showing signs of burnout",
        "Need to redistribute workload"
      ]
    }
  ];



  const getPriorityColor = (priority) => {
    const colors = {
      Low: '#4caf50',
      Medium: '#ff9800',
      High: '#f44336',
      Critical: '#9c27b0'
    };
    return colors[priority] || '#757575';
  };

  const getStatusColor = (status) => {
    const colors = {
      'In Progress': '#2196f3',
      'Scheduled': '#4caf50',
      'At Risk': '#f44336',
      'Pending': '#ff9800',
      'Completed': '#4caf50'
    };
    return colors[status] || '#757575';
  };

  const handleDateClick = (date) => {
    const clickedDate = moment(date).format('YYYY-MM-DD');
    const relevantDeadlines = deadlines.filter(
      deadline => moment(deadline.start).format('YYYY-MM-DD') === clickedDate
    );
    
    setSelectedDate(date);
    setDeadlinesForDate(relevantDeadlines);
    setIsModalOpen(true);
  };

  const DeadlineCard = ({ deadline }) => (
    <Card
      sx={{
        p: 2,
        mb: 2,
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderLeft: `4px solid ${deadline.color}`
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {deadline.title}
        </Typography>
        <Chip
          label={deadline.priority}
          size="small"
          sx={{
            backgroundColor: getPriorityColor(deadline.priority),
            color: 'white'
          }}
        />
      </Box>

      <Typography color="text.secondary" sx={{ mb: 2 }}>
        {deadline.description}
      </Typography>

      {deadline.progress !== undefined && (
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              Progress
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {deadline.progress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={deadline.progress}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                backgroundColor: deadline.progress < 30 ? '#f44336' :
                               deadline.progress < 70 ? '#ff9800' : '#4caf50'
              }
            }}
          />
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={deadline.type}
            size="small"
            sx={{ backgroundColor: deadline.color, color: 'white' }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 24, height: 24, fontSize: '0.8rem' }}>
            {deadline.assignedTo.split(' ')[0][0]}
          </Avatar>
          <Typography variant="body2" color="text.secondary">
            {deadline.assignedTo}
          </Typography>
        </Box>
      </Box>
    </Card>
  );

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.color,
      borderRadius: '4px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    }
  });

  return (
    <Box sx={{ height: '700px' }}>
      <Calendar
        localizer={localizer}
        events={deadlines}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        onSelectSlot={({ start }) => handleDateClick(start)}
        onSelectEvent={(event) => handleDateClick(event.start)}
        eventPropGetter={eventStyleGetter}
        selectable
        popup
      />

<Dialog 
  open={isModalOpen} 
  onClose={() => setIsModalOpen(false)}
  maxWidth="sm" 
  fullWidth
>
  <DialogTitle>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h6" fontSize="1rem">
        Deadlines for {selectedDate ? moment(selectedDate).format('MMMM D, YYYY') : ''}
      </Typography>
      <IconButton onClick={() => setIsModalOpen(false)} size="small">
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  </DialogTitle>
  <DialogContent>
    {deadlinesForDate.length > 0 ? (
      deadlinesForDate.map((deadline) => (
        <Box
          key={deadline.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 1,
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: deadline.color,
              borderRadius: '50%',
              color: '#fff',
              fontSize: '0.875rem',
              fontWeight: 'bold',
            }}
          >
            {deadline.type === 'Task' && 'T'}
            {deadline.type === 'Meeting' && 'M'}
            {deadline.type === 'Project' && 'P'}
          </Box>

          {/* Details */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" fontWeight="bold" noWrap>
              {deadline.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {deadline.description}
            </Typography>
          </Box>

          {/* Priority */}
          <Chip
            label={deadline.priority}
            size="small"
            sx={{
              backgroundColor: deadline.color,
              color: '#fff',
              fontSize: '0.75rem',
            }}
          />
        </Box>
      ))
    ) : (
      <Typography color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
        No deadlines scheduled for this date.
      </Typography>
    )}
  </DialogContent>
</Dialog>
    </Box>
  );
};

export default UpcomingDeadlines;