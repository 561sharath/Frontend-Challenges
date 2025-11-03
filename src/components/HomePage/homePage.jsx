import React, { useState } from "react";
import "./homePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [projectsData, setProjectsData] = useState([
    {
      name: "Accordian",
      image:
        "https://cdn.dribbble.com/userupload/42250489/file/original-7fbfa5aad57c20692dc25fa829cb5316.gif",
      url: "/accordian",
    },
    {
      name: "ChessBoard",
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20240721135937/chess-(1).gif",
      url: "/chessboard",
    },
    {
      name: "Input Chips",
      image: "https://do6gp1uxl3luu.cloudfront.net/question-gif/chipsInput.gif",
      url: "/input-chips",
    },
    {
      name: "Pagination",
      image:
        "https://nordicapis.com/wp-content/uploads/Everything-You-Need-to-Know-About-API-Pagination-e1639671225295.png",
      url: "/pagination",
    },
    {
      name: "Infinate Scroll",
      image:
        "https://miro.medium.com/v2/resize:fit:960/1*_ZkmfQL5w92_to75uM1Hyg.gif",
      url: "/infinate-scroll",
    },
    {
      name: "Auto Complete Search",
      image:
        "https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Ftzxsbyk0y47e0kfgy26y.gif",
      url: "/auto-complete-search",
    },
    {
      name: "Transfer List",
      image:
        "https://jarirajari.wordpress.com/wp-content/uploads/2020/10/mui-transfer-list.png",
      url: "/transfer-list",
    },
    {
      name: "Progress Bar",
      image:
        "https://cdn.pixabay.com/animation/2023/01/01/02/50/02-50-36-737_512.gif",
      url: "/progress-bar",
    },
    {
      name: "Stop Watch",
      image: "https://miro.medium.com/1*cpD3T-0TChZXMlfpRFBBAQ.gif",
      url: "/stop-watch",
    },
  ]);

  return (
    <>
      <div className="project-container-home">
        {projectsData.map((project, index) => (
          <Link to={project.url} style={{ textDecoration: "none" }}>
            <div className="project-box-home" key={index}>
              <div className="project-image-home">
                <img src={project.image} alt={project.name} />
              </div>
              <div className="project-names-home">{project.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
export default HomePage;
