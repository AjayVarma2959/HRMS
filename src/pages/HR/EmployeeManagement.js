import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  FormControlLabel,
  Switch,
  Radio,
  RadioGroup,
  FormLabel, Checkbox,
  Avatar

} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import back from '../../assets/Back.png'
import { useSnackbar } from 'notistack';

import {
  BarChart,
  PieChart,
} from "@mui/x-charts";
import {
  Download,
  Person,
  Email,
  Cake,
  Work,
  Phone,
  CheckCircle,
  Cancel,
  Business,
  Grade,
  Badge,
} from "@mui/icons-material";
import { localAxios } from "../../Axios/axios";
import { localAxiosGet } from "../../Axios/axios";

const mockApi = {
  employees: [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      dateOfBirth: "1990-01-01",
      department: "Software Development",
      team: "Frontend Development",
      designation: "Senior Software Engineer",

      phoneNumber: "123-456-7890",
      status: "Active",
      employmentType: "Full-Time",
      joiningDate: "2020-01-15",
    },
  ],

  getEmployees: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockApi.employees);
      }, 500);
    });
  },

  addEmployee: (employee) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockApi.employees.push({ ...employee, id: Date.now() });
        resolve(true);
      }, 300);
    });
  },

  deleteEmployee: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockApi.employees = mockApi.employees.filter((emp) => emp.id !== id);
        resolve(true);
      }, 300);
    });
  },
};

