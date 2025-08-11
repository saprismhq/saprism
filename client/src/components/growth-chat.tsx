import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Send, Loader2, User, Bot } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
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
}

export function GrowthChat({ meeting, initialContext, onContextUsed }: GrowthChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isWelcomeShown, setIsWelcomeShown] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
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
      setMessages(prev => [...prev, assistantMessage]);
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
    if (initialContext && !isWelcomeShown) {
      setInputValue(initialContext);
      setIsWelcomeShown(true);
      onContextUsed?.();
    }
  }, [initialContext, isWelcomeShown, onContextUsed]);

  // Show welcome message when meeting changes
  useEffect(() => {
    if (meeting && !isWelcomeShown) {
      const welcomeMessage: ChatMessage = {
        id: `welcome-${meeting.id}`,
        role: "assistant",
        content: `Hi! I'm your Growth Guide assistant. I can help you with sales strategies, deal analysis, and methodologies for your meeting with ${meeting.clientName}${meeting.clientCompany ? ` from ${meeting.clientCompany}` : ''}. What would you like to discuss?`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
      setIsWelcomeShown(true);
    }
  }, [meeting, isWelcomeShown]);

  // Reset when meeting changes
  useEffect(() => {
    if (meeting) {
      setMessages([]);
      setIsWelcomeShown(false);
    }
  }, [meeting?.id]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !meeting) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Prepare meeting context
    const meetingContext = `
      Meeting with: ${meeting.clientName}${meeting.clientCompany ? ` from ${meeting.clientCompany}` : ''}
      Deal Type: ${meeting.dealType || 'Not specified'}
      Recent Notes: ${meeting.notes?.[0]?.content || 'No notes yet'}
      AI Analysis: ${meeting.notes?.[0]?.aiAnalysis ? JSON.stringify(meeting.notes[0].aiAnalysis) : 'No analysis yet'}
    `;

    chatMutation.mutate({
      message: inputValue.trim(),
      meetingContext: meetingContext.trim(),
    });

    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about sales strategies, deal analysis, or methodology..."
            className="flex-1"
            disabled={chatMutation.isPending}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || chatMutation.isPending}
            size="sm"
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