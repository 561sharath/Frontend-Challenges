import React, { useEffect, useState } from "react";

const StopWatch = () => {
  const [timer, setTimer] = useState(0);
  const [stopWatch, setStopWatch] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

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
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

      const timePart = `${hours}:${minutes}:${seconds}.${milliseconds}`;
      setTimer(timePart);
    }, 1);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>Stop Watch Component</h1>
      <p>{timer}</p>
      <button onClick={() => setStopWatch((prev) => [...prev, timer])}>
        Record Time
      </button>
      <div>
        <h2>Recorded Time</h2>
        {stopWatch.map((time, index) => (
          <div key={index}>{time}</div>
        ))}
      </div>
    </div>
  );
};
export default StopWatch;
