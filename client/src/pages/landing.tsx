import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Users, BarChart3, Zap, Leaf, TrendingUp } from "lucide-react";
import { SalespringLogo } from "@/components/salespring-logo";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <SalespringLogo size="md" />
            <Button 
              onClick={() => window.location.href = '/api/login'}
              className="bg-primary hover:bg-primary/90"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Leaf className="w-16 h-16 text-accent opacity-20 absolute -top-4 -right-4" />
              <TrendingUp className="w-20 h-20 text-primary" />
            </div>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Watch Your Sales
            <span className="text-primary"> Spring</span> to Life
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Nurture every opportunity with AI-powered insights, real-time coaching, 
            and seamless CRM integration. Transform prospects into flourishing deals.
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-lg px-8 py-3"
            onClick={() => window.location.href = '/api/login'}
          >
            Start Growing Today
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-br from-green-50/50 to-emerald-50/50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Cultivate Success
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Brain className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Smart Insights</CardTitle>
                <CardDescription>
                  Plant the seeds of success with AI-powered note analysis that identifies growth opportunities
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Zap className="w-8 h-8 text-accent mb-2" />
                <CardTitle>Real-Time Coaching</CardTitle>
                <CardDescription>
                  Nurture every conversation with contextual prompts that help deals bloom
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Users className="w-8 h-8 text-warning mb-2" />
                <CardTitle>CRM Integration</CardTitle>
                <CardDescription>
                  Automatic sync with Salesforce and other major CRM platforms
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <BarChart3 className="w-8 h-8 text-error mb-2" />
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  Track your performance and identify areas for improvement
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Close More Deals with AI-Driven Insights
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Never Miss a Pain Point</p>
                    <p className="text-gray-600">AI identifies and maps customer pain points to your value propositions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Perfect Follow-Up Every Time</p>
                    <p className="text-gray-600">Get intelligent next-step recommendations based on meeting context</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Seamless CRM Updates</p>
                    <p className="text-gray-600">Automatically sync structured data to your CRM without manual entry</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Ready to Transform Your Sales Process?</CardTitle>
                  <CardDescription className="text-center">
                    Join thousands of sales professionals who are already using SalesCoach AI
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => window.location.href = '/api/login'}
                  >
                    Get Started Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <SalespringLogo size="sm" className="text-white" />
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Salespring. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
