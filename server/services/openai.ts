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
        temperature: 0.3, // Lower temperature for more consistent, faster responses
        max_tokens: 800,  // Limit tokens to speed up response
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
      throw new Error("Failed to analyze notes: " + (error as Error).message);
    }
  }

  async generateCoachingSuggestions(notesContent: string, dealStage: string): Promise<CoachingSuggestionContent> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an expert enterprise sales coach with deep knowledge of business value frameworks and ROI modeling. Generate comprehensive coaching suggestions that connect technical solutions to quantifiable business outcomes.

            For each pain point identified, provide a structured business value analysis. Focus on:
            - Quantifiable business impact (costs, time, risks)
            - Multi-layered value proposition (immediate, medium-term, strategic)
            - Stakeholder-specific benefits (executives, managers, end users)
            - Measurable success metrics with baselines and targets
            - Competitive differentiation and market positioning

            Generate coaching suggestions in this exact JSON format:
            {
              "questions": ["array of 2-3 strategic discovery questions that uncover business impact"],
              "painMapping": [{
                "pain": "identified pain point",
                "category": "operational|financial|strategic|compliance|competitive",
                "severity": 1-5,
                "businessImpact": {
                  "cost": "quantified cost impact (e.g., '$50K annually in lost productivity')",
                  "productivity": "productivity impact description",
                  "risk": "risk or opportunity cost description"
                },
                "technicalSolution": "specific technical capability that addresses this pain",
                "businessValue": {
                  "immediate": "0-3 month benefits with metrics",
                  "mediumTerm": "3-12 month benefits with metrics", 
                  "longTerm": "12+ month strategic value with metrics"
                },
                "metrics": {
                  "kpi": "key performance indicator affected",
                  "baseline": "current state measurement",
                  "target": "expected improvement percentage/amount",
                  "timeframe": "timeline to achieve target"
                },
                "stakeholderBenefit": {
                  "executives": "C-level impact and strategic value",
                  "managers": "management efficiency and operational benefits",
                  "endUsers": "day-to-day user experience improvements"
                },
                "competitiveAdvantage": "how this creates market advantage"
              }],
              "framing": {
                "context": "business situation analysis",
                "suggestion": "recommended messaging approach",
                "valueProposition": "core value proposition statement",
                "differentiators": ["array of key differentiating factors"]
              },
              "nextSteps": [{
                "step": "specific action item",
                "priority": 1-3,
                "description": "detailed implementation description",
                "businessJustification": "why this step drives business value",
                "expectedOutcome": "measurable expected result"
              }]
            }`
          },
          {
            role: "user",
            content: `Deal Stage: ${dealStage}\n\nMeeting Notes:\n${notesContent}\n\nProvide comprehensive coaching suggestions with detailed business value analysis for advancing this deal.`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.4, // Lower temperature for faster, more consistent responses
        max_tokens: 2000, // Limit tokens to improve response time
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      
      return {
        questions: result.questions || [],
        painMapping: result.painMapping || [],
        framing: result.framing || { 
          context: "", 
          suggestion: "",
          valueProposition: "",
          differentiators: []
        },
        nextSteps: result.nextSteps || []
      };
    } catch (error) {
      throw new Error("Failed to generate coaching suggestions: " + (error as Error).message);
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
        temperature: 0.3, // Lower temperature for consistent results
        max_tokens: 500,  // Shorter responses for faster generation
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      return result.questions || [];
    } catch (error) {
      throw new Error("Failed to generate follow-up questions: " + (error as Error).message);
    }
  }
}

export const openaiService = new OpenAIService();
