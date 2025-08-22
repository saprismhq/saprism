import { Router } from 'express';
import { z } from 'zod';
import { db as prisma } from '../db';
import { isAuthenticated } from '../auth';
import { InsertClientSchema } from '../../shared/schema';

const router = Router();

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
    console.error('Error fetching clients:', error);
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
    
    // Check if client with same company and contact name already exists for this user
    const existingClient = await prisma.client.findFirst({
      where: {
        userId,
        company: validatedData.company,
        name: validatedData.name,
      }
    });

    if (existingClient) {
      return res.status(400).json({ 
        message: 'A client with this company and contact name already exists' 
      });
    }

    // Create the client
    const client = await prisma.client.create({
      data: {
        ...validatedData,
        userId,
        // Convert empty strings to null for optional fields
        email: validatedData.email || null,
        phone: validatedData.phone || null,
        industry: validatedData.industry || null,
        notes: validatedData.notes || null,
      },
      include: {
        _count: {
          select: { meetings: true }
        }
      }
    });

    res.status(201).json(client);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Invalid client data', 
        errors: error.errors 
      });
    }
    
    console.error('Error creating client:', error);
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
    console.error('Error fetching client:', error);
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
    console.error('Error fetching client meetings:', error);
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
        ...validatedData,
        // Convert empty strings to null for optional fields
        email: validatedData.email || null,
        company: validatedData.company || null,
        phone: validatedData.phone || null,
        industry: validatedData.industry || null,
        notes: validatedData.notes || null,
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
    
    console.error('Error updating client:', error);
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
    console.error('Error deleting client:', error);
    res.status(500).json({ message: 'Failed to delete client' });
  }
});

export default router;