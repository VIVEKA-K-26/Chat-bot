import React, { useState, useEffect } from "react";
import axios from "axios";

function ProjectList({ token, setSelectedProject }) {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, [token]);

  const createProject = async () => {
    if (!name.trim()) return alert("Project name is required");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/projects",
        { name, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProjects([res.data, ...projects]);
      setSelectedProject(res.data);
      setName("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert("Failed to create project");
    }
  };

  return (
    <div className="project-list">
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={createProject}>Create Project</button>
      </div>

      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <span>{project.name}</span>
            <button onClick={() => setSelectedProject(project)}>Open Chat</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;
