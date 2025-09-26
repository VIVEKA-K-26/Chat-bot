import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    sender: { type: String, enum: ["user", "bot"], required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
