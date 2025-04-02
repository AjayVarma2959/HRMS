import React from "react";
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  LinearProgress, 
  Avatar,
  Chip,
  Stack,
  IconButton
} from "@mui/material";
import { 
  PeopleAlt, 
  QueryStats, 
  GroupWork, 
  Search, 
  FilterList, 
  AddCircle 
} from "@mui/icons-material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";


const candidateData = [
  { id: 1, name: "John Doe", role: "Software Engineer", stage: "Technical Interview", progress: 60 },
  { id: 2, name: "Jane Smith", role: "Product Manager", stage: "Final Interview", progress: 80 },
  { id: 3, name: "Mike Johnson", role: "UX Designer", stage: "Screening", progress: 30 },
];

const analyticsData = [
  { name: 'Hired', value: 12 },
  { name: 'Interview', value: 8 },
  { name: 'Rejected', value: 5 },
];

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const talentPool = [
  { id: 1, name: "Sarah Wilson", skills: ["React", "Node.js"], availability: "Immediate" },
  { id: 2, name: "Chris Taylor", skills: ["Python", "ML"], availability: "1 month" },
  { id: 3, name: "Emma Davis", skills: ["UX Research", "Figma"], availability: "2 weeks" },
];

const Recruitment = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PeopleAlt fontSize="large" /> Recruitment Dashboard
        </Typography>
        <Box>
          <IconButton color="primary"><AddCircle fontSize="large" /></IconButton>
          <IconButton><FilterList /></IconButton>
          <IconButton><Search /></IconButton>
        </Box>
      </Box>

      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, bgcolor: '#f0f4ff' }}>
            <Typography variant="h6">Total Candidates</Typography>
            <Typography variant="h4" fontWeight="bold">85</Typography>
            <QueryStats sx={{ color: '#4dabf5', fontSize: 40 }} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, bgcolor: '#fff0f6' }}>
            <Typography variant="h6">Open Positions</Typography>
            <Typography variant="h4" fontWeight="bold">15</Typography>
            <GroupWork sx={{ color: '#ff6b6b', fontSize: 40 }} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, bgcolor: '#e6fcf5' }}>
            <Typography variant="h6">Avg. Hiring Time</Typography>
            <Typography variant="h4" fontWeight="bold">23d</Typography>
            <QueryStats sx={{ color: '#38d9a9', fontSize: 40 }} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, bgcolor: '#fff9db' }}>
            <Typography variant="h6">Conversion Rate</Typography>
            <Typography variant="h4" fontWeight="bold">68%</Typography>
            <QueryStats sx={{ color: '#ffd43b', fontSize: 40 }} />
          </Paper>
        </Grid>
      </Grid>

     
      <Grid container spacing={3}>
       
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>Active Candidates</Typography>
            {candidateData.map((candidate) => (
              <Box key={candidate.id} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography fontWeight="bold">{candidate.name}</Typography>
                  <Chip label={candidate.role} size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {candidate.stage}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={candidate.progress} 
                  sx={{ height: 8, borderRadius: 5 }}
                />
              </Box>
            ))}
          </Paper>
        </Grid>

        
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" mb={2}>Application Statistics</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <PieChart width={300} height={200}>
                <Pie
                  data={analyticsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {analyticsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
              {analyticsData.map((entry, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, bgcolor: COLORS[index] }} />
                  <Typography variant="body2">{entry.name}</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

       
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>Talent Pool Management</Typography>
            <Grid container spacing={2}>
              {talentPool.map((talent) => (
                <Grid item xs={12} sm={6} md={4} key={talent.id}>
                  <Paper sx={{ p: 2, '&:hover': { boxShadow: 3 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Avatar>{talent.name[0]}</Avatar>
                      <Typography fontWeight="bold">{talent.name}</Typography>
                    </Box>
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                      {talent.skills.map((skill, index) => (
                        <Chip key={index} label={skill} size="small" />
                      ))}
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      Available in: {talent.availability}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Recruitment;