const express = require('express');
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

const router = express.Router();

let sessionClient;
try {
  if (!process.env.DIALOGFLOW_PRIVATE_KEY || !process.env.DIALOGFLOW_CLIENT_EMAIL) {
    throw new Error("Missing Dialogflow credentials in environment variables");
  }
  sessionClient = new dialogflow.SessionsClient({
    credentials: {
      client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
      private_key: process.env.DIALOGFLOW_PRIVATE_KEY.replace(/\\n/g, '\n')
    }
  });
} catch (err) {
  console.error("Failed to initialize Dialogflow client:", err.message);
  sessionClient = null; // server keeps running, chatbot route degrades gracefully
}

router.post('/message', async (req, res) => {
  if (!sessionClient) {
    return res.status(503).json({ success: false, message: "Chatbot temporarily unavailable" });
  }

  const { text, sessionId = uuid.v4() } = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ success: false, message: "Message text is required" });
  }

  try {
    const sessionPath = sessionClient.projectAgentSessionPath(
        process.env.DIALOGFLOW_PROJECT_ID,
        sessionId
    );

    const [response] = await sessionClient.detectIntent({
      session: sessionPath,
      queryInput: { text: { text, languageCode: 'en-US' } },
    });

    res.json({
        reply: response.queryResult.fulfillmentText,
        sessionId
    });
  } catch (error) {
    console.error("Dialogflow error:", error.message);
    res.status(500).json({ success: false, message: "Chatbot error" });
  }
});

module.exports = router;