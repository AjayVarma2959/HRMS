// Verify email token
export const verifyEmailToken = async (token) => {
    const response = await fetch(`http://localhost:5000/api/employees/verify/${token}`);
    return response.json();
  };
  
  // Request OTP
  export const requestOtp = async (email) => {
    await fetch("http://localhost:5000/api/employees/generate-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    alert("OTP sent to your email!");
  };
  
  // Verify OTP and set password
  export const handleSetPassword = async (email, otp, password, confirmPassword) => {
    const response = await fetch("http://localhost:5000/api/employees/verify-otp-set-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, password, confirmPassword }),
    });
  
    const data = await response.json();
    if (response.ok) {
      alert("Password set successfully! You can now log in.");
    } else {
      alert(data.error);
    }
  };
  