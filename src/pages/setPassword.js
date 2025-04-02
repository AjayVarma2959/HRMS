import { useState } from "react";
import { handleSetPassword } from "../api/employeeService";

const SetPassword = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    handleSetPassword(email, otp, password, confirmPassword)
      .then((res) => {
        alert(res.message);
      })
      .catch((error) => {
        alert("Failed to set password: " + error.response?.data?.error || "Unknown error");
      });
  };

  return (
    <div>
      <h2>Set Your Password</h2>
      <input placeholder="OTP" onChange={(e) => setOtp(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
      <button onClick={handleSubmit}>Set Password</button>
    </div>
  );
};

export default SetPassword;
