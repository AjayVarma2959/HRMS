import React, {useState, useEffect} from 'react';
import {
    Box, Typography, Button
} from "@mui/material";
import {PauseCircleOutline, HourglassBottom, Login, Logout, Coffee, PlayArrow
} from "@mui/icons-material"

const EmployeeCheckIn = ({ handleCheckOutButton, status, setStatus })  => {

    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [isRunning, setisRunning] = useState(false);
    //const [status, setstatus] = useState('OUT')

    //const [totalBreakTime, setTotalBreakTime] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    const [isOnBreak, setIsOnBreak] = useState(false); // Track if on break
    const [breakStartTime, setBreakStartTime] = useState(null); // Track break start time
    const [totalBreakTime, setTotalBreakTime] = useState(
        parseInt(localStorage.getItem("totalBreakTime")) || 0
    );
    const [breakHours, setBreakHours] = useState(0);
    const [breakMinutes, setBreakMinutes] = useState(0);
    const [breakSeconds, setBreakSeconds] = useState(0);

    
    // code for timer
    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds === 59) {
                        setMinutes((prevMinutes) => {
                            if (prevMinutes === 59) {
                                setHours((prevHours) => prevHours + 1); // Increment hours
                                return 0; // Reset minutes to 0
                            }
                            return prevMinutes + 1; // Increment minutes
                        });
                        return 0; // Reset seconds to 0
                    }
                    return prevSeconds + 1; // Increment seconds
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning]);

    useEffect(() => {
        if (isRunning) {
            localStorage.setItem("timerHours", hours);
            localStorage.setItem("timerMinutes", minutes);
            localStorage.setItem("timerSeconds", seconds);
        }
    }, [hours, minutes, seconds, isRunning]);  // Store the timer every time it updates

    const handleCheckInButton = () => {
        const now = new Date();
        setCheckInTime(now);
        localStorage.setItem("checkInTime", now.toISOString());

        setisRunning(true);
        setCheckOutTime(null);

        // ✅ Reset break timer on check-in
        setIsOnBreak(false);
        setBreakStartTime(null);
        setBreakHours(0);
        setBreakMinutes(0);
        setBreakSeconds(0);
        setTotalBreakTime(0);
        setStatus('WORKING');

        localStorage.removeItem("checkOutTime");
        localStorage.setItem("totalBreakTime", 0);
    };


    // const handleCheckOutButton = () => {
    //     const time = new Date();
    //     setCheckOutTime(time);
    //     setisRunning(false);
    //     setIsOnBreak(false);  // Reset break state when checking out
    //     setBreakStartTime(null); // Clear break start time
    //     setstatus('OUT');
    //     // Update checkOutTime in localStorage
    //     localStorage.setItem("checkOutTime", time.toISOString());

    //     // Update totalBreakTime in localStorage if it's not null
    //     if (totalBreakTime !== null) {
    //         localStorage.setItem("totalBreakTime", totalBreakTime);
    //     }

    //     localStorage.removeItem("breakStartTime");

    //     // Example: Logging for debugging
    //     console.log("Checkout performed at:", time.toISOString());
    //     if (totalBreakTime !== null) {
    //         console.log("Total break time saved:", totalBreakTime);
    //     } else {
    //         console.log("No break time to save");
    //     }

    //     // Example: Making API call to record the checkout
    //     // api.recordCheckout(time.toISOString(), totalBreakTime).then(() => {
    //     //   // Handle success
    //     // }).catch(() => {
    //     //   // Handle error
    //     // });

    //     // Example: Displaying a message to the user
    //     // alert("Checkout successful!");
    // };

    const handleBreakButton = () => {
        const now = new Date();
        setBreakStartTime(now);
        setIsOnBreak(true);
        setisRunning(false);
        setStatus('BREAK');
        //localStorage.setItem("breakStartTime", now.toISOString()); // Store break start time
        // console.log('total break start time', totalBreakTime);


    };


    const handleResumeButton = () => {
        if (breakStartTime) {
            const now = new Date();
            const breakDuration = now - new Date(breakStartTime);
            const updatedTotalBreakTime = totalBreakTime + breakDuration;

            console.log("Resume Button - breakStartTime:", breakStartTime);
            console.log("Resume Button - breakDuration:", breakDuration);
            console.log("Resume Button - updatedTotalBreakTime:", updatedTotalBreakTime);

            setTotalBreakTime(updatedTotalBreakTime);
            setBreakStartTime(null);
            setIsOnBreak(false);
            setisRunning(true);
            setStatus('WORKING');
            localStorage.setItem("totalBreakTime", updatedTotalBreakTime);
            console.log('total break end time', updatedTotalBreakTime);
        }
    };

    useEffect(() => {
        // Get total break time from storage
        const savedBreakTime = localStorage.getItem("totalBreakTime");
        if (savedBreakTime) {
            setTotalBreakTime(parseInt(savedBreakTime)); // Restore break time
        }

        // Check if a break was ongoing before refresh
        const savedBreakStartTime = localStorage.getItem("breakStartTime");
        if (savedBreakStartTime) {
            const breakStart = new Date(savedBreakStartTime);
            const now = new Date();
            const breakDuration = now - breakStart;

            setBreakStartTime(breakStart);
            setIsOnBreak(true);

            setBreakHours(Math.floor(breakDuration / (1000 * 60 * 60)));
            setBreakMinutes(Math.floor((breakDuration / (1000 * 60)) % 60));
            setBreakSeconds(Math.floor((breakDuration / 1000) % 60));
        }
    }, []);
    // updating the break timer
    useEffect(() => {
        let interval;
        if (isOnBreak) {
            interval = setInterval(() => {
                const now = new Date();
                const elapsed = now - new Date(breakStartTime);

                // ✅ Add elapsed break time to previously stored total break time
                const totalElapsedBreakTime = totalBreakTime + elapsed;

                setBreakHours(Math.floor(totalElapsedBreakTime / (1000 * 60 * 60)));
                setBreakMinutes(Math.floor((totalElapsedBreakTime / (1000 * 60)) % 60));
                setBreakSeconds(Math.floor((totalElapsedBreakTime / 1000) % 60));
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isOnBreak, breakStartTime, totalBreakTime]);  // ✅ Depend on totalBreakTime to accumulate time

    useEffect(() => {
        if (checkOutTime) {
            const timeoutId = setTimeout(() => {
                setCheckInTime(null);
                setCheckOutTime(null);
                setSeconds(0);
                setMinutes(0);
                setHours(0);
                setBreakHours(0);
                setBreakMinutes(0);
                setBreakSeconds(0);
                setTotalBreakTime(0);
            }, 20 * 1000); // 5 hours in milliseconds

            return () => clearTimeout(timeoutId); // Cleanup timeout if component unmounts or state changes
        }
    }, [checkOutTime]);


    return(
        <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap", // Ensures responsiveness
        }}
      >
        {/* Break Timer */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#FFEBEE",
            color: "#C62828",
            padding: "8px 16px",
            borderRadius: "8px",
          }}
        >
          <PauseCircleOutline sx={{ marginRight: "8px" }} />
          <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
            {String(breakHours).padStart(2, "0")}:
            {String(breakMinutes).padStart(2, "0")}:
            {String(breakSeconds).padStart(2, "0")}
          </Typography>
        </Box>
  
        {/* Work Timer */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#ECF0F1",
            color: "#2C3E50",
            padding: "8px 16px",
            borderRadius: "8px",
          }}
        >
          <HourglassBottom sx={{ marginRight: "8px" }} />
          <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
            {String(hours).padStart(2, "0")}:
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </Typography>
        </Box>
  
        {/* Check-In Button */}
        {!checkInTime ? (
          <Button
            color="primary"
            variant="contained"
            onClick={handleCheckInButton}
            startIcon={<Login />}
            sx={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "8px 16px",
              "&:hover": { backgroundColor: "#388E3C" },
            }}
          >
            Check-In
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleCheckOutButton}
            disabled={checkOutTime !== null}
            startIcon={<Logout />}
            sx={{
              backgroundColor: checkOutTime ? "#BDBDBD" : "#D32F2F",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "8px 16px",
              "&:hover": { backgroundColor: checkOutTime ? "#BDBDBD" : "#B71C1C" },
              "&.Mui-disabled": {
                backgroundColor: "#BDBDBD",
                color: "#fff",
                cursor: "not-allowed",
              },
            }}
          >
            Check-Out
          </Button>
        )}
  
        {/* Break Button */}
        {checkInTime && !isOnBreak && !checkOutTime && (
          <Button
            variant="contained"
            onClick={handleBreakButton}
            startIcon={<Coffee />}
            sx={{
              backgroundColor: "#FF9800",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "8px 16px",
              "&:hover": { backgroundColor: "#F57C00" },
            }}
          >
            Break
          </Button>
        )}
  
        {/* Resume Button */}
        {isOnBreak && !checkOutTime && checkInTime && (
          <Button
            variant="contained"
            onClick={handleResumeButton}
            startIcon={<PlayArrow />}
            sx={{
              backgroundColor: "#2196F3",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "8px 16px",
              "&:hover": { backgroundColor: "#1976D2" },
            }}
          >
            Resume
          </Button>
        )}
      </Box>
);
};

export default EmployeeCheckIn;