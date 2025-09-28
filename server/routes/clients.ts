import { Router } from 'express';
import { z } from 'zod';
import { db as prisma } from '../db';
import { isAuthenticated } from '../auth';
import { InsertClientSchema } from '../../shared/schema';
import { getLogger } from '../utils/LoggerFactory';

const router = Router();
const logger = getLogger('ClientsRoute');

/**
 * GET /api/clients
 * Fetch all clients for the authenticated user
 */
router.get('/', isAuthenticated, async (req: any, res) => {
  try {
    const userId = req.user.claims.sub;
    
    const clients = await prisma.client.findMany({
      where: { userId },
      orderBy: { company: 'asc' },
      include: {
        _count: {
          select: { meetings: true }
        }
      }
    });

    res.json(clients);
  } catch (error) {
    logger.error('Error fetching clients', { 
      userId: req.user?.claims?.sub,
      error: error instanceof Error ? error.message : String(error), 
      stack: error instanceof Error ? error.stack : undefined 
    });
    res.status(500).json({ message: 'Failed to fetch clients' });
  }
});

/**
 * POST /api/clients
 * Create a new client for the authenticated user
 */
router.post('/', isAuthenticated, async (req: any, res) => {
  try {
    const userId = req.user.claims.sub;
    
    // Validate request body
    const validatedData = InsertClientSchema.parse(req.body);
    const { syncWithSalesforce, ...clientData } = validatedData;
    
    let salesforceResult = null;

    // If sync with Salesforce is enabled, try to integrate but fall back gracefully
    if (syncWithSalesforce) {
      try {
        const { salesforceService } = await import('../services/salesforce');
        
        // Test connection first
        const connectionTest = await salesforceService.testConnection();
        
        if (connectionTest.connected) {
          // Check if client exists in Salesforce
          const existingSfClient = await salesforceService.findExistingClient({
            company: clientData.company,
            name: clientData.name,
            email: clientData.email || undefined
          });

          if (!existingSfClient.error && existingSfClient.exists) {
            // Client exists in Salesforce - prevent duplicate creation locally
            const existingLocalClient = await prisma.client.findFirst({
              where: {
                userId,
                company: clientData.company,
                name: clientData.name,
              }
            });

            if (existingLocalClient) {
              return res.status(400).json({ 
                message: 'Client already exists both locally and in Salesforce',
                suggestion: 'This client is already synced with Salesforce'
              });
            }

            // Merge Salesforce data with local data (prefer local data)
            const sfContact = existingSfClient.contact;
            const sfAccount = existingSfClient.account;
            
            const mergedData = {
              ...clientData,
              email: clientData.email || sfContact.Email || null,
              phone: clientData.phone || sfContact.Phone || null,
              industry: clientData.industry || sfAccount.Industry || null,
            };

            // Update Salesforce with any missing fields
            salesforceResult = await salesforceService.createOrUpdateClient(mergedData);
            
            // Create local client with merged data
            const client = await prisma.client.create({
              data: {
                ...mergedData,
                userId,
                notes: clientData.notes || null,
              },
              include: {
                _count: {
                  select: { meetings: true }
                }
              }
            });

            return res.status(201).json({
              ...client,
              salesforceSync: {
                success: true,
                action: 'updated_existing',
                wasUpdated: salesforceResult.wasUpdated,
                contactId: salesforceResult.contactId,
                accountId: salesforceResult.accountId
              }
            });
          } else if (!existingSfClient.error) {
            // Create new client in Salesforce
            salesforceResult = await salesforceService.createOrUpdateClient(clientData);
            if (salesforceResult.success) {
              logger.info('Created new client in Salesforce', { 
                company: clientData.company, 
                name: clientData.name,
                hasEmail: !!clientData.email 
              });
            } else {
              logger.warn('Failed to create client in Salesforce', { error: salesforceResult.error });
            }
          } else {
            logger.warn('Salesforce search failed', { error: existingSfClient.error });
          }
        } else {
          logger.warn('Salesforce not configured', { error: connectionTest.error });
        }
      } catch (sfError) {
        logger.warn('Salesforce integration error', { error: sfError instanceof Error ? sfError.message : String(sfError) });
        // Continue to local creation below
      }
    }

    // Check if client with same company and contact name already exists locally
    const existingClient = await prisma.client.findFirst({
      where: {
        userId,
        company: clientData.company,
        name: clientData.name,
      }
    });

    if (existingClient) {
      return res.status(400).json({ 
        message: 'A client with this company and contact name already exists locally' 
      });
    }

    // Create the client locally
    const client = await prisma.client.create({
      data: {
        ...clientData,
        userId,
        // Convert empty strings to null for optional fields
        email: clientData.email || null,
        phone: clientData.phone || null,
        industry: clientData.industry || null,
        notes: clientData.notes || null,
      },
      include: {
        _count: {
          select: { meetings: true }
        }
      }
    });

    const response: any = client;

    // Add Salesforce sync info if it was enabled
    if (syncWithSalesforce && salesforceResult) {
      response.salesforceSync = {
        success: salesforceResult.success,
        action: 'created_new',
        contactId: salesforceResult.contactId,
        accountId: salesforceResult.accountId
      };
    }

    res.status(201).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Invalid client data', 
        errors: error.errors 
      });
    }
    
    logger.error('Error creating client', { 
      userId: req.user?.claims?.sub,
      error: error instanceof Error ? error.message : String(error), 
      stack: error instanceof Error ? error.stack : undefined 
    });
    res.status(500).json({ message: 'Failed to create client' });
  }
});

