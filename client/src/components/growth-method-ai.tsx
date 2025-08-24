import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Target, Users, DollarSign, Calendar, AlertTriangle, CheckCircle, BookOpen, Zap, TrendingUp, Clock } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { MeetingWithNotes, MeetingWithSessions } from "@shared/schema";

interface MethodologyInsight {
  insight: string;
  description: string;
  clientSpecific: string;
  actionableSteps: string[];
  priority: "high" | "medium" | "low";
}

interface MethodologyInsights {
  methodology: string;
  contextualInsights: MethodologyInsight[];
  strategicRecommendations: {
    immediate: string[];
    nearTerm: string[];
    longTerm: string[];
  };
  riskFactors: string[];
  successIndicators: string[];
}

interface GrowthMethodAIProps {
  meeting: MeetingWithNotes | MeetingWithSessions | undefined | null;
  selectedClient?: any;
}

export function GrowthMethodAI({ meeting, selectedClient }: GrowthMethodAIProps) {
  const [insights, setInsights] = useState<MethodologyInsights | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get client's sales methodology
  const clientMethodology = selectedClient?.salesMethodology || "MEDDIC";

  // Generate insights when component mounts or client changes
  useEffect(() => {
    if (meeting?.id && selectedClient?.salesMethodology) {
      generateInsights();
    }
  }, [meeting?.id, selectedClient?.salesMethodology]);

  const generateInsights = async () => {
    if (!meeting?.id) return;
    
    setIsLoading(true);
    try {
      const response = await apiRequest('POST', '/api/ai/methodology', {
        meetingId: meeting.id,
        methodology: clientMethodology
      });
      const data = await response.json();
      setInsights(data);
    } catch (error) {
      console.error('Error generating methodology insights:', error);
      toast({
        title: "Error",
        description: "Failed to generate methodology insights. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'low': return <Target className="w-4 h-4 text-green-600" />;
      default: return <Target className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  if (!meeting) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center text-gray-500">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No Meeting Selected</h3>
          <p className="text-sm">Select a meeting to access AI-powered methodology insights</p>
        </div>
      </div>
    );
  }

  if (!selectedClient?.salesMethodology) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center text-gray-500">
          <Target className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No Sales Methodology Selected</h3>
          <p className="text-sm mb-4">This client doesn't have a sales methodology configured.</p>
          <p className="text-xs text-gray-400">Update the client settings to enable AI-powered methodology insights.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                {clientMethodology} Insights
              </h2>
              <p className="text-sm text-gray-600">AI-powered methodology guidance for {selectedClient?.company || meeting.clientName}</p>
            </div>
            <Button 
              onClick={generateInsights}
              disabled={isLoading}
              size="sm"
              variant="outline"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Refresh Insights
                </>
              )}
            </Button>
          </div>
        </div>

        {isLoading && !insights && (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-primary" />
                <h3 className="font-medium text-gray-900 mb-2">Generating AI Insights</h3>
                <p className="text-sm text-gray-600">
                  Analyzing your client context and meeting notes with {clientMethodology} methodology...
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {insights && (
          <div className="space-y-6">
            {/* Contextual Insights */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                Contextual Insights
              </h3>
              <div className="space-y-3">
                {insights.contextualInsights.map((insight, index) => (
                  <Card key={index} className={`${getPriorityColor(insight.priority)} border`}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <div className="flex items-center">
                          {getPriorityIcon(insight.priority)}
                          <span className="ml-2">{insight.insight}</span>
                        </div>
                        <Badge variant={insight.priority === 'high' ? 'destructive' : insight.priority === 'medium' ? 'default' : 'secondary'} className="text-xs">
                          {insight.priority}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-700 mb-3">{insight.description}</p>
                      <div className="bg-white bg-opacity-60 p-3 rounded-md mb-3">
                        <h4 className="text-xs font-medium text-gray-700 mb-1">Client-Specific Application:</h4>
                        <p className="text-sm text-gray-600">{insight.clientSpecific}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-gray-700 mb-2">Action Steps:</h4>
                        <ul className="space-y-1">
                          {insight.actionableSteps.map((step, stepIndex) => (
                            <li key={stepIndex} className="text-sm text-gray-600 flex items-start">
                              <CheckCircle className="w-3 h-3 mt-0.5 mr-2 text-green-600 flex-shrink-0" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Strategic Recommendations */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                Strategic Recommendations
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {/* Immediate Actions */}
                <Card className="border-red-200 bg-red-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-red-800 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Immediate (Next 24-48 Hours)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-1">
                      {insights.strategicRecommendations.immediate.map((action, index) => (
                        <li key={index} className="text-sm text-red-700 flex items-start">
                          <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Near-term Actions */}
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-yellow-800 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Near-term (1-2 Weeks)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-1">
                      {insights.strategicRecommendations.nearTerm.map((action, index) => (
                        <li key={index} className="text-sm text-yellow-700 flex items-start">
                          <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Long-term Actions */}
                <Card className="border-green-200 bg-green-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-green-800 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Long-term Strategy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-1">
                      {insights.strategicRecommendations.longTerm.map((action, index) => (
                        <li key={index} className="text-sm text-green-700 flex items-start">
                          <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Risk Factors */}
            {insights.riskFactors.length > 0 && (
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-orange-800 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Risk Factors to Monitor
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {insights.riskFactors.map((risk, index) => (
                      <li key={index} className="text-sm text-orange-700 flex items-start">
                        <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {risk}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Success Indicators */}
            {insights.successIndicators.length > 0 && (
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-blue-800 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Success Indicators
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {insights.successIndicators.map((indicator, index) => (
                      <li key={index} className="text-sm text-blue-700 flex items-start">
                        <CheckCircle className="w-3 h-3 mt-0.5 mr-2 text-blue-600 flex-shrink-0" />
                        {indicator}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {!insights && !isLoading && (
          <div className="text-center py-12">
            <Zap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Generate Insights</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get AI-powered {clientMethodology} methodology insights tailored to your client
            </p>
            <Button onClick={generateInsights} className="bg-primary hover:bg-primary/90">
              <Zap className="w-4 h-4 mr-2" />
              Generate AI Insights
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}