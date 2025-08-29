import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Save, FolderSync, Tag, Brain, Calendar } from "lucide-react";
import { RichTextEditor } from "./rich-text-editor";
import { UserDropdown } from "./user-dropdown";
import type { MeetingWithNotes, AIAnalysisResult } from "@shared/schema";

interface NotesPanelProps {
  meeting: MeetingWithNotes | undefined;
  isLoading: boolean;
  transcriptionText?: string;
}

export function NotesPanel({ meeting, isLoading, transcriptionText }: NotesPanelProps) {
  const { toast } = useToast();
  const [noteContent, setNoteContent] = useState("");
  const [lastAnalysis, setLastAnalysis] = useState<AIAnalysisResult | null>(null);
  const [analysisDebounce, setAnalysisDebounce] = useState<NodeJS.Timeout | null>(null);
  const [showTranscriptionBanner, setShowTranscriptionBanner] = useState(false);

  // Auto-save functionality
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null);
  const [previousMeetingId, setPreviousMeetingId] = useState<number | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [currentMeetingId, setCurrentMeetingId] = useState<number | null>(null);
  const [isActivelyTyping, setIsActivelyTyping] = useState<boolean>(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  // Auto-save when content changes
  useEffect(() => {
    if (meeting && noteContent.trim() && noteContent !== (meeting.notes[0]?.content || "")) {
      // Clear existing timeout
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }

      // Set new timeout for auto-save
      const timeout = setTimeout(() => {
        setIsAutoSaving(true);
        saveNoteMutation.mutate({ content: noteContent, meetingId: meeting.id, isAutoSave: true });
      }, 2000); // Auto-save after 2 seconds of inactivity

      setAutoSaveTimeout(timeout);
    }

    return () => {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
    };
  }, [noteContent, meeting?.id]);

  // Save current note before switching meetings
  useEffect(() => {
    if (previousMeetingId && previousMeetingId !== meeting?.id && noteContent.trim()) {
      // Only save if content has changed from what's already saved
      saveNoteMutation.mutate({ content: noteContent, meetingId: previousMeetingId, isAutoSave: true });
    }
    setPreviousMeetingId(meeting?.id || null);
  }, [meeting?.id]);

  // Handle transcription text updates
  useEffect(() => {
    if (transcriptionText && transcriptionText !== noteContent) {
      // Check if we need to add the header (only add once)
      const needsHeader = !noteContent.includes('--- Live Transcription ---');
      const header = needsHeader ? (noteContent.trim() ? '\n\n--- Live Transcription ---\n\n' : '--- Live Transcription ---\n\n') : '';
      
      // If header exists, replace the transcription section, otherwise append
      let updatedContent;
      if (needsHeader) {
        updatedContent = noteContent + header + transcriptionText;
      } else {
        // Replace existing transcription content after the header
        const headerIndex = noteContent.indexOf('--- Live Transcription ---');
        if (headerIndex !== -1) {
          const beforeHeader = noteContent.substring(0, headerIndex);
          // Format with proper line breaks: header on one line, bullet points below
          updatedContent = beforeHeader + '--- Live Transcription ---\n\n' + transcriptionText;
        } else {
          updatedContent = noteContent + '\n\n--- Live Transcription ---\n\n' + transcriptionText;
        }
      }
      
      setNoteContent(updatedContent);
      setShowTranscriptionBanner(true);
      
      // Auto-hide banner after 3 seconds
      setTimeout(() => setShowTranscriptionBanner(false), 3000);
    }
  }, [transcriptionText]);

  // Update note content when meeting changes and reset mutation states
  useEffect(() => {
    const meetingId = meeting?.id || null;
    
    // If this is a different meeting, reset mutation states and analyzing state
    if (currentMeetingId !== meetingId) {
      setCurrentMeetingId(meetingId);
      
      // Meeting changed - reset states
      
      // Reset mutation states to prevent phantom loading indicators
      analyzeNotesMutation.reset();
      saveNoteMutation.reset();
      syncToCrmMutation.reset();
      generateCoachingMutation.reset();
    }
    
    if (meeting && meeting.notes && meeting.notes.length > 0) {
      setNoteContent(meeting.notes[0].content);
      setLastAnalysis(meeting.notes[0].aiAnalysis as AIAnalysisResult);
    } else {
      setNoteContent("");
      setLastAnalysis(null);
    }
  }, [meeting, currentMeetingId]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, []);

  // Keep the coaching mutation for manual triggers (if needed)
  const generateCoachingMutation = useMutation({
    mutationFn: async ({ content, dealStage, meetingId }: { content: string; dealStage: string; meetingId: number }) => {
      const response = await apiRequest("POST", "/api/ai/coaching", { content, dealStage, meetingId });
      return response.json();
    },
    onSuccess: (suggestions: any) => {
      console.log("Coaching suggestions generated successfully:", suggestions);
      // Only invalidate queries if user is not actively typing
      if (!isActivelyTyping) {
        queryClient.invalidateQueries({ queryKey: ["/api/meetings", meeting?.id] });
        queryClient.invalidateQueries({ queryKey: ["/api/meetings"] });
      } else {
        console.log("Skipping coaching query invalidation - user is actively typing");
        // Schedule invalidation for when user stops typing
        setTimeout(() => {
          if (!isActivelyTyping) {
            queryClient.invalidateQueries({ queryKey: ["/api/meetings", meeting?.id] });
            queryClient.invalidateQueries({ queryKey: ["/api/meetings"] });
          }
        }, 3000);
      }
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      console.error("Coaching generation error:", error);
    },
  });

  // AI Analysis mutation (now includes coaching suggestions)
  const analyzeNotesMutation = useMutation({
    mutationFn: async ({ content, meetingId }: { content: string; meetingId: number }) => {
      // Starting analysis
      const response = await apiRequest("POST", "/api/ai/analyze", { content, meetingId });
      return response.json();
    },
    onSuccess: (result: any) => {
      // Analysis complete
      // Handle both old format (just analysis) and new format (analysis + coaching)
      if (result.analysis) {
        setLastAnalysis(result.analysis);
        console.log("AI Analysis completed:", result.analysis);
        
        // Automatically trigger coaching suggestions after analysis completes (optimized threshold)
        if (meeting?.id && noteContent.trim().length > 40) { // Reduced threshold for faster response
          const dealStage = result.analysis.dealStage || "discovery";
          generateCoachingMutation.mutate({ 
            content: noteContent, 
            dealStage, 
            meetingId: meeting.id 
          });
        }
        
        if (result.coachingSuggestions) {
          console.log("Coaching suggestions generated simultaneously:", result.coachingSuggestions);
        }
      } else {
        // Fallback for old format
        setLastAnalysis(result);
        console.log("AI Analysis completed (old format):", result);
        
        // Automatically trigger coaching suggestions for old format too
        if (meeting?.id && noteContent.trim().length > 50) {
          const dealStage = result.dealStage || "discovery";
          generateCoachingMutation.mutate({ 
            content: noteContent, 
            dealStage, 
            meetingId: meeting.id 
          });
        }
      }
      
      // Only invalidate queries if user is not actively typing to prevent text input interruption
      if (!isActivelyTyping) {
        console.log("Invalidating queries for meeting:", meeting?.id);
        
        try {
          // Use safer invalidation approach without removing queries immediately
          queryClient.invalidateQueries({ queryKey: ["meetings", "detail", meeting?.id] });
          queryClient.invalidateQueries({ queryKey: ["meetings", "list"] });
          
          // Faster refetch for immediate UI updates
          setTimeout(() => {
            console.log("Force refetching meeting data for:", meeting?.id);
            queryClient.refetchQueries({ queryKey: ["meetings", "detail", meeting?.id] }).catch(console.error);
          }, 300);
        } catch (error) {
          console.error("Error invalidating queries:", error);
        }
      } else {
        console.log("Skipping query invalidation - user is actively typing");
        // Schedule invalidation for when user stops typing
        setTimeout(() => {
          if (!isActivelyTyping) {
            console.log("Delayed invalidation after typing stopped");
            queryClient.invalidateQueries({ queryKey: ["meetings", "detail", meeting?.id] });
            queryClient.invalidateQueries({ queryKey: ["meetings", "list"] });
          }
        }, 3000); // Wait 3 seconds after typing stops
      }
    },
    onError: (error) => {
      // Analysis failed
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      console.error("Analysis error:", error);
    },
  });

  // Save note mutation
  const saveNoteMutation = useMutation({
    mutationFn: async ({ content, meetingId, isAutoSave = false }: { content: string; meetingId: number; isAutoSave?: boolean }) => {
      const noteData = {
        content,
        meetingId,
        aiAnalysis: lastAnalysis,
      };

      if (meeting?.notes && meeting.notes.length > 0) {
        // Update existing note
        const response = await apiRequest("PATCH", `/api/notes/${meeting.notes[0].id}`, noteData);
        return response.json();
      } else {
        // Create new note
        const response = await apiRequest("POST", "/api/notes", noteData);
        return response.json();
      }
    },
    onSuccess: (data, variables) => {
      if (!variables.isAutoSave) {
        toast({
          title: "Note Saved",
          description: "Your meeting notes have been saved successfully.",
        });
      }
      setIsAutoSaving(false);
      // Invalidate both meeting details and meeting list queries
      queryClient.invalidateQueries({ queryKey: ["/api/meetings", meeting?.id] });
      queryClient.invalidateQueries({ queryKey: ["/api/meetings"] });
    },
    onError: (error, variables) => {
      setIsAutoSaving(false);
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      if (!variables.isAutoSave) {
        toast({
          title: "Error",
          description: "Failed to save note",
          variant: "destructive",
        });
      }
    },
  });

  // CRM sync mutation
  const syncToCrmMutation = useMutation({
    mutationFn: async (meetingId: number) => {
      const response = await apiRequest("POST", "/api/crm/sync", { meetingId });
      return response.json();
    },
    onSuccess: (result) => {
      if (result.success) {
        toast({
          title: "Success",
          description: "Notes synced to Salesforce successfully!",
        });
      } else {
        toast({
          title: "FolderSync Failed",
          description: result.error || "Failed to sync to CRM",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to sync to CRM",
        variant: "destructive",
      });
    },
  });

  // Handle note content changes with debounced analysis
  const handleNoteChange = (value: string) => {
    setNoteContent(value);

    // Track active typing state
    setIsActivelyTyping(true);
    
    // Clear existing typing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    // Set typing state to false after user stops typing for 2 seconds
    const newTypingTimeout = setTimeout(() => {
      setIsActivelyTyping(false);
    }, 2000);
    setTypingTimeout(newTypingTimeout);

    // Clear existing debounce
    if (analysisDebounce) {
      clearTimeout(analysisDebounce);
    }

    // Set new debounce for analysis - skip for live transcription to prevent delays
    if (value.trim().length > 30 && meeting?.id) {
      // Skip AI analysis for live transcription updates to maintain real-time performance
      const isLiveTranscription = value.includes('--- Live Transcription ---') || 
                                  value.includes('**Live Call Notes:**');
      
      if (!isLiveTranscription) {
        const timeout = setTimeout(() => {
          console.log("Triggering AI analysis for content:", value.substring(0, 100) + "...");
          analyzeNotesMutation.mutate({ content: value, meetingId: meeting.id });
        }, 800);
        setAnalysisDebounce(timeout);
      }
    }
  };

  // Handle save
  const handleSave = () => {
    if (meeting?.id && noteContent.trim()) {
      saveNoteMutation.mutate({ content: noteContent, meetingId: meeting.id });
    }
  };

  // Handle CRM sync
  const handleCrmSync = () => {
    if (meeting?.id) {
      syncToCrmMutation.mutate(meeting.id);
    }
  };


  if (isLoading) {
    return (
      <section className="flex-1 bg-white border-r border-gray-200 flex flex-col h-full">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading meeting...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!meeting) {
    return (
      <section className="flex-1 bg-white border-r border-gray-200 flex flex-col h-full">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Select a meeting to start taking notes</p>
            <p className="text-sm text-gray-500">Create a new meeting or select from recent meetings</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex-1 bg-white flex flex-col h-full">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-100 bg-white flex-shrink-0 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-900">Meeting Notes</h2>
          <p className="text-sm text-gray-500 truncate">
            {meeting.clientName}
            {meeting.clientCompany && (
              <span> at {meeting.clientCompany}</span>
            )}
          </p>
        </div>
        <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              disabled={saveNoteMutation.isPending || !noteContent.trim()}
              className="h-9 w-9 p-0 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              title={saveNoteMutation.isPending ? "Saving..." : "Save"}
            >
              <Save className="w-4 h-4" />
            </Button>
            {isAutoSaving && (
              <div className="flex items-center text-sm text-gray-500">
                <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                Auto-saving...
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCrmSync}
              disabled={syncToCrmMutation.isPending || !noteContent.trim()}
              className="h-9 w-9 p-0 text-primary hover:text-primary/80 hover:bg-primary/10 rounded-lg"
              title={syncToCrmMutation.isPending ? "Syncing..." : "Sync to CRM"}
            >
              <FolderSync className="w-4 h-4" />
            </Button>
            <UserDropdown />
          </div>
      </header>

      {/* Transcription Banner */}
      {showTranscriptionBanner && (
        <div className="bg-green-50 border-l-4 border-green-400 p-3 mx-6 rounded-r-lg">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
            <p className="text-sm text-green-700 font-medium">
              Live transcription added to notes
            </p>
          </div>
        </div>
      )}

      {/* Notes Input Area */}
      <div className="flex-1 flex flex-col p-6 min-h-0 overflow-hidden">
        {/* Rich Text Editor */}
        <div className="flex-1 mb-4 min-h-0 overflow-hidden">
          <RichTextEditor
            content={noteContent}
            onChange={handleNoteChange}
            placeholder="Start typing your meeting notes here... AI will analyze and provide coaching suggestions in real-time. Live call transcription will appear automatically."
            className="h-full"
          />
        </div>

        {/* AI Analysis Summary */}
        {lastAnalysis && (
          <Card className="border-blue-200 bg-blue-50/50 flex-shrink-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-900 flex items-center text-base">
                <Brain className="w-4 h-4 mr-2" />
                AI Analysis Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-medium text-blue-800">Deal Stage:</span>
                  <span className="text-blue-600 ml-2 capitalize">{lastAnalysis.dealStage}</span>
                </div>
                <div>
                  <span className="font-medium text-blue-800">Pain Points:</span>
                  <span className="text-blue-600 ml-2">{lastAnalysis.painPoints.length} identified</span>
                </div>
                <div>
                  <span className="font-medium text-blue-800">Budget:</span>
                  <span className="text-blue-600 ml-2">{lastAnalysis.budget}</span>
                </div>
                <div>
                  <span className="font-medium text-blue-800">Timeline:</span>
                  <span className="text-blue-600 ml-2">{lastAnalysis.timeline}</span>
                </div>
              </div>
              {lastAnalysis.keyStakeholders.length > 0 && (
                <div className="mt-3 text-sm">
                  <span className="font-medium text-blue-800">Key Stakeholders:</span>
                  <span className="text-blue-600 ml-2">{lastAnalysis.keyStakeholders.join(", ")}</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Analysis loading indicator */}
        {analyzeNotesMutation.isPending && (
          <div className="flex items-center justify-center p-3 bg-blue-50 rounded-lg flex-shrink-0">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
            <span className="text-sm text-blue-600">AI analyzing your notes...</span>
          </div>
        )}
      </div>
    </section>
  );
}
