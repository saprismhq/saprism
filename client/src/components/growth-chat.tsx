import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Send, Loader2, User, Bot } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { MeetingWithNotes, MeetingWithSessions } from "@shared/schema";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface GrowthChatProps {
  meeting: MeetingWithNotes | MeetingWithSessions | undefined | null;
  initialContext?: string;
  onContextUsed?: () => void;
  messages?: ChatMessage[];
  onMessagesChange?: (messages: ChatMessage[]) => void;
  useAllMeetingsContext?: boolean;
  clientMeetings?: any[];
}

export function GrowthChat({ 
  meeting, 
  initialContext, 
  onContextUsed, 
  messages = [], 
  onMessagesChange,
  useAllMeetingsContext = true,
  clientMeetings = []
}: GrowthChatProps) {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();


  // Chat mutation
  const chatMutation = useMutation({
    mutationFn: async ({ message, meetingContext }: { message: string; meetingContext: string }) => {
      const response = await apiRequest("POST", "/api/ai/chat", { 
        message, 
        meetingContext,
        conversationHistory: messages.slice(-5) // Send last 5 messages for context
      });
      return response.json();
    },
    onSuccess: (data) => {
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };
      onMessagesChange?.([...messages, assistantMessage]);
    },
    onError: (error) => {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to get response from Growth Guide",
        variant: "destructive",
      });
    },
  });

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle initial context
  useEffect(() => {
    if (initialContext) {
      setInputValue(initialContext);
      onContextUsed?.();
    }
  }, [initialContext, onContextUsed]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !meeting) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    onMessagesChange?.([...messages, userMessage]);
    
    // Prepare meeting context based on toggle setting
    let meetingContext = `
      Meeting with: ${meeting.clientName}${meeting.clientCompany ? ` from ${meeting.clientCompany}` : ''}
      Deal Type: ${meeting.dealType || 'Not specified'}
    `;

    if (useAllMeetingsContext && clientMeetings.length > 0) {
      // Build context from all client meetings
      meetingContext += `\n\nMeeting History (${clientMeetings.length} meetings):`;
      
      clientMeetings
        .sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .forEach((mtg: any, index: number) => {
          meetingContext += `\n\n--- Meeting ${index + 1} (${new Date(mtg.createdAt).toLocaleDateString()}) ---`;
          if (mtg.notes && mtg.notes.length > 0) {
            mtg.notes.forEach((note: any) => {
              if (note.content) {
                meetingContext += `\nNotes: ${note.content}`;
              }
              if (note.aiAnalysis) {
                meetingContext += `\nAnalysis: ${JSON.stringify(note.aiAnalysis)}`;
              }
            });
          }
        });
    } else {
      // Only use current meeting context
      meetingContext += `
        Current Meeting Notes: ${meeting.notes?.[0]?.content || 'No notes yet'}
        AI Analysis: ${meeting.notes?.[0]?.aiAnalysis ? JSON.stringify(meeting.notes[0].aiAnalysis) : 'No analysis yet'}
      `;
    }

    chatMutation.mutate({
      message: inputValue.trim(),
      meetingContext: meetingContext.trim(),
    });

    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!meeting) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center text-gray-500">
          <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No Meeting Selected</h3>
          <p className="text-sm">Select a meeting to start chatting with your Growth Guide</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <h3 className="font-medium text-gray-900">Growth Chat</h3>
        <p className="text-sm text-gray-600">
          Discussing: {meeting.clientName}
          {meeting.clientCompany && ` (${meeting.clientCompany})`}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.role === "user" ? "bg-primary text-white ml-2" : "bg-gray-200 text-gray-600 mr-2"
              }`}>
                {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`rounded-lg p-3 ${
                message.role === "user" 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-800"
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.role === "user" ? "text-primary-100" : "text-gray-500"
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {chatMutation.isPending && (
          <div className="flex justify-start">
            <div className="flex">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 text-gray-600 mr-2">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input - with padding to avoid Call button overlap */}
      <div className="p-4 pb-20 border-t border-gray-200 bg-white">
        <div className="flex items-end space-x-2">
          <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about sales strategies, deal analysis, or methodology..."
            className={cn(
              "flex-1 resize-none min-h-[40px] max-h-[120px] overflow-y-auto",
              "transition-all duration-200 ease-out"
            )}
            disabled={chatMutation.isPending}
            rows={1}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || chatMutation.isPending}
            size="sm"
            className="h-10 px-3"
          >
            {chatMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}