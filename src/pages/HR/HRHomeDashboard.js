import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import {
  Search,
  PersonAdd,
  People,
  Info,
  DeviceHub,
  CheckCircle,
  Cancel,
  Business,
  Person,
  Visibility,
  Edit
} from "@mui/icons-material";
import axios from "axios";

import { Line, Pie } from "react-chartjs-2";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localAxiosGet } from "../../Axios/axios";


import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from "chart.js";
import { localAxios } from "../../Axios/axios";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);


const localizer = momentLocalizer(moment);

export default function HRHomeDashboard({ setSelectedMenu }) {

  const [userId, setUserId] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedOrgId = localStorage.getItem("organizationId");
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserId) setUserId(storedUserId);
    if (storedOrgId) {
      setOrganizationId(storedOrgId)
    };
    fetchEmployeeData(storedOrgId);
    if (storedUserDetails) {
      try {
        setUserDetails(JSON.parse(storedUserDetails));
      } catch (e) {
        console.error("Error parsing user details:", e);
      }
    }
    console.log("Dashboard loaded with User ID:", storedUserId);
    console.log("Dashboard loaded with Organization ID:", storedOrgId);
    if (storedUserId && storedOrgId) {
      // fetchEmployeeData(storedOrgId);
      // fetchAttendanceData(storedOrgId);
      // etc.
    }
  }, [])
  const handleNavigateToEmployees = () => {
    setSelectedMenu("Employee Management");
  };
  const handleNavigateToAttendance = () => {
    setSelectedMenu("Attendance and Time Tracking")
  }
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    joiningDate: "",
    department: "",
    team: "",
    designation: "",
    grade: "",
    status: "Active",
  });
  const handleEditEmployee = (employee) => {
    setIsEditMode(true);
    setFormData(employee);
    setIsDialogOpen(true);
  };
  const handleSaveEmployee = () => {
    if (isEditMode) {
      // Update existing employee logic
      console.log("Updating employee:", formData);
    } else {
      // Add new employee logic
      console.log("Adding new employee:", formData);
    }
    setIsDialogOpen(false);
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [employeeData, setEmployeeData] = useState([]);
  const [loadingEmployeeData, setLoadingEmployeeData] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;


  // const employeeData = [
  //   {
  //     id: "TUR871219",
  //     name: "Ajay",
  //     email: "ahsan.tur@email.com",
  //     designition: "Sr UI/UX Designer",
  //     status: "Active",
  //   },
  //   {
  //     id: "TUR801503",
  //     name: "Naveen",
  //     email: "washi@mail.com",
  //     designition: "Lead Product Designer",
  //     status: "InActive",
  //   },
  //   {
  //     id: "TUR75481",
  //     name: "Tharun",
  //     email: "keyos@mail.com",
  //     designition: "Sr UX Designer",
  //     status: "InActive",
  //   },
  //   {
  //     id: "TUR610481",
  //     name: "Sekhar",
  //     email: "turja.s@email.com",
  //     designition: "Mid UI Designer",
  //     status: "Active",
  //   },
  // ];

  // useEffect(()=>{
  //   const storeUserId = localStorage.getItem("userId");
  //   const storedOrgId = localStorage.getItem("organizationId")
  //   const storedUserDetails = localStorage.getItem("userDetails");
  //   if(storedOrgId){
  //     setUserId(storeUserId)
  //   }
  //   if(storedOrgId){
  //     setOrganizationId(storedOrgId)
  //   }
  //   if(storedUserDetails){
  //     setUserDetails(storedUserDetails)
  //   }

  // })
  const fetchEmployeeData = async (org_id) => {
    try {
      setLoadingEmployeeData(true);
      const token = localStorage.getItem('accessToken');
      console.log('Fetching employees for organization ID:', org_id);

      if (!org_id) {
        console.error('Organization ID not found');
        return;
      }

      const response = await axios(localAxiosGet(`/organization/getAllEmployeesByOrganizationId/:organization_id/?organization_id=${org_id}`, token));
      if (response.data && response.data.status === "SUCCESS" && response.data.message && response.data.message.employees) {
        const employeesData = response.data.message.employees;
        console.log('Extracted employees data:', employeesData);

        setEmployeeData(employeesData);
      } else {
        console.error('Unexpected API response structure:', response.data);
        setEmployeeData([]);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
      setEmployeeData([]);
    } finally {
      setLoadingEmployeeData(false);
    }
  };
  const departmentDistributionData = {
    labels: ["Frontend", "Backend", "UI/UX", "Database"],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };


  const performanceTrendsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Ahsan Tapadar",
        data: [35, 40, 45, 50, 55, 60, 65],
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",    // Added this line
        fill: false,
      },
      {
        label: "Koyes Ahmed",
        data: [28, 30, 35, 40, 45, 50, 55],
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",    // Added this line
        fill: false,
      },
      {
        label: "Washi Bin M.",
        data: [30, 35, 40, 45, 50, 55, 60],
        backgroundColor: "#FFCE56",
        borderColor: "#FFCE56",    // Added this line
        fill: false,
      },
      {
        label: "Turja Sen Das",
        data: [24, 28, 32, 36, 40, 45, 50],
        backgroundColor: "#4BC0C0",
        borderColor: "#4BC0C0",    // Added this line
        fill: false,
      },
    ],
  };


  const [events, setEvents] = useState([]);


  const fetchAttendanceData = async () => {
    try {

      const response = await fetch("/api/attendance");
      const data = await response.json();
      const formattedEvents = data.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };


  useEffect(() => {
    fetchAttendanceData();
    const interval = setInterval(fetchAttendanceData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);


  const handlePageChange = (event, value) => {
    setPage(value);
  };


  const filteredEmployeeData = employeeData.filter((employee) => {
    const name = `${employee.first_name || ''} ${employee.last_name || ''}`.toLowerCase();
    const email = (employee.email || '').toLowerCase();
    const designation = String(employee.designation || '').toLowerCase();
    const status = (employee.status || '').toLowerCase();

    const matchesSearchTerm =
      name.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      designation.includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "all" ||
      (filterStatus === "Active" && status === "active") ||
      (filterStatus === "InActive" && status === "inactive");


    return matchesSearchTerm && matchesStatus;
  });



  const paginatedEmployeeData = filteredEmployeeData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f9f9f9" }}>

      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={4}>
        <Typography variant="h5" fontWeight="bold">
          Dashboard
        </Typography>
        <Box display="flex" gap={2} alignItems="center">
          <TextField
            placeholder="Quick Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ color: "gray", marginRight: 1 }} />,
            }}
            sx={{ backgroundColor: "white", borderRadius: 2, maxWidth: 250 }}
            size="small"
          />
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="Full-time">Full-time</MenuItem>
              <MenuItem value="Freelancer">Freelancer</MenuItem>
            </Select>
          </FormControl>

        </Box>
      </Box>


      <Grid container spacing={3} marginBottom={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: '#E3F2FD', cursor: "pointer" }} onClick={handleNavigateToEmployees}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight="bold" color="#2196F3">
                  Total Employees
                </Typography>
                <People sx={{ fontSize: 40, color: "#2196F3" }} />
              </Box>
              <Typography variant="h4" fontWeight="bold" color="#333">
                150
              </Typography>
              <Typography variant="body2" color="textSecondary">+50 Freelancers</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: '#FFF3E0', cursor: "pointer" }} onClick={handleNavigateToAttendance}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight="bold" color="#FF9800">
                  Attendance Overview
                </Typography>
                <Info sx={{ fontSize: 40, color: "#FF9800" }} />
              </Box>
              <Typography variant="h4" fontWeight="bold" color="#333">
                90%
              </Typography>
              <Typography variant="body2" color="textSecondary">+20% from last month</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: '#E8F5E9' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight="bold" color="#4CAF50">
                  Used Devices
                </Typography>
                <DeviceHub sx={{ fontSize: 40, color: "#4CAF50" }} />
              </Box>
              <Typography variant="h4" fontWeight="bold" color="#333">
                100
              </Typography>
              <Typography variant="body2" color="textSecondary">MacBooks, Keyboards</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>


      <Grid container spacing={3} marginBottom={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Employee Performance Trends
              </Typography>
              <Line
                data={performanceTrendsData}
                options={{
                  responsive: true,

                  plugins: {
                    legend: { display: true },

                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '300px' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Team-wise Distribution
              </Typography>
              <Box sx={{ height: '200px' }}>
                <Pie
                  data={departmentDistributionData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: true },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>


      {/* <Grid container spacing={3} marginBottom={3}>
  <Grid item xs={12}>
    <Card sx={{ border: "2px solid #4CAF50", borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <People sx={{ color: "#4CAF50", fontSize: 30 }} />
          <Typography variant="h6" fontWeight="bold" color="#4CAF50">
            Employee Attendance Calendar
          </Typography>
        </Box>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 400 }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.type === 'present' ? '#4CAF50' : '#f44336',
              borderRadius: '5px',
              color: 'white',
              border: 'none'
            }
          })}
          components={{
            event: ({ event }) => (
              <Box p={1}>
                <Box display="flex" alignItems="center" gap={0.5}>
                  {event.type === 'present' ? (
                    <CheckCircle sx={{ fontSize: 16 }} />
                  ) : (
                    <Cancel sx={{ fontSize: 16 }} />
                  )}
                  <Typography variant="body2">{event.title}</Typography>
                </Box>
              </Box>
            )
          }}
        />
      </CardContent>
    </Card>
  </Grid>
</Grid> */}


      <Box marginTop={4}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <People sx={{ color: "#2196F3", fontSize: 30 }} />
          <Typography variant="h6" fontWeight="bold" color="#2196F3">
            All Employees
          </Typography>
        </Box>
        <TableContainer sx={{
          maxHeight: 400,
          overflowX: "auto",
          border: "2px solid #2196F3",
          borderRadius: 3,
          '& th': {
            backgroundColor: '#E3F2FD',
            fontWeight: 'bold',
            fontSize: '1rem'
          },
          '& tr:nth-of-type(odd)': {
            backgroundColor: '#f5f5f5',
            '&:hover': {
              backgroundColor: '#e0e0e0'
            }
          },
          '& tr:hover': {
            backgroundColor: '#eeeeee !important'
          }
        }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Employee Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Designition</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedEmployeeData.map((employee) => (
                <TableRow key={employee.id} hover>
                  <TableCell sx={{ fontWeight: '500' }}>{employee.id}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{
                        marginRight: 1,
                        bgcolor: employee.status && employee.status.toLowerCase() === "active" ? '#4CAF50' : '#FF9800',
                        fontWeight: 'bold'
                      }}>
                        {employee.first_name ? employee.first_name.charAt(0) : '?'}
                      </Avatar>
                      {`${employee.first_name || ''} ${employee.last_name || ''}`}
                    </Box>
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    {typeof employee.designation === 'number'
                      ? `Designation ID: ${employee.designation}`
                      : employee.designation || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="contained"
                      color={employee.status && employee.status.toLowerCase() === "active" ? "success" : "warning"}
                      sx={{
                        textTransform: "capitalize",
                        '& .MuiButton-startIcon': { mr: 0.5 }
                      }}
                      startIcon={employee.status && employee.status.toLowerCase() === "active" ?
                        <CheckCircle /> : <Cancel />
                      }
                    >
                      {employee.status}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <Button
                        size="small"
                        color="secondary"
                        variant="contained"
                        startIcon={<Edit />}
                        sx={{ minWidth: 90 }}
                        onClick={() => handleEditEmployee(employee)}
                      >
                        Edit
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Pagination
            count={Math.ceil(filteredEmployeeData.length / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#2196F3',
                fontWeight: '500',
                '&.Mui-selected': {
                  backgroundColor: '#2196F3',
                  color: 'white'
                }
              }
            }}
          />
        </Box>
      </Box>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: "#1565c0", color: "#fff" }}>
          {isEditMode ? "Edit Employee" : "Add New Employee"}
        </DialogTitle>
        <DialogContent sx={{ padding: "24px" }}>
          {/* Form fields stay the same, bound to formData */}
        </DialogContent>
        <DialogActions sx={{ padding: "16px" }}>
          <Button onClick={() => setIsDialogOpen(false)} variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={handleSaveEmployee} variant="contained" color="primary">
            {isEditMode ? "Save Changes" : "Add Employee"}
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}