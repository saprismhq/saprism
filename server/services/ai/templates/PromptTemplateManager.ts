// Prompt Template Manager - centralized prompt management with provider optimization

import type { ProviderConfig } from '../../../config';

// Template variable substitution
export interface TemplateVariables {
  [key: string]: any;
}

// Provider-specific prompt configuration
export interface ProviderPromptConfig {
  systemPrompt?: string;
  userPrompt?: string;
  humanPrompt?: string;  // For Anthropic
  assistantPrompt?: string;  // For Anthropic
  temperature?: number;
  maxTokens?: number;
  responseFormat?: 'json_object' | 'text';
  model?: string;
}

// Template metadata
export interface PromptTemplate {
  id: string;
  version: string;
  description: string;
  variables: string[];
  providers: {
    openai: ProviderPromptConfig;
    anthropic: ProviderPromptConfig;
    [key: string]: ProviderPromptConfig;
  };
  cacheKey?: string;
}

// Template definitions
const PROMPT_TEMPLATES: Record<string, PromptTemplate> = {
  analyzeNotes: {
    id: 'analyzeNotes',
    version: 'v2.1',
    description: 'Analyze meeting notes and extract structured sales insights',
    variables: ['notesContent'],
    providers: {
      openai: {
        systemPrompt: `You are an expert sales coach analyzing meeting notes. Extract key insights and provide a structured analysis. 
        Respond with JSON in this exact format: {
          "dealStage": "string (discovery, qualification, proposal, negotiation, closing)",
          "painPoints": ["array of identified pain points"],
          "budget": "string (budget range or status)",
          "timeline": "string (decision timeline)",
          "keyStakeholders": ["array of stakeholders mentioned"],
          "sentiment": "number (1-5 scale, 5 being most positive)",
          "confidence": "number (0-1 scale for analysis confidence)"
        }`,
        userPrompt: 'Analyze these meeting notes and provide structured insights:\n\n{{notesContent}}',
        responseFormat: 'json_object'
      },
      anthropic: {
        humanPrompt: `You are an expert sales coach analyzing meeting notes. Extract key insights and provide a structured analysis.

<notes>
{{notesContent}}
</notes>

Please analyze these meeting notes and respond with JSON in this exact format:
{
  "dealStage": "string (discovery, qualification, proposal, negotiation, closing)",
  "painPoints": ["array of identified pain points"],
  "budget": "string (budget range or status)",
  "timeline": "string (decision timeline)",
  "keyStakeholders": ["array of stakeholders mentioned"],
  "sentiment": "number (1-5 scale, 5 being most positive)",
  "confidence": "number (0-1 scale for analysis confidence)"
}`,
        responseFormat: 'json_object'
      }
    },
    cacheKey: 'analysis-{{contentHash}}'
  },

  generateCoaching: {
    id: 'generateCoaching',
    version: 'v3.0',
    description: 'Generate sales coaching suggestions based on notes and deal stage',
    variables: ['notesContent', 'dealStage'],
    providers: {
      openai: {
        systemPrompt: `You are an expert enterprise sales coach focused on advancing deals to closure. Your primary goal is to determine the best path forward for completing the sale based on available information.

COACHING STRATEGY: Analyze the current deal state and work progressively toward actionable recommendations:

1. ASSESS READINESS: First determine if you have enough information to recommend specific next steps for advancing the sale
2. STRATEGIC QUESTIONING: If information is missing, ask targeted follow-up questions that build toward closure-focused recommendations
3. PROGRESSIVE APPROACH: Each question should bring you closer to understanding how to advance this specific deal
4. GOAL-ORIENTED: Focus on questions that lead to concrete actions the salesperson can take to move the deal forward

CRITICAL: DO NOT HALLUCINATE OR INVENT DATA. When specific business metrics, costs, or technical details are not available, provide strategic questions that help determine the best path to close.

Generate coaching suggestions in this exact JSON format:
{
  "questions": ["array of 2-3 strategic discovery questions that uncover business impact"],
  "painMapping": [{
    "pain": "identified pain point",
    "category": "operational|financial|strategic|compliance|competitive",
    "severity": 1-5,
    "businessImpact": {
      "cost": "quantified cost OR 'Ask: [specific question to uncover cost impact]'",
      "productivity": "productivity impact OR 'Ask: [specific question about productivity impact]'",
      "risk": "risk description OR 'Ask: [specific question about business risks]'"
    },
    "technicalSolution": "specific solution OR 'Ask: [question to identify technical requirements]'",
    "businessValue": {
      "immediate": "benefits with metrics OR 'Ask: [question about short-term value expectations]'",
      "mediumTerm": "benefits with metrics OR 'Ask: [question about medium-term ROI goals]'",
      "longTerm": "strategic value OR 'Ask: [question about long-term strategic objectives]'"
    }
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
}`,
        userPrompt: `Deal Stage: {{dealStage}}

Meeting Notes:
{{notesContent}}

IMPORTANT: Carefully read and understand ALL content in the notes. Extract answered questions before generating new ones. If you find answered questions in the notes, use those answers directly in your analysis. Only generate "Ask:" questions for information that is genuinely missing.

Focus on: What does the salesperson need to do next to advance this opportunity and ultimately close the sale?`,
        responseFormat: 'json_object'
      },
      anthropic: {
        humanPrompt: `You are an expert enterprise sales coach focused on advancing deals to closure.

<deal_stage>{{dealStage}}</deal_stage>

<meeting_notes>
{{notesContent}}
</meeting_notes>

Analyze the current deal state and provide strategic coaching suggestions. Focus on actionable recommendations that advance the sale toward closure.

Guidelines:
- Extract information already provided in the notes
- Only ask for missing information that's critical for deal advancement
- Provide concrete next steps when sufficient information is available
- Use "Ask: [question]" format only when data is genuinely missing

Respond with JSON in the exact format specified for coaching suggestions.`,
        responseFormat: 'json_object'
      }
    },
    cacheKey: 'coaching-{{dealStage}}-{{contentHash}}'
  },

  generateChat: {
    id: 'generateChat',
    version: 'v1.5',
    description: 'Generate Growth Guide chat responses with structured format',
    variables: ['message', 'meetingContext', 'isExtended'],
    providers: {
      openai: {
        systemPrompt: `You are an expert sales coach and Growth Guide assistant. You help sales professionals with sales strategies, deal analysis, objection handling, value proposition development, and relationship building.

MANDATORY EXACT FORMAT - NO EXCEPTIONS:

**Information to Gather**
• First insight
• Second insight

**Example Questions**
• First question
• Second question

STOP. NEVER ADD MORE THAN 2 ITEMS PER SECTION.

Provide specific, actionable advice tied to the deal context when possible. Be professional and direct.

Meeting Context: {{meetingContext}}`,
        userPrompt: '{{message}}',
        responseFormat: 'text'
      },
      anthropic: {
        humanPrompt: `You are an expert sales coach and Growth Guide assistant.

<meeting_context>{{meetingContext}}</meeting_context>

<user_message>{{message}}</user_message>

Respond in this EXACT format with no exceptions:

**Information to Gather**
• First insight
• Second insight

**Example Questions**
• First question  
• Second question

Limit to exactly 2 items per section. Provide specific, actionable advice.`,
        responseFormat: 'text'
      }
    },
    cacheKey: 'chat-{{messageHash}}-{{contextHash}}'
  }
};

