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

  async generateChatResponse(message: string, meetingContext: string, conversationHistory: any[]): Promise<string> {
    try {
      // Detect if this is from a section button (extended response allowed) vs general chat
      const isFromSectionButton = message.includes("Strategic Questions") || 
                                  message.includes("Strategic Question") ||
                                  message.includes("Pain-to-Value Mapping") || 
                                  message.includes("Strategic Framing & Positioning") || 
                                  message.includes("Next Steps") ||
                                  message.length > 200; // Assume longer initial messages are from sections

      const conciseInstruction = isFromSectionButton 
        ? "Provide comprehensive guidance for this specific section."
        : "Keep responses concise - maximum 3 sentences unless critical information requires more. Focus on key insights without filler text.";

      const messages = [
        {
          role: "system",
          content: `You are an expert sales coach and Growth Guide assistant. You help sales professionals with sales strategies, deal analysis, objection handling, value proposition development, and relationship building.
          
          ${conciseInstruction}
          
          Provide specific, actionable advice tied to the deal context when possible. Be conversational but professional.
          
          Meeting Context: ${meetingContext}`
        }
      ];

      // Add conversation history
      if (conversationHistory && conversationHistory.length > 0) {
        conversationHistory.forEach(msg => {
          messages.push({
            role: msg.role,
            content: msg.content
          });
        });
      }

      // Add current message
      messages.push({
        role: "user",
        content: message
      });

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: messages as any,
        temperature: 0.7,
        max_tokens: isFromSectionButton ? 800 : 300, // Shorter for general chat, longer for section responses
      });

      return response.choices[0].message.content || "I apologize, but I couldn't generate a response. Please try again.";
    } catch (error) {
      throw new Error("Failed to generate chat response: " + (error as Error).message);
    }
  }

  async generateMethodologyInsights(methodology: string, clientInfo: any, notesContent: string, meeting: any): Promise<any> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an expert sales coach specializing in ${methodology} methodology. Generate innovative, contextual insights and recommendations specifically for this client and meeting context.

            DO NOT provide generic battle cards or checklists. Instead, create personalized, AI-driven insights that combine:
            - The ${methodology} framework principles
            - This specific client's business context
            - Meeting notes and conversation insights
            - Strategic recommendations tailored to their situation

            Respond with JSON in this format:
            {
              "methodology": "${methodology}",
              "contextualInsights": [
                {
                  "insight": "Brief insight title",
                  "description": "Detailed contextual analysis",
                  "clientSpecific": "How this applies specifically to this client",
                  "actionableSteps": ["specific actions to take"],
                  "priority": "high|medium|low"
                }
              ],
              "strategicRecommendations": {
                "immediate": ["actions to take right away"],
                "nearTerm": ["actions for next 1-2 weeks"], 
                "longTerm": ["strategic positioning moves"]
              },
              "riskFactors": ["potential challenges or risks"],
              "successIndicators": ["what to watch for to measure progress"]
            }`
          },
          {
            role: "user",
            content: `CLIENT CONTEXT:
            Name: ${clientInfo.name}
            Company: ${clientInfo.company}
            Deal Type: ${clientInfo.dealType || 'Not specified'}
            
            MEETING NOTES:
            ${notesContent || 'No notes available yet'}
            
            Generate ${methodology}-specific insights and recommendations for this client.`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.4,
        max_tokens: 1500,
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      return result;
    } catch (error) {
      throw new Error("Failed to generate methodology insights: " + (error as Error).message);
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
