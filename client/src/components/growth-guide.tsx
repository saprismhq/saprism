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
  useAllMeetingsContext?: boolean;
}

export function GrowthGuide({ meeting, onChatRedirect, useAllMeetingsContext = true }: GrowthGuideProps) {
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
      <div className="p-4 space-y-4">
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
                              {mapping.businessImpact.cost && (
                                <div>
                                  {mapping.businessImpact.cost.startsWith('Ask:') ? (
                                    <div className="p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 italic">
                                      <strong>Cost Impact:</strong> {mapping.businessImpact.cost.replace('Ask:', '').trim()}
                                    </div>
                                  ) : (
                                    <p>• Cost: {mapping.businessImpact.cost}</p>
                                  )}
                                </div>
                              )}
                              {mapping.businessImpact.productivity && (
                                <div>
                                  {mapping.businessImpact.productivity.startsWith('Ask:') ? (
                                    <div className="p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 italic">
                                      <strong>Productivity:</strong> {mapping.businessImpact.productivity.replace('Ask:', '').trim()}
                                    </div>
                                  ) : (
                                    <p>• Productivity: {mapping.businessImpact.productivity}</p>
                                  )}
                                </div>
                              )}
                              {mapping.businessImpact.risk && (
                                <div>
                                  {mapping.businessImpact.risk.startsWith('Ask:') ? (
                                    <div className="p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 italic">
                                      <strong>Risk:</strong> {mapping.businessImpact.risk.replace('Ask:', '').trim()}
                                    </div>
                                  ) : (
                                    <p>• Risk: {mapping.businessImpact.risk}</p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {mapping.technicalSolution && (
                          <div className="bg-blue-50 p-3 rounded">
                            <h4 className="text-xs font-medium text-blue-800 mb-1">Technical Solution</h4>
                            {mapping.technicalSolution.startsWith('Ask:') ? (
                              <div className="p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 italic">
                                {mapping.technicalSolution.replace('Ask:', '').trim()}
                              </div>
                            ) : (
                              <p className="text-xs text-blue-700">{mapping.technicalSolution}</p>
                            )}
                          </div>
                        )}

                        {mapping.businessValue && (
                          <div className="bg-green-50 p-3 rounded">
                            <h4 className="text-xs font-medium text-green-800 mb-2">Business Value Timeline</h4>
                            <div className="space-y-1 text-xs text-green-700">
                              {mapping.businessValue.immediate && (
                                <div>
                                  {mapping.businessValue.immediate.startsWith('Ask:') ? (
                                    <div className="p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 italic">
                                      <strong>0-3 months:</strong> {mapping.businessValue.immediate.replace('Ask:', '').trim()}
                                    </div>
                                  ) : (
                                    <p>• 0-3 months: {mapping.businessValue.immediate}</p>
                                  )}
                                </div>
                              )}
                              {mapping.businessValue.mediumTerm && (
                                <div>
                                  {mapping.businessValue.mediumTerm.startsWith('Ask:') ? (
                                    <div className="p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 italic">
                                      <strong>3-12 months:</strong> {mapping.businessValue.mediumTerm.replace('Ask:', '').trim()}
                                    </div>
                                  ) : (
                                    <p>• 3-12 months: {mapping.businessValue.mediumTerm}</p>
                                  )}
                                </div>
                              )}
                              {mapping.businessValue.longTerm && (
                                <div>
                                  {mapping.businessValue.longTerm.startsWith('Ask:') ? (
                                    <div className="p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 italic">
                                      <strong>12+ months:</strong> {mapping.businessValue.longTerm.replace('Ask:', '').trim()}
                                    </div>
                                  ) : (
                                    <p>• 12+ months: {mapping.businessValue.longTerm}</p>
                                  )}
                                </div>
                              )}
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
              <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-4 bg-gradient-to-r from-primary/5 to-accent/10 rounded-t-lg">
                  <CardTitle className="text-gray-900 flex items-center justify-between text-base font-semibold">
                    <div className="flex items-center">
                      <Target className="w-5 h-5 mr-3 text-primary" />
                      Strategic Framing & Positioning
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleChatClick("Strategic Framing & Positioning", JSON.stringify(coachingSuggestions.framing))}
                      className="h-8 px-3 text-xs hover:bg-white/80 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                      Chat
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-5">
                  {coachingSuggestions.framing.context && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        Context Analysis
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{coachingSuggestions.framing.context}</p>
                    </div>
                  )}
                  
                  {coachingSuggestions.framing.suggestion && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                        Recommended Approach
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{coachingSuggestions.framing.suggestion}</p>
                    </div>
                  )}
                  
                  {coachingSuggestions.framing.valueProposition && (
                    <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                      <h4 className="text-sm font-semibold text-primary mb-3 flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        Value Proposition
                      </h4>
                      <p className="text-sm text-gray-800 leading-relaxed font-medium">{coachingSuggestions.framing.valueProposition}</p>
                    </div>
                  )}
                  
                  {coachingSuggestions.framing.differentiators && coachingSuggestions.framing.differentiators.length > 0 && (
                    <div className="bg-accent/20 p-4 rounded-lg border border-accent/30">
                      <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                        <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                        Key Differentiators
                      </h4>
                      <ul className="space-y-2">
                        {coachingSuggestions.framing.differentiators.map((diff, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start leading-relaxed">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
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
              <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-4 bg-gradient-to-r from-primary/5 to-accent/10 rounded-t-lg">
                  <CardTitle className="text-gray-900 flex items-center justify-between text-base font-semibold">
                    <div className="flex items-center">
                      <CheckSquare className="w-5 h-5 mr-3 text-primary" />
                      Next Steps
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleChatClick("Next Steps", JSON.stringify(coachingSuggestions.nextSteps))}
                      className="h-8 px-3 text-xs hover:bg-white/80 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                      Chat
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  {coachingSuggestions.nextSteps.map((step, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 transition-colors duration-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                              {index + 1}
                            </div>
                            <h4 className="text-sm font-semibold text-gray-900 leading-relaxed">{step.step}</h4>
                          </div>
                        </div>
                        <span className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap ml-3 ${
                          step.priority === 1 ? 'bg-red-100 text-red-800 border border-red-200' :
                          step.priority === 2 ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                          'bg-green-100 text-green-800 border border-green-200'
                        }`}>
                          Priority {step.priority}
                        </span>
                      </div>
                      
                      {step.description && (
                        <div className="ml-9 mb-3">
                          <p className="text-sm text-gray-700 leading-relaxed">{step.description}</p>
                        </div>
                      )}
                      
                      {step.businessJustification && (
                        <div className="ml-9 bg-blue-50 p-3 rounded-lg border border-blue-100">
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <div className="text-sm">
                              <span className="font-semibold text-blue-900">Business Impact: </span>
                              <span className="text-blue-800">{step.businessJustification}</span>
                            </div>
                          </div>
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