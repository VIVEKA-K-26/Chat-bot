import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import verifyToken from "../middleware/verifyToken.js";
import Project from "../models/project.js";
dotenv.config();

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  const { projectId, message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const project = await Project.findOne({ _id: projectId, userId: req.user.id });
    if (!project) return res.status(404).json({ error: "Project not found" });

    const messages = [...(project.prompts || [])];
    messages.push({ role: "user", content: message });

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      { model: "openai/gpt-3.5-turbo", messages },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data?.choices?.[0]?.message?.content || "No reply from bot";

    // Append assistant reply to project
    project.prompts = [...messages, { role: "assistant", content: reply }];
    await project.save();

    res.json({ reply });
  } catch (err) {
    console.error("OpenRouter request failed:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to get response from bot" });
  }
});

export default router;
