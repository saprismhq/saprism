import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Copy, Check, ArrowLeftRight, Target, CheckSquare, Lightbulb, BookOpen } from "lucide-react";
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
}

export function GrowthTabs({ meeting, isLoading }: GrowthTabsProps) {
  const [activeTab, setActiveTab] = useState("guide");
  const [chatContext, setChatContext] = useState<string>("");

  // Handle tab routing from Growth Guide
  const handleChatRedirect = (context: string) => {
    setChatContext(context);
    setActiveTab("chat");
  };

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
      <div className="p-4 border-b border-gray-200 bg-white flex-shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <h2 className="text-lg font-semibold text-gray-900">Growth Center</h2>
        </div>
        <p className="text-sm text-gray-600">AI-powered sales insights and methodology</p>
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
            />
          </TabsContent>

          <TabsContent value="chat" className="h-full m-0 data-[state=active]:flex data-[state=active]:flex-col">
            <GrowthChatComponent 
              meeting={meeting} 
              initialContext={chatContext}
              onContextUsed={() => setChatContext("")}
            />
          </TabsContent>

          <TabsContent value="method" className="h-full m-0 data-[state=active]:flex data-[state=active]:flex-col">
            <GrowthMethodComponent 
              meeting={meeting}
            />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}