import jsforce from "jsforce";

export class SalesforceService {
  private conn: jsforce.Connection;

  constructor() {
    this.conn = new jsforce.Connection({
      instanceUrl: process.env.SALESFORCE_INSTANCE_URL || process.env.SF_INSTANCE_URL || "https://login.salesforce.com",
      accessToken: process.env.SALESFORCE_ACCESS_TOKEN || process.env.SF_ACCESS_TOKEN,
      refreshToken: process.env.SALESFORCE_REFRESH_TOKEN || process.env.SF_REFRESH_TOKEN,
      clientId: process.env.SALESFORCE_CLIENT_ID || process.env.SF_CLIENT_ID,
      clientSecret: process.env.SALESFORCE_CLIENT_SECRET || process.env.SF_CLIENT_SECRET,
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
      throw new Error("Failed to authenticate with Salesforce: " + error.message);
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
      return { success: false, error: error.message };
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
      return { success: false, error: error.message };
    }
  }

  private formatDescription(meetingData: any): string {
    let description = meetingData.description + "\n\n";
    
    if (meetingData.painPoints.length > 0) {
      description += "Pain Points:\n" + meetingData.painPoints.map(p => `• ${p}`).join("\n") + "\n\n";
    }
    
    if (meetingData.budget) {
      description += `Budget: ${meetingData.budget}\n`;
    }
    
    if (meetingData.timeline) {
      description += `Timeline: ${meetingData.timeline}\n`;
    }
    
    if (meetingData.nextSteps.length > 0) {
      description += "\nNext Steps:\n" + meetingData.nextSteps.map(s => `• ${s}`).join("\n");
    }
    
    return description;
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
        error: `Salesforce search failed: ${error.message}` 
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
      return { success: false, error: `Failed to create/update client in Salesforce: ${error.message}` };
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
      return { connected: false, error: error.message };
    }
  }
}

export const salesforceService = new SalesforceService();
