import { useState } from "react";
import { Link } from "react-router-dom";
import "./projects.css";

export default function Projects() {
  const [projectsData, setProjectsData] = useState([
    "Accordian",
    "ChessBoard",
    "Input Chips",
    "Pagination",
    "Infinate Scroll",
    "Auto Complete Search",
    "Transfer List",
    "Progress Bar",
    "Stop Watch"
  ]);

  return (
    <div className="App">
      <h1>Practice Projects</h1>

      <div className="project-container">
        {projectsData.map((project, index) => (
          <Link
            to={`/${project.toLowerCase().replace(/\s/g, "-")}`}
            style={{ textDecoration: "none" }}
          >
            <div className="project-box" key={index}>
              <span className="project-names">{project}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
