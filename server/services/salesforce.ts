import jsforce from "jsforce";

type JSForceConnection = any;

export class SalesforceService {
  private conn: JSForceConnection;

  constructor() {
    this.conn = new jsforce.Connection({
      instanceUrl: process.env.SALESFORCE_INSTANCE_URL || process.env.SF_INSTANCE_URL || "https://login.salesforce.com",
      accessToken: process.env.SALESFORCE_ACCESS_TOKEN || process.env.SF_ACCESS_TOKEN,
      refreshToken: process.env.SALESFORCE_REFRESH_TOKEN || process.env.SF_REFRESH_TOKEN,
      oauth2: {
        clientId: process.env.SALESFORCE_CLIENT_ID || process.env.SF_CLIENT_ID,
        clientSecret: process.env.SALESFORCE_CLIENT_SECRET || process.env.SF_CLIENT_SECRET
      }
    });
  }

  async authenticate(): Promise<void> {
    try {
      if (this.conn.accessToken) {
        // Test the connection
        await this.conn.identity();
        return;
      }

      const username = process.env.SALESFORCE_USERNAME || process.env.SF_USERNAME;
      const password = process.env.SALESFORCE_PASSWORD || process.env.SF_PASSWORD;
      const securityToken = process.env.SALESFORCE_SECURITY_TOKEN || process.env.SF_SECURITY_TOKEN;

      if (!username || !password) {
        throw new Error("Salesforce credentials not configured");
      }

      await this.conn.login(username, password + (securityToken || ""));
    } catch (error) {
      throw new Error("Failed to authenticate with Salesforce: " + (error as Error).message);
    }
  }

