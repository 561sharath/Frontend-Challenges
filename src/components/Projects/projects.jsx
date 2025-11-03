import React, { useState } from "react";
import "./projects.css";
import { Outlet, useNavigate } from "react-router-dom";

const Projects = () => {
  const navigate = useNavigate();
  const homePage = () => {
    navigate("/");
  };
  return (
    <>
      <div className="home-page">
        <button className="home-button" onClick={homePage}>
          Home
        </button>
        <h1 className="fe-header">Frontend Challenges</h1>
      </div>
      <Outlet />
    </>
  );
};
export default Projects;
