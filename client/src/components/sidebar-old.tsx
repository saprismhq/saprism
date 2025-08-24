import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Activity } from "lucide-react";
import { SaprismLogo } from "@/components/saprism-logo";
import { ClientDropdown } from "@/components/client-dropdown";
import { NewClientDialog } from "@/components/new-client-dialog";
import { RecentMeetingsList } from "@/components/recent-meetings-list";
import { useSystemStatus, getOverallStatusColor } from "@/lib/api/status";
import type { Meeting, Client } from "@shared/schema";

interface SidebarProps {
  meetings: Meeting[];
  activeMeetingId: number | null;
  onSelectMeeting: (id: number) => void;
  onCreateMeeting: (data: { clientName: string; clientCompany: string; clientId?: number }) => void;
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
  const [clientName, setClientName] = useState("");
  const [clientCompany, setClientCompany] = useState("");

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
      });
    } else if (clientName.trim()) {
      // Create meeting with manual client info (legacy path)
      onCreateMeeting({
        clientName: clientName.trim(),
        clientCompany: clientCompany.trim(),
      });
      setClientName("");
      setClientCompany("");
    }
    setShowCreateDialog(false);
  };

  return (
    <aside className="w-80 bg-white shadow-sm border-r border-gray-200 flex flex-col h-full">
      {/* Logo & Brand */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center">
        <div>
          <SaprismLogo size="md" />
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
            <div className="font-medium text-gray-900">{selectedClient.name}</div>
            {selectedClient.company && (
              <div className="text-gray-600 text-xs">{selectedClient.company}</div>
            )}
          </div>
        </div>
      )}

      {/* Create Meeting Button */}
      <div className="px-6 py-3 border-b border-gray-100">
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button 
              className="w-full bg-primary hover:bg-primary/90 h-12 text-sm" 
              disabled={createMeetingLoading}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Meeting
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Meeting</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedClient ? (
                // Show selected client info
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Label className="text-sm font-medium text-gray-700">Meeting with:</Label>
                  <div className="mt-1">
                    <div className="font-medium">{selectedClient.name}</div>
                    {selectedClient.company && (
                      <div className="text-sm text-gray-600">{selectedClient.company}</div>
                    )}
                  </div>
                </div>
              ) : (
                // Show manual client input fields
                <>
                  <div>
                    <Label htmlFor="clientName">Client Name *</Label>
                    <Input
                      id="clientName"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientCompany">Client Company</Label>
                    <Input
                      id="clientCompany"
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      placeholder="Acme Corp"
                    />
                  </div>
                </>
              )}
              <Button
                onClick={handleCreateMeeting}
                disabled={(!selectedClient && !clientName.trim()) || createMeetingLoading}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {createMeetingLoading ? "Creating..." : "Create Meeting"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-4">
        {/* Active Meeting */}
        {activeMeetingId && (
          <div>
            <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Current Meeting</h3>
            <div className="px-4 py-3 bg-primary/10 text-primary rounded-lg border border-primary/20">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="font-medium text-sm">
                  {meetings.find(m => m.id === activeMeetingId)?.clientName || "Unknown"}
                </span>
              </div>
              {meetings.find(m => m.id === activeMeetingId)?.clientCompany && (
                <p className="text-xs text-primary/70 mt-1">
                  {meetings.find(m => m.id === activeMeetingId)?.clientCompany}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Meeting History */}
        <div>
          <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Recent Meetings</h3>
          <div className="space-y-1 max-h-72 overflow-y-auto">
            {meetings.slice(0, 10).map((meeting) => (
              <div
                key={meeting.id}
                className={`relative group rounded-lg transition-colors ${
                  meeting.id === activeMeetingId
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <button
                  onClick={() => onSelectMeeting(meeting.id)}
                  className="w-full text-left px-3 py-3 pr-10 rounded-lg text-sm"
                >
                  <div className="font-medium">{meeting.clientName}</div>
                  {meeting.clientCompany && (
                    <div className="text-xs text-gray-500 mt-1">{meeting.clientCompany}</div>
                  )}
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(meeting.createdAt).toLocaleDateString()} • {new Date(meeting.createdAt).toLocaleTimeString('en-US', { 
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </div>
                </button>
                
                {/* Delete button */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                      disabled={deleteMeetingLoading}
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Meeting</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete the meeting with {meeting.clientName}? 
                        This action cannot be undone and will permanently remove all notes and coaching suggestions.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>No</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDeleteMeeting(meeting.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Yes, Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </div>
        </div>
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


    </aside>
  );
}
