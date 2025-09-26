import React, { useState, useEffect } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import ProjectList from "./components/ProjectList";
import Chat from "./components/Chat";
import axios from "axios";
import "./App.css";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    }
  }, []);

  const fetchUser = async (tok) => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${tok}` },
      });
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
      setToken("");
      localStorage.removeItem("token");
    }
  };

  if (!token) {
    return (
      <div className="auth-container">
        <h1>YourPerfect Bot</h1>
        <Login setToken={setToken} fetchUser={fetchUser} />
        <Register />
      </div>
    );
  }

  if (!selectedProject) {
    return (
      <div className="project-list">
        <h1>Welcome, {user?.name}</h1>
        <ProjectList token={token} setSelectedProject={setSelectedProject} />
      </div>
    );
  }

  return (
    <div className="chat-container">
      <button
        onClick={() => setSelectedProject(null)}
        style={{ marginBottom: "10px" }}
      >
        Back to Projects
      </button>
      <Chat token={token} selectedProject={selectedProject} />
    </div>
  );
}

export default App;
