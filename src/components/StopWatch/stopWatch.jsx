import React, { useEffect, useState, useRef } from "react";
import "./stopWatch.css";
const StopWatch = () => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [records, setRecords] = useState([]);
  const intervalRef = useRef(null);

  //   // Format date as DD MMM YYYY
  // const datePart = now.toLocaleDateString('en-GB', {
  //   day: '2-digit',
  //   month: 'short',
  //   year: 'numeric',
  // });

  // // Format time as HH:MM:SS
  // const timePart = now.toLocaleTimeString('en-US', {
  //   hour: '2-digit',
  //   minute: '2-digit',
  //   second: '2-digit',
  //   hour12: false, // set to true if you want AM/PM
  // });

  //       const day = String(now.getDate()).padStart(2, "0");        // 01–31
  // const month = String(now.getMonth() + 1).padStart(2, "0"); // 01–12 (months are 0-indexed)
  // const year = String(now.getFullYear()).padStart(4, "0");   //

  // Format time as HH:MM:SS
  //   const hours = String(now.getHours()).padStart(2, "0");
  //   const minutes = String(now.getMinutes()).padStart(2, "0");
  //   const seconds = String(now.getSeconds()).padStart(2, "0");
  //   const milliseconds = String(now.getMilliseconds()).padStart(2, "0");

  //   const timePart = `${hours}:${minutes}:${seconds}.${milliseconds}`;

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - timer; // resume from paused time

      intervalRef.current = setInterval(() => {
        setTimer(Date.now() - startTime);
      }, 10); // update every 10ms for smoother performance
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Helper function to format milliseconds into hh:mm:ss.ms
  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600000)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(
      2,
      "0"
    );
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, "0");
    const milliseconds = String(Math.floor((time % 1000) / 10)).padStart(
      2,
      "0"
    );
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  const handleStartStop = () => setIsRunning((prev) => !prev);
  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimer(0);
    setRecords([]);
  };
  const handleRecord = () => setRecords((prev) => [...prev, formatTime(timer)]);

  return (
    <div className="App">
      <div className="stopwatch-container">
        <h1>⏱ Stop Watch</h1>
        <h2 className="stopwatch-timer">{formatTime(timer)}</h2>

        <div style={{ margin: "10px", display: "flex", gap: "10px" }}>
          <button onClick={handleStartStop} className="start-stop-button">
            {isRunning ? "Pause" : "Start"}
          </button>
          <button onClick={handleRecord} disabled={!isRunning} className="record-button">
            Record
          </button>
          <button onClick={handleReset} className="reset-button">Reset</button>
        </div>

        <h3>🏁 Recorded Times</h3>
        {records.map((r, i) => (
          <div key={i} className="recorded-times">{r}</div>
        ))}
      </div>
    </div>
  );
};

export default StopWatch;
