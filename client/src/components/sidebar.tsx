import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, User } from "lucide-react";
import { SaprismLogo } from "@/components/saprism-logo";
import { UserDropdown } from "@/components/user-dropdown";
import { ClientDropdown } from "@/components/client-dropdown";
import { NewClientDialog } from "@/components/new-client-dialog";
import { EditClientDialog } from "@/components/edit-client-dialog";
import { RecentMeetingsList } from "@/components/recent-meetings-list";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Meeting, Client } from "@shared/schema";
import { DEAL_TYPES, type DealType } from "@shared/schema";

interface SidebarProps {
  meetings: Meeting[];
  activeMeetingId: number | null;
  onSelectMeeting: (id: number) => void;
  onCreateMeeting: (data: { clientName: string; clientCompany: string; clientId?: number; dealType?: DealType }) => void;
  onDeleteMeeting: (id: number) => void;
  createMeetingLoading: boolean;
  deleteMeetingLoading: boolean;
}

export function Sidebar({
  meetings,
  activeMeetingId,
  onSelectMeeting,
  onCreateMeeting,
  onDeleteMeeting,
  createMeetingLoading,
  deleteMeetingLoading,
}: SidebarProps) {
  // State for client management
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showNewClientDialog, setShowNewClientDialog] = useState(false);
  const [showEditClientDialog, setShowEditClientDialog] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);
  const [selectedDealType, setSelectedDealType] = useState<DealType>("Connect");
  const [selectedContactFilter, setSelectedContactFilter] = useState<string | null>(null);
  const [contactName, setContactName] = useState("");

  // Fetch existing contacts for the selected client
  const { data: clientMeetings = [] } = useQuery({
    queryKey: ['/api/clients', selectedClient?.id, 'meetings'],
    queryFn: async () => {
      if (!selectedClient?.id) return [];
      const response = await apiRequest('GET', `/api/clients/${selectedClient.id}/meetings`);
      return response.json();
    },
    enabled: !!selectedClient?.id && showCreateDialog,
  });

  // Extract unique contact names from past meetings
  const existingContacts = Array.from(new Set(
    clientMeetings.map((m: any) => m.clientName).filter(Boolean)
  )).slice(0, 6) as string[]; // Limit to 6 most recent contacts

  // Handle client selection
  const handleClientSelect = (client: Client | null) => {
    setSelectedClient(client);
    setSelectedContactFilter(null); // Reset contact filter when client changes
  };

  // Handle new client creation
  const handleNewClientCreated = (newClient: Client) => {
    setSelectedClient(newClient);
    setShowNewClientDialog(false);
  };

  // Handle new client dialog open
  const handleNewClientClick = () => {
    setShowNewClientDialog(true);
  };

  // Handle edit client dialog open
  const handleEditClientClick = (client: Client) => {
    setClientToEdit(client);
    setShowEditClientDialog(true);
  };

  // Handle client updated
  const handleClientUpdated = (updatedClient: Client) => {
    if (selectedClient?.id === updatedClient.id) {
      setSelectedClient(updatedClient);
    }
    setShowEditClientDialog(false);
    setClientToEdit(null);
  };

  // Handle meeting creation
  const handleCreateMeeting = () => {
    if (selectedClient && contactName.trim()) {
      onCreateMeeting({
        clientName: contactName.trim(),
        clientCompany: selectedClient.company || "",
        clientId: selectedClient.id,
        dealType: selectedDealType,
      });
      setShowCreateDialog(false);
      // Reset form
      setSelectedDealType("Connect");
      setContactName("");
    }
  };

  // Handle dialog close - reset contact name
  const handleDialogOpenChange = (open: boolean) => {
    setShowCreateDialog(open);
    if (!open) {
      setContactName("");
      setSelectedDealType("Connect");
    }
  };

  return (
    <aside className="w-80 bg-white shadow-sm border-r border-gray-200 flex flex-col h-full">
      {/* Logo & Brand */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <SaprismLogo size="md" />
          <p className="text-sm text-transparent truncate invisible">Hidden spacer text</p>
        </div>
        <UserDropdown />
      </div>

      {/* Client Selection */}
      <div className="px-6 py-3 border-b border-gray-100">
        <ClientDropdown
          selectedClient={selectedClient}
          onClientSelect={handleClientSelect}
          onNewClientClick={handleNewClientClick}
          onEditClientClick={handleEditClientClick}
        />
      </div>

      {/* Current Meeting Section */}
      {selectedClient && (
        <div className="px-6 py-3 border-b border-gray-100 bg-gray-50">
          <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
            Current Meeting
          </h3>
          <div className="text-sm">
            <div className="font-medium text-gray-900">{selectedClient.company || 'No Company'}</div>
          </div>
        </div>
      )}

      {/* Create Meeting Button */}
      <div className="px-6 py-3 border-b border-gray-100">
        <Dialog open={showCreateDialog} onOpenChange={handleDialogOpenChange}>
          <DialogTrigger asChild>
            <Button 
              className="w-full bg-primary hover:bg-primary/90 h-12 text-sm" 
              disabled={createMeetingLoading || !selectedClient}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Meeting
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Meeting</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {selectedClient ? (
                // Show selected client info - improved styling
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 p-6 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-semibold text-lg">
                        {(selectedClient.company || selectedClient.name).charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {selectedClient.company || 'No Company'}
                      </h3>
                    </div>
                  </div>
                </div>
              ) : (
                // Show message to select a client
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-700 text-sm">!</span>
                    </div>
                    <p className="text-sm text-yellow-800">
                      Please select a client from the dropdown above to create a meeting.
                    </p>
                  </div>
                </div>
              )}

              {/* Contact Name Input */}
              {selectedClient && (
                <div className="space-y-3">
                  <Label htmlFor="contactName" className="text-sm font-medium text-gray-700">
                    Contact Name *
                  </Label>
                  <Input
                    id="contactName"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="John Smith"
                    className="h-12 text-base"
                  />
                  
                  {/* Quick Contact Buttons */}
                  {existingContacts.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {existingContacts.map((contact: string) => (
                        <Button
                          key={contact}
                          variant="outline"
                          size="sm"
                          onClick={() => setContactName(contact)}
                          className="h-7 px-3 text-xs border-gray-300 text-gray-700 hover:bg-primary hover:text-white hover:border-primary"
                        >
                          {contact}
                        </Button>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the name of the person you're meeting with
                  </p>
                </div>
              )}

              {/* Deal Type Selection - improved spacing and styling */}
              {selectedClient && (
                <div className="space-y-3">
                  <Label htmlFor="dealType" className="text-sm font-medium text-gray-700">
                    Deal Type
                  </Label>
                  <Select value={selectedDealType} onValueChange={(value) => setSelectedDealType(value as DealType)}>
                    <SelectTrigger id="dealType" className="h-12 text-base">
                      <SelectValue placeholder="Select deal type" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEAL_TYPES.map((dealType) => (
                        <SelectItem key={dealType} value={dealType} className="py-3">
                          {dealType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">
                    Choose the current stage of this sales opportunity
                  </p>
                </div>
              )}

              <Button
                onClick={handleCreateMeeting}
                disabled={!selectedClient || !contactName.trim() || createMeetingLoading}
                className="w-full bg-primary hover:bg-primary/90 h-12 text-base font-medium"
              >
                {createMeetingLoading ? "Creating..." : "Create Meeting"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Recent Meetings */}
      <nav className="flex-1 px-6 py-4 overflow-y-auto">
        <RecentMeetingsList
          selectedClient={selectedClient}
          activeMeetingId={activeMeetingId}
          onSelectMeeting={onSelectMeeting}
          selectedContactFilter={selectedContactFilter}
          onContactFilter={setSelectedContactFilter}
        />
      </nav>


      {/* New Client Dialog */}
      <NewClientDialog
        isOpen={showNewClientDialog}
        onClose={() => setShowNewClientDialog(false)}
        onClientCreated={handleNewClientCreated}
      />

      {/* Edit Client Dialog */}
      <EditClientDialog
        client={clientToEdit}
        open={showEditClientDialog}
        onOpenChange={setShowEditClientDialog}
        onClientUpdated={handleClientUpdated}
      />
    </aside>
  );
}