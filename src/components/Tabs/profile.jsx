import React from "react";

const ProfileTab = (props) => {
  const { personData, setPersonData, errorsList } = props;

  const handleChange = (value, keyName) => {
    setPersonData({ ...personData, [keyName]: value });
  };

  return (
    <div>
      <div className="profile-header">Profile Tab</div>
      <div className="input-divs">
        <label htmlFor="firstName">First Name : </label>
        <input
          id="firstName"
          type="text"
          value={personData.firstName}
          onChange={(e) => handleChange(e.target.value, "firstName")}
        />
        {errorsList.firstName && (
          <span
            style={{ width: "max-content", color: "red" }}
            className="error-message"
          >
            {errorsList.firstName}
          </span>
        )}
      </div>
      <div className="input-divs">
        <label htmlFor="firstName">Last Name : </label>
        <input
          id="firstName"
          type="text"
          value={personData.lastName}
          onChange={(e) => handleChange(e.target.value, "lastName")}
        />
      </div>
      <div className="input-divs">
        <label htmlFor="firstName">Age : </label>
        <input
          id="firstName"
          type="number"
          value={personData.age}
          onChange={(e) => handleChange(e.target.value, "age")}
        />
        {errorsList.age && (
          <span
            style={{ width: "max-content", color: "red" }}
            className="error-message"
          >
            {errorsList.age}
          </span>
        )}
      </div>
    </div>
  );
};
export default ProfileTab;