export default function EmployeeManagement({ setSelectedMenu }) {
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      joiningDate: "",
      department: "",
      departmentName: "",
      team: "",
      teamName: "",
      designation: "",
      designationName: "",
      status: "inActive",
      employmentType: "Full-Time",
      grade: "",
      isManager: false,
      isTeamLead: false
    });
  };
  const[searchTerm,setSeatchTerm]= useState("");
  const [loadingTeams, setLoadingTeams] = useState(false);
  const [loadingDesignations, setLoadingDesignations] = useState(false)
  const [designations, setDesignations] = useState([])

  const [teams, setTeams] = useState([])
  const [departments, setDepartments] = useState([])

  const [userId, setUserId] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedOrgId = localStorage.getItem("organizationId");
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserId) setUserId(storedUserId);
    if (storedOrgId) setOrganizationId(storedOrgId);
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

    }
  }, []);

  const fetchAllEMployeeByOrgId = async (org_id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      console.log('Fetching employees for organization ID:', org_id);
      if (!org_id) {
        console.error('Organization ID not found')
        return;
      }
      const response = await axios(localAxiosGet(`/organization/getAllEmployeesByOrganizationId/:organization_id/?organization_id=${org_id}`, token))
      if (response.data && response.data.status === "SUCCESS" && response.data.message && response.data.message.employees) {
        const employeesData = response.data.message.employees;
        console.log('Extracted employees data:', employeesData);
        setEmployees(employeesData)
      } else {
        console.error('Unexpected API response structure:', response.data)
        setEmployees([])
      }
    } finally {
      setLoading(false)
    }
  }
  const fetchDesignationsByTeamId = async (teamId) => {
    try {
      setLoadingDesignations(true);
      console.log('Fetching designations for team ID:', teamId);

      const token = localStorage.getItem('accessToken');
      const response = await axios(localAxiosGet(`/organization/getAllDesignationsByTeamId/${teamId}`, token));

      console.log('Designations Response:', response);

      if (response.data && response.data.message && response.data.message.designations) {
        const designationsData = response.data.message.designations || [];
        console.log('Extracted Designations Data:', designationsData);

        const designationsArray = designationsData.map(designation => ({
          id: designation.id,
          name: designation.designation
        }));

        console.log('Final Designations Array:', designationsArray);
        setDesignations(designationsArray);
      } else {
        console.error("Unexpected API response structure:", response.data);
        enqueueSnackbar('Unexpected API response format for designations', { variant: 'error' });
        setDesignations([]);
      }
    } catch (error) {
      console.error('Error fetching designations:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      enqueueSnackbar('Failed to load designations', { variant: 'error' });
      setDesignations([]);
    } finally {
      setLoadingDesignations(false);
    }
  };

  const fetchDepartmentsByOrganizationId = async (orgId) => {
    try {
      setLoading(true);
      console.log("Fetching departments for organization ID:", orgId);

      const token = localStorage.getItem('accessToken');

      const response = await axios(localAxiosGet(`/organization/getAllDepartmentsByOrganizationId/${orgId}`, token));

      console.log("FULL RESPONSE OBJECT:", response);
      console.log("RESPONSE DATA:", response.data);

      if (response.data && response.data.message && response.data.message.departments) {
        const departmentsData = response.data.message.departments || [];
        console.log("EXTRACTED DEPARTMENTS DATA:", departmentsData);

        const departmentsArray = departmentsData.map(dept => ({
          id: dept.id,
          name: dept.department
        }));

        console.log("FINAL DEPARTMENTS ARRAY:", departmentsArray);
        console.log("ARRAY LENGTH:", departmentsArray.length);

        setDepartments(departmentsArray);
      } else {
        console.error("Unexpected API response structure:", response.data);
        enqueueSnackbar('Unexpected API response format', { variant: 'error' });

        setDepartments([]);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      enqueueSnackbar('Failed to load departments', { variant: 'error' });
      setDepartments([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (organizationId) {
      console.log("About to fetch departments with organizationId:", organizationId);
      fetchDepartmentsByOrganizationId(organizationId);
    } else {
      console.log("No organizationId available yet");
    }
  }, [organizationId]);
  const fetchTeamsByDepartmentId = async (departmentId) => {
    try {
      setLoadingTeams(true);
      console.log("Fetching teams for department ID:", departmentId);

      const token = localStorage.getItem('accessToken');

      const response = await axios(localAxiosGet(`/organization/getAllTeamsByDepartmentId/${departmentId}`, token));

      console.log("TEAMS RESPONSE:", response);

      if (response.data && response.data.message && response.data.message.teams) {
        const teamsData = response.data.message.teams || [];
        console.log("EXTRACTED TEAMS DATA:", teamsData);

        const teamsArray = teamsData.map(team => ({
          id: team.id,
          name: team.team
        }));

        console.log("FINAL TEAMS ARRAY:", teamsArray);

        setTeams(teamsArray);
      } else {
        console.error("Unexpected API response structure:", response.data);
        enqueueSnackbar('Unexpected API response format for teams', { variant: 'error' });

        setTeams([]);
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      enqueueSnackbar('Failed to load teams', { variant: 'error' });
      setTeams([]);
    } finally {
      setLoadingTeams(false);
    }
  };

  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false)
  const [employees, setEmployees] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    department: "",
    team: "",
    designation: "",

    phoneNumber: "",
    status: "inActive",
    employmentType: "Full-Time",
    joiningDate: "",
    isManager: false,
    isTeamLead: false
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

 const filterdEmployesData = employees.filter((employee)=>{
  const name = `${employee.first_name || ''} ${employee.last_name}`.toLowerCase();
  const department = (employee.department || '').toLowerCase()
  const email = (employee.email || '').toLowerCase()
  const team = (employee.team || '').toLowerCase()
  const designation = (employee.designation || '').toLowerCase()
  const status = (employee.status || '').toLowerCase();

  const matchesSearchTerm = 
  name.includes(searchTerm.toLowerCase())
  email.includes(searchTerm.toLowerCase())
  designation.includes(searchTerm.toLowerCase())
  const matchesStatus = filterStatus === "all" ||
  (filterStatus === "Active" && status === "active") ||
  (filterStatus === "InActive" && status === "inactive")

  return matchesSearchTerm && matchesStatus;
 })
 const paginatedEmployeeData = filterdEmployesData.slice((page-1) * rowsPerPage,page*rowsPerPage)

  const handleDepartmentChange = (e) => {
    const selectedDeptId = e.target.value;
    console.log("Department selected ID:", selectedDeptId);

    const selectedDept = departments.find(d => d.id === selectedDeptId);

    setFormData({
      ...formData,
      department: selectedDeptId,
      departmentName: selectedDept?.name || '',
      team: "",
      designation: ""
    });

    fetchTeamsByDepartmentId(selectedDeptId);
  };

  const handleTeamChange = (e) => {
    const selectedTeamId = e.target.value;
    console.log("Team selected:", selectedTeamId);

    const selectedTeam = teams.find(t => t.id === selectedTeamId);

    setFormData({
      ...formData,
      team: selectedTeamId,
      teamName: selectedTeam?.name || '',
      designation: ""
    });

    fetchDesignationsByTeamId(selectedTeamId);
  };
  const handleDesignationChange = (e) => {
    const selectedDesignationId = e.target.value;
    console.log("Designation selected:", selectedDesignationId);

    const selectedDesignation = designations.find(d => d.id === selectedDesignationId);

    setFormData({
      ...formData,
      designation: selectedDesignationId,
      designationName: selectedDesignation?.name || ''
    });
  };


  const handleAddEmployee = async () => {
    try {
      setLoading(true);


      let user_type = "Employee";

      if (formData.isManager) {
        user_type = "Manager";
      }


      const employeeData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: "1234",
        organization_id: organizationId,
        department: formData.department,
        team: formData.team,
        designation: formData.designation,
        dob: formData.dateOfBirth,
        doj: formData.joiningDate,
        status: formData.status === "Active" ? "active" : "inactive",
        user_type: user_type,
        is_manager: formData.isManager,
        is_team_lead: formData.isTeamLead
      };

      console.log("Sending employee data:", JSON.stringify(employeeData, null, 2));


      const config = localAxios('/organization/userSignup', employeeData);
      const response = await axios(config);

      if (response.status === 201) {
        toast.success('Employee added successfully');
        setIsDialogOpen(false);
        resetForm();

      }
    } catch (error) {
      console.error('Error adding employee:', error);

      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }

      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to add employee. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("DEPARTMENTS STATE UPDATED:", departments);
  }, [departments]);
  useEffect(() => {
    if (organizationId) {
      fetchAllEMployeeByOrgId(organizationId)
    }

  }, [organizationId]);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f9fafc" }}>
      {userDetails && (
        <Box mb={3} p={2} bgcolor="#E3F2FD" borderRadius={2}>
          <Typography variant="h6">
            Welcome, {userDetails.first_name} {userDetails.last_name}
          </Typography>
          <Typography variant="body1">
            Organization ID: {organizationId}
          </Typography>
          <Typography variant="body2">
            User ID: {userId}
          </Typography>
        </Box>
      )}
      <Box
        component="header"
        sx={{
          padding: "16px",
          backgroundColor: "#1565c0",
          color: "#fff",
          boxShadow: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >

        <Typography variant="h4" fontWeight="bold">
          Employee Management System
        </Typography>
      </Box>


      <Box sx={{ padding: "24px", display: "flex", flexDirection: "column", gap: 4 }}>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            label="Search Employees"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flexGrow: 1 }}
          />

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="inActive">inActive</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={() => setIsDialogOpen(true)}
            startIcon={<Person />}
          >
            Add Employee
          </Button>
        </Box>

        <Card sx={{ boxShadow: 3 }}>
          <CardHeader title="Employees List" />
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{
                  height:"40px"
                }}>
                  <TableRow
                    sx={{
                      backgroundColor: "#8977A8",
                      height: "30px",
                      '& > th': {
                        color: 'white',
                        height: "30px",
                      },
                      '&:first-of-type th:first-of-type': { borderTopLeftRadius: '8px' },
                      '&:first-of-type th:last-of-type': { borderTopRightRadius: '8px' },
                      '&:last-of-type th:first-of-type': { borderBottomLeftRadius: '8px' },
                      '&:last-of-type th:last-of-type': { borderBottomRightRadius: '8px' },
                    }}
                  >
                    <TableCell>ID</TableCell>
                    <TableCell>NAME</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Team</TableCell>
                    <TableCell>Designation</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedEmployeeData.map((employe)=>(
                    <TableRow key={employe.id} hover>
                      <TableCell sx={{ fontWeight: '500' }}>{employe.id}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar sx={{marginRight:1,
                          bgcolor:employe.status && employe.status.toLowerCase() === "active" ? '#4CAF50': '#FF9800',fontWeight:'bold'}}>
                            {employe.first_name ? employe.first_name.charAt(0): '?'}
                          </Avatar>
                          {`${employe.first_name || ''}${employe.last_name || ''}`}
                        </Box>
                      </TableCell>
                      <TableCell>{typeof employe.designation === 'number' ?
                      `Designition ID:${employe.designition}`:employe.designition || 'N?A'}</TableCell>
                      <TableCell>{employe.team}</TableCell> 
                      <TableCell>{employe.designation}</TableCell>
                      <TableCell>
                        <Button size="small" variant='contained' color={employe.status && employe.status.toLowerCase() === "active"?"Success":"warning"} sx={{
                          textTransform:"capitalize",
                          '& .MuiButton-startIcon':{mr:0.5}
                        }} startIcon={employe.status && employe.staus.toLowerCase() === "active" ? <CheckCircle /> : <Cancel />}></Button>

                      </TableCell>
                    </TableRow>
                  ))}
                  



                </TableBody>
              </Table>
            </TableContainer>

          </CardContent>
        </Card>
        <Card sx={{ boxShadow: 3 }}>
          <CardHeader title="Employee List" />
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#1565c0" }}>
                    <TableCell sx={{ color: "#fff" }}>Name</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Department</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Team</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Designation</TableCell>

                    <TableCell sx={{ color: "#fff" }}>Status</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        {employee.firstName} {employee.lastName}
                      </TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.team}</TableCell>
                      <TableCell>{employee.designation}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            color: employee.status === "Active" ? "green" : "red",
                          }}
                        >
                          {employee.status === "Active" ? (
                            <CheckCircle fontSize="small" />
                          ) : (
                            <Cancel fontSize="small" />
                          )}
                          {employee.status}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick=""
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Pagination


              />
            </Box>
          </CardContent>
        </Card>


        <Dialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{ backgroundColor: "#1565c0", color: "#fff" }}>
            Add New Employee
          </DialogTitle>
          <DialogContent sx={{ padding: "24px" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>

              <Typography variant="h6" color="primary">
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="First Name"
                    fullWidth
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    InputProps={{
                      startAdornment: <Person sx={{ mr: 1, color: "#1565c0" }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Last Name"
                    fullWidth
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    InputProps={{
                      startAdornment: <Person sx={{ mr: 1, color: "#1565c0" }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    InputProps={{
                      startAdornment: <Email sx={{ mr: 1, color: "#1565c0" }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Phone Number"
                    fullWidth
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    InputProps={{
                      startAdornment: <Phone sx={{ mr: 1, color: "#1565c0" }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Date of Birth"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      setFormData({ ...formData, dateOfBirth: e.target.value })
                    }
                    InputProps={{
                      startAdornment: <Cake sx={{ mr: 1, color: "#1565c0" }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Joining Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formData.joiningDate}
                    onChange={(e) =>
                      setFormData({ ...formData, joiningDate: e.target.value })
                    }
                  />
                </Grid>
              </Grid>


              <Typography variant="h6" color="primary">
                Professional Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Department</InputLabel>
                    <Select
                      value={formData.department}
                      onChange={handleDepartmentChange}
                      label="Department"
                      disabled={loading}
                    >
                      {departments.length === 0 ? (
                        <MenuItem disabled>
                          No departments available
                        </MenuItem>
                      ) : (
                        departments.map((dept) => (
                          <MenuItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>

                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Team</InputLabel>
                    <Select
                      value={formData.team}
                      onChange={handleTeamChange}
                      label="Team"
                      disabled={!formData.department || loadingTeams}
                    >
                      {loadingTeams ? (
                        <MenuItem disabled>Loading teams...</MenuItem>
                      ) : teams.length === 0 ? (
                        <MenuItem disabled>
                          No teams available for this department
                        </MenuItem>
                      ) : (
                        teams.map((team) => (
                          <MenuItem key={team.id} value={team.id}>
                            {team.name}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>

                </Grid>
                <Grid item xs={6}>
                  <Paper
                    elevation={1}
                    sx={{
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      borderLeft: formData.isManager ? '4px solid #1565c0' : '4px solid transparent',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: 2,
                        backgroundColor: '#f5f9ff'
                      }
                    }}
                  >
                    <Checkbox
                      checked={formData.isManager}
                      onChange={(e) =>
                        setFormData({ ...formData, isManager: e.target.checked })
                      }
                      color="primary"
                      sx={{ mr: 1 }}
                    />
                    <Box>
                      <Typography variant="body1" fontWeight={500}>Is Manager</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Can manage team members and approve requests
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={6}>
                  <Paper
                    elevation={1}
                    sx={{
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      borderLeft: formData.isTeamLead ? '4px solid #1565c0' : '4px solid transparent',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: 2,
                        backgroundColor: '#f5f9ff'
                      }
                    }}
                  >
                    <Checkbox
                      checked={formData.isTeamLead}
                      onChange={(e) =>
                        setFormData({ ...formData, isTeamLead: e.target.checked })
                      }
                      color="primary"
                      sx={{ mr: 1 }}
                    />
                    <Box>
                      <Typography variant="body1" fontWeight={500}>Is Team Lead</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Can lead team activities and projects
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Designation</InputLabel>
                    <Select
                      value={formData.designation}
                      onChange={handleDesignationChange}
                      label="Designation"
                      disabled={!formData.team || loadingDesignations}
                    >
                      {loadingDesignations ? (
                        <MenuItem disabled>Loading Designations...</MenuItem>
                      ) : designations.length === 0 ? (
                        <MenuItem disabled>No designations available for this team</MenuItem>
                      ) : (
                        designations.map((designation) => (
                          <MenuItem key={designation.id} value={designation.id}>
                            {designation.name}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      label="Status"
                      defaultValue="inActive"
                    >
                      <MenuItem value="inActive">inActive</MenuItem>
                      <MenuItem value="Active">Active</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

              </Grid>
            </Box>
          </DialogContent>
          <DialogActions sx={{ padding: "16px" }}>
            <Button
              onClick={() => setIsDialogOpen(false)}
              variant="outlined"
              color="error"
              startIcon={<Cancel />}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddEmployee}
              variant="contained"
              color="primary"
              startIcon={<CheckCircle />}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Employee'}
            </Button>
          </DialogActions>
        </Dialog>


        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%", boxShadow: 3 }}>
              <CardHeader title="Employee Status Distribution" />
              <CardContent>
                <PieChart
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: employees.filter((emp) => emp.status === "inActive")
                            .length,
                          label: "inActive",
                        },
                        {
                          id: 1,
                          value: employees.filter(
                            (emp) => emp.status === "InActive"
                          ).length,
                          label: "InActive",
                        },
                      ],
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%", boxShadow: 3 }}>
              <CardHeader title="Department Distribution" />
              <CardContent>
                <BarChart
                  xAxis={[
                    {
                      scaleType: "band",
                      data: Object.keys(departments),
                    },
                  ]}
                  series={[
                    {
                      data: Object.keys(departments).map(
                        (dept) =>
                          employees.filter((emp) => emp.department === dept).length
                      ),
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box >
  );
}

