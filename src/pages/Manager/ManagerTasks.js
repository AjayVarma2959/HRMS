import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  CardHeader,
} from "@mui/material";
import { CheckCircle, AlarmClock, Clock, FileText } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";


ChartJS.register(ArcElement, ChartTooltip, Legend);


const tasks = [
  {
    name: "Design Wireframes",
    assignedDate: "2025-01-10",
    deadline: "2025-01-20",
    priority: "High",
    status: "In Progress",
  },
  {
    name: "Backend API Development",
    assignedDate: "2025-01-05",
    deadline: "2025-01-25",
    priority: "Medium",
    status: "Not Started",
  },
  {
    name: "Client Presentation",
    assignedDate: "2025-01-12",
    deadline: "2025-01-15",
    priority: "High",
    status: "Completed",
  },
  {
    name: "Code Review",
    assignedDate: "2025-01-08",
    deadline: "2025-01-14",
    priority: "Low",
    status: "In Progress",
  },
];


const taskMetrics = {
  total: 4,
  completed: 1,
  pending: 3,
  overdue: 1,
};


const taskStatusData = {
  labels: ["Completed", "In Progress", "Not Started"],
  datasets: [
    {
      data: [1, 2, 1],
      backgroundColor: ["#4CAF50", "#FF9800", "#F44336"],
      hoverOffset: 4,
    },
  ],
};


const priorityData = {
  labels: ["High", "Medium", "Low"],
  datasets: [
    {
      data: [2, 1, 1],
      backgroundColor: ["#E53935", "#FFC107", "#8BC34A"],
      hoverOffset: 4,
    },
  ],
};


const chartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 10,
        boxHeight: 10,
        font: { size: 10 },
      },
    },
  },
};

const ManagerTasks = () => {
  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
     
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <FileText style={{ marginRight: 8 }} /> My Tasks
        </Typography>
        <Typography variant="subtitle1">
          Track your tasks, deadlines, and progress at a glance.
        </Typography>
      </Box>

      
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Tasks</Typography>
              <Typography variant="h4">{taskMetrics.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Completed Tasks</Typography>
              <Typography variant="h4" color="green">
                {taskMetrics.completed}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending Tasks</Typography>
              <Typography variant="h4" color="orange">
                {taskMetrics.pending}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Overdue Tasks</Typography>
              <Typography variant="h4" color="red">
                {taskMetrics.overdue}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Task Status Distribution" />
            <CardContent>
              <Box
                sx={{
                  height: "200px",
                  width: "200px",
                  mx: "auto",
                }}
              >
                <Pie data={taskStatusData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Priority Distribution" />
            <CardContent>
              <Box
                sx={{
                  height: "200px",
                  width: "200px",
                  mx: "auto",
                }}
              >
                <Pie data={priorityData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Current Tasks
        </Typography>
        <Grid container spacing={2}>
          {tasks.map((task, index) => (
            <Grid item xs={12} key={index}>
              <Card
                sx={{
                  borderLeft: `4px solid ${
                    task.priority === "High"
                      ? "#E53935"
                      : task.priority === "Medium"
                      ? "#FFC107"
                      : "#8BC34A"
                  }`,
                }}
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
                      color={
                        task.status === "Completed"
                          ? "success"
                          : task.status === "In Progress"
                          ? "warning"
                          : "error"
                      }
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  {task.status === "Completed" ? (
                    <CheckCircle color="green" size={36} />
                  ) : task.priority === "High" ? (
                    <AlarmClock color="red" size={36} />
                  ) : (
                    <Clock color="orange" size={36} />
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ManagerTasks;
