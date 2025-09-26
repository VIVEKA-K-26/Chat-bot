# YourPerfect Bot

A web-based AI chatbot platform that allows users to create projects and chat with a GPT-powered assistant. Built with React, Node.js, Express, MongoDB, and OpenRouter GPT-3.5.

---

## Features

- User registration and login
- Project creation and selection
- Dynamic chat interface with AI responses
- Conversation history stored per project
- Secure authentication with JWT

---

## Prerequisites

- Node.js (v16 or above)
- npm
- MongoDB Atlas account (or local MongoDB instance)
- OpenRouter API key

---

## Project Structure

### Backend (`botbackend/`)

- `models/` – Mongoose schemas for users, projects, and prompts
- `routes/` – API routes (auth, projects, chat)
- `middleware/` – JWT authentication
- `index.js` – Backend entry point

### Frontend (`botfrontend/`)

- `src/components/` – React components (Login, Register, ProjectList, Chat)
- `App.js` – Main app component
- `App.css` – Styling for the app

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
cd <REPO_NAME>

### 2.Backend setup

cd botbackend
npm install

Create a .env file inside botbackend/:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENROUTER_API_KEY=your_openrouter_api_key
PORT=5000

Note: Replace placeholders with your own MongoDB connection string, JWT secret, and OpenRouter API key.

Start the backend server:

node index.js

cd ../botfrontend
npm install
npm start