export class PromptTemplateManager {
  private templates: Record<string, PromptTemplate>;
  
  constructor() {
    this.templates = PROMPT_TEMPLATES;
  }

  /**
   * Get a compiled prompt for a specific template and provider
   */
  getPrompt(
    templateId: string, 
    provider: string, 
    variables: TemplateVariables,
    config: ProviderConfig
  ): ProviderPromptConfig {
    const template = this.templates[templateId];
    if (!template) {
      throw new Error(`Template not found: ${templateId}`);
    }

    const providerConfig = template.providers[provider];
    if (!providerConfig) {
      throw new Error(`Provider ${provider} not supported for template ${templateId}`);
    }

    // Compile the prompt with variables
    const compiledConfig: ProviderPromptConfig = {
      ...providerConfig,
      temperature: providerConfig.temperature ?? config.temperature[templateId as keyof typeof config.temperature],
      maxTokens: providerConfig.maxTokens ?? config.maxTokens[templateId as keyof typeof config.maxTokens],
      model: providerConfig.model ?? config.model
    };

    // Substitute variables in prompts
    if (compiledConfig.systemPrompt) {
      compiledConfig.systemPrompt = this.substituteVariables(compiledConfig.systemPrompt, variables);
    }
    if (compiledConfig.userPrompt) {
      compiledConfig.userPrompt = this.substituteVariables(compiledConfig.userPrompt, variables);
    }
    if (compiledConfig.humanPrompt) {
      compiledConfig.humanPrompt = this.substituteVariables(compiledConfig.humanPrompt, variables);
    }
    if (compiledConfig.assistantPrompt) {
      compiledConfig.assistantPrompt = this.substituteVariables(compiledConfig.assistantPrompt, variables);
    }

    return compiledConfig;
  }

  /**
   * Generate cache key for a template with variables
   */
  generateCacheKey(templateId: string, variables: TemplateVariables): string {
    const template = this.templates[templateId];
    if (!template?.cacheKey) {
      return `${templateId}-${this.hashVariables(variables)}`;
    }

    return this.substituteVariables(template.cacheKey, {
      ...variables,
      contentHash: this.hashContent(variables.notesContent || variables.message || ''),
      messageHash: this.hashContent(variables.message || ''),
      contextHash: this.hashContent(variables.meetingContext || '')
    });
  }

  /**
   * Substitute template variables in a string
   */
  private substituteVariables(template: string, variables: TemplateVariables): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return variables[key] ?? match;
    });
  }

  /**
   * Generate hash for content-based caching
   */
  private hashContent(content: string): string {
    // Simple hash function for content
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Generate hash for all variables
   */
  private hashVariables(variables: TemplateVariables): string {
    const sortedKeys = Object.keys(variables).sort();
    const keyValuePairs = sortedKeys.map(key => `${key}:${variables[key]}`);
    return this.hashContent(keyValuePairs.join('|'));
  }

  /**
   * Get all available templates
   */
  getAvailableTemplates(): string[] {
    return Object.keys(this.templates);
  }

  /**
   * Get template metadata
   */
  getTemplateMetadata(templateId: string): Omit<PromptTemplate, 'providers'> {
    const template = this.templates[templateId];
    if (!template) {
      throw new Error(`Template not found: ${templateId}`);
    }

    const { providers, ...metadata } = template;
    return metadata;
  }
}

// Export singleton instance
export const promptTemplateManager = new PromptTemplateManager();