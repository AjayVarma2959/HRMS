import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/Authentication/Login';
import ForgotPasswordPage from './pages/Authentication/ForgotPassword';
import EmployeeDashboard from './pages/Employee/EmployeeDashboard';
import HRDashboard from './pages/HR/HRDashboard'; 
import { Manager } from './pages/Manager/manager';
// import SetPasswordPage from './pages/SetPasswordPage';
// import EmailVerificationPage from './pages/EmailVerificationPage';
import VerifyEmail from './pages/verifyEmail';
import SetPassword from './pages/setPassword';
import RegisterPage1 from './pages/Authentication/RegistrationPage';
import GenerateOTP from './pages/Authentication/GenerateOTP';



const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<RegisterPage />} /> */}
        <Route path='/' element={<RegisterPage1 />} />
        <Route path='/generate-otp' element={<GenerateOTP />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path='/Employee-Dashboard' element={<EmployeeDashboard />} />
        <Route path='/Manager' element={<Manager />} />
        <Route path='/HRDashboard' element={<HRDashboard />} />
        {/* <Route 
          path="/verify-email/:email" 
          element={<EmailVerificationPage />} 
        />
        <Route 
          path="/set-password/:email" 
          element={<SetPasswordPage />} 
        /> */}
        {/* <Route path="/verify/:token" element={<VerifyEmail />} /> */}
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
      </Routes>
    </Router>
  );
};

export default App;