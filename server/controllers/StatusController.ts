import { Request, Response } from "express";

export interface ServiceStatus {
  name: string;
  connected: boolean;
  error?: string;
  lastCheck?: string;
}

export interface SystemStatus {
  services: {
    salesforce: ServiceStatus;
    openai: ServiceStatus;
  };
  overallHealth: 'healthy' | 'degraded' | 'down';
}

export class StatusController {
  async getSystemStatus(req: Request, res: Response): Promise<void> {
    try {
      const now = new Date().toISOString();

      // Check OpenAI status
      const openaiStatus: ServiceStatus = await this.checkOpenAIStatus();
      openaiStatus.lastCheck = now;

      // Check Salesforce status (reuse existing CRM status logic)
      const salesforceStatus: ServiceStatus = await this.checkSalesforceStatus();
      salesforceStatus.lastCheck = now;

      // Determine overall health
      const healthyServices = [openaiStatus, salesforceStatus].filter(s => s.connected).length;
      const totalServices = 2;
      
      let overallHealth: 'healthy' | 'degraded' | 'down';
      if (healthyServices === totalServices) {
        overallHealth = 'healthy';
      } else if (healthyServices > 0) {
        overallHealth = 'degraded';
      } else {
        overallHealth = 'down';
      }

      const systemStatus: SystemStatus = {
        services: {
          salesforce: salesforceStatus,
          openai: openaiStatus,
        },
        overallHealth,
      };

      res.json(systemStatus);
    } catch (error) {
      console.error("Error getting system status:", error);
      res.status(500).json({ 
        message: "Failed to get system status",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  private async checkOpenAIStatus(): Promise<ServiceStatus> {
    try {
      // Check if OpenAI API key is configured
      if (!process.env.OPENAI_API_KEY) {
        return {
          name: "OpenAI",
          connected: false,
          error: "API key not configured"
        };
      }

      // Simple check: try to make a minimal request to OpenAI
      const response = await fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        return {
          name: "OpenAI",
          connected: true
        };
      } else {
        return {
          name: "OpenAI",
          connected: false,
          error: `API returned ${response.status}: ${response.statusText}`
        };
      }
    } catch (error) {
      return {
        name: "OpenAI",
        connected: false,
        error: error instanceof Error ? error.message : 'Connection failed'
      };
    }
  }

  private async checkSalesforceStatus(): Promise<ServiceStatus> {
    try {
      // For now, return a simple status based on environment variables
      // This could be enhanced to actually test the Salesforce connection
      const hasConfig = !!(process.env.SALESFORCE_CLIENT_ID && process.env.SALESFORCE_CLIENT_SECRET);
      
      if (!hasConfig) {
        return {
          name: "Salesforce",
          connected: false,
          error: "Configuration missing"
        };
      }

      // Could add actual Salesforce connection test here
      return {
        name: "Salesforce",
        connected: false,
        error: "Authentication required"
      };
    } catch (error) {
      return {
        name: "Salesforce",
        connected: false,
        error: error instanceof Error ? error.message : 'Connection failed'
      };
    }
  }
}