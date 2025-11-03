import { useState } from "react";
import json from "./data.json";
import "./accordian.css";
import { useNavigate } from "react-router-dom";

export default function Accordian() {
  const [data, setData] = useState(json.data);
  const [activeState, setActiveState] = useState(0);
  //console.log(data, "data");

  const activeAccordian = (index) => {
    setActiveState((prev) => (index === prev ? null : index));
  };
 
  return (
    <>
      <div className="App">
        <h1>Accordian</h1>

        <div className="accordian-class">
          {data.map((item, index) => (
            <div key={index} className="accordian-container">
              <div
                className="accordian-title"
                onClick={() => activeAccordian(index)}
              >
                <span>{item.title}</span>
                {activeState === index ? (
                  <span style={{ float: "right" }}>⬆️</span>
                ) : (
                  <span style={{ float: "right" }}>🔽</span>
                )}
              </div>

              {activeState === index && (
                <div className="accordian-subject">{item.subject}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
