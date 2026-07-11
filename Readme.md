Tixplore – Intelligent Museum Ticketing & Guide System

Tixplore is a modern full-stack web application designed to simplify museum ticket discovery, booking, and visitor engagement. It features an advanced Hybrid AI Chatbot Architecture that combines structured intent fulfillment via Dialogflow with an unstructured LLM fallback powered by Gemini.

🚀 Key Features

Interactive Chatbot Guide: Seamlessly switches engines. Handles structured intents (timings, ticket inquiries, membership benefits) using Google Dialogflow Essentials, and escalates out-of-scope inquiries dynamically to Google Gemini.

Robust Database Architecture: Secure storage for user profiles, ticket statuses, and active session histories utilizing MongoDB.

Fail-Safe Architecture: Implements defensive programming blocks inside backend routes ensuring that external API authentication bottlenecks or missing variables degrade gracefully instead of crashing the Node.js process.

Responsive UI: Optimized frontend layout providing intuitive access to memberships, specific museum agendas, and the persistent Tixplore Guide chat panel.

🛠️ Tech Stack

Frontend: React (Vite), Axios, CSS3 / Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

AI Integration: Google Dialogflow Essentials SDK, Google GenAI SDK (gemini-3.5-flash)

Deployment Platforms: Vercel (Frontend), Render (Backend)

📂 Project Structure

├── backend/
│   ├── config/             # DB and system initializers
│   ├── controllers/        # Core API business logic
│   ├── routes/
│   │   ├── chatbot.js      # Dialogflow & Gemini integration logic
│   │   └── ...             # Other authentication/payment endpoints
│   ├── models/             # Mongoose schemas (User, Ticket)
│   ├── index.js            # Main Express server entry point
│   └── .env.example        # Environment blueprint
└── frontend/
    ├── src/
    │   ├── assets/         # App UI imagery
    │   ├── components/     # Modals, Navbar, and persistent chat components
    │   └── ...


⚙️ Local Setup Instructions

Prerequisites

Node.js (v18+ recommended)

MongoDB Instance (Local or Atlas)

Google Cloud Platform Service Account Key (JSON format)

Google AI Studio API Key

Backend Setup

Navigate into the backend repository:

cd backend


Install dependencies:

npm install


Create a .env file in the root of the /backend folder:

PORT=4000
MONGO_URI=your_mongodb_connection_string

# Dialogflow Credentials
DIALOGFLOW_PROJECT_ID="tixplorebot-mjmp"
DIALOGFLOW_CLIENT_EMAIL="tixplorebot@tixplorebot-mjmp.iam.gserviceaccount.com"
DIALOGFLOW_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"

# Gemini API Credentials
GEMINI_API_KEY="AIzaSy..."


Start the local development server:

npm run dev


Frontend Setup

Open a separate terminal split and navigate to the frontend directory:

cd frontend


Install dependencies and start the Vite dev server:

npm install
npm run dev


Open http://localhost:5173 in your browser.

🤖 AI Logic Workflow

User Text Submission: The query is dispatched to the backend Express server /api/v1/chatbot/message.

Dialogflow Matching: The backend instantiates a SessionsClient and detects matching training phrases within Dialogflow Essentials intents.

Dynamic Fallback Mechanism: If Dialogflow reports a Default Fallback Intent or returns an unmapped signature, the router bypasses default responses and targets gemini-3.5-flash with optimized operational system instructions to return conversational, production-standard replies.
