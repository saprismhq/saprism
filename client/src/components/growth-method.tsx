import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CheckCircle, Circle, Target, Users, DollarSign, Calendar, Zap } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { MeetingWithNotes, MeetingWithSessions } from "@shared/schema";

interface MethodologyStep {
  id: string;
  name: string;
  description: string;
  questions: string[];
  completed: boolean;
  progress: number;
}

interface SalesMethodology {
  id: string;
  name: string;
  description: string;
  steps: MethodologyStep[];
  industries: string[];
}

interface GrowthMethodProps {
  meeting: MeetingWithNotes | MeetingWithSessions | undefined | null;
  selectedClient?: any;
}

const METHODOLOGIES: SalesMethodology[] = [
  {
    id: "meddpicc",
    name: "MEDDPICC",
    description: "Comprehensive B2B sales methodology for complex enterprise deals",
    industries: ["Technology", "SaaS", "Enterprise Software", "Manufacturing"],
    steps: [
      {
        id: "metrics",
        name: "Metrics",
        description: "Quantify the business impact and ROI",
        questions: [
          "What metrics will this solution improve?",
          "What's the current baseline for these metrics?",
          "What's the expected improvement percentage?",
          "How will success be measured?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "economic_buyer",
        name: "Economic Buyer",
        description: "Identify who controls the budget",
        questions: [
          "Who has the authority to approve this purchase?",
          "What's their budget process and timeline?",
          "Have we met with the economic buyer?",
          "What are their key concerns and priorities?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "decision_criteria",
        name: "Decision Criteria",
        description: "Understand how they will evaluate solutions",
        questions: [
          "What criteria will they use to evaluate vendors?",
          "How are these criteria weighted in importance?",
          "Who influences the decision criteria?",
          "Are there any must-have requirements?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "decision_process",
        name: "Decision Process",
        description: "Map out their buying process",
        questions: [
          "What steps are involved in their decision process?",
          "Who's involved at each stage?",
          "What's the timeline for each stage?",
          "Are there any approval gates or committees?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "pain",
        name: "Pain",
        description: "Identify and quantify business pains",
        questions: [
          "What business problems are they trying to solve?",
          "What's the cost of not solving these problems?",
          "How urgent is solving these problems?",
          "Who's most affected by these problems?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "implicate_pain",
        name: "Implicate Pain",
        description: "Help them realize additional consequences",
        questions: [
          "What other issues might arise if this isn't solved?",
          "How might this impact other departments?",
          "What competitive risks exist?",
          "What growth opportunities are being missed?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "champion",
        name: "Champion",
        description: "Identify and develop internal advocates",
        questions: [
          "Who internally believes in this solution?",
          "Do they have influence with the decision maker?",
          "Are they willing to advocate for us?",
          "How can we help them build a compelling case?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "competition",
        name: "Competition",
        description: "Understand competitive landscape",
        questions: [
          "Who else are they evaluating?",
          "What are the competitive strengths/weaknesses?",
          "How do we differentiate ourselves?",
          "What's their vendor preference or bias?"
        ],
        completed: false,
        progress: 0
      }
    ]
  },
  {
    id: "challenger",
    name: "Challenger Sale",
    description: "Lead with insights and challenge customer thinking",
    industries: ["Professional Services", "Consulting", "Financial Services"],
    steps: [
      {
        id: "warm_up",
        name: "Warm Up",
        description: "Build rapport and establish credibility",
        questions: [
          "What industry trends are affecting their business?",
          "How are they currently approaching this challenge?",
          "What's working well in their current process?",
          "Who else have they worked with on similar initiatives?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "reframe",
        name: "Reframe",
        description: "Challenge their current thinking with insights",
        questions: [
          "Have they considered this alternative perspective?",
          "What data suggests a different approach might work?",
          "How are leading companies approaching this differently?",
          "What assumptions might need to be questioned?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "emotion",
        name: "Emotion",
        description: "Create urgency and emotional connection",
        questions: [
          "What's the cost of maintaining the status quo?",
          "How will stakeholders react if nothing changes?",
          "What opportunities are being missed right now?",
          "What competitive threats should they be concerned about?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "value",
        name: "Value",
        description: "Present solution benefits tied to their business",
        questions: [
          "How does our solution address their reframed problem?",
          "What specific benefits will they realize?",
          "Can we quantify the expected ROI?",
          "How quickly will they see results?"
        ],
        completed: false,
        progress: 0
      }
    ]
  },
  {
    id: "spin",
    name: "SPIN Selling",
    description: "Question-based methodology for uncovering needs",
    industries: ["Healthcare", "Education", "Government"],
    steps: [
      {
        id: "situation",
        name: "Situation Questions",
        description: "Understand their current situation",
        questions: [
          "Can you tell me about your current process?",
          "How long have you been doing it this way?",
          "What systems or tools are you currently using?",
          "Who's responsible for this area?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "problem",
        name: "Problem Questions",
        description: "Identify difficulties and dissatisfactions",
        questions: [
          "What challenges are you facing with the current approach?",
          "How often do these problems occur?",
          "What's causing these issues?",
          "Have you tried to solve this before?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "implication",
        name: "Implication Questions",
        description: "Explore the consequences of problems",
        questions: [
          "How do these problems affect your team's productivity?",
          "What impact does this have on your customers?",
          "How might this affect your ability to grow?",
          "What would happen if this problem got worse?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "need_payoff",
        name: "Need-Payoff Questions",
        description: "Get them to tell you the benefits",
        questions: [
          "How useful would it be to solve this problem?",
          "What would it mean to your organization if this worked?",
          "How would this help you achieve your goals?",
          "What value would your team see from this solution?"
        ],
        completed: false,
        progress: 0
      }
    ]
  }
];

export function GrowthMethod({ meeting, selectedClient }: GrowthMethodProps) {
  const [selectedMethodology, setSelectedMethodology] = useState<string>("");
  const [methodology, setMethodology] = useState<SalesMethodology | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Create client methodology update mutation
  const updateClientMethodologyMutation = useMutation({
    mutationFn: async (methodologyName: string) => {
      if (!selectedClient?.id) throw new Error("No client selected");
      
      const response = await apiRequest("PUT", `/api/clients/${selectedClient.id}`, {
        name: selectedClient.name,
        company: selectedClient.company || "",
        email: selectedClient.email || "",
        phone: selectedClient.phone || "",
        industry: selectedClient.industry || "",
        notes: selectedClient.notes || "",
        salesMethodology: methodologyName,
      });
      return response.json();
    },
    onSuccess: (updatedClient) => {
      toast({
        title: "Methodology Updated",
        description: `Sales methodology set to ${updatedClient.salesMethodology}`,
      });
      
      // Invalidate and refetch clients to update the UI
      queryClient.invalidateQueries({ queryKey: ['/api/clients'] });
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
      
      console.error('Error updating client methodology:', error);
      toast({
        title: "Error",
        description: "Failed to update sales methodology. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Generate AI insights mutation
  const generateInsightsMutation = useMutation({
    mutationFn: async (methodologyName: string) => {
      if (!meeting?.id) throw new Error("No meeting selected");
      
      const response = await apiRequest('POST', '/api/ai/methodology', {
        meetingId: meeting.id,
        methodology: methodologyName
      });
      return response.json();
    },
    onSuccess: (insights) => {
      toast({
        title: "AI Insights Generated",
        description: `Generated ${insights.contextualInsights?.length || 0} insights for ${insights.methodology}`,
      });
      
      // Refresh any methodology-related queries
      queryClient.invalidateQueries({ queryKey: ['/api/ai/methodology'] });
    },
    onError: (error) => {
      console.error('Error generating insights:', error);
      toast({
        title: "Insights Generation Failed",
        description: "Could not generate AI insights. This might be due to API quota limits.",
        variant: "destructive",
      });
    },
  });

  // Handle methodology selection change
  const handleMethodologyChange = (methodologyId: string) => {
    setSelectedMethodology(methodologyId);
    
    // Find the methodology name for saving to client
    const selectedMethodologyData = METHODOLOGIES.find(m => m.id === methodologyId);
    if (selectedMethodologyData && selectedClient?.id) {
      // Update client methodology first
      updateClientMethodologyMutation.mutate(selectedMethodologyData.name, {
        onSuccess: () => {
          // Then generate AI insights like the original flow
          if (meeting?.id) {
            generateInsightsMutation.mutate(selectedMethodologyData.name);
          }
        }
      });
    }
  };

  // Auto-select methodology based on client's selected methodology
  useEffect(() => {
    if (selectedClient?.salesMethodology && !selectedMethodology) {
      // Map client's sales methodology to our component methodology ids
      const methodologyMap: { [key: string]: string } = {
        'MEDDIC': 'meddpicc',
        'MEDDPICC': 'meddpicc',
        'Challenger Sale': 'challenger', 
        'SPIN Selling': 'spin',
        'Value Selling': 'meddpicc', // Use MEDDPICC as fallback
        'Solution Selling': 'meddpicc',
        'Consultative Selling': 'challenger',
        'NEAT Selling': 'spin',
        'Sandler Selling': 'challenger', 
        'Miller Heiman': 'meddpicc',
        'Custom Methodology': 'meddpicc' // Default fallback
      };
      
      const methodologyId = methodologyMap[selectedClient.salesMethodology] || 'meddpicc';
      setSelectedMethodology(methodologyId);
    } else if (meeting?.clientCompany && !selectedMethodology && !selectedClient?.salesMethodology) {
      // Fallback to old auto-detection if no client methodology is set
      const company = meeting.clientCompany.toLowerCase();
      
      if (company.includes('tech') || company.includes('software') || company.includes('saas')) {
        setSelectedMethodology("meddpicc");
      } else if (company.includes('consulting') || company.includes('services')) {
        setSelectedMethodology("challenger");
      } else {
        setSelectedMethodology("meddpicc"); // Default to MEDDPICC for B2B
      }
    }
  }, [meeting, selectedClient, selectedMethodology]);

  useEffect(() => {
    if (selectedMethodology) {
      const selected = METHODOLOGIES.find(m => m.id === selectedMethodology);
      setMethodology(selected || null);
    }
  }, [selectedMethodology]);

  const toggleStepCompletion = (stepId: string) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  const calculateProgress = () => {
    if (!methodology) return 0;
    return Math.round((completedSteps.size / methodology.steps.length) * 100);
  };

  const getStepIcon = (step: MethodologyStep) => {
    const isCompleted = completedSteps.has(step.id);
    
    switch (step.id) {
      case 'metrics':
        return <Target className={`w-4 h-4 ${isCompleted ? 'text-green-600' : 'text-gray-400'}`} />;
      case 'economic_buyer':
      case 'champion':
        return <Users className={`w-4 h-4 ${isCompleted ? 'text-green-600' : 'text-gray-400'}`} />;
      case 'pain':
      case 'problem':
        return <Zap className={`w-4 h-4 ${isCompleted ? 'text-green-600' : 'text-gray-400'}`} />;
      default:
        return isCompleted ? 
          <CheckCircle className="w-4 h-4 text-green-600" /> : 
          <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  if (!meeting) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center text-gray-500">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No Meeting Selected</h3>
          <p className="text-sm">Select a meeting to access sales methodologies</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4">
        {/* Methodology Selection */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Sales Methodology
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Select 
              value={selectedMethodology} 
              onValueChange={handleMethodologyChange}
              disabled={updateClientMethodologyMutation.isPending || generateInsightsMutation.isPending || !selectedClient?.id}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a methodology" />
              </SelectTrigger>
              <SelectContent>
                {METHODOLOGIES.map((method) => (
                  <SelectItem key={method.id} value={method.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{method.name}</span>
                      <span className="text-xs text-gray-500">{method.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {updateClientMethodologyMutation.isPending && (
              <p className="text-xs text-gray-500 mt-2">Updating methodology...</p>
            )}
            
            {generateInsightsMutation.isPending && (
              <p className="text-xs text-gray-500 mt-2">Generating AI insights...</p>
            )}
            
            {!selectedClient?.id && (
              <p className="text-xs text-gray-500 mt-2">Select a client to choose methodology</p>
            )}
            
            {methodology && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">{methodology.description}</p>
                <div className="flex flex-wrap gap-1">
                  {methodology.industries.map((industry) => (
                    <Badge key={industry} variant="secondary" className="text-xs">
                      {industry}
                    </Badge>
                  ))}
                </div>
                
                {/* AI Insights Generation Button */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <Button
                    onClick={() => {
                      const selectedMethodologyData = METHODOLOGIES.find(m => m.id === selectedMethodology);
                      if (selectedMethodologyData?.name && meeting?.id) {
                        generateInsightsMutation.mutate(selectedMethodologyData.name);
                      }
                    }}
                    disabled={generateInsightsMutation.isPending || !meeting?.id}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    {generateInsightsMutation.isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2" />
                        Generating AI Insights...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Generate AI Insights
                      </>
                    )}
                  </Button>
                  {!meeting?.id && (
                    <p className="text-xs text-gray-400 mt-2">Select a meeting to generate insights</p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {methodology && (
          <>
            {/* Progress Overview */}
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span>Progress Overview</span>
                  <span className="text-lg font-bold text-primary">{calculateProgress()}%</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Progress value={calculateProgress()} className="mb-2" />
                <p className="text-xs text-gray-600">
                  {completedSteps.size} of {methodology.steps.length} steps completed
                </p>
              </CardContent>
            </Card>

            {/* Methodology Steps */}
            <div className="space-y-4">
              {methodology.steps.map((step) => {
                const isCompleted = completedSteps.has(step.id);
                
                return (
                  <Card key={step.id} className={`transition-all ${
                    isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'
                  }`}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <div className="flex items-center">
                          {getStepIcon(step)}
                          <span className={`ml-2 ${isCompleted ? 'text-green-800' : 'text-gray-900'}`}>
                            {step.name}
                          </span>
                        </div>
                        <Button
                          variant={isCompleted ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleStepCompletion(step.id)}
                          className="h-6 px-2"
                        >
                          {isCompleted ? (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Done
                            </>
                          ) : (
                            <>
                              <Circle className="w-3 h-3 mr-1" />
                              Mark Done
                            </>
                          )}
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                      
                      <div className="space-y-2">
                        <h4 className="text-xs font-medium text-gray-700">Key Questions:</h4>
                        <ul className="space-y-1">
                          {step.questions.map((question, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start">
                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {question}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Completion Message */}
            {calculateProgress() === 100 && (
              <Card className="mt-6 border-green-200 bg-green-50">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-medium text-green-800 mb-1">Methodology Complete!</h3>
                  <p className="text-sm text-green-700">
                    You've completed all steps in the {methodology.name} methodology.
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {!selectedMethodology && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Choose Your Sales Methodology</h3>
            <p className="text-sm text-gray-600">
              Select a methodology above to get started with structured deal qualification
            </p>
          </div>
        )}
      </div>
    </div>
  );
}