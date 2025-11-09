import React from "react";
import { useState } from "react";
import ProfileTab from "./profile";
import InterestsTab from "./interests";
import SettingsTab from "./settings";
import "./tabs.css";


const TabStructure = () => {
  const [personData, setPersonData] = useState({
    firstName: "Sharath",
    lastName: "Kumar",
    age: 24,
    interests: [
      {
        name: "Python",
        value: true,
      },
      {
        name: "Java Script",
        value: true,
      },
      {
        name: "ReactJS",
        value: true,
      },
    ],
    theme: "Dark",
  });

  const [tabsData, setTabsData] = useState([
    {
      name: "Profile",
      component: ProfileTab,
      validate: (personData) => {
        let errors = {};

        if (!personData.firstName || personData.firstName.trim().length < 2) {
          errors.firstName = "Please Enter a Valid Name";
        }
        if (!personData.age || personData.age < 10) {
          errors.age = "Please Enter a Valid Age";
        }

        return errors;
      },
    },
    {
      name: "Interests",
      component: InterestsTab,
      validate: (personData) => {
        let errors = {};
        const selectedHobbies = personData.interests.filter(
          (item) => item.value === true
        );

        if (selectedHobbies.length === 0) {
          errors.interests = "Please select atleast one Interest";
        }

        return errors;
      },
    },
    {
      name: "Settings",
      component: SettingsTab,
      validate: (personData) => {
        let errors = {};
        if (personData.theme === "") {
          errors.theme = "Please select atleast one Theme";
        }
        return errors;
      },
    },
  ]);
  const [errosList, setErrorList] = useState({});

  const [selectedIndex, setSelectedIndex] = useState(0);

  let SeletedTab = tabsData[selectedIndex].component;

  const handleTabsChange = (index) => {
    const currentTab = tabsData[selectedIndex];
    const validationErrors = currentTab.validate(personData);
    console.log(validationErrors, Object.keys(validationErrors));

    if (Object.keys(validationErrors).length > 0) {
      setErrorList(validationErrors);
      return;
    } else {
      setErrorList({});
      setSelectedIndex(index);
    }
  };

  const handleNextChange = () => {
    const currentTab = tabsData[selectedIndex];
    const validationErrors = currentTab.validate(personData);
    console.log(validationErrors, Object.keys(validationErrors));

    if (Object.keys(validationErrors).length > 0) {
      setErrorList(validationErrors);
      return;
    } else {
      setErrorList({});
      setSelectedIndex((prev) => prev + 1);
    }
  };

  const handlePrevChange = () => {
    setSelectedIndex((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log(personData);
  };
  return (
    <div className="App">
      <div className="file-header">File Structure</div>
      <div className="tabs-container">
        {tabsData.map((data, index) => (
          <div
            className={`tabs-names ${
              selectedIndex === index ? "active-tab" : ""
            }`}
            onClick={() => handleTabsChange(index)}
          >
            {data.name}
          </div>
        ))}
      </div>
      <div className="seletedTab-container">
        <SeletedTab
          personData={personData}
          setPersonData={setPersonData}
          errorsList={errosList}
        />
      </div>
      <div className="buttons-container">
        {selectedIndex > 0 && (
          <button className="buttons" onClick={() => handlePrevChange()}>
            Previous
          </button>
        )}
        {selectedIndex < tabsData.length - 1 && (
          <button className="buttons" onClick={() => handleNextChange()}>
            Next
          </button>
        )}
        {selectedIndex === tabsData.length - 1 && (
          <button className="buttons" onClick={() => handleSubmit()}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default TabStructure;
