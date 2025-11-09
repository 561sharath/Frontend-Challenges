import React from "react";

const SettingsTab = (props) => {
  const { personData, setPersonData, errorsList } = props;

  const handleChange = (value) => {
    setPersonData({
      ...personData,
      theme: value,
    });
  };
  return (
    <div>
      <div className="profile-header">Settings Tab</div>
      <div>
        <div>
          <input
            type="checkbox"
            checked={personData.theme === "Light"}
            onChange={() => handleChange("Light")}
          />
          <label>Light</label>
        </div>
        <div>
          <input
            type="checkbox"
            checked={personData.theme === "Dark"}
            onChange={() => handleChange("Dark")}
          />
          <label>Dark</label>
        </div>
        {errorsList.theme && (
          <span
            style={{ width: "max-content", color: "red" }}
            className="error-message"
          >
            {errorsList.theme}
          </span>
        )}
      </div>
    </div>
  );
};
export default SettingsTab;
