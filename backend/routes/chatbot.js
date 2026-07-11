const express = require('express');
const dialogflow = require('@google-cloud/dialogflow');
const { randomUUID } = require('crypto');

const router = express.Router();

let sessionClient;
const privateKey = process.env.DIALOGFLOW_PRIVATE_KEY;
const clientEmail = process.env.DIALOGFLOW_CLIENT_EMAIL;

if (!privateKey || !clientEmail) {
  console.warn("Dialogflow keys missing");
  sessionClient = null;
} else {
  try {
  sessionClient = new dialogflow.SessionsClient({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey.replace(/\\n/g, '\n')
    }
  });
  } catch (err) {
    console.error("Failed to initialize Dialogflow client:", err.message);
    sessionClient = null; // server keeps running, chatbot route degrades gracefully
  }
}

router.post('/message', async (req, res) => {
  const { text, sessionId = randomUUID() } = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ success: false, message: "Message text is required" });
  }

  if (!sessionClient) {
    return res.json({
      success: true,
      reply: getFallbackReply(text),
      sessionId,
      fallback: true,
    });
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
        success: true,
        reply: response.queryResult.fulfillmentText || getFallbackReply(text),
        sessionId
    });
  } catch (error) {
    console.error("Dialogflow error:", error.message);
    res.json({ success: true, reply: getFallbackReply(text), sessionId, fallback: true });
  }
});

function getFallbackReply(message) {
  const text = message.toLowerCase();
  if (/(ticket|price|cost|book)/.test(text)) {
    return "You can start by choosing a museum in Plan Your Visit. Ticket availability and prices are shown during booking.";
  }
  if (/(time|hour|open|close|timing)/.test(text)) {
    return "Museum hours can vary by venue and exhibition. Please check the selected museum's visitor information before travelling.";
  }
  if (/(member|membership|discount)/.test(text)) {
    return "Membership costs ₹500 and includes exclusive benefits. Open the Membership page and choose Join Today to pay securely.";
  }
  if (/(hello|hi|hey)/.test(text)) {
    return "Hello! I can help with museum visits, tickets, timings, and membership.";
  }
  return "I can help with tickets, museum timings, and membership. What would you like to know?";
}

module.exports = router;
