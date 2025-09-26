import express from "express";
import Project from "../models/project.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// Create project
router.post("/", verifyToken, async (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ error: "Project name is required" });

  try {
    const project = new Project({
      name,
      description: description || "",
      userId: req.user.id, // attach userId from token
      prompts: [],        // initialize prompts array
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error("Project creation error:", err);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// Get all projects
router.get("/", verifyToken, async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error("Fetch projects error:", err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

export default router;
