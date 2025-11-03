import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./progressBar.css";
export default function ProgressBar() {
  const [progressData, setProgressData] = useState([]);
  const [textData, setTextData] = useState("");

  const enterData = (e) => {
    if (e.key === "Enter" && textData.trim().length > 0) {
      setProgressData((prev) => [
        ...prev,
        { id: Date.now(), name: textData.trim(), isTrue: false },
      ]);
      setTextData("");
    }
  };

  const onCorrectData = (item) => {
    const newData = progressData.map((data, index) =>
      item.id === data.id ? { ...data, isTrue: !data.isTrue } : data
    );
    setProgressData(newData);
  };

  let totalCount = progressData.length;
  let checkedData = progressData.filter((item) => item.isTrue === true);
  let totalCheckedData = checkedData.length;

  let totalProgress = totalCount > 0 ? totalCheckedData / totalCount : 0;

  return (
    <>
      <div className="App">
        <h1>Progress Bar</h1>

        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${totalProgress * 100}%` }}
          ></div>
        </div>
        <div className="input-text-conatiner">
          <input
            type="text"
            placeholder="Enter Text"
            className="input-box"
            onChange={(e) => setTextData(e.target.value)}
            onKeyDown={enterData}
            value={textData}
          />
        </div>
      </div>

      <div>
        {progressData.length > 0 && (
          <div>
            <h3 style={{textAlign: "center", fontSize: "1.5rem"}}>Pending Tasks</h3>
            <div className="data-container">
              {progressData.map((item, index) => (
                <div key={index} className="progress-data">
                  <input
                    type="checkbox"
                    id={item.id}
                    value={item.name}
                    name={item.name}
                    className="checkbox-css"
                    onChange={() => onCorrectData(item)}
                  />
                  <label htmlFor={item.id}>{item.name}</label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
