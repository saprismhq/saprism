// OpenAI Provider Implementation - uses prompt template manager and configuration

import OpenAI from 'openai';
import { createReadStream } from 'fs';
import fs from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import type { 
  AIProvider, 
  AnalysisOptions, 
  CoachingOptions, 
  ChatOptions, 
  TranscriptionOptions,
  MethodologyInsightsResult
} from '../interfaces/AIProvider';
import { AIProviderError } from '../interfaces/AIProvider';
import type { AIAnalysisResult, CoachingSuggestionContent } from '../../../../shared/schema';
import type { ProviderConfig } from '../../../config/index';
import { promptTemplateManager } from '../templates/PromptTemplateManager';
import { getLogger } from '../../../utils/LoggerFactory';
import winston from 'winston';

export class OpenAIProvider implements AIProvider {
  private openai: OpenAI;
  private config: ProviderConfig;
  private logger: winston.Logger;

  constructor(config: ProviderConfig) {
    this.config = config;
    this.logger = getLogger('OpenAIProvider');
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR,
      timeout: config.timeouts.request
    });
  }

  private handleOpenAIError(error: any, operation: string): never {
    const errorMessage = error?.message || error?.toString() || 'Unknown error';
    throw new AIProviderError(errorMessage, 'openai', operation, error);
  }

  async analyzeNotes(content: string, options?: AnalysisOptions): Promise<AIAnalysisResult> {
    try {
      const promptConfig = promptTemplateManager.getPrompt(
        'analyzeNotes',
        'openai',
        { notesContent: content },
        this.config
      );

      const response = await this.openai.chat.completions.create({
        model: options?.model || promptConfig.model || this.config.model,
        messages: [
          {
            role: 'system',
            content: promptConfig.systemPrompt!
          },
          {
            role: 'user', 
            content: promptConfig.userPrompt!
          }
        ],
        response_format: { type: 'json_object' },
        temperature: options?.temperature || promptConfig.temperature,
        max_tokens: options?.maxTokens || promptConfig.maxTokens
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      
      return {
        dealStage: result.dealStage || 'discovery',
        painPoints: result.painPoints || [],
        budget: result.budget || 'Not specified',
        timeline: result.timeline || 'Not specified',
        keyStakeholders: result.keyStakeholders || [],
        sentiment: Math.max(1, Math.min(5, Math.round(result.sentiment || 3))),
        confidence: Math.max(0, Math.min(1, result.confidence || 0.5))
      };
    } catch (error) {
      this.handleOpenAIError(error, 'analyzeNotes');
    }
  }

  async generateCoachingSuggestions(
    content: string, 
    dealStage: string, 
    options?: CoachingOptions
  ): Promise<CoachingSuggestionContent> {
    try {
      // Use journey-aware template if context is available
      const templateId = options?.journeyContext ? 'generateCoachingJourney' : 'generateCoaching';
      const variables = options?.journeyContext 
        ? { notesContent: content, dealStage, journeyContext: options.journeyContext }
        : { notesContent: content, dealStage };

      const promptConfig = promptTemplateManager.getPrompt(
        templateId,
        'openai',
        variables,
        this.config
      );

      const response = await this.openai.chat.completions.create({
        model: options?.model || promptConfig.model || this.config.model,
        messages: [
          {
            role: 'system',
            content: promptConfig.systemPrompt!
          },
          {
            role: 'user',
            content: promptConfig.userPrompt!
          }
        ],
        response_format: { type: 'json_object' },
        temperature: options?.temperature || promptConfig.temperature,
        max_tokens: options?.maxTokens || promptConfig.maxTokens
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      
      return {
        questions: result.questions || [],
        painMapping: result.painMapping || [],
        framing: result.framing || { 
          context: '', 
          suggestion: '',
          valueProposition: '',
          differentiators: []
        },
        nextSteps: result.nextSteps || []
      };
    } catch (error) {
      this.handleOpenAIError(error, 'generateCoachingSuggestions');
    }
  }

  async generateChatResponse(message: string, options?: ChatOptions): Promise<string> {
    try {
      const isExtended = options?.isExtendedResponse || message.length > 200;
      const meetingContext = options?.meetingContext || '';
      
      // Use journey-aware template if context is available
      const templateId = options?.journeyContext ? 'generateChatJourney' : 'generateChat';
      const variables = options?.journeyContext 
        ? { 
            message, 
            meetingContext,
            journeyContext: options.journeyContext,
            isExtended: isExtended.toString() 
          }
        : { message, meetingContext, isExtended: isExtended.toString() };
      
      const promptConfig = promptTemplateManager.getPrompt(
        templateId,
        'openai',
        variables,
        this.config
      );

      const messages: any[] = [
        {
          role: 'system',
          content: promptConfig.systemPrompt!
        }
      ];

      // Add conversation history if provided
      if (options?.conversationHistory && options.conversationHistory.length > 0) {
        options.conversationHistory.forEach(msg => {
          messages.push({
            role: msg.role,
            content: msg.content
          });
        });
      }

      // Add current message
      messages.push({
        role: 'user',
        content: promptConfig.userPrompt!
      });

      const response = await this.openai.chat.completions.create({
        model: options?.model || promptConfig.model || this.config.model,
        messages,
        temperature: options?.temperature || promptConfig.temperature,
        max_tokens: options?.maxTokens || promptConfig.maxTokens || (isExtended ? 150 : 100)
      });

      let aiResponse = response.choices[0].message.content || "I apologize, but I couldn't generate a response. Please try again.";
      
      // Post-processing validation to enforce format
      aiResponse = this.enforceResponseFormat(aiResponse);
      
      return aiResponse;
    } catch (error) {
      this.handleOpenAIError(error, 'generateChatResponse');
    }
  }

  async generateMethodologyInsights(
    methodology: string,
    clientInfo: any,
    notesContent: string,
    meeting: any,
    options?: any
  ): Promise<MethodologyInsightsResult> {
    try {
      const response = await this.openai.chat.completions.create({
        model: options?.model || this.config.model,
        messages: [
          {
            role: 'system',
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
            role: 'user',
            content: `CLIENT CONTEXT:
            Name: ${clientInfo.name}
            Company: ${clientInfo.company}
            Deal Type: ${clientInfo.dealType || 'Not specified'}
            
            MEETING NOTES:
            ${notesContent || 'No notes available yet'}
            
            Generate ${methodology}-specific insights and recommendations for this client.`
          }
        ],
        response_format: { type: 'json_object' },
        temperature: options?.temperature || this.config.temperature.methodology,
        max_tokens: options?.maxTokens || this.config.maxTokens.methodology
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      return result;
    } catch (error) {
      this.handleOpenAIError(error, 'generateMethodologyInsights');
    }
  }

  async generateFollowUpQuestions(
    notesContent: string,
    painPoints: string[],
    options?: any
  ): Promise<string[]> {
    try {
      const response = await this.openai.chat.completions.create({
        model: options?.model || this.config.model,
        messages: [
          {
            role: 'system',
            content: `You are a sales coach generating follow-up questions based on meeting notes and identified pain points.
            Generate 3-5 specific, actionable questions that would help uncover more details about the pain points and advance the sale.
            Respond with JSON: {"questions": ["array of questions"]}`
          },
          {
            role: 'user',
            content: `Meeting Notes: ${notesContent}\n\nPain Points: ${painPoints.join(", ")}\n\nGenerate follow-up questions.`
          }
        ],
        response_format: { type: 'json_object' },
        temperature: options?.temperature || this.config.temperature.followUp,
        max_tokens: options?.maxTokens || this.config.maxTokens.followUp
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      return result.questions || [];
    } catch (error) {
      this.handleOpenAIError(error, 'generateFollowUpQuestions');
    }
  }

  async transcribeAudio(audioBuffer: Buffer, options?: TranscriptionOptions): Promise<string> {
    let tempFilePath: string | null = null;
    
    try {
      // Create temporary file
      tempFilePath = join(tmpdir(), `audio-${Date.now()}.webm`);
      await fs.writeFile(tempFilePath, audioBuffer);

      const transcription = await this.openai.audio.transcriptions.create({
        file: createReadStream(tempFilePath),
        model: 'whisper-1',
        language: options?.language || 'en',
        response_format: options?.responseFormat || 'text',
        temperature: options?.temperature || 0.2,
        prompt: options?.prompt || 'This is a business sales meeting conversation. Please transcribe clearly and accurately.'
      });

      return typeof transcription === 'string' ? transcription : transcription.text;
    } catch (error) {
      this.handleOpenAIError(error, 'transcribeAudio');
    } finally {
      // Clean up temp file
      if (tempFilePath) {
        try {
          await fs.unlink(tempFilePath);
        } catch (cleanupError) {
          this.logger.warn('Failed to clean up temp file', { 
            tempFilePath,
            error: cleanupError instanceof Error ? cleanupError.message : String(cleanupError),
            stack: cleanupError instanceof Error ? cleanupError.stack : undefined
          });
        }
      }
    }
  }

  async generateMeetingSummary(notesContent: string, dealStage: string, options?: AIOperationOptions): Promise<any> {
    try {
      const response = await this.openai.chat.completions.create({
        model: options?.model || this.config.model,
        messages: [
          {
            role: 'system',
            content: `You are an AI sales coach analyzing a meeting transcript. Generate a structured summary in JSON format that will be used for context in future meetings with this client.

Extract and organize information into this exact JSON structure:
{
  "pains": ["array of pain points and challenges identified"],
  "progress": ["array of progress made and positive developments"],
  "nextSteps": ["array of next steps and action items"],
  "keyInsights": ["array of key insights and important discoveries"],
  "dealStage": "${dealStage}"
}

Focus on actionable insights that will help in future meetings. Keep each item concise but informative (1-2 sentences max).`
          },
          {
            role: 'user',
            content: `Meeting Stage: ${dealStage}\nMeeting Content: ${notesContent}\n\nGenerate the structured summary.`
          }
        ],
        response_format: { type: 'json_object' },
        temperature: options?.temperature || 0.3,
        max_tokens: options?.maxTokens || 800
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      this.handleOpenAIError(error, 'generateMeetingSummary');
    }
  }

  // Format enforcement for chat responses (moved from original openai.ts)
  private enforceResponseFormat(response: string): string {
    try {
      const sections = response.split('**');
      let formattedResponse = '';
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        
        if (section.includes('Information to Gather')) {
          formattedResponse += '**Information to Gather**\n';
          const bullets = this.extractAndLimitBullets(response, 'Information to Gather');
          formattedResponse += bullets + '\n\n';
        } else if (section.includes('Example Questions')) {
          formattedResponse += '**Example Questions**\n';
          const bullets = this.extractAndLimitBullets(response, 'Example Questions');
          formattedResponse += bullets;
        }
      }
      
      return formattedResponse.trim() || response;
    } catch (error) {
      return response;
    }
  }

  private extractAndLimitBullets(text: string, sectionName: string): string {
    try {
      const sectionStart = text.indexOf(`**${sectionName}**`);
      if (sectionStart === -1) return '';
      
      const afterSection = text.substring(sectionStart + sectionName.length + 4);
      const nextSection = afterSection.indexOf('**');
      const sectionText = nextSection === -1 ? afterSection : afterSection.substring(0, nextSection);
      
      const bullets = sectionText.split('\n')
        .filter(line => line.trim().startsWith('•'))
        .slice(0, 2)
        .map(bullet => this.smartTruncateAtSentence(bullet));
      
      return bullets.join('\n');
    } catch (error) {
      return '';
    }
  }

  private smartTruncateAtSentence(text: string, maxLength: number = 120): string {
    if (!text || text.length <= maxLength) return text;
    
    const sentenceEndings = /[.!?]\s+|[.!?]$|\n/g;
    const matches = [...text.matchAll(sentenceEndings)];
    
    if (matches.length === 0) {
      return this.smartTruncateAtWord(text, maxLength);
    }
    
    for (let i = matches.length - 1; i >= 0; i--) {
      const endPos = matches[i].index! + matches[i][0].length;
      if (endPos <= maxLength) {
        return text.substring(0, endPos).trim();
      }
    }
    
    return this.smartTruncateAtWord(text, maxLength);
  }

  private smartTruncateAtWord(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastSpace > maxLength * 0.7) {
      return truncated.substring(0, lastSpace) + '...';
    }
    
    return truncated.trim() + '...';
  }
}