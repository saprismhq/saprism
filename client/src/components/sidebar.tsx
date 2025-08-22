import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Activity } from "lucide-react";
import { SalespringLogo } from "@/components/salespring-logo";
import { ClientDropdown } from "@/components/client-dropdown";
import { NewClientDialog } from "@/components/new-client-dialog";
import { RecentMeetingsList } from "@/components/recent-meetings-list";
import { useSystemStatus, getOverallStatusColor } from "@/lib/api/status";
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
  const [selectedDealType, setSelectedDealType] = useState<DealType>("Connect");

  // Query system status
  const { data: systemStatus, isLoading: statusLoading } = useSystemStatus();

  // Handle client selection
  const handleClientSelect = (client: Client | null) => {
    setSelectedClient(client);
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

  // Handle meeting creation
  const handleCreateMeeting = () => {
    if (selectedClient) {
      // Use selected client data
      onCreateMeeting({
        clientName: selectedClient.name,
        clientCompany: selectedClient.company || "",
        clientId: selectedClient.id,
        dealType: selectedDealType,
      });
      setShowCreateDialog(false);
      // Reset deal type for next meeting
      setSelectedDealType("Connect");
    }
  };

  return (
    <aside className="w-80 bg-white shadow-sm border-r border-gray-200 flex flex-col h-full">
      {/* Logo & Brand */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center">
        <div>
          <SalespringLogo size="md" />
          <p className="text-sm text-transparent truncate invisible">Hidden spacer text</p>
        </div>
      </div>

      {/* Client Selection */}
      <div className="px-6 py-3 border-b border-gray-100">
        <ClientDropdown
          selectedClient={selectedClient}
          onClientSelect={handleClientSelect}
          onNewClientClick={handleNewClientClick}
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
            <div className="text-gray-600 text-xs">Contact: {selectedClient.name}</div>
          </div>
        </div>
      )}

      {/* Create Meeting Button */}
      <div className="px-6 py-3 border-b border-gray-100">
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
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
                      <p className="text-sm text-gray-600 mt-1">Contact: {selectedClient.name}</p>
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
                disabled={!selectedClient || createMeetingLoading}
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
        />
      </nav>

      {/* System Status */}
      <div className="p-4 border-t border-gray-100">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="w-4 h-4 text-gray-600" />
            <h4 className="text-sm font-medium text-gray-700">Status</h4>
            {systemStatus && (
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                getOverallStatusColor(systemStatus)
              }`}>
                {systemStatus.overallHealth === 'healthy' ? '●' : 
                 systemStatus.overallHealth === 'degraded' ? '◐' : '○'}
              </div>
            )}
          </div>
          
          {statusLoading ? (
            <div className="text-xs text-gray-500">Checking services...</div>
          ) : systemStatus ? (
            <div className="space-y-2">
              {/* Salesforce Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    systemStatus.services.salesforce.connected ? "bg-green-500" : "bg-red-500"
                  }`}></div>
                  <span className="text-xs text-gray-700">
                    Salesforce
                  </span>
                </div>
                <div className={`text-xs ${
                  systemStatus.services.salesforce.connected ? "text-green-600" : "text-red-600"
                }`}>
                  {systemStatus.services.salesforce.connected ? "Connected" : "Offline"}
                </div>
              </div>
              
              {/* OpenAI Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    systemStatus.services.openai.connected ? "bg-green-500" : "bg-red-500"
                  }`}></div>
                  <span className="text-xs text-gray-700">
                    OpenAI
                  </span>
                </div>
                <div className={`text-xs ${
                  systemStatus.services.openai.connected ? "text-green-600" : "text-red-600"
                }`}>
                  {systemStatus.services.openai.connected ? "Connected" : "Offline"}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xs text-red-600">Unable to check status</div>
          )}
        </div>
      </div>

      {/* New Client Dialog */}
      <NewClientDialog
        isOpen={showNewClientDialog}
        onClose={() => setShowNewClientDialog(false)}
        onClientCreated={handleNewClientCreated}
      />
    </aside>
  );
}