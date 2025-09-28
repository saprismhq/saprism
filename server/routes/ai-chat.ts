import { Router } from "express";
import { isAuthenticated } from "../auth";
import { aiService } from "../services/ai/AIService";
import { getLogger } from "../utils/LoggerFactory";
import winston from "winston";

const router = Router();
const logger = getLogger('AIChatRoute');

// AI Chat endpoint
router.post("/chat", isAuthenticated, async (req: any, res) => {
  try {
    const { message, meetingContext, conversationHistory } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    // Generate AI response based on message and context
    const response = await aiService.generateChatResponse(
      message,
      meetingContext || "",
      conversationHistory || []
    );

    res.json({ response });
  } catch (error) {
    logger.error('AI chat error', { 
      userId: req.user?.claims?.sub,
      message: req.body?.message ? 'provided' : 'missing',
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    res.status(500).json({ error: "Failed to generate chat response" });
  }
});

export { router as aiChatRouter };