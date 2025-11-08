import React, { useEffect, useRef, useState } from "react";
import "./otpGenerator.css";
const OTPGenerator = () => {
  const [inputOTP, setInputOTP] = useState(new Array(6).fill(""));
  const [generatedOTP, setGeneratedOTP] = useState("");
  const inputRef = useRef([]);

  const generateOTP = () => {
    const otpValue = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(otpValue);
    setInputOTP(new Array(6).fill(""));
  };

  useEffect(() => {
    generateOTP();
    inputRef.current[0]?.focus();
  }, []);

  const handleOTPValues = (e, index) => {
    const enteredValue = e.target.value.trim();

    if (isNaN(enteredValue)) {
      return; // Ignore non-numeric input
    }
    const newOtpValues = [...inputOTP];
    newOtpValues[index] = e.target.value.slice(-1); // Ensure only last character is taken
    setInputOTP(newOtpValues);
    // Move focus to next input box if a value is entered
    enteredValue && inputRef.current[index + 1]?.focus();
  };

  const changeInputFocus = (e, index) => {
    // console.log(e);
    if (e.key === "Backspace") {
      !e.target.value && inputRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="App">
      <div className="otp-title">OTP Generator And Validator</div>
      {generatedOTP && (
        <div className="generated-otp-display">
          Generated OTP: {generatedOTP}
        </div>
      )}
      <div>
        <button className="generate-otp-button" onClick={generateOTP}>
          Generate OTP
        </button>
      </div>
      <div className="otp-input-container">
        {inputOTP.map((input, index) => (
          <div key={index} className="otp-input-box">
            <input
              type="text"
              onChange={(e) => handleOTPValues(e, index)}
              value={inputOTP[index]}
              ref={(input) => (inputRef.current[index] = input)}
              onKeyDown={(e) => changeInputFocus(e, index)}
            />
          </div>
        ))}
      </div>
      {inputOTP.join("") === generatedOTP && (
        <div className="otp-validation-result">OTP Validated Successfully</div>
      )}
      {inputOTP.join("").length === 6 && inputOTP.join("") !== generatedOTP && (
        <div className="otp-validation-result-failure">
          Invalid OTP. Please try again.
        </div>
      )}
    </div>
  );
};
export default OTPGenerator;
