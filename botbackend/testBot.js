import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

async function testBot() {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "Hello, can you respond?" }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Bot reply:", response.data.choices[0].message.content);
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
}

testBot();
