import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Client } from "@shared/schema";

interface EditClientDialogProps {
  client: Client | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClientUpdated: (client: Client) => void;
}

export function EditClientDialog({
  client,
  open,
  onOpenChange,
  onClientUpdated,
}: EditClientDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "",
    notes: "",
    syncWithSalesforce: false,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Populate form when client changes
  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || "",
        company: client.company || "",
        email: client.email || "",
        phone: client.phone || "",
        industry: client.industry || "",
        notes: client.notes || "",
        syncWithSalesforce: false,
      });
    }
  }, [client]);

  const updateClientMutation = useMutation({
    mutationFn: async (clientData: typeof formData) => {
      if (!client) throw new Error("No client selected");
      
      const { syncWithSalesforce, ...updateData } = clientData;
      const response = await apiRequest("PUT", `/api/clients/${client.id}`, updateData);
      return response.json();
    },
    onSuccess: (updatedClient) => {
      // Close dialog and reset form
      onOpenChange(false);
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        industry: "",
        notes: "",
        syncWithSalesforce: false,
      });
      
      // Notify parent component of updated client
      onClientUpdated(updatedClient);
      
      // Show success message
      toast({
        title: "Success",
        description: `Client "${updatedClient.company || updatedClient.name}" has been updated successfully.`,
      });
      
      // Invalidate and refetch clients
      queryClient.invalidateQueries({ queryKey: ['/api/clients'] });
    },
    onError: (error: any) => {
      const errorMessage = error?.message || "Failed to update client";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Client name is required",
        variant: "destructive",
      });
      return;
    }

    updateClientMutation.mutate(formData);
  };

  const handleClose = () => {
    if (!updateClientMutation.isPending) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Edit Client</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto px-1 -mx-1">
          <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Contact person name"
              disabled={updateClientMutation.isPending}
              required
            />
          </div>

          {/* Company Field */}
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              placeholder="Company name"
              disabled={updateClientMutation.isPending}
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="email@company.com"
              disabled={updateClientMutation.isPending}
            />
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              disabled={updateClientMutation.isPending}
            />
          </div>

          {/* Industry Field */}
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              value={formData.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              placeholder="Technology, Healthcare, etc."
              disabled={updateClientMutation.isPending}
            />
          </div>


          {/* Notes Field */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Additional notes about this client..."
              rows={3}
              disabled={updateClientMutation.isPending}
            />
          </div>

          {/* Salesforce Sync Checkbox */}
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="syncWithSalesforce"
              checked={formData.syncWithSalesforce}
              onCheckedChange={(checked) => 
                handleInputChange('syncWithSalesforce', checked as boolean)
              }
              disabled={updateClientMutation.isPending}
            />
            <Label 
              htmlFor="syncWithSalesforce"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Sync updates with Salesforce
            </Label>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t mt-6 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={updateClientMutation.isPending}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={updateClientMutation.isPending || !formData.name.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              {updateClientMutation.isPending ? "Updating..." : "Update Client"}
            </Button>
          </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}