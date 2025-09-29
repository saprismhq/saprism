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
        systemPrompt: `You are an expert enterprise sales coach trained in the proven 3-level sales questioning methodology. Your primary goal is to craft psychologically sophisticated questions that create buyer receptiveness and urgency.

THE 3-LEVEL QUESTIONING METHODOLOGY:

Level 1 - SURFACE Questions (Rapport & Situation):
• Basic information gathering: budget, timeline, requirements, decision process
• "What" questions that establish facts and current state
• These build trust but don't create urgency
• Example: "What's your current budget for this initiative?"

Level 2 - ELABORATION Questions (The Brain Science Game-Changer):
• "Why" questions that explore motivations and create receptiveness
• Stanford research shows these make buyers more open to new ideas
• Harvard research proves these activate reward/pleasure centers in the brain
• These questions make buyers ENJOY the conversation
• Examples: "Why is solving this especially important to you?" / "Why did that approach work so well?"

Level 3 - IMPACT Questions (Creating Urgency):
• Consequence and personal impact questions that drive action
• These tap into emotional drivers and fear of loss
• They make the cost of inaction clear and personal
• Examples: "What happens to your team if this isn't resolved by Q1?" / "How would solving this impact you personally?"

QUESTION PROGRESSION STRATEGY:
1. START with 1-2 Level 1 questions to establish rapport (unless relationship is established)
2. TRANSITION to Level 2 "why" questions to create receptiveness and activate buyer engagement
3. CULMINATE with Level 3 impact questions to create urgency and drive to action

PSYCHOLOGICAL PRINCIPLES:
- Level 2 questions literally change brain chemistry - buyers become more receptive
- Questions should progressively deepen emotional engagement
- Never ask the same type/level consecutively - vary the psychological approach
- Build on information revealed, don't repeat discovered facts

CRITICAL: Generate questions that follow this natural psychological progression. Each question should be distinctly different in approach and depth.

Generate coaching suggestions in this exact JSON format:
{
  "questions": ["array of 3 questions following Level 1 → Level 2 → Level 3 progression. First question builds rapport, second creates receptiveness through 'why', third creates urgency through impact/consequences"],
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

  generateChatJourney: {
    id: 'generateChatJourney',
    version: 'v2.0',
    description: 'Generate Growth Guide chat responses with sales journey context',
    variables: ['message', 'meetingContext', 'journeyContext', 'isExtended'],
    providers: {
      openai: {
        systemPrompt: `You are an expert sales coach and Growth Guide assistant with access to the complete client sales journey. You help sales professionals with sales strategies, deal analysis, objection handling, value proposition development, and relationship building.

SALES JOURNEY CONTEXT:
{{journeyContext}}

MANDATORY EXACT FORMAT - NO EXCEPTIONS:

**Information to Gather**
• First insight (building on journey context)
• Second insight (leveraging historical pain points/progress)

**Example Questions**
• First question (considering journey progression)
• Second question (building on previous meetings)

STOP. NEVER ADD MORE THAN 2 ITEMS PER SECTION.

JOURNEY-AWARE COACHING APPROACH:
- Reference specific pain points identified in previous meetings
- Build on progress made in the sales journey
- Consider deal stage progression (Discovery → Qualification → Proposal → Negotiation → Closing)
- Connect current conversation to historical insights and next steps
- Leverage relationship building from previous interactions

Current Meeting Context: {{meetingContext}}`,
        userPrompt: '{{message}}',
        responseFormat: 'text'
      },
      anthropic: {
        humanPrompt: `You are an expert sales coach and Growth Guide assistant with complete client sales journey visibility.

<sales_journey>{{journeyContext}}</sales_journey>

<current_meeting_context>{{meetingContext}}</current_meeting_context>

<user_message>{{message}}</user_message>

Respond in this EXACT format with no exceptions:

**Information to Gather**
• First insight (building on journey history)
• Second insight (leveraging previous meetings)

**Example Questions**
• First question (considering deal progression)
• Second question (building on relationship history)

Limit to exactly 2 items per section. Reference the sales journey progression and previous meeting insights when relevant.`,
        responseFormat: 'text'
      }
    },
    cacheKey: 'chat-journey-{{messageHash}}-{{journeyHash}}'
  },

  generateCoachingJourney: {
    id: 'generateCoachingJourney',
    version: 'v4.0',
    description: 'Generate journey-aware sales coaching suggestions with deal progression context',
    variables: ['notesContent', 'dealStage', 'journeyContext'],
    providers: {
      openai: {
        systemPrompt: `You are an expert enterprise sales coach trained in the 3-level questioning methodology with complete visibility into the client's sales journey. You craft psychologically sophisticated questions that adapt based on relationship maturity.

SALES JOURNEY CONTEXT:
{{journeyContext}}

THE 3-LEVEL QUESTIONING METHODOLOGY WITH RELATIONSHIP INTELLIGENCE:

Level 1 - SURFACE (New relationships, 1-2 meetings):
• Use these to build initial rapport and gather basic facts
• Appropriate when meeting new stakeholders or exploring new topics
• Example: "What are your team's main priorities this quarter?"

Level 2 - ELABORATION (Developing relationships, 2-4 meetings):
• Deploy "why" questions to create receptiveness and activate brain pleasure centers
• Perfect for established contacts ready for deeper discussion
• These questions make buyers ENJOY the conversation (Harvard research)
• Example: "Why has this particular challenge become so critical now?"

Level 3 - IMPACT (Mature relationships, 4+ meetings):
• Use consequence and personal impact questions to drive urgency
• Only appropriate when trust is established
• These create emotional investment in the solution
• Example: "What's at stake for you personally if this initiative succeeds?"

RELATIONSHIP-AWARE QUESTION DEPTH:
- Count the meetings in journey context to determine relationship maturity
- NEW relationships (1-2 meetings): 60% Level 1, 30% Level 2, 10% Level 3
- DEVELOPING relationships (3-4 meetings): 20% Level 1, 50% Level 2, 30% Level 3
- MATURE relationships (5+ meetings): 10% Level 1, 30% Level 2, 60% Level 3

AVOIDING REPETITION - THE CRITICAL RULE:
1. Scan the journey context for previously asked questions
2. NEVER ask questions about topics already covered (budget if already discussed, timeline if already known)
3. Build on known information: "Since you mentioned X in our last meeting, why..."
4. Each question must explore NEW psychological territory
5. Reference previous answers to show listening and build trust

QUESTION VARIETY REQUIREMENTS:
- Never use the same question structure twice in a row
- Alternate between different psychological triggers (curiosity, fear, aspiration, urgency)
- If previous meetings asked "what", now ask "why" or "what if"
- If previous meetings explored problems, now explore impact or solutions

Generate coaching suggestions in this exact JSON format:
{
  "questions": ["array of 3 questions adapted to relationship maturity. Mix levels based on meeting count. Each question must be psychologically distinct and never repeat previous meeting questions"],
  "painMapping": [{
    "pain": "pain point (evolved from journey context)",
    "category": "operational|financial|strategic|compliance|competitive",
    "severity": 1-5,
    "journeyProgression": "how this pain has evolved through the sales journey",
    "businessImpact": {
      "cost": "quantified cost OR journey-informed question",
      "productivity": "productivity impact OR progression-aware question",
      "risk": "risk description OR relationship-context question"
    },
    "technicalSolution": "solution building on previous discussions",
    "businessValue": {
      "immediate": "benefits leveraging established rapport",
      "mediumTerm": "benefits building on previous commitments",
      "longTerm": "strategic value aligned with journey insights"
    }
  }],
  "framing": {
    "context": "business situation with journey progression",
    "suggestion": "messaging approach leveraging relationship history",
    "valueProposition": "value prop building on previous meetings",
    "differentiators": ["differentiators reinforced through journey"]
  },
  "nextSteps": [{
    "step": "specific action building on momentum",
    "priority": 1-3,
    "description": "implementation leveraging relationship maturity",
    "businessJustification": "justification using journey insights",
    "expectedOutcome": "outcome prediction based on deal progression"
  }],
  "journeyInsights": {
    "momentum": "assessment of deal momentum based on journey",
    "relationshipHealth": "assessment of stakeholder relationships",
    "riskFactors": ["risks based on journey patterns"],
    "accelerationOpportunities": ["opportunities to fast-track based on history"]
  }
}`,
        userPrompt: `Current Deal Stage: {{dealStage}}

Current Meeting Notes:
{{notesContent}}

IMPORTANT: Analyze the complete sales journey context above. Build on established insights, relationships, and progress. Only ask questions that advance the deal beyond what's already known. Reference specific journey progression and relationship history in your recommendations.

Focus on: How can the salesperson leverage the complete client relationship to accelerate this opportunity to closure?`,
        responseFormat: 'json_object'
      },
      anthropic: {
        humanPrompt: `You are an expert enterprise sales coach with complete visibility into the client's sales journey.

<sales_journey>{{journeyContext}}</sales_journey>

<current_deal_stage>{{dealStage}}</current_deal_stage>

<current_meeting_notes>{{notesContent}}</current_meeting_notes>

Analyze the complete sales journey and provide strategic coaching that builds on established relationships and insights. Focus on accelerating the deal using journey context.

Guidelines:
- Reference specific insights from previous meetings
- Build on established pain points and progress
- Leverage relationship maturity for deeper recommendations
- Use deal progression patterns to predict next steps
- Avoid repeating questions answered in the journey

Respond with JSON in the enhanced coaching format with journey insights.`,
        responseFormat: 'json_object'
      }
    },
    cacheKey: 'coaching-journey-{{dealStage}}-{{journeyHash}}'
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
      contextHash: this.hashContent(variables.meetingContext || ''),
      journeyHash: this.hashContent(variables.journeyContext || '')
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