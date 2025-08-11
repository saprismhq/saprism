import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Copy, Check, ArrowLeftRight, Target, CheckSquare } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { MeetingWithNotes, MeetingWithSessions, CoachingSuggestionContent } from "@shared/schema";

interface GrowthGuideProps {
  meeting: MeetingWithNotes | MeetingWithSessions | undefined | null;
  onChatRedirect: (context: string) => void;
}

export function GrowthGuide({ meeting, onChatRedirect }: GrowthGuideProps) {
  const [coachingSuggestions, setCoachingSuggestions] = useState<CoachingSuggestionContent | null>(null);
  const [currentMeetingId, setCurrentMeetingId] = useState<number | null>(null);
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());
  const [isLoadingForMeeting, setIsLoadingForMeeting] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Generate coaching suggestions mutation
  const generateCoachingMutation = useMutation({
    mutationFn: async ({ content, dealStage, meetingId }: { content: string; dealStage: string; meetingId: number }) => {
      const response = await apiRequest("POST", "/api/ai/coaching", { content, dealStage, meetingId });
      return response.json();
    },
    onSuccess: (data) => {
      setCoachingSuggestions(data);
      queryClient.invalidateQueries({ queryKey: ["meetings", "detail", meeting?.id] });
    },
    onError: (error) => {
      console.error("Failed to generate coaching suggestions:", error);
      toast({
        title: "Error",
        description: "Failed to generate coaching suggestions",
        variant: "destructive",
      });
    },
  });

  // Mark suggestion as used mutation
  const markAsUsedMutation = useMutation({
    mutationFn: async (suggestionId: number) => {
      const response = await apiRequest("PATCH", `/api/coaching-suggestions/${suggestionId}/used`);
      return response.json();
    },
    onError: (error) => {
      console.error("Failed to mark suggestion as used:", error);
    },
  });

  // Load coaching suggestions when meeting changes
  useEffect(() => {
    try {
      const meetingId = meeting?.id || null;
      
      if (currentMeetingId !== meetingId) {
        setCurrentMeetingId(meetingId);
        setIsLoadingForMeeting(false);
        generateCoachingMutation.reset();
        markAsUsedMutation.reset();
      }
      
      if (!meeting) {
        setCoachingSuggestions(null);
        setCopiedItems(new Set());
        return;
      }

      if (meeting.coachingSuggestions && meeting.coachingSuggestions.length > 0) {
        const latestSuggestion = meeting.coachingSuggestions[0];
        if (latestSuggestion && latestSuggestion.content) {
          setCoachingSuggestions(latestSuggestion.content as CoachingSuggestionContent);
        }
      } else {
        setCoachingSuggestions(null);
      }
      
      setCopiedItems(new Set());
    } catch (error) {
      console.error("Error in growth guide useEffect:", error);
      setCoachingSuggestions(null);
      setCopiedItems(new Set());
    }
  }, [meeting, currentMeetingId]);

  // Monitor for coaching generation activity - immediate response
  useEffect(() => {
    if (!meeting?.id) return;
    setIsLoadingForMeeting(generateCoachingMutation.isPending);
  }, [generateCoachingMutation.isPending, meeting?.id]);

  // Enhanced loading state detection with immediate response
  useEffect(() => {
    if (!meeting?.id) return;

    if (generateCoachingMutation.isPending) {
      setIsLoadingForMeeting(true);
      return;
    }

    const checkAnalysisStatus = () => {
      const queries = queryClient.getQueryCache().getAll();
      const hasAnalysisQuery = queries.some(query => 
        query.queryKey.some(key => typeof key === 'string' && key.includes('/api/ai/analyze')) &&
        query.state.status === 'pending'
      );
      
      if (hasAnalysisQuery) {
        setIsLoadingForMeeting(true);
      } else {
        setIsLoadingForMeeting(false);
      }
    };

    const interval = setInterval(checkAnalysisStatus, 250);
    return () => clearInterval(interval);
  }, [meeting?.id, generateCoachingMutation.isPending]);

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

  // Handle chat redirection with context
  const handleChatClick = (section: string, content: string) => {
    const context = `I'd like to discuss the ${section} for this meeting. Here's the current context: ${content}`;
    onChatRedirect(context);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4">
        {isLoadingForMeeting && (
          <div className="flex items-center justify-center p-8">
            <div className="text-center">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-sm text-gray-600">Generating growth insights...</p>
            </div>
          </div>
        )}

        {!isLoadingForMeeting && coachingSuggestions && (
          <div className="space-y-6">
            {/* Strategic Questions */}
            {coachingSuggestions.questions && coachingSuggestions.questions.length > 0 && (
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-gray-900 flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-2 text-accent" />
                      Strategic Questions
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleChatClick("Strategic Questions", coachingSuggestions.questions?.join(", ") || "")}
                      className="h-6 px-2 text-xs"
                    >
                      <MessageCircle className="w-3 h-3 mr-1" />
                      Chat
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  {coachingSuggestions.questions.map((question, index) => (
                    <div key={index} className="flex items-start justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{question}</p>
                      </div>
                      <div className="flex gap-1 ml-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleChatClick("Strategic Question", question)}
                          className="h-6 px-2 text-xs"
                        >
                          <MessageCircle className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(question, `question-${index}`)}
                          className="h-6 px-2"
                        >
                          {copiedItems.has(`question-${index}`) ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Enhanced Pain-to-Value Mapping */}
            {coachingSuggestions.painMapping && coachingSuggestions.painMapping.length > 0 && (
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-gray-900 flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <ArrowLeftRight className="w-4 h-4 mr-2 text-accent" />
                      Pain-to-Value Mapping
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleChatClick("Pain-to-Value Mapping", JSON.stringify(coachingSuggestions.painMapping))}
                      className="h-6 px-2 text-xs"
                    >
                      <MessageCircle className="w-3 h-3 mr-1" />
                      Chat
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  {coachingSuggestions.painMapping.map((mapping, index) => {
                    const isOldFormat = (mapping as any).value !== undefined;
                    
                    if (isOldFormat) {
                      return (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800">{mapping.pain}</p>
                            <p className="text-xs text-gray-600 mt-1">→ {(mapping as any).value}</p>
                          </div>
                        </div>
                      );
                    }
                    
                    return (
                      <div key={index} className="border border-gray-100 rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-2 flex-1">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              (mapping.severity || 3) >= 4 ? 'bg-red-500' :
                              (mapping.severity || 3) >= 3 ? 'bg-orange-500' :
                              'bg-yellow-500'
                            }`}></div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold text-gray-900">{mapping.pain}</p>
                              {mapping.category && (
                                <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded mt-1">
                                  {mapping.category}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {mapping.businessImpact && (
                          <div className="bg-red-50 p-3 rounded">
                            <h4 className="text-xs font-medium text-red-800 mb-2">Business Impact</h4>
                            <div className="space-y-1 text-xs text-red-700">
                              {mapping.businessImpact.cost && <p>• Cost: {mapping.businessImpact.cost}</p>}
                              {mapping.businessImpact.productivity && <p>• Productivity: {mapping.businessImpact.productivity}</p>}
                              {mapping.businessImpact.risk && <p>• Risk: {mapping.businessImpact.risk}</p>}
                            </div>
                          </div>
                        )}

                        {mapping.technicalSolution && (
                          <div className="bg-blue-50 p-3 rounded">
                            <h4 className="text-xs font-medium text-blue-800 mb-1">Technical Solution</h4>
                            <p className="text-xs text-blue-700">{mapping.technicalSolution}</p>
                          </div>
                        )}

                        {mapping.businessValue && (
                          <div className="bg-green-50 p-3 rounded">
                            <h4 className="text-xs font-medium text-green-800 mb-2">Business Value Timeline</h4>
                            <div className="space-y-1 text-xs text-green-700">
                              {mapping.businessValue.immediate && <p>• 0-3 months: {mapping.businessValue.immediate}</p>}
                              {mapping.businessValue.mediumTerm && <p>• 3-12 months: {mapping.businessValue.mediumTerm}</p>}
                              {mapping.businessValue.longTerm && <p>• 12+ months: {mapping.businessValue.longTerm}</p>}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}

            {/* Strategic Framing & Positioning */}
            {coachingSuggestions.framing && (
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-gray-900 flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-2 text-accent" />
                      Strategic Framing & Positioning
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleChatClick("Strategic Framing & Positioning", JSON.stringify(coachingSuggestions.framing))}
                      className="h-6 px-2 text-xs"
                    >
                      <MessageCircle className="w-3 h-3 mr-1" />
                      Chat
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  {coachingSuggestions.framing.context && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 mb-2">Context Analysis</h4>
                      <p className="text-sm text-gray-600">{coachingSuggestions.framing.context}</p>
                    </div>
                  )}
                  
                  {coachingSuggestions.framing.suggestion && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 mb-2">Recommended Approach</h4>
                      <p className="text-sm text-gray-600">{coachingSuggestions.framing.suggestion}</p>
                    </div>
                  )}
                  
                  {coachingSuggestions.framing.valueProposition && (
                    <div className="bg-primary/5 p-3 rounded-lg">
                      <h4 className="text-xs font-semibold text-primary mb-2">Value Proposition</h4>
                      <p className="text-sm text-gray-800">{coachingSuggestions.framing.valueProposition}</p>
                    </div>
                  )}
                  
                  {coachingSuggestions.framing.differentiators && coachingSuggestions.framing.differentiators.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 mb-2">Key Differentiators</h4>
                      <ul className="space-y-1">
                        {coachingSuggestions.framing.differentiators.map((diff, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {diff}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Next Steps */}
            {coachingSuggestions.nextSteps && coachingSuggestions.nextSteps.length > 0 && (
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-gray-900 flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <CheckSquare className="w-4 h-4 mr-2 text-accent" />
                      Next Steps
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleChatClick("Next Steps", JSON.stringify(coachingSuggestions.nextSteps))}
                      className="h-6 px-2 text-xs"
                    >
                      <MessageCircle className="w-3 h-3 mr-1" />
                      Chat
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  {coachingSuggestions.nextSteps.map((step, index) => (
                    <div key={index} className="border border-gray-100 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900">{step.step}</h4>
                        <span className={`px-2 py-1 text-xs rounded ${
                          step.priority === 1 ? 'bg-red-100 text-red-800' :
                          step.priority === 2 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          Priority {step.priority}
                        </span>
                      </div>
                      
                      {step.description && (
                        <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                      )}
                      
                      {step.businessJustification && (
                        <div className="bg-blue-50 p-2 rounded text-xs">
                          <span className="font-medium text-blue-800">Why: </span>
                          <span className="text-blue-700">{step.businessJustification}</span>
                        </div>
                      )}
                      
                      {step.expectedOutcome && (
                        <div className="bg-green-50 p-2 rounded text-xs mt-1">
                          <span className="font-medium text-green-800">Expected: </span>
                          <span className="text-green-700">{step.expectedOutcome}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {!isLoadingForMeeting && !coachingSuggestions && (
          <div className="text-center py-12">
            <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Growth Insights Yet</h3>
            <p className="text-sm text-gray-600">
              Start taking notes to generate AI-powered coaching suggestions
            </p>
          </div>
        )}
      </div>
    </div>
  );
}