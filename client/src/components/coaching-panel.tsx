import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Lightbulb, ArrowLeftRight, MessageSquare, Route, Copy, Plus, Check } from "lucide-react";
import { UserDropdown } from "@/components/user-dropdown";
import type { MeetingWithNotes, CoachingSuggestionContent } from "@shared/schema";

interface CoachingPanelProps {
  meeting: MeetingWithNotes | undefined;
  isLoading: boolean;
}

export function CoachingPanel({ meeting, isLoading }: CoachingPanelProps) {
  const { toast } = useToast();
  const [coachingSuggestions, setCoachingSuggestions] = useState<CoachingSuggestionContent | null>(null);
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());
  const [currentMeetingId, setCurrentMeetingId] = useState<number | null>(null);
  const [isLoadingForMeeting, setIsLoadingForMeeting] = useState(false);



  // Generate coaching suggestions mutation
  const generateCoachingMutation = useMutation({
    mutationFn: async ({ content, dealStage, meetingId }: { content: string; dealStage: string; meetingId: number }) => {
      const response = await apiRequest("POST", "/api/ai/coaching", { content, dealStage, meetingId });
      return response.json();
    },
    onSuccess: (suggestions: CoachingSuggestionContent) => {
      setCoachingSuggestions(suggestions);
      // Also invalidate the meeting data to ensure it's fresh
      queryClient.invalidateQueries({ queryKey: ["/api/meetings", meeting?.id] });
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

  // Handle meeting changes: load existing suggestions and manage loading states
  useEffect(() => {
    try {
      const meetingId = meeting?.id || null;
      
      // If this is a different meeting, reset everything
      if (currentMeetingId !== meetingId) {
        setCurrentMeetingId(meetingId);
        setIsLoadingForMeeting(false);
        
        // Reset mutation states to prevent phantom loading indicators
        generateCoachingMutation.reset();
        markAsUsedMutation.reset();
      }
      
      if (!meeting) {
        setCoachingSuggestions(null);
        setCopiedItems(new Set());
        return;
      }

      // Load existing coaching suggestions from the meeting
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
      console.error("Error in coaching panel useEffect:", error);
      setCoachingSuggestions(null);
      setCopiedItems(new Set());
    }
  }, [meeting, currentMeetingId]);

  // Listen for when analysis is being triggered to show loading state
  const { data: meetingQuery } = useQuery({
    queryKey: ["/api/meetings", meeting?.id],
    enabled: false, // Don't fetch automatically, just listen for cache changes
  });

  // Monitor for AI analysis and coaching generation activity - immediate response
  useEffect(() => {
    if (!meeting?.id) return;

    // Immediately show loading state when coaching suggestions are being generated
    setIsLoadingForMeeting(generateCoachingMutation.isPending);
  }, [generateCoachingMutation.isPending, meeting?.id]);

  // Enhanced loading state detection with immediate response
  useEffect(() => {
    if (!meeting?.id) return;

    // Immediately respond to coaching generation state
    if (generateCoachingMutation.isPending) {
      setIsLoadingForMeeting(true);
      return;
    }

    // Check for analysis queries with reduced polling frequency
    const checkAnalysisStatus = () => {
      const queries = queryClient.getQueryCache().getAll();
      const hasAnalysisQuery = queries.some(query => 
        query.queryKey.some(key => typeof key === 'string' && key.includes('/api/ai/analyze')) &&
        query.state.status === 'pending'
      );
      
      if (hasAnalysisQuery) {
        setIsLoadingForMeeting(true);
      } else {
        // Faster response when analysis completes
        setIsLoadingForMeeting(false);
      }
    };

    // Reduced polling frequency to improve performance
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
      <header className="px-6 py-4 bg-white border-b border-gray-100 flex-shrink-0 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Lightbulb className="w-4 h-4 mr-2 text-primary" />
            Growth Guide
          </h3>
          <p className="text-sm text-transparent truncate invisible">Hidden spacer text</p>
        </div>
        <UserDropdown />
      </header>

      {/* Coaching Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* Only show loading if actively generating for this specific meeting */}
        {isLoadingForMeeting && (
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

            {/* Enhanced Pain-to-Value Mapping */}
            {coachingSuggestions.painMapping && coachingSuggestions.painMapping.length > 0 && (
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-gray-900 flex items-center text-sm">
                    <ArrowLeftRight className="w-4 h-4 mr-2 text-accent" />
                    Pain-to-Value Mapping
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  {coachingSuggestions.painMapping.map((mapping, index) => {
                    // Handle backward compatibility - check if it's the old simple format
                    const isOldFormat = (mapping as any).value !== undefined;
                    
                    if (isOldFormat) {
                      // Render old simple format
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
                    
                    // Render new enhanced format
                    return (
                      <div key={index} className="border border-gray-100 rounded-lg p-4 space-y-3">
                        {/* Pain Point Header */}
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
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className={`px-2 py-1 text-xs rounded-full ${
                                    mapping.category === 'financial' ? 'bg-green-100 text-green-700' :
                                    mapping.category === 'operational' ? 'bg-blue-100 text-blue-700' :
                                    mapping.category === 'strategic' ? 'bg-purple-100 text-purple-700' :
                                    mapping.category === 'compliance' ? 'bg-red-100 text-red-700' :
                                    'bg-gray-100 text-gray-700'
                                  }`}>
                                    {mapping.category}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    Severity: {mapping.severity || 3}/5
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Business Impact & Solution */}
                        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                          <h4 className="text-xs font-semibold text-blue-800 mb-2">Impact & Solution</h4>
                          <div className="space-y-2 text-xs text-blue-700">
                            {mapping.businessImpact && (
                              <div>
                                {mapping.businessImpact.cost && (
                                  <div>
                                    <span className="font-medium">Cost Impact:</span> 
                                    {mapping.businessImpact.cost.startsWith('Ask:') ? (
                                      <div className="mt-1 p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 italic">
                                        {mapping.businessImpact.cost.replace('Ask:', '').trim()}
                                      </div>
                                    ) : (
                                      <span> {mapping.businessImpact.cost}</span>
                                    )}
                                  </div>
                                )}
                                {mapping.businessImpact.productivity && (
                                  <div>
                                    <span className="font-medium">Productivity:</span> 
                                    {mapping.businessImpact.productivity.startsWith('Ask:') ? (
                                      <div className="mt-1 p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 italic">
                                        {mapping.businessImpact.productivity.replace('Ask:', '').trim()}
                                      </div>
                                    ) : (
                                      <span> {mapping.businessImpact.productivity}</span>
                                    )}
                                  </div>
                                )}
                                {mapping.businessImpact.risk && (
                                  <div>
                                    <span className="font-medium">Risk:</span> 
                                    {mapping.businessImpact.risk.startsWith('Ask:') ? (
                                      <div className="mt-1 p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 italic">
                                        {mapping.businessImpact.risk.replace('Ask:', '').trim()}
                                      </div>
                                    ) : (
                                      <span> {mapping.businessImpact.risk}</span>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                            {mapping.technicalSolution && (
                              <div>
                                <span className="font-medium">Solution:</span> 
                                {mapping.technicalSolution.startsWith('Ask:') ? (
                                  <div className="mt-1 p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 italic">
                                    {mapping.technicalSolution.replace('Ask:', '').trim()}
                                  </div>
                                ) : (
                                  <span> {mapping.technicalSolution}</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Business Value & ROI */}
                        {(mapping.businessValue || mapping.metrics) && (
                          <div className="bg-green-50 border border-green-200 rounded-md p-3">
                            <h4 className="text-xs font-semibold text-green-800 mb-2">Business Value & ROI</h4>
                            <div className="space-y-2">
                              {mapping.businessValue?.immediate && (
                                <div>
                                  <span className="font-medium text-green-700">Quick Win:</span> 
                                  {mapping.businessValue.immediate.startsWith('Ask:') ? (
                                    <div className="mt-1 p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 italic text-xs">
                                      {mapping.businessValue.immediate.replace('Ask:', '').trim()}
                                    </div>
                                  ) : (
                                    <span className="text-xs text-green-700"> {mapping.businessValue.immediate}</span>
                                  )}
                                </div>
                              )}
                              {mapping.businessValue?.mediumTerm && (
                                <div>
                                  <span className="font-medium text-green-700">Medium-term:</span> 
                                  {mapping.businessValue.mediumTerm.startsWith('Ask:') ? (
                                    <div className="mt-1 p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 italic text-xs">
                                      {mapping.businessValue.mediumTerm.replace('Ask:', '').trim()}
                                    </div>
                                  ) : (
                                    <span className="text-xs text-green-700"> {mapping.businessValue.mediumTerm}</span>
                                  )}
                                </div>
                              )}
                              {mapping.businessValue?.longTerm && (
                                <div>
                                  <span className="font-medium text-green-700">Long-term:</span> 
                                  {mapping.businessValue.longTerm.startsWith('Ask:') ? (
                                    <div className="mt-1 p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 italic text-xs">
                                      {mapping.businessValue.longTerm.replace('Ask:', '').trim()}
                                    </div>
                                  ) : (
                                    <span className="text-xs text-green-700"> {mapping.businessValue.longTerm}</span>
                                  )}
                                </div>
                              )}
                              {mapping.metrics?.target && (
                                <div>
                                  <span className="font-medium text-green-700">Target:</span> 
                                  {mapping.metrics.target.startsWith('Ask:') ? (
                                    <div className="mt-1 p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 italic text-xs">
                                      {mapping.metrics.target.replace('Ask:', '').trim()}
                                    </div>
                                  ) : (
                                    <span className="text-xs text-green-700"> {mapping.metrics.target}</span>
                                  )}
                                </div>
                              )}
                              {mapping.metrics?.baseline && (
                                <div>
                                  <span className="font-medium text-green-700">Baseline:</span> 
                                  {mapping.metrics.baseline.startsWith('Ask:') ? (
                                    <div className="mt-1 p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 italic text-xs">
                                      {mapping.metrics.baseline.replace('Ask:', '').trim()}
                                    </div>
                                  ) : (
                                    <span className="text-xs text-green-700"> {mapping.metrics.baseline}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Key Stakeholders & Advantage */}
                        {(mapping.stakeholderBenefit || mapping.competitiveAdvantage) && (
                          <div className="bg-purple-50 border border-purple-200 rounded-md p-3">
                            <h4 className="text-xs font-semibold text-purple-800 mb-2">Stakeholders & Advantage</h4>
                            <div className="space-y-2 text-xs text-purple-700">
                              {mapping.stakeholderBenefit?.executives && (
                                <div>
                                  <span className="font-medium">Executives:</span> 
                                  {mapping.stakeholderBenefit.executives.startsWith('Ask:') ? (
                                    <div className="mt-1 p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 italic">
                                      {mapping.stakeholderBenefit.executives.replace('Ask:', '').trim()}
                                    </div>
                                  ) : (
                                    <span> {mapping.stakeholderBenefit.executives}</span>
                                  )}
                                </div>
                              )}
                              {mapping.stakeholderBenefit?.managers && (
                                <div>
                                  <span className="font-medium">Managers:</span> 
                                  {mapping.stakeholderBenefit.managers.startsWith('Ask:') ? (
                                    <div className="mt-1 p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 italic">
                                      {mapping.stakeholderBenefit.managers.replace('Ask:', '').trim()}
                                    </div>
                                  ) : (
                                    <span> {mapping.stakeholderBenefit.managers}</span>
                                  )}
                                </div>
                              )}
                              {mapping.stakeholderBenefit?.endUsers && (
                                <div>
                                  <span className="font-medium">End Users:</span> 
                                  {mapping.stakeholderBenefit.endUsers.startsWith('Ask:') ? (
                                    <div className="mt-1 p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 italic">
                                      {mapping.stakeholderBenefit.endUsers.replace('Ask:', '').trim()}
                                    </div>
                                  ) : (
                                    <span> {mapping.stakeholderBenefit.endUsers}</span>
                                  )}
                                </div>
                              )}
                              {mapping.competitiveAdvantage && (
                                <div>
                                  <span className="font-medium">Advantage:</span> 
                                  {mapping.competitiveAdvantage.startsWith('Ask:') ? (
                                    <div className="mt-1 p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 italic">
                                      {mapping.competitiveAdvantage.replace('Ask:', '').trim()}
                                    </div>
                                  ) : (
                                    <span> {mapping.competitiveAdvantage}</span>
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

            {/* Enhanced Strategic Framing */}
            {coachingSuggestions.framing && (
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-gray-900 flex items-center text-sm">
                    <MessageSquare className="w-4 h-4 mr-2 text-accent" />
                    Strategic Framing & Positioning
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  {coachingSuggestions.framing.context && (
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                      <p className="text-xs font-medium text-blue-800 mb-1">Situation Context</p>
                      <p className="text-xs text-blue-700">{coachingSuggestions.framing.context}</p>
                    </div>
                  )}
                  
                  {coachingSuggestions.framing.valueProposition && (
                    <div className="bg-green-50 border border-green-200 rounded-md p-3">
                      <p className="text-xs font-medium text-green-800 mb-1">Core Value Proposition</p>
                      <p className="text-xs text-green-700">{coachingSuggestions.framing.valueProposition}</p>
                    </div>
                  )}

                  {coachingSuggestions.framing.suggestion && (
                    <div className="bg-purple-50 border border-purple-200 rounded-md p-3">
                      <p className="text-xs font-medium text-purple-800 mb-1">Recommended Messaging</p>
                      <p className="text-xs text-purple-700">{coachingSuggestions.framing.suggestion}</p>
                    </div>
                  )}

                  {coachingSuggestions.framing.differentiators && coachingSuggestions.framing.differentiators.length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                      <p className="text-xs font-medium text-yellow-800 mb-2">Key Differentiators</p>
                      <div className="space-y-1">
                        {coachingSuggestions.framing.differentiators.map((diff, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-1 h-1 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-xs text-yellow-700">{diff}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
                  <div className="space-y-4">
                    {coachingSuggestions.nextSteps
                      .sort((a, b) => a.priority - b.priority)
                      .map((step, index) => (
                        <div key={index} className="border border-gray-100 rounded-lg p-3 space-y-3">
                          <div className="flex items-start space-x-3">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${
                              step.priority === 1 ? "bg-accent" : 
                              step.priority === 2 ? "bg-warning" : "bg-gray-400"
                            }`}>
                              {step.priority}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-800">{step.step}</p>
                              <p className="text-xs text-gray-600 mt-1">{step.description}</p>
                            </div>
                          </div>
                          
                          {step.businessJustification && (
                            <div className="bg-blue-50 border border-blue-200 rounded-md p-2 ml-8">
                              <p className="text-xs font-medium text-blue-800 mb-1">Business Justification</p>
                              <p className="text-xs text-blue-700">{step.businessJustification}</p>
                            </div>
                          )}
                          
                          {step.expectedOutcome && (
                            <div className="bg-green-50 border border-green-200 rounded-md p-2 ml-8">
                              <p className="text-xs font-medium text-green-800 mb-1">Expected Outcome</p>
                              <p className="text-xs text-green-700">{step.expectedOutcome}</p>
                            </div>
                          )}
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

        {!generateCoachingMutation.isPending && !coachingSuggestions && (!meeting?.notes || meeting.notes.length === 0) && (
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
