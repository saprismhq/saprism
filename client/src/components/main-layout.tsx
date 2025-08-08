import { useState } from 'react';
import { ChevronUp, ChevronDown, Phone } from 'lucide-react';
import { CallInterface } from './call-interface';
import { NotesPanel } from './notes-panel';
import { CoachingPanel } from './coaching-panel';
import { Sidebar } from './sidebar';
import type { Meeting, MeetingWithSessions } from '@shared/schema';
import { Button } from '@/components/ui/button';

interface MainLayoutProps {
  meetings: Meeting[];
  activeMeetingId: number | null;
  activeMeeting: MeetingWithSessions | undefined;
  activeMeetingLoading: boolean;
  onSelectMeeting: (id: number) => void;
  onCreateMeeting: (data: { clientName: string; clientCompany: string }) => void;
  onDeleteMeeting: (id: number) => void;
  createMeetingLoading: boolean;
  deleteMeetingLoading: boolean;
}

export function MainLayout({
  meetings,
  activeMeetingId,
  activeMeeting,
  activeMeetingLoading,
  onSelectMeeting,
  onCreateMeeting,
  onDeleteMeeting,
  createMeetingLoading,
  deleteMeetingLoading,
}: MainLayoutProps) {
  const [isCallPanelOpen, setIsCallPanelOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-50 flex relative">
      {/* Fixed Sidebar */}
      <Sidebar
        meetings={meetings}
        activeMeetingId={activeMeetingId}
        onSelectMeeting={onSelectMeeting}
        onCreateMeeting={onCreateMeeting}
        onDeleteMeeting={onDeleteMeeting}
        createMeetingLoading={createMeetingLoading}
        deleteMeetingLoading={deleteMeetingLoading}
      />

      {/* Main Content - Two Panel Layout */}
      <div className="flex-1 flex min-w-0">
        {/* Notes Panel */}
        <div className="flex-1 min-w-0">
          <NotesPanel
            key={activeMeetingId}
            meeting={activeMeeting}
            isLoading={activeMeetingLoading}
          />
        </div>

        {/* Coaching Panel */}
        <div className="w-96 border-l border-gray-200">
          <CoachingPanel
            key={activeMeetingId}
            meeting={activeMeeting}
            isLoading={activeMeetingLoading}
          />
        </div>
      </div>

      {/* Call Panel Toggle Button */}
      {activeMeeting && (
        <Button
          onClick={() => setIsCallPanelOpen(!isCallPanelOpen)}
          className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transition-all duration-200"
          size="icon"
        >
          <Phone className="h-6 w-6" />
        </Button>
      )}

      {/* Collapsible Call Panel */}
      <div
        className={`fixed bottom-0 left-80 right-0 bg-white border-t border-gray-200 shadow-2xl transition-transform duration-300 ease-in-out z-40 ${
          isCallPanelOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ height: '400px' }}
      >
        {/* Call Panel Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-gray-900">Call</h2>
            {activeMeeting && (
              <span className="text-sm text-gray-600">
                with {activeMeeting.clientName}
              </span>
            )}
          </div>
          <Button
            onClick={() => setIsCallPanelOpen(false)}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        {/* Call Interface Content */}
        <div className="flex-1 p-4 overflow-hidden">
          <div className="h-full">
            <CallInterface
              meeting={activeMeeting}
              isLoading={activeMeetingLoading}
            />
          </div>
        </div>

        {/* Resize Handle */}
        <div
          className="absolute top-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-primary/10 transition-colors"
          onMouseDown={(e) => {
            e.preventDefault();
            // Add resize functionality if needed in the future
          }}
        >
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Backdrop for call panel */}
      {isCallPanelOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-30"
          onClick={() => setIsCallPanelOpen(false)}
        />
      )}
    </div>
  );
}