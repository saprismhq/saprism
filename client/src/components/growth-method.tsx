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
    id: "meddic",
    name: "MEDDIC",
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
  },
  {
    id: "value_selling",
    name: "Value Selling",
    description: "Focus on the value proposition and ROI for the customer",
    industries: ["Professional Services", "Consulting", "Financial Services", "Healthcare"],
    steps: [
      {
        id: "value_discovery",
        name: "Value Discovery",
        description: "Identify areas where you can create value",
        questions: [
          "What are your biggest business challenges?",
          "Where do you see opportunities for improvement?",
          "What would success look like for your organization?",
          "How do you currently measure performance in this area?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "value_creation",
        name: "Value Creation",
        description: "Develop solutions that create measurable value",
        questions: [
          "How can our solution address your challenges?",
          "What specific benefits would you expect to see?",
          "How would you measure the success of this solution?",
          "What would the impact be on your organization?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "value_proof",
        name: "Value Proof",
        description: "Demonstrate and quantify the value proposition",
        questions: [
          "Can we run a pilot or proof of concept?",
          "What metrics would you use to evaluate success?",
          "How can we demonstrate ROI?",
          "What evidence would convince your stakeholders?"
        ],
        completed: false,
        progress: 0
      }
    ]
  },
  {
    id: "solution_selling",
    name: "Solution Selling",
    description: "Understand customer needs and position comprehensive solutions",
    industries: ["Technology", "Software", "Professional Services", "Manufacturing"],
    steps: [
      {
        id: "needs_analysis",
        name: "Needs Analysis",
        description: "Deeply understand customer requirements",
        questions: [
          "What specific problems are you trying to solve?",
          "How are you handling this currently?",
          "What are the limitations of your current approach?",
          "What would an ideal solution look like?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "solution_design",
        name: "Solution Design",
        description: "Create tailored solutions for customer needs",
        questions: [
          "How would our solution address your specific needs?",
          "What components would be most valuable to you?",
          "How would this integrate with your existing systems?",
          "What customizations might be required?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "solution_presentation",
        name: "Solution Presentation",
        description: "Present the solution compellingly",
        questions: [
          "How does this solution solve your key problems?",
          "What are the expected outcomes and benefits?",
          "What is the implementation timeline?",
          "How do we compare to other options you're considering?"
        ],
        completed: false,
        progress: 0
      }
    ]
  },
  {
    id: "consultative_selling",
    name: "Consultative Selling",
    description: "Act as a trusted advisor to understand and solve customer challenges",
    industries: ["Professional Services", "Consulting", "Financial Services", "Real Estate"],
    steps: [
      {
        id: "relationship_building",
        name: "Relationship Building",
        description: "Establish trust and credibility",
        questions: [
          "What are your key business objectives?",
          "What challenges are you facing in achieving them?",
          "Who else is involved in addressing these challenges?",
          "What has worked well for you in the past?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "diagnostic_questioning",
        name: "Diagnostic Questioning",
        description: "Uncover underlying issues and opportunities",
        questions: [
          "What's causing this challenge?",
          "How is this affecting your business?",
          "What have you tried so far?",
          "What would happen if this isn't resolved?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "advisory_solution",
        name: "Advisory Solution",
        description: "Recommend solutions as a trusted advisor",
        questions: [
          "Based on what I've learned, here's what I recommend...",
          "What are your thoughts on this approach?",
          "How does this align with your priorities?",
          "What concerns do you have about moving forward?"
        ],
        completed: false,
        progress: 0
      }
    ]
  },
  {
    id: "neat_selling",
    name: "NEAT Selling",
    description: "Core Needs, Economic Impact, Access to Authority, Timeline",
    industries: ["B2B Services", "Technology", "Consulting", "Manufacturing"],
    steps: [
      {
        id: "core_needs",
        name: "Core Needs",
        description: "Identify the customer's core business needs",
        questions: [
          "What are your most pressing business needs?",
          "What problems are you trying to solve?",
          "What goals are you trying to achieve?",
          "What would success look like?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "economic_impact",
        name: "Economic Impact",
        description: "Quantify the financial impact of the problem and solution",
        questions: [
          "What is this problem costing you?",
          "What would be the financial benefit of solving this?",
          "How do you calculate ROI for this type of investment?",
          "What budget have you allocated for this?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "access_authority",
        name: "Access to Authority",
        description: "Ensure you can reach the decision makers",
        questions: [
          "Who else is involved in this decision?",
          "Who has the final authority to approve this?",
          "Can you introduce me to the decision makers?",
          "What is the decision-making process?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "timeline",
        name: "Timeline",
        description: "Establish realistic timelines and urgency",
        questions: [
          "When do you need to have this solved?",
          "What's driving this timeline?",
          "What happens if this isn't resolved by then?",
          "What are the key milestones in your process?"
        ],
        completed: false,
        progress: 0
      }
    ]
  },
  {
    id: "sandler_selling",
    name: "Sandler Selling",
    description: "Pain-focused selling methodology with emphasis on qualifying prospects",
    industries: ["Professional Services", "Financial Services", "Real Estate", "Insurance"],
    steps: [
      {
        id: "bonding_rapport",
        name: "Bonding & Rapport",
        description: "Build trust and establish a relationship",
        questions: [
          "Tell me about your business background",
          "What brought you to this company?",
          "What do you enjoy most about your role?",
          "What are your biggest challenges right now?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "pain_identification",
        name: "Pain Identification",
        description: "Uncover the prospect's pain points",
        questions: [
          "What problems are you experiencing?",
          "How long has this been an issue?",
          "What have you done to try to fix it?",
          "What's it costing you to live with this problem?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "budget_discussion",
        name: "Budget Discussion",
        description: "Understand their investment capacity",
        questions: [
          "What budget have you set aside for solving this?",
          "How do you typically make investment decisions?",
          "What would you need to see to justify the investment?",
          "Who else is involved in budget approval?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "decision_process",
        name: "Decision Process",
        description: "Understand how they make decisions",
        questions: [
          "How do you typically evaluate solutions?",
          "Who else would be involved in this decision?",
          "What's your timeline for making a decision?",
          "What could prevent you from moving forward?"
        ],
        completed: false,
        progress: 0
      }
    ]
  },
  {
    id: "miller_heiman",
    name: "Miller Heiman",
    description: "Strategic selling methodology focused on large, complex sales",
    industries: ["Enterprise Technology", "Manufacturing", "Aerospace", "Government"],
    steps: [
      {
        id: "situation_analysis",
        name: "Situation Analysis",
        description: "Analyze the selling situation",
        questions: [
          "What is the customer's current situation?",
          "What changes are driving this opportunity?",
          "Who are the key players involved?",
          "What are the competitive dynamics?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "buying_influences",
        name: "Buying Influences",
        description: "Identify and understand all buying influences",
        questions: [
          "Who is the economic buyer?",
          "Who are the technical buyers?",
          "Who are the user buyers?",
          "Who are the coaches and gatekeepers?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "win_results",
        name: "Win-Results",
        description: "Understand what winning means for each buying influence",
        questions: [
          "What does each buyer want to achieve?",
          "How will they measure success?",
          "What are their personal wins?",
          "What are the organizational wins?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "sales_funnel",
        name: "Sales Funnel",
        description: "Manage the sales process systematically",
        questions: [
          "Where are we in the sales process?",
          "What are the next steps?",
          "What could derail this opportunity?",
          "How do we advance to the next stage?"
        ],
        completed: false,
        progress: 0
      }
    ]
  },
  {
    id: "custom_methodology",
    name: "Custom Methodology",
    description: "Tailored approach based on your specific sales process and industry",
    industries: ["All Industries", "Customizable", "Flexible", "Adaptable"],
    steps: [
      {
        id: "discovery",
        name: "Discovery",
        description: "Understand the customer's situation",
        questions: [
          "What brings you to evaluate new solutions?",
          "What challenges are you facing?",
          "What are your key objectives?",
          "What would success look like?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "qualification",
        name: "Qualification",
        description: "Qualify the opportunity",
        questions: [
          "What budget have you allocated?",
          "What's your decision timeline?",
          "Who else is involved in this decision?",
          "How will you evaluate solutions?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "presentation",
        name: "Presentation",
        description: "Present your solution",
        questions: [
          "How does our solution address your needs?",
          "What questions do you have?",
          "How does this compare to other options?",
          "What are your next steps?"
        ],
        completed: false,
        progress: 0
      },
      {
        id: "closing",
        name: "Closing",
        description: "Close the deal",
        questions: [
          "Are you ready to move forward?",
          "What concerns do you still have?",
          "When would you like to get started?",
          "What do we need to do to finalize this?"
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
        'MEDDIC': 'meddic',
        'MEDDPICC': 'meddic',
        'Challenger Sale': 'challenger', 
        'SPIN Selling': 'spin',
        'Value Selling': 'value_selling',
        'Solution Selling': 'solution_selling',
        'Consultative Selling': 'consultative_selling',
        'NEAT Selling': 'neat_selling',
        'Sandler Selling': 'sandler_selling', 
        'Miller Heiman': 'miller_heiman',
        'Custom Methodology': 'custom_methodology'
      };
      
      const methodologyId = methodologyMap[selectedClient.salesMethodology] || 'meddic';
      setSelectedMethodology(methodologyId);
    } else if (meeting?.clientCompany && !selectedMethodology && !selectedClient?.salesMethodology) {
      // Fallback to old auto-detection if no client methodology is set
      const company = meeting.clientCompany.toLowerCase();
      
      if (company.includes('tech') || company.includes('software') || company.includes('saas')) {
        setSelectedMethodology("meddic");
      } else if (company.includes('consulting') || company.includes('services')) {
        setSelectedMethodology("consultative_selling");
      } else {
        setSelectedMethodology("meddic"); // Default to MEDDIC for B2B
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