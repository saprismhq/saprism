import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Save, FolderSync, Mic, Clock, Tag, Brain } from "lucide-react";
import type { MeetingWithNotes, AIAnalysisResult } from "@shared/schema";

interface NotesPanelProps {
  meeting: MeetingWithNotes | undefined;
  isLoading: boolean;
  onAnalyzing?: (isAnalyzing: boolean) => void; // Callback to notify parent about analysis state
}

export function NotesPanel({ meeting, isLoading, onAnalyzing }: NotesPanelProps) {
  const { toast } = useToast();
  const [noteContent, setNoteContent] = useState("");
  const [lastAnalysis, setLastAnalysis] = useState<AIAnalysisResult | null>(null);
  const [analysisDebounce, setAnalysisDebounce] = useState<NodeJS.Timeout | null>(null);

  // Auto-save functionality
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null);
  const [previousMeetingId, setPreviousMeetingId] = useState<number | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);

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

  // Update note content when meeting changes
  useEffect(() => {
    if (meeting && meeting.notes && meeting.notes.length > 0) {
      setNoteContent(meeting.notes[0].content);
      setLastAnalysis(meeting.notes[0].aiAnalysis as AIAnalysisResult);
    } else {
      setNoteContent("");
      setLastAnalysis(null);
    }
  }, [meeting]);

  // Keep the coaching mutation for manual triggers (if needed)
  const generateCoachingMutation = useMutation({
    mutationFn: async ({ content, dealStage, meetingId }: { content: string; dealStage: string; meetingId: number }) => {
      const response = await apiRequest("POST", "/api/ai/coaching", { content, dealStage, meetingId });
      return response.json();
    },
    onSuccess: (suggestions: any) => {
      console.log("Coaching suggestions generated successfully:", suggestions);
      // Invalidate meeting data to refresh coaching suggestions
      queryClient.invalidateQueries({ queryKey: ["/api/meetings", meeting?.id] });
      queryClient.invalidateQueries({ queryKey: ["/api/meetings"] });
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
      // Notify parent that analysis is starting
      onAnalyzing?.(true);
      const response = await apiRequest("POST", "/api/ai/analyze", { content, meetingId });
      return response.json();
    },
    onSuccess: (result: any) => {
      // Notify parent that analysis is complete
      onAnalyzing?.(false);
      // Handle both old format (just analysis) and new format (analysis + coaching)
      if (result.analysis) {
        setLastAnalysis(result.analysis);
        console.log("AI Analysis completed:", result.analysis);
        if (result.coachingSuggestions) {
          console.log("Coaching suggestions generated simultaneously:", result.coachingSuggestions);
        }
      } else {
        // Fallback for old format
        setLastAnalysis(result);
        console.log("AI Analysis completed (old format):", result);
      }
      
      // Invalidate meeting data to refresh both AI analysis and coaching suggestions
      console.log("Invalidating queries for meeting:", meeting?.id);
      
      try {
        // Use safer invalidation approach without removing queries immediately
        queryClient.invalidateQueries({ queryKey: ["meetings", "detail", meeting?.id] });
        queryClient.invalidateQueries({ queryKey: ["meetings", "list"] });
        
        // Force refetch after a delay to ensure backend operations complete
        setTimeout(() => {
          console.log("Force refetching meeting data for:", meeting?.id);
          queryClient.refetchQueries({ queryKey: ["meetings", "detail", meeting?.id] }).catch(console.error);
        }, 1000);
      } catch (error) {
        console.error("Error invalidating queries:", error);
      }
    },
    onError: (error) => {
      // Notify parent that analysis is complete (even on error)
      onAnalyzing?.(false);
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

    // Clear existing debounce
    if (analysisDebounce) {
      clearTimeout(analysisDebounce);
    }

    // Set new debounce for analysis
    if (value.trim().length > 50 && meeting?.id) {
      const timeout = setTimeout(() => {
        analyzeNotesMutation.mutate({ content: value, meetingId: meeting.id });
      }, 2000);
      setAnalysisDebounce(timeout);
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

  // Add timestamp
  const addTimestamp = () => {
    const timestamp = new Date().toLocaleTimeString();
    const newContent = noteContent + `\n\n[${timestamp}] `;
    setNoteContent(newContent);
  };

  if (isLoading) {
    return (
      <section className="flex-1 bg-white border-r border-gray-200">
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
      <section className="flex-1 bg-white border-r border-gray-200">
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
      <header className="px-6 py-4 border-b border-gray-100 bg-white flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Meeting Notes</h2>
            <p className="text-sm text-gray-500 mt-1">
              {meeting.clientCompany ? `${meeting.clientCompany} - ${meeting.clientName}` : meeting.clientName}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={handleSave}
              disabled={saveNoteMutation.isPending || !noteContent.trim()}
              className="h-9"
            >
              <Save className="w-4 h-4 mr-2" />
              {saveNoteMutation.isPending ? "Saving..." : "Save"}
            </Button>
            {isAutoSaving && (
              <div className="flex items-center text-sm text-gray-500">
                <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                Auto-saving...
              </div>
            )}
            <Button
              onClick={handleCrmSync}
              disabled={syncToCrmMutation.isPending || !noteContent.trim()}
              className="bg-primary hover:bg-primary/90 h-9"
            >
              <FolderSync className="w-4 h-4 mr-2" />
              {syncToCrmMutation.isPending ? "Syncing..." : "Sync to CRM"}
            </Button>
          </div>
        </div>
      </header>

      {/* Notes Input Area */}
      <div className="flex-1 flex flex-col p-6 min-h-0">
        {/* Quick Actions */}
        <div className="flex items-center space-x-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={addTimestamp}
          >
            <Clock className="w-4 h-4 mr-1" />
            Timestamp
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              toast({
                title: "Voice Input",
                description: "Voice input feature coming soon!",
              });
            }}
          >
            <Mic className="w-4 h-4 mr-1" />
            Voice Input
          </Button>
        </div>

        {/* Notes Textarea */}
        <div className="flex-1 mb-4">
          <Textarea
            value={noteContent}
            onChange={(e) => handleNoteChange(e.target.value)}
            placeholder="Start typing your meeting notes here... AI will analyze and provide coaching suggestions in real-time."
            className="h-full resize-none focus:ring-2 focus:ring-primary focus:border-primary text-base"
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
