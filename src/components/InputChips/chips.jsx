import { useState } from "react";
import "./chips.css";
import { useNavigate } from "react-router-dom";
export default function Chips() {
  const [text, setText] = useState("");
  const [chipsData, setChipsData] = useState([]);

  // console.log(text);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && text.trim().length > 0) {
      setChipsData((prev) => [...prev, text]);
      setText("");
    }
  };

  const deleteItem = (index) => {
    console.log(index);
    const newChipsData = [...chipsData];
    newChipsData.splice(index, 1);
    console.log(newChipsData, "chips");
    setChipsData(newChipsData);
  };

  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  // console.log(chipsData, "chips");

  return (
    <>
      <div className="back" onClick={goToHome}>
        🔙Back
      </div>
      <div className="App">
        <h1>Input Chips</h1>

        <div className="input-container">
          <input
            type="text"
            className="input-box"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            value={text}
            placeholder="Enter Text"
          />
        </div>
        <div className="chips-container">
          {chipsData.map((name, index) => (
            <div className="chips-data" key={index}>
              <div className="chips-text">
                {name}
                <span className="delete" onClick={() => deleteItem(index)}>
                  ❌
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
