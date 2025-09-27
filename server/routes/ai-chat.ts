import { Router } from "express";
import { isAuthenticated } from "../auth";
import { aiService } from "../services/ai/AIService";

const router = Router();

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
    console.error("AI chat error:", error);
    res.status(500).json({ error: "Failed to generate chat response" });
  }
});

export { router as aiChatRouter };