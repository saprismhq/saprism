import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Lightbulb, ArrowLeftRight, MessageSquare, Route, Copy, Plus, Check } from "lucide-react";
import type { MeetingWithNotes, CoachingSuggestionContent } from "@shared/schema";

interface CoachingPanelProps {
  meeting: MeetingWithNotes | undefined;
  isLoading: boolean;
}

export function CoachingPanel({ meeting, isLoading }: CoachingPanelProps) {
  const { toast } = useToast();
  const [coachingSuggestions, setCoachingSuggestions] = useState<CoachingSuggestionContent | null>(null);
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());

  // Load existing coaching suggestions from the meeting
  useEffect(() => {
    if (meeting && meeting.coachingSuggestions && meeting.coachingSuggestions.length > 0) {
      const latestSuggestion = meeting.coachingSuggestions[0];
      if (latestSuggestion && latestSuggestion.content) {
        setCoachingSuggestions(latestSuggestion.content as CoachingSuggestionContent);
      }
    }
  }, [meeting]);

  // Generate coaching suggestions mutation
  const generateCoachingMutation = useMutation({
    mutationFn: async ({ content, dealStage, meetingId }: { content: string; dealStage: string; meetingId: number }) => {
      const response = await apiRequest("POST", "/api/ai/coaching", { content, dealStage, meetingId });
      return response.json();
    },
    onSuccess: (suggestions: CoachingSuggestionContent) => {
      setCoachingSuggestions(suggestions);
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

  // Mark suggestion as used mutation
  const markAsUsedMutation = useMutation({
    mutationFn: async (suggestionId: number) => {
      const response = await apiRequest("PUT", `/api/coaching/${suggestionId}/used`, {});
      return response.json();
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
      console.error("Error marking suggestion as used:", error);
    },
  });

  // Clear coaching suggestions when meeting changes
  useEffect(() => {
    setCoachingSuggestions(null);
    setCopiedItems(new Set());
  }, [meeting?.id]);

  // Generate coaching suggestions when meeting changes and no existing suggestions
  useEffect(() => {
    if (meeting && meeting.notes.length > 0 && (!meeting.coachingSuggestions || meeting.coachingSuggestions.length === 0)) {
      const latestNote = meeting.notes[0];
      const dealStage = latestNote.aiAnalysis?.dealStage || "discovery";
      
      generateCoachingMutation.mutate({
        content: latestNote.content,
        dealStage,
        meetingId: meeting.id,
      });
    }
  }, [meeting]);

  // Handle copy to clipboard
  const handleCopy = (text: string, itemId: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedItems(prev => new Set(prev).add(itemId));
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(itemId);
          return newSet;
        });
      }, 2000);
    });
  };

  // Handle adding next steps to CRM
  const handleAddToCrm = () => {
    toast({
      title: "Added to CRM",
      description: "Next steps have been added to your CRM tasks.",
    });
  };

  if (isLoading) {
    return (
      <section className="w-96 bg-gray-50 border-l border-gray-200 flex flex-col">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading insights...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!meeting) {
    return (
      <section className="w-96 bg-gray-50 border-l border-gray-200 flex flex-col">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Growth insights will appear here</p>
            <p className="text-sm text-gray-500">Start taking notes to get intelligent guidance</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-96 bg-gray-50 border-l border-gray-100 flex flex-col h-full">
      {/* Header */}
      <header className="px-6 py-4 bg-white border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Lightbulb className="w-4 h-4 mr-2 text-primary" />
            Growth Guide
          </h3>
          {meeting && meeting.notes.length > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const latestNote = meeting.notes[0];
                const dealStage = latestNote.aiAnalysis?.dealStage || "discovery";
                generateCoachingMutation.mutate({
                  content: latestNote.content,
                  dealStage,
                  meetingId: meeting.id,
                });
              }}
              disabled={generateCoachingMutation.isPending}
            >
              {generateCoachingMutation.isPending ? "Generating..." : "Refresh"}
            </Button>
          )}
        </div>
      </header>

      {/* Coaching Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {generateCoachingMutation.isPending && (
          <div className="flex items-center justify-center p-8">
            <div className="text-center">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-sm text-gray-600">Generating growth insights...</p>
            </div>
          </div>
        )}

        {coachingSuggestions && (
          <>
            {/* Suggested Questions */}
            {coachingSuggestions.questions && coachingSuggestions.questions.length > 0 && (
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-gray-900 flex items-center text-sm">
                    <MessageSquare className="w-4 h-4 mr-2 text-warning" />
                    Suggested Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-2">
                  {coachingSuggestions.questions.map((question, index) => (
                    <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-gray-800">{question}</p>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => handleCopy(question, `question-${index}`)}
                        className="mt-2 h-auto p-0 text-xs text-primary hover:text-primary/80"
                      >
                        {copiedItems.has(`question-${index}`) ? (
                          <>
                            <Check className="w-3 h-3 mr-1" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Pain-to-Value Mapping */}
            {coachingSuggestions.painMapping && coachingSuggestions.painMapping.length > 0 && (
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-gray-900 flex items-center text-sm">
                    <ArrowLeftRight className="w-4 h-4 mr-2 text-accent" />
                    Pain-to-Value Mapping
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  {coachingSuggestions.painMapping.map((mapping, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800">{mapping.pain}</p>
                        <p className="text-xs text-gray-600 mt-1">→ {mapping.value}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Next Steps Recommendations */}
            {coachingSuggestions.nextSteps && coachingSuggestions.nextSteps.length > 0 && (
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-gray-900 flex items-center text-sm">
                    <Route className="w-4 h-4 mr-2 text-accent" />
                    Next Steps
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {coachingSuggestions.nextSteps
                      .sort((a, b) => a.priority - b.priority)
                      .map((step, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${
                            step.priority === 1 ? "bg-accent" : 
                            step.priority === 2 ? "bg-warning" : "bg-gray-400"
                          }`}>
                            {step.priority}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800">{step.step}</p>
                            <p className="text-xs text-gray-600 mt-1">{step.description}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <Button
                    onClick={handleAddToCrm}
                    className="mt-4 w-full bg-accent hover:bg-accent/90 text-white h-9"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to CRM Tasks
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {!generateCoachingMutation.isPending && !coachingSuggestions && meeting.notes.length === 0 && (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-600 mb-2 text-sm">Start taking notes to get AI coaching</p>
            <p className="text-xs text-gray-500">
              The AI will analyze your notes and provide contextual coaching prompts and recommendations.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