  async syncMeetingNotes(meetingData: {
    accountName: string;
    contactName: string;
    subject: string;
    description: string;
    painPoints: string[];
    budget: string;
    timeline: string;
    nextSteps: string[];
  }): Promise<{ success: boolean; recordId?: string; error?: string }> {
    try {
      await this.authenticate();

      // Create or update Activity record
      const activityData = {
        Subject: meetingData.subject,
        Description: this.formatDescription(meetingData),
        ActivityDate: new Date().toISOString().split('T')[0],
        Status: "Completed",
        Type: "Meeting",
        // Add custom fields if they exist in your Salesforce org
        Pain_Points__c: meetingData.painPoints.join("; "),
        Budget_Range__c: meetingData.budget,
        Decision_Timeline__c: meetingData.timeline,
        Next_Steps__c: meetingData.nextSteps.join("; "),
      };

      const result = await this.conn.sobject("Task").create(activityData);

      if (result.success) {
        return { success: true, recordId: result.id };
      } else {
        return { success: false, error: "Failed to create Salesforce record" };
      }
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async createOpportunity(opportunityData: {
    name: string;
    accountName: string;
    stage: string;
    amount?: number;
    closeDate: string;
    description: string;
  }): Promise<{ success: boolean; recordId?: string; error?: string }> {
    try {
      await this.authenticate();

      // Find or create Account
      let accountId: string;
      const existingAccount = await this.conn.sobject("Account").find({
        Name: opportunityData.accountName
      });

      if (existingAccount.length > 0) {
        accountId = existingAccount[0].Id;
      } else {
        const newAccount = await this.conn.sobject("Account").create({
          Name: opportunityData.accountName
        });
        accountId = newAccount.id;
      }

      // Create Opportunity
      const oppData = {
        Name: opportunityData.name,
        AccountId: accountId,
        StageName: this.mapDealStageToSalesforce(opportunityData.stage),
        Amount: opportunityData.amount,
        CloseDate: opportunityData.closeDate,
        Description: opportunityData.description,
      };

      const result = await this.conn.sobject("Opportunity").create(oppData);

      if (result.success) {
        return { success: true, recordId: result.id };
      } else {
        return { success: false, error: "Failed to create opportunity" };
      }
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  private formatDescription(meetingData: any): string {
    let description = meetingData.description + "\n\n";
    
    if (meetingData.painPoints.length > 0) {
      description += "Pain Points:\n" + meetingData.painPoints.map((p: string) => `• ${p}`).join("\n") + "\n\n";
    }
    
    if (meetingData.budget) {
      description += `Budget: ${meetingData.budget}\n`;
    }
    
    if (meetingData.timeline) {
      description += `Timeline: ${meetingData.timeline}\n`;
    }
    
    if (meetingData.nextSteps.length > 0) {
      description += "\nNext Steps:\n" + meetingData.nextSteps.map((s: string) => `• ${s}`).join("\n");
    }
    
    return description;
  }

  async syncMeetingToSalesforce(meetingData: {
    id: number;
    clientName: string;
    clientCompany: string | null;
    dealType: string;
    notes: string;
    aiAnalysis: any;
    coachingSuggestions: any[];
    createdAt: Date;
  }): Promise<{
    success: boolean;
    opportunityId?: string;
    contactId?: string;
    accountId?: string;
    taskId?: string;
    noteId?: string;
    error?: string;
  }> {
    try {
      // Test authentication first
      const authTest = await this.testConnection();
      if (!authTest.connected) {
        return { 
          success: false, 
          error: `Salesforce not configured: ${authTest.error}` 
        };
      }

      // Find or create Account and Contact
      const clientResult = await this.findOrCreateClientInSalesforce({
        company: meetingData.clientCompany || meetingData.clientName,
        name: meetingData.clientName,
        email: undefined // We don't have email from meeting data
      });

      if (!clientResult.success) {
        return { success: false, error: clientResult.error };
      }

      const accountId = clientResult.accountId!;
      const contactId = clientResult.contactId!;

      // Create or update Opportunity
      const opportunityResult = await this.createOrUpdateOpportunity({
        accountId,
        contactId,
        meetingData,
        aiAnalysis: meetingData.aiAnalysis
      });

      if (!opportunityResult.success) {
        return { success: false, error: opportunityResult.error };
      }

      // Create Task for the meeting
      const taskResult = await this.createMeetingTask({
        opportunityId: opportunityResult.opportunityId!,
        contactId,
        meetingData
      });

      // Create Note with AI analysis
      const noteResult = await this.createAnalysisNote({
        opportunityId: opportunityResult.opportunityId!,
        contactId,
        meetingData
      });

      return {
        success: true,
        opportunityId: opportunityResult.opportunityId,
        contactId,
        accountId,
        taskId: taskResult.taskId,
        noteId: noteResult.noteId
      };

    } catch (error) {
      return { 
        success: false, 
        error: `Meeting sync failed: ${(error as Error).message}` 
      };
    }
  }

  private async findOrCreateClientInSalesforce(clientData: {
    company: string;
    name: string;
    email?: string;
  }): Promise<{
    success: boolean;
    accountId?: string;
    contactId?: string;
    error?: string;
  }> {
    try {
      // Try to find existing client first
      const existing = await this.findExistingClient(clientData);
      
      if (existing.error) {
        return { success: false, error: existing.error };
      }

      if (existing.exists && existing.contact && existing.account) {
        return {
          success: true,
          accountId: existing.account.Id,
          contactId: existing.contact.Id
        };
      }

      // Create new account and contact
      const createResult = await this.createOrUpdateClient({
        company: clientData.company,
        name: clientData.name,
        email: clientData.email,
        phone: undefined,
        industry: undefined
      });

      if (!createResult.success) {
        return { success: false, error: createResult.error };
      }

      return {
        success: true,
        accountId: createResult.accountId,
        contactId: createResult.contactId
      };

    } catch (error) {
      return { 
        success: false, 
        error: `Client lookup/creation failed: ${(error as Error).message}` 
      };
    }
  }

  private async createOrUpdateOpportunity(params: {
    accountId: string;
    contactId: string;
    meetingData: any;
    aiAnalysis: any;
  }): Promise<{
    success: boolean;
    opportunityId?: string;
    error?: string;
  }> {
    try {
      const { accountId, contactId, meetingData, aiAnalysis } = params;

      // Check if opportunity already exists for this account
      const existingOpps = await this.conn.sobject("Opportunity").find({
        AccountId: accountId,
        StageName: { $nin: ["Closed Won", "Closed Lost"] }
      });

      const opportunityData: any = {
        Name: `${meetingData.clientCompany || meetingData.clientName} - ${meetingData.dealType}`,
        AccountId: accountId,
        CloseDate: this.calculateCloseDate(aiAnalysis?.timeline),
        StageName: this.mapDealStageToSalesforce(aiAnalysis?.dealStage || meetingData.dealType),
        Type: "New Customer",
        LeadSource: "Salespring Meeting"
      };

      // Add budget if available
      if (aiAnalysis?.budget && aiAnalysis.budget !== "Not specified") {
        const budgetAmount = this.extractBudgetAmount(aiAnalysis.budget);
        if (budgetAmount > 0) {
          opportunityData.Amount = budgetAmount;
        }
      }

      // Set probability based on stage and sentiment
      opportunityData.Probability = this.calculateProbability(
        aiAnalysis?.dealStage, 
        aiAnalysis?.sentiment
      );

      let opportunityId: string;

      if (existingOpps.length > 0) {
        // Update existing opportunity
        opportunityId = existingOpps[0].Id;
        await this.conn.sobject("Opportunity").update({
          Id: opportunityId,
          ...opportunityData
        });
      } else {
        // Create new opportunity
        const result = await this.conn.sobject("Opportunity").create(opportunityData);
        opportunityId = result.id;
      }

      return { success: true, opportunityId };

    } catch (error) {
      return { 
        success: false, 
        error: `Opportunity creation failed: ${(error as Error).message}` 
      };
    }
  }

  private async createMeetingTask(params: {
    opportunityId: string;
    contactId: string;
    meetingData: any;
  }): Promise<{
    success: boolean;
    taskId?: string;
    error?: string;
  }> {
    try {
      const { opportunityId, contactId, meetingData } = params;

      const taskData = {
        Subject: `Meeting: ${meetingData.dealType} with ${meetingData.clientName}`,
        Description: this.formatMeetingNotes(meetingData),
        WhatId: opportunityId, // Link to Opportunity
        WhoId: contactId, // Link to Contact
        ActivityDate: meetingData.createdAt.toISOString().split('T')[0],
        Status: "Completed",
        Type: "Meeting",
        Priority: "Normal"
      };

      const result = await this.conn.sobject("Task").create(taskData);

      return { success: true, taskId: result.id };

    } catch (error) {
      return { 
        success: false, 
        error: `Task creation failed: ${(error as Error).message}` 
      };
    }
  }

  private async createAnalysisNote(params: {
    opportunityId: string;
    contactId: string;
    meetingData: any;
  }): Promise<{
    success: boolean;
    noteId?: string;
    error?: string;
  }> {
    try {
      const { opportunityId, contactId, meetingData } = params;

      const analysisContent = this.formatAnalysisNote(meetingData.aiAnalysis, meetingData.coachingSuggestions);

      const noteData = {
        Title: `AI Analysis - ${meetingData.dealType} Meeting`,
        Body: analysisContent,
        ParentId: opportunityId // Link to Opportunity
      };

      const result = await this.conn.sobject("Note").create(noteData);

      return { success: true, noteId: result.id };

    } catch (error) {
      return { 
        success: false, 
        error: `Analysis note creation failed: ${(error as Error).message}` 
      };
    }
  }

  private formatMeetingNotes(meetingData: any): string {
    let description = `Meeting Type: ${meetingData.dealType}\n`;
    description += `Date: ${meetingData.createdAt.toLocaleDateString()}\n\n`;
    description += `Meeting Notes:\n${meetingData.notes}\n\n`;
    description += `Generated by Salespring AI Sales Platform`;
    
    return description;
  }

  private formatAnalysisNote(aiAnalysis: any, coachingSuggestions: any[]): string {
    if (!aiAnalysis) return "No AI analysis available for this meeting.";

    let content = "=== AI ANALYSIS SUMMARY ===\n\n";
    
    content += `Deal Stage: ${aiAnalysis.dealStage}\n`;
    content += `Budget: ${aiAnalysis.budget}\n`;
    content += `Timeline: ${aiAnalysis.timeline}\n`;
    content += `Sentiment Score: ${Math.round((aiAnalysis.sentiment || 0) * 100)}%\n`;
    content += `Analysis Confidence: ${Math.round((aiAnalysis.confidence || 0) * 100)}%\n\n`;
    
    if (aiAnalysis.painPoints && aiAnalysis.painPoints.length > 0) {
      content += "Pain Points Identified:\n";
      aiAnalysis.painPoints.forEach((point: string, index: number) => {
        content += `${index + 1}. ${point}\n`;
      });
      content += "\n";
    }
    
    if (aiAnalysis.keyStakeholders && aiAnalysis.keyStakeholders.length > 0) {
      content += "Key Stakeholders:\n";
      aiAnalysis.keyStakeholders.forEach((stakeholder: string, index: number) => {
        content += `${index + 1}. ${stakeholder}\n`;
      });
      content += "\n";
    }
    
    if (coachingSuggestions && coachingSuggestions.length > 0) {
      content += "AI Coaching Suggestions:\n";
      coachingSuggestions.forEach((suggestion: any, index: number) => {
        const status = suggestion.isUsed ? " ✓" : "";
        content += `${index + 1}. [${suggestion.type}] ${suggestion.content}${status}\n`;
      });
      content += "\n";
    }
    
    content += "Generated by Salespring Growth Guide";
    
    return content;
  }

  private calculateCloseDate(timeline: string): string {
    const today = new Date();
    let daysToAdd = 90; // Default 90 days

    if (timeline) {
      const timelineLower = timeline.toLowerCase();
      if (timelineLower.includes('week')) {
        const weeks = parseInt(timelineLower.match(/\d+/)?.[0] || '4');
        daysToAdd = weeks * 7;
      } else if (timelineLower.includes('month')) {
        const months = parseInt(timelineLower.match(/\d+/)?.[0] || '3');
        daysToAdd = months * 30;
      } else if (timelineLower.includes('quarter')) {
        daysToAdd = 90;
      } else if (timelineLower.includes('immediate') || timelineLower.includes('asap')) {
        daysToAdd = 30;
      }
    }

    const closeDate = new Date(today);
    closeDate.setDate(closeDate.getDate() + daysToAdd);
    
    return closeDate.toISOString().split('T')[0];
  }

  private extractBudgetAmount(budget: string): number {
    if (!budget) return 0;
    
    const budgetLower = budget.toLowerCase();
    const numberMatch = budgetLower.match(/[\d,]+/);
    
    if (!numberMatch) return 0;
    
    const number = parseInt(numberMatch[0].replace(/,/g, ''));
    
    // Handle K, M suffixes
    if (budgetLower.includes('k')) {
      return number * 1000;
    } else if (budgetLower.includes('m')) {
      return number * 1000000;
    }
    
    return number;
  }

  private calculateProbability(dealStage: string, sentiment: number): number {
    const baseStage = dealStage?.toLowerCase() || '';
    let baseProbability = 10;

    // Map deal stages to probabilities
    const stageMap: { [key: string]: number } = {
      'discovery': 20,
      'qualification': 30,
      'proposal': 50,
      'negotiation': 75,
      'closing': 90
    };

    baseProbability = stageMap[baseStage] || 10;

    // Adjust based on sentiment
    if (sentiment) {
      const sentimentAdjustment = (sentiment - 0.5) * 40; // -20 to +20
      baseProbability = Math.max(5, Math.min(95, baseProbability + sentimentAdjustment));
    }

    return Math.round(baseProbability);
  }

  private mapDealStageToSalesforce(stage: string): string {
    const stageMap: { [key: string]: string } = {
      "discovery": "Prospecting",
      "qualification": "Qualification",
      "proposal": "Proposal/Price Quote",
      "negotiation": "Negotiation/Review",
      "closing": "Closed Won"
    };

    return stageMap[stage.toLowerCase()] || "Prospecting";
  }

  async findExistingClient(clientData: {
    company: string;
    name: string;
    email?: string;
  }): Promise<{ 
    exists: boolean; 
    contact?: any; 
    account?: any; 
    error?: string;
  }> {
    try {
      // Test authentication first without throwing
      const authTest = await this.testConnection();
      if (!authTest.connected) {
        return { 
          exists: false, 
          error: `Salesforce not configured: ${authTest.error}` 
        };
      }

      // Search for existing Contact by email first (most reliable)
      let existingContact = null;
      if (clientData.email) {
        const contactsByEmail = await this.conn.sobject("Contact").find({
          Email: clientData.email
        });
        if (contactsByEmail.length > 0) {
          existingContact = contactsByEmail[0];
        }
      }

      // If no contact found by email, search by name and company
      if (!existingContact) {
        const accountQuery = await this.conn.sobject("Account").find({
          Name: clientData.company
        });

        if (accountQuery.length > 0) {
          const accountId = accountQuery[0].Id;
          const contactsByName = await this.conn.sobject("Contact").find({
            AccountId: accountId,
            Name: clientData.name
          });

          if (contactsByName.length > 0) {
            existingContact = contactsByName[0];
          }
        }
      }

      if (existingContact) {
        // Get the related account
        const account = await this.conn.sobject("Account").retrieve(existingContact.AccountId);
        
        return {
          exists: true,
          contact: existingContact,
          account: account
        };
      }

      return { exists: false };
    } catch (error) {
      return { 
        exists: false, 
        error: `Salesforce search failed: ${(error as Error).message}` 
      };
    }
  }

  async createOrUpdateClient(clientData: {
    company: string;
    name: string;
    email?: string;
    phone?: string;
    industry?: string;
  }): Promise<{ 
    success: boolean; 
    contactId?: string; 
    accountId?: string;
    wasUpdated?: boolean;
    error?: string;
  }> {
    try {
      // Test authentication first without throwing
      const authTest = await this.testConnection();
      if (!authTest.connected) {
        return { 
          success: false, 
          error: `Salesforce not configured: ${authTest.error}` 
        };
      }

      // Check if client already exists
      const existingClient = await this.findExistingClient(clientData);
      
      if (existingClient.error) {
        return { success: false, error: existingClient.error };
      }

      if (existingClient.exists && existingClient.contact && existingClient.account) {
        // Update only missing fields
        const contact = existingClient.contact;
        const account = existingClient.account;
        
        const contactUpdates: any = {};
        const accountUpdates: any = {};

        // Update contact fields if missing
        if (!contact.Email && clientData.email) {
          contactUpdates.Email = clientData.email;
        }
        if (!contact.Phone && clientData.phone) {
          contactUpdates.Phone = clientData.phone;
        }

        // Update account fields if missing
        if (!account.Industry && clientData.industry) {
          accountUpdates.Industry = clientData.industry;
        }

        // Update contact if needed
        if (Object.keys(contactUpdates).length > 0) {
          await this.conn.sobject("Contact").update({
            Id: contact.Id,
            ...contactUpdates
          });
        }

        // Update account if needed
        if (Object.keys(accountUpdates).length > 0) {
          await this.conn.sobject("Account").update({
            Id: account.Id,
            ...accountUpdates
          });
        }

        return {
          success: true,
          contactId: contact.Id,
          accountId: account.Id,
          wasUpdated: Object.keys(contactUpdates).length > 0 || Object.keys(accountUpdates).length > 0
        };
      }

      // Create new Account and Contact
      const accountResult = await this.conn.sobject("Account").create({
        Name: clientData.company,
        Industry: clientData.industry || null
      });

      if (!accountResult.success) {
        return { success: false, error: "Failed to create Account in Salesforce" };
      }

      const contactResult = await this.conn.sobject("Contact").create({
        FirstName: this.extractFirstName(clientData.name),
        LastName: this.extractLastName(clientData.name),
        Email: clientData.email || null,
        Phone: clientData.phone || null,
        AccountId: accountResult.id
      });

      if (!contactResult.success) {
        return { success: false, error: "Failed to create Contact in Salesforce" };
      }

      return {
        success: true,
        contactId: contactResult.id,
        accountId: accountResult.id,
        wasUpdated: false
      };
    } catch (error) {
      return { success: false, error: `Failed to create/update client in Salesforce: ${(error as Error).message}` };
    }
  }

  private extractFirstName(fullName: string): string {
    const parts = fullName.trim().split(' ');
    return parts[0] || fullName;
  }

  private extractLastName(fullName: string): string {
    const parts = fullName.trim().split(' ');
    return parts.length > 1 ? parts.slice(1).join(' ') : 'Unknown';
  }

  async testConnection(): Promise<{ connected: boolean; error?: string }> {
    try {
      await this.authenticate();
      const identity = await this.conn.identity();
      return { connected: true };
    } catch (error) {
      return { connected: false, error: (error as Error).message };
    }
  }
}

export const salesforceService = new SalesforceService();
