import React from "react";

const InterestsTab = (props) => {
  const { personData, setPersonData, errorsList } = props;

  const handleChange = (hobbie) => {
    // console.log(e);

    setPersonData({
      ...personData,
      interests: personData.interests.map((item) =>
        item === hobbie ? { ...item, value: !item.value } : item
      ),
    });
  };
  return (
    <div>
      <div className="profile-header">Interests Tab</div>
      <div>
        {personData?.interests?.map((hobbie, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={hobbie.value}
              onChange={() => handleChange(hobbie)}
            />
            <label>{hobbie.name}</label>
          </div>
        ))}
      </div>
      {errorsList.interests && (
        <span
          style={{ width: "max-content", color: "red" }}
          className="error-message"
        >
          {errorsList.interests}
        </span>
      )}
    </div>
  );
};
export default InterestsTab;
