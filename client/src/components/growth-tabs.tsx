import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Copy, Check, ArrowLeftRight, Target, CheckSquare, Lightbulb, BookOpen, History } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { MeetingWithNotes, MeetingWithSessions, CoachingSuggestionContent } from "@shared/schema";
import { GrowthGuide as GrowthGuideComponent } from "./growth-guide";
import { GrowthChat as GrowthChatComponent } from "./growth-chat";
import { GrowthMethod as GrowthMethodComponent } from "./growth-method";

interface GrowthTabsProps {
  meeting: MeetingWithNotes | MeetingWithSessions | undefined | null;
  isLoading: boolean;
  selectedClient?: any;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function GrowthTabs({ meeting, isLoading, selectedClient }: GrowthTabsProps) {
  const [activeTab, setActiveTab] = useState("guide");
  const [chatContext, setChatContext] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<Record<number, ChatMessage[]>>({});
  const [chatWelcomeShown, setChatWelcomeShown] = useState<Record<number, boolean>>({});
  const [meetingContextMode, setMeetingContextMode] = useState<"off" | "current" | "all">("all");

  // Fetch all meetings for context toggle description
  const { data: clientMeetings = [] } = useQuery({
    queryKey: ['/api/clients', meeting?.clientId, 'meetings'],
    queryFn: async () => {
      if (!meeting?.clientId) return [];
      const response = await apiRequest('GET', `/api/clients/${meeting.clientId}/meetings`);
      return response.json();
    },
    enabled: !!meeting?.clientId,
  });

  // Fetch client data from meeting's clientId
  const { data: clientFromMeeting } = useQuery({
    queryKey: ['/api/clients', meeting?.clientId],
    queryFn: async () => {
      if (!meeting?.clientId) return null;
      const response = await apiRequest('GET', `/api/clients/${meeting.clientId}`);
      return response.json();
    },
    enabled: !!meeting?.clientId,
  });

  // Use client from meeting or passed selectedClient
  const actualSelectedClient = selectedClient || clientFromMeeting;

  // Handle tab routing from Growth Guide
  const handleChatRedirect = (context: string) => {
    setChatContext(context);
    setActiveTab("chat");
  };

  // Initialize chat for new meeting
  useEffect(() => {
    if (meeting?.id && !chatWelcomeShown[meeting.id] && !chatMessages[meeting.id]) {
      const welcomeMessage: ChatMessage = {
        id: `welcome-${meeting.id}`,
        role: "assistant",
        content: `Hi! I'm your Growth Guide assistant. I can help you with sales strategies, deal analysis, and methodologies for your meeting with ${meeting.clientName}${meeting.clientCompany ? ` from ${meeting.clientCompany}` : ''}. What would you like to discuss?`,
        timestamp: new Date(),
      };
      
      setChatMessages(prev => ({
        ...prev,
        [meeting.id]: [welcomeMessage]
      }));
      
      setChatWelcomeShown(prev => ({
        ...prev,
        [meeting.id]: true
      }));
    }
  }, [meeting?.id, chatWelcomeShown, chatMessages]);

  if (isLoading) {
    return (
      <section className="h-full bg-gray-50 flex flex-col">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!meeting) {
    return (
      <section className="h-full bg-gray-50 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">No Meeting Selected</h3>
            <p className="text-sm">Select a meeting to access Growth insights</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="h-full bg-gray-50 flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-white flex-shrink-0 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <h2 className="text-lg font-semibold text-gray-900">Growth Center</h2>
          </div>
          <p className="text-sm text-gray-600">AI-powered sales insights and methodology</p>
        </div>
        
        {/* Meeting Context Selector */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-2">
            <History className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">Meeting Context</span>
          </div>
          <Select value={meetingContextMode} onValueChange={(value: "off" | "current" | "all") => setMeetingContextMode(value)}>
            <SelectTrigger className="w-48 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="off">
                <div className="flex flex-col">
                  <span className="font-medium">Off</span>
                  <span className="text-xs text-gray-500">No meeting context</span>
                </div>
              </SelectItem>
              <SelectItem value="current">
                <div className="flex flex-col">
                  <span className="font-medium">Current Opportunity</span>
                  <span className="text-xs text-gray-500">This meeting only</span>
                </div>
              </SelectItem>
              <SelectItem value="all">
                <div className="flex flex-col">
                  <span className="font-medium">All Opportunities</span>
                  <span className="text-xs text-gray-500">All client meetings{clientMeetings.length > 0 ? ` (${clientMeetings.length})` : ''}</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
        <div className="flex-shrink-0 px-4 pt-4">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200 p-1 rounded-lg h-11 shadow-sm">
            <TabsTrigger 
              value="guide" 
              className="text-sm font-medium transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md flex items-center gap-1.5 px-3"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              Guide
            </TabsTrigger>
            <TabsTrigger 
              value="chat" 
              className="text-sm font-medium transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md flex items-center gap-1.5 px-3"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Chat
            </TabsTrigger>
            <TabsTrigger 
              value="method" 
              className="text-sm font-medium transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md flex items-center gap-1.5 px-3"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Method
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 min-h-0">
          <TabsContent value="guide" className="h-full m-0 data-[state=active]:flex data-[state=active]:flex-col">
            <GrowthGuideComponent 
              meeting={meeting} 
              onChatRedirect={handleChatRedirect}
              useAllMeetingsContext={meetingContextMode === "all"}
            />
          </TabsContent>

          <TabsContent value="chat" className="h-full m-0 data-[state=active]:flex data-[state=active]:flex-col">
            <GrowthChatComponent 
              meeting={meeting} 
              initialContext={chatContext}
              onContextUsed={() => setChatContext("")}
              messages={meeting?.id ? chatMessages[meeting.id] || [] : []}
              onMessagesChange={(messages) => {
                if (meeting?.id) {
                  setChatMessages(prev => ({
                    ...prev,
                    [meeting.id]: messages
                  }));
                }
              }}
              meetingContextMode={meetingContextMode}
              clientMeetings={clientMeetings}
            />
          </TabsContent>

          <TabsContent value="method" className="h-full m-0 data-[state=active]:flex data-[state=active]:flex-col">
            <GrowthMethodComponent 
              meeting={meeting}
              selectedClient={actualSelectedClient}
            />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}