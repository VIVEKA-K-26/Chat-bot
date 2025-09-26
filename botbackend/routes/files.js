import express from "express";
import multer from "multer";
import verifyToken from "../middleware/verifyToken.js";
import Project from "../models/project.js";
import fs from "fs";
import FormData from "form-data";
import axios from "axios";

const router = express.Router();

// Setup multer for local file uploads
const upload = multer({ dest: "uploads/" });

// Upload file to project & OpenAI
router.post("/:projectId", verifyToken, upload.single("file"), async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findOne({ _id: projectId, userId: req.user.id });
    if (!project) return res.status(404).json({ error: "Project not found" });

    if (!req.file) return res.status(400).json({ error: "File is required" });

    // Upload file to OpenAI
    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path));
    formData.append("purpose", "fine-tune"); // or "answers" depending on use case

    const response = await axios.post("https://api.openai.com/v1/files", formData, {
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        ...formData.getHeaders()
      }
    });

    // Save file info in project
    project.files.push({
      filename: req.file.filename,
      originalName: req.file.originalname,
      openAIFileId: response.data.id
    });
    await project.save();

    // Delete temp file
    fs.unlinkSync(req.file.path);

    res.json({ message: "File uploaded successfully", file: response.data });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

export default router;
