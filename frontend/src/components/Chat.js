import React, { useState, useEffect } from "react";
import axios from "axios";

function Chat({ token, selectedProject }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/projects/${selectedProject._id}/prompts`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessages(res.data || []);
      } catch (err) {
        console.error("Failed to load previous prompts", err);
      }
    };
    fetchPrompts();
  }, [selectedProject._id, token]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/chat",
        { projectId: selectedProject._id, message: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const botMessage = { role: "assistant", content: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
      setInput("");
    } catch (err) {
      console.error("Failed to get bot response", err);
      const errorMessage = { role: "assistant", content: "Bot failed to respond." };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.role === "user" ? "user-message" : "bot-message"}`}
          >
            <b>{msg.role === "user" ? "You" : "Bot"}:</b> {msg.content}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
