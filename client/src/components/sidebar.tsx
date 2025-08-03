import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useQuery } from "@tanstack/react-query";
import { Brain, Plus, History, BarChart3, Settings, User, LogOut, X } from "lucide-react";
import { SalespringLogo } from "@/components/salespring-logo";
import type { Meeting } from "@shared/schema";

interface SidebarProps {
  meetings: Meeting[];
  activeMeetingId: number | null;
  onSelectMeeting: (id: number) => void;
  onCreateMeeting: (data: { clientName: string; clientCompany: string }) => void;
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
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientCompany, setClientCompany] = useState("");

  // Query CRM status
  const { data: crmStatus } = useQuery({
    queryKey: ["/api/crm/status"],
    refetchInterval: 30000, // Check every 30 seconds
  });

  const handleCreateMeeting = () => {
    if (clientName.trim()) {
      onCreateMeeting({
        clientName: clientName.trim(),
        clientCompany: clientCompany.trim(),
      });
      setClientName("");
      setClientCompany("");
      setShowCreateDialog(false);
    }
  };

  return (
    <aside className="w-80 bg-white shadow-sm border-r border-gray-200 flex flex-col h-full">
      {/* Logo & Brand */}
      <div className="px-6 py-4 border-b border-gray-100">
        <SalespringLogo size="md" />
      </div>

      {/* Create Meeting Button */}
      <div className="p-4 border-b border-gray-100">
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="w-full bg-primary hover:bg-primary/90 h-12 text-sm" disabled={createMeetingLoading}>
              <Plus className="w-4 h-4 mr-2" />
              New Meeting
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Meeting</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
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
              <Button
                onClick={handleCreateMeeting}
                disabled={!clientName.trim() || createMeetingLoading}
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
                    {new Date(meeting.createdAt).toLocaleDateString()}
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

      {/* CRM Integration Status */}
      <div className="p-4 border-t border-gray-100">
        <div className={`flex items-center justify-between p-3 rounded-lg ${
          (crmStatus as any)?.connected ? "bg-accent/10" : "bg-red-50"
        }`}>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              (crmStatus as any)?.connected ? "bg-accent" : "bg-red-500"
            }`}></div>
            <span className={`text-sm font-medium ${
              (crmStatus as any)?.connected ? "text-accent" : "text-red-600"
            }`}>
              Salesforce
            </span>
          </div>
          <div className={`text-xs ${
            (crmStatus as any)?.connected ? "text-accent" : "text-red-600"
          }`}>
            {(crmStatus as any)?.connected ? "Connected" : "Disconnected"}
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <Button
          variant="outline"
          className="w-full h-10"
          onClick={() => window.location.href = "/api/logout"}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
