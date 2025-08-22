import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { InsertClient, Client } from '@shared/schema';
import { isUnauthorizedError } from '@/lib/authUtils';

interface NewClientDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onClientCreated: (client: Client) => void;
}

/**
 * NewClientDialog component provides a form for creating new clients
 * Includes validation, error handling, and automatic client selection after creation
 */
export function NewClientDialog({ isOpen, onClose, onClientCreated }: NewClientDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Form state
  const [formData, setFormData] = useState<InsertClient>({
    company: '',
    name: '',
    email: '',
    phone: '',
    industry: '',
  });

  // Reset form when dialog opens/closes
  const resetForm = () => {
    setFormData({
      company: '',
      name: '',
      email: '',
      phone: '',
      industry: '',
    });
  };

  // Handle dialog close
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Create client mutation
  const createClientMutation = useMutation({
    mutationFn: async (clientData: InsertClient) => {
      const response = await apiRequest('POST', '/api/clients', clientData);
      return response.json() as Promise<Client>;
    },
    onSuccess: (newClient) => {
      // Invalidate clients query to refresh the dropdown
      queryClient.invalidateQueries({ queryKey: ['/api/clients'] });
      
      // Notify parent component of new client
      onClientCreated(newClient);
      
      // Show success message
      toast({
        title: 'Success',
        description: `Client "${newClient.company || newClient.name}" has been created successfully.`,
      });
      
      // Close dialog and reset form
      handleClose();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: 'Unauthorized',
          description: 'You are logged out. Logging in again...',
          variant: 'destructive',
        });
        setTimeout(() => {
          window.location.href = '/api/login';
        }, 500);
        return;
      }
      
      console.error('Error creating client:', error);
      toast({
        title: 'Error',
        description: 'Failed to create client. Please try again.',
        variant: 'destructive',
      });
    },
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.company.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Company name is required.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!formData.name.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Contact name is required.',
        variant: 'destructive',
      });
      return;
    }

    // Validate email format if provided
    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        toast({
          title: 'Validation Error',
          description: 'Please enter a valid email address.',
          variant: 'destructive',
        });
        return;
      }
    }

    // Submit the form
    createClientMutation.mutate(formData);
  };

  // Handle input changes
  const handleInputChange = (field: keyof InsertClient, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company Name - Required */}
          <div>
            <Label htmlFor="clientCompany">
              Company Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="clientCompany"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              placeholder="Acme Corp"
              required
              disabled={createClientMutation.isPending}
            />
          </div>

          {/* Contact Name - Required */}
          <div>
            <Label htmlFor="clientName">
              Contact Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="clientName"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="John Smith"
              required
              disabled={createClientMutation.isPending}
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="clientEmail">Email</Label>
            <Input
              id="clientEmail"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="john@acmecorp.com"
              disabled={createClientMutation.isPending}
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="clientPhone">Phone</Label>
            <Input
              id="clientPhone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              disabled={createClientMutation.isPending}
            />
          </div>

          {/* Industry */}
          <div>
            <Label htmlFor="clientIndustry">Industry</Label>
            <Input
              id="clientIndustry"
              value={formData.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              placeholder="Technology, Healthcare, Finance..."
              disabled={createClientMutation.isPending}
            />
          </div>



          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={createClientMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formData.company.trim() || !formData.name.trim() || createClientMutation.isPending}
              className="bg-primary hover:bg-primary/90"
            >
              {createClientMutation.isPending ? 'Creating...' : 'Create Client'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}