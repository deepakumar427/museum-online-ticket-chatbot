const express = require('express');
const dialogflow = require('@google-cloud/dialogflow');
const { GoogleGenAI } = require('@google/genai');
const { randomUUID } = require('crypto');

const router = express.Router();
const geminiClient = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

let sessionClient;
const privateKey = process.env.DIALOGFLOW_PRIVATE_KEY;
const clientEmail = process.env.DIALOGFLOW_CLIENT_EMAIL;
const projectId = process.env.DIALOGFLOW_PROJECT_ID;

if (!privateKey || !clientEmail || !projectId) {
  console.warn("\x1b[31m[Dialogflow] Configuration missing: set DIALOGFLOW_PRIVATE_KEY, DIALOGFLOW_CLIENT_EMAIL, and DIALOGFLOW_PROJECT_ID. Chatbot fallback mode is active.\x1b[0m");
  sessionClient = null;
} else {
  try {
    const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');
    sessionClient = new dialogflow.SessionsClient({
      credentials: {
        client_email: clientEmail,
        private_key: formattedPrivateKey,
      },
    });
  } catch (err) {
    console.error("Failed to initialize Dialogflow client:", err.message);
    sessionClient = null; // server keeps running, chatbot route degrades gracefully
  }
}

router.post('/message', async (req, res) => {
  const { text, sessionId: requestedSessionId } = req.body;
  const sessionId = typeof requestedSessionId === 'string' && requestedSessionId.trim()
    ? requestedSessionId
    : randomUUID();
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
        projectId,
        sessionId
    );

    const [response] = await sessionClient.detectIntent({
      session: sessionPath,
      queryInput: { text: { text, languageCode: 'en-US' } },
    });
    const result = response.queryResult;

    if (result.intent?.displayName === 'Default Fallback Intent') {
      try {
        if (!geminiClient) {
          throw new Error('Gemini API key is missing');
        }

        const geminiResponse = await geminiClient.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: text,
          config: {
            systemInstruction: "You are the Tixplore Museum Guide, a helpful and concise AI customer service assistant for a museum ticket booking platform. Your responses must be conversational, warm, and highly relevant to museum visits, ticketing, and exhibitions. STRICT RULES: 1. Never generate long articles or essays. 2. Keep all responses under 3 short sentences. 3. Do not use heavy Markdown formatting (like headers or bolding) unless strictly necessary. 4. If asked a broad question, give a one-sentence summary and gently guide the user back to planning their Tixplore museum visit.",
            temperature: 0.4 // Lower temperature makes the output more focused and predictable
          }
        });

        return res.json({
          success: true,
          reply: geminiResponse.text,
          sessionId,
        });
      } catch (geminiError) {
        console.error('Gemini fallback error:', geminiError.message);
        return res.json({
          success: true,
          reply: 'Sorry, I am unable to help with that right now.',
          sessionId,
        });
      }
    }

    res.json({
        success: true,
        reply: result.fulfillmentText || getFallbackReply(text),
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
