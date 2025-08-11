import { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { CallInterface } from './call-interface';
import { NotesPanel } from './notes-panel';
import { GrowthTabs } from './growth-tabs';
import { Sidebar } from './sidebar';
import type { Meeting, MeetingWithSessions } from '@shared/schema';

interface ResizableLayoutProps {
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

export function ResizableLayout({
  meetings,
  activeMeetingId,
  activeMeeting,
  activeMeetingLoading,
  onSelectMeeting,
  onCreateMeeting,
  onDeleteMeeting,
  createMeetingLoading,
  deleteMeetingLoading,
}: ResizableLayoutProps) {
  const [showCallInterface, setShowCallInterface] = useState(true);

  return (
    <div className="h-screen bg-gray-50 flex">
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

      {/* Resizable Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <PanelGroup direction="horizontal" className="flex-1">
          {/* Left Panel - Call Interface or Notes */}
          <Panel defaultSize={showCallInterface ? 45 : 60} minSize={30}>
            <div className="h-full flex flex-col">
              {/* Toggle buttons */}
              <div className="bg-white border-b border-gray-100 px-4 py-2">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowCallInterface(true)}
                    className={`px-3 py-1 text-sm rounded ${
                      showCallInterface
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Video Call
                  </button>
                  <button
                    onClick={() => setShowCallInterface(false)}
                    className={`px-3 py-1 text-sm rounded ${
                      !showCallInterface
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Meeting Notes
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-4">
                {showCallInterface ? (
                  <CallInterface
                    meeting={activeMeeting}
                    isLoading={activeMeetingLoading}
                  />
                ) : (
                  <div className="h-full">
                    <NotesPanel
                      key={activeMeetingId}
                      meeting={activeMeeting}
                      isLoading={activeMeetingLoading}
                    />
                  </div>
                )}
              </div>
            </div>
          </Panel>

          <PanelResizeHandle />

          {/* Middle Panel - Notes when call is active */}
          {showCallInterface && (
            <>
              <Panel defaultSize={35} minSize={25}>
                <div className="h-full bg-white">
                  <NotesPanel
                    key={activeMeetingId}
                    meeting={activeMeeting}
                    isLoading={activeMeetingLoading}
                  />
                </div>
              </Panel>
              
              <PanelResizeHandle />
            </>
          )}

          {/* Right Panel - Growth Center */}
          <Panel defaultSize={showCallInterface ? 20 : 40} minSize={20}>
            <GrowthTabs
              key={activeMeetingId}
              meeting={activeMeeting}
              isLoading={activeMeetingLoading}
            />
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}