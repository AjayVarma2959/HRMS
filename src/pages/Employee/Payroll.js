import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  useMediaQuery,
  IconButton,
  Grid,

} from "@mui/material";
import {
  CurrencyRupee,
  AccountBalance,
  ExpandMore,
  ExpandLess,
  Person,
  AttachMoney,
  MoneyOff,
  AccountBalanceWallet
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const mockApiData = {
  name: "John Doe",
  employeeId: "EMP12345",
  department: "Engineering",
  designation: "Software Engineer",
  joiningDate: "2020-05-15",
  salary: 60000,
  basicSalary: 35000,
  allowances: {
    hra: 8000,
    medical: 5000,
    bonus: 3000,
  },
  pf: 7200,
  incomeTax: 5000,
  insurance: 2000,
  grossSalary: 60000,
  netSalary: 51000,
  taxDetails: {
    taxableIncome: 55000,
    taxPaid: 5000,
    taxableBenefits: 10000,
    taxDeductions: {
      section80C: 15000,
      section80D: 5000,
    },
    netTaxPayable: 2000,
  },
  bankDetails: {
    bankName: "XYZ Bank",
    accountNumber: "9876543210",
    ifscCode: "XYZB0001234",
  },
};

const Payroll = () => {
  const [payrollData] = useState(mockApiData);
  const [openSection, setOpenSection] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (

    <Box sx={{ padding: 0, minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
        Payroll
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        View your salary details, tax breakdown, deductions, and bank details.
      </Typography>


      <Grid container spacing={3}>
      {["Employee Details", "Bank Account Details", "Salary Breakdown", "Tax Details"].map((section) => (
        <Grid item xs={12} md={6} key={section}>
          <Card
            sx={{
              boxShadow: 3,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
            }}
          >
            <Button
              fullWidth
              variant="contained"
              sx={{
                borderRadius: 2,
                background: "linear-gradient(135deg, #7decc7, #dee9e4)",
                color: "#333",
                textTransform: "none",
                fontSize: "20px",
                fontWeight: "bold",
                p: 3,
                "&:hover": {
                  background: "linear-gradient(45deg, #00fbdf, #bae8ea)",
                },
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onClick={() => toggleSection(section)}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {section === "Employee Details" ? <Person /> :
                  section === "Salary Breakdown" ? <AttachMoney /> :
                  section === "Tax Details" ? <MoneyOff /> :
                  <AccountBalanceWallet />}
                <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                  {section}
                </Typography>
              </Box>
              {openSection === section ? <ExpandLess /> : <ExpandMore />}
            </Button>

            {openSection === section && (
              <Box mt={2} p={2} sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}>
                {section === "Employee Details" && (
                  <Grid container spacing={2}>
                    <Grid item xs={6}><Typography fontWeight="bold">Name:</Typography></Grid>
                    <Grid item xs={6}><Typography>{payrollData.name}</Typography></Grid>

                    <Grid item xs={6}><Typography fontWeight="bold">Employee ID:</Typography></Grid>
                    <Grid item xs={6}><Typography>{payrollData.employeeId}</Typography></Grid>

                    <Grid item xs={6}><Typography fontWeight="bold">Department:</Typography></Grid>
                    <Grid item xs={6}><Typography>{payrollData.department}</Typography></Grid>

                    <Grid item xs={6}><Typography fontWeight="bold">Designation:</Typography></Grid>
                    <Grid item xs={6}><Typography>{payrollData.designation}</Typography></Grid>

                    <Grid item xs={6}><Typography fontWeight="bold">Joining Date:</Typography></Grid>
                    <Grid item xs={6}><Typography>{payrollData.joiningDate}</Typography></Grid>
                  </Grid>
                )}

                {section === "Salary Breakdown" && (
                  <Grid container spacing={2}>
                    <Grid item xs={6}><Typography fontWeight="bold">Basic Salary:</Typography></Grid>
                    <Grid item xs={6}><Typography><CurrencyRupee fontSize="small" />{payrollData.basicSalary}</Typography></Grid>

                    <Grid item xs={6}><Typography fontWeight="bold">HRA:</Typography></Grid>
                    <Grid item xs={6}><Typography><CurrencyRupee fontSize="small" />{payrollData.allowances.hra}</Typography></Grid>

                    <Grid item xs={6}><Typography fontWeight="bold">Medical Allowance:</Typography></Grid>
                    <Grid item xs={6}><Typography><CurrencyRupee fontSize="small" />{payrollData.allowances.medical}</Typography></Grid>

                    <Grid item xs={6}><Typography fontWeight="bold">Bonus:</Typography></Grid>
                    <Grid item xs={6}><Typography><CurrencyRupee fontSize="small" />{payrollData.allowances.bonus}</Typography></Grid>

                    <Grid item xs={6}><Typography fontWeight="bold">Gross Salary:</Typography></Grid>
                    <Grid item xs={6}><Typography><CurrencyRupee fontSize="small" />{payrollData.grossSalary}</Typography></Grid>

                    <Grid item xs={6}><Typography fontWeight="bold">Net Salary:</Typography></Grid>
                    <Grid item xs={6}><Typography><CurrencyRupee fontSize="small" />{payrollData.netSalary}</Typography></Grid>
                  </Grid>
                )}

                {section === "Tax Details" && (
                  <Grid container spacing={2}>
                    <Grid item xs={6}><Typography fontWeight="bold">Taxable Income:</Typography></Grid>
                    <Grid item xs={6}><Typography><CurrencyRupee fontSize="small" />{payrollData.taxDetails.taxableIncome}</Typography></Grid>

                    <Grid item xs={6}><Typography fontWeight="bold">Tax Paid:</Typography></Grid>
                    <Grid item xs={6}><Typography><CurrencyRupee fontSize="small" />{payrollData.taxDetails.taxPaid}</Typography></Grid>

                    <Grid item xs={6}><Typography fontWeight="bold">Taxable Benefits:</Typography></Grid>
                    <Grid item xs={6}><Typography><CurrencyRupee fontSize="small" />{payrollData.taxDetails.taxableBenefits}</Typography></Grid>

                    <Grid item xs={6}><Typography fontWeight="bold">Deductions (80C & 80D):</Typography></Grid>
                    <Grid item xs={6}><Typography><CurrencyRupee fontSize="small" />{payrollData.taxDetails.taxDeductions.section80C + payrollData.taxDetails.taxDeductions.section80D}</Typography></Grid>

                    <Grid item xs={6}><Typography fontWeight="bold">Net Tax Payable:</Typography></Grid>
                    <Grid item xs={6}><Typography><CurrencyRupee fontSize="small" />{payrollData.taxDetails.netTaxPayable}</Typography></Grid>
                  </Grid>
                )}

                {section === "Bank Account Details" && (
                  <Grid container spacing={2}>
                    <Grid item xs={6}><Typography fontWeight="bold">Bank Name:</Typography></Grid>
                    <Grid item xs={6}><Typography>{payrollData.bankDetails.bankName}</Typography></Grid>

                    <Grid item xs={6}><Typography fontWeight="bold">Account Number:</Typography></Grid>
                    <Grid item xs={6}><Typography>{payrollData.bankDetails.accountNumber}</Typography></Grid>

                    <Grid item xs={6}><Typography fontWeight="bold">IFSC Code:</Typography></Grid>
                    <Grid item xs={6}><Typography>{payrollData.bankDetails.ifscCode}</Typography></Grid>
                  </Grid>
                )}
              </Box>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
    </Box>
  );
};

export default Payroll;