/**
 * GET /api/clients/:id
 * Get a specific client by ID
 */
router.get('/:id', isAuthenticated, async (req: any, res) => {
  try {
    const userId = req.user.claims.sub;
    const clientId = parseInt(req.params.id);

    if (isNaN(clientId)) {
      return res.status(400).json({ message: 'Invalid client ID' });
    }

    const client = await prisma.client.findFirst({
      where: { 
        id: clientId,
        userId 
      },
      include: {
        _count: {
          select: { meetings: true }
        }
      }
    });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(client);
  } catch (error) {
    logger.error('Error fetching client', { 
      userId: req.user?.claims?.sub,
      clientId: req.params.id,
      error: error instanceof Error ? error.message : String(error), 
      stack: error instanceof Error ? error.stack : undefined 
    });
    res.status(500).json({ message: 'Failed to fetch client' });
  }
});

/**
 * GET /api/clients/:id/meetings
 * Get all meetings for a specific client
 */
router.get('/:id/meetings', isAuthenticated, async (req: any, res) => {
  try {
    const userId = req.user.claims.sub;
    const clientId = parseInt(req.params.id);

    if (isNaN(clientId)) {
      return res.status(400).json({ message: 'Invalid client ID' });
    }

    // Verify client belongs to user
    const client = await prisma.client.findFirst({
      where: { 
        id: clientId,
        userId 
      }
    });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Fetch meetings for this client
    const meetings = await prisma.meeting.findMany({
      where: { 
        clientId,
        userId 
      },
      orderBy: { createdAt: 'desc' },
      include: {
        notes: {
          orderBy: { createdAt: 'desc' },
          take: 1
        },
        coachingSuggestions: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });

    res.json(meetings);
  } catch (error) {
    logger.error('Error fetching client meetings', { error: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined });
    res.status(500).json({ message: 'Failed to fetch client meetings' });
  }
});

/**
 * PUT /api/clients/:id
 * Update a client
 */
router.put('/:id', isAuthenticated, async (req: any, res) => {
  try {
    const userId = req.user.claims.sub;
    const clientId = parseInt(req.params.id);

    if (isNaN(clientId)) {
      return res.status(400).json({ message: 'Invalid client ID' });
    }

    // Validate request body
    const validatedData = InsertClientSchema.parse(req.body);

    // Check if client exists and belongs to user
    const existingClient = await prisma.client.findFirst({
      where: { 
        id: clientId,
        userId 
      }
    });

    if (!existingClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Check if another client with same name exists (excluding current client)
    const duplicateClient = await prisma.client.findFirst({
      where: {
        userId,
        name: validatedData.name,
        id: { not: clientId }
      }
    });

    if (duplicateClient) {
      return res.status(400).json({ 
        message: 'A client with this name already exists' 
      });
    }

    // Update the client
    const client = await prisma.client.update({
      where: { id: clientId },
      data: {
        name: validatedData.name,
        company: validatedData.company || undefined,
        email: validatedData.email || undefined,
        phone: validatedData.phone || undefined,
        industry: validatedData.industry || undefined,
        salesMethodology: validatedData.salesMethodology || undefined,
        notes: validatedData.notes || undefined,
        // Do not spread validatedData directly to avoid unknown fields
      },
      include: {
        _count: {
          select: { meetings: true }
        }
      }
    });

    res.json(client);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Invalid client data', 
        errors: error.errors 
      });
    }
    
    logger.error('Error updating client', { error: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined });
    res.status(500).json({ message: 'Failed to update client' });
  }
});

/**
 * DELETE /api/clients/:id
 * Delete a client and optionally handle associated meetings
 */
router.delete('/:id', isAuthenticated, async (req: any, res) => {
  try {
    const userId = req.user.claims.sub;
    const clientId = parseInt(req.params.id);

    if (isNaN(clientId)) {
      return res.status(400).json({ message: 'Invalid client ID' });
    }

    // Check if client exists and belongs to user
    const existingClient = await prisma.client.findFirst({
      where: { 
        id: clientId,
        userId 
      },
      include: {
        _count: {
          select: { meetings: true }
        }
      }
    });

    if (!existingClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Check if client has associated meetings
    if (existingClient._count.meetings > 0) {
      return res.status(400).json({ 
        message: `Cannot delete client with ${existingClient._count.meetings} associated meetings. Please reassign or delete meetings first.` 
      });
    }

    // Delete the client
    await prisma.client.delete({
      where: { id: clientId }
    });

    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    logger.error('Error deleting client', { error: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined });
    res.status(500).json({ message: 'Failed to delete client' });
  }
});

export default router;