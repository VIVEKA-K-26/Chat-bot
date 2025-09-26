import React, { useEffect, useState } from "react";
import axios from "axios";

function ProjectDetails({ token, project, goBack }) {
  const [prompts, setPrompts] = useState([]);
  const [files, setFiles] = useState([]);
  const [newFile, setNewFile] = useState(null);

  // Fetch prompts & files
  useEffect(() => {
    axios.get(`http://localhost:5000/api/projects/${project._id}/prompts`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setPrompts(res.data))
      .catch(err => console.error(err));
    
    // Optional: fetch files from project object if sent from backend
    setFiles(project.files || []);
  }, [project, token]);

  const uploadFile = async () => {
    if (!newFile) return;
    const formData = new FormData();
    formData.append("file", newFile);

    try {
      const res = await axios.post(
        `http://localhost:5000/api/projects/${project._id}/files`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      setFiles([...files, res.data.file]);
      setNewFile(null);
    } catch (err) {
      console.error(err);
      alert("File upload failed");
    }
  };

  return (
    <div>
      <button onClick={goBack}>⬅ Back to Projects</button>
      <h2>Project: {project.name}</h2>

      <div style={{ margin: "10px 0" }}>
        <h3>Upload File</h3>
        <input type="file" onChange={(e) => setNewFile(e.target.files[0])} />
        <button onClick={uploadFile}>Upload</button>
      </div>

      <div style={{ margin: "10px 0" }}>
        <h3>Files</h3>
        <ul>
          {files.map((f, idx) => (
            <li key={idx}>{f.originalName || f.name}</li>
          ))}
        </ul>
      </div>

      <div style={{ margin: "10px 0" }}>
        <h3>Saved Prompts</h3>
        <ul>
          {prompts.map((p, idx) => (
            <li key={idx}>
              <strong>{p.role}:</strong> {p.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProjectDetails;
