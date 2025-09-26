import mongoose from "mongoose";

const PromptSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"], // include assistant
    required: true,
  },
  content: { type: String, required: true },
});

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  prompts: [PromptSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Project", ProjectSchema);
