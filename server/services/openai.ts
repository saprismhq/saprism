import OpenAI from "openai";
import type { AIAnalysisResult, CoachingSuggestionContent } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export class OpenAIService {
  async analyzeNotes(notesContent: string): Promise<AIAnalysisResult> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an expert sales coach analyzing meeting notes. Extract key insights and provide a structured analysis. 
            Respond with JSON in this exact format: {
              "dealStage": "string (discovery, qualification, proposal, negotiation, closing)",
              "painPoints": ["array of identified pain points"],
              "budget": "string (budget range or status)",
              "timeline": "string (decision timeline)",
              "keyStakeholders": ["array of stakeholders mentioned"],
              "sentiment": "number (1-5 scale, 5 being most positive)",
              "confidence": "number (0-1 scale for analysis confidence)"
            }`
          },
          {
            role: "user",
            content: `Analyze these meeting notes and provide structured insights:\n\n${notesContent}`
          }
        ],
        response_format: { type: "json_object" },
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      
      return {
        dealStage: result.dealStage || "discovery",
        painPoints: result.painPoints || [],
        budget: result.budget || "Not specified",
        timeline: result.timeline || "Not specified",
        keyStakeholders: result.keyStakeholders || [],
        sentiment: Math.max(1, Math.min(5, Math.round(result.sentiment || 3))),
        confidence: Math.max(0, Math.min(1, result.confidence || 0.5))
      };
    } catch (error) {
      throw new Error("Failed to analyze notes: " + error.message);
    }
  }

  async generateCoachingSuggestions(notesContent: string, dealStage: string): Promise<CoachingSuggestionContent> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an expert sales coach providing contextual coaching suggestions based on meeting notes and deal stage.
            Generate coaching suggestions in this JSON format: {
              "questions": ["array of 2-3 discovery questions"],
              "painMapping": [{"pain": "identified pain", "value": "corresponding value proposition"}],
              "framing": {"context": "situation description", "suggestion": "suggested language/approach"},
              "nextSteps": [{"step": "action item", "priority": 1-3, "description": "detailed description"}]
            }`
          },
          {
            role: "user",
            content: `Deal Stage: ${dealStage}\n\nMeeting Notes:\n${notesContent}\n\nProvide coaching suggestions for advancing this deal.`
          }
        ],
        response_format: { type: "json_object" },
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      
      return {
        questions: result.questions || [],
        painMapping: result.painMapping || [],
        framing: result.framing || { context: "", suggestion: "" },
        nextSteps: result.nextSteps || []
      };
    } catch (error) {
      throw new Error("Failed to generate coaching suggestions: " + error.message);
    }
  }

  async generateFollowUpQuestions(notesContent: string, painPoints: string[]): Promise<string[]> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a sales coach generating follow-up questions based on meeting notes and identified pain points.
            Generate 3-5 specific, actionable questions that would help uncover more details about the pain points and advance the sale.
            Respond with JSON: {"questions": ["array of questions"]}`
          },
          {
            role: "user",
            content: `Meeting Notes: ${notesContent}\n\nPain Points: ${painPoints.join(", ")}\n\nGenerate follow-up questions.`
          }
        ],
        response_format: { type: "json_object" },
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      return result.questions || [];
    } catch (error) {
      throw new Error("Failed to generate follow-up questions: " + error.message);
    }
  }
}

export const openaiService = new OpenAIService();
