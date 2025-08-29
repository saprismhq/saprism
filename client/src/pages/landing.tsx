import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Users, BarChart3, Zap } from "lucide-react";
import { SaprismLogo } from "@/components/saprism-logo";
import logoImage from "@assets/saprism_logo_transparent_1756064029669.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <SaprismLogo size="md" />
            <Button 
              onClick={() => window.location.href = '/api/login'}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
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
            <div className="bg-gradient-to-r from-blue-100/50 via-cyan-100/50 to-green-100/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
              <img
                src={logoImage}
                alt="Saprism Logo"
                className="h-24 w-24 object-contain"
              />
            </div>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Complex Sales Into
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Brilliant Success</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Like light through a prism, Saprism transforms complex sales processes into clear, 
            actionable insights. AI-powered coaching and seamless CRM integration illuminate your path to success.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-lg px-8 py-3"
            onClick={() => window.location.href = '/api/login'}
          >
            Illuminate Your Sales Process
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-br from-blue-50/50 to-cyan-50/50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Illuminate Success
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Brain className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Smart Insights</CardTitle>
                <CardDescription>
                  Illuminate hidden opportunities with AI-powered note analysis that reveals clear insights
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Zap className="w-8 h-8 text-cyan-500 mb-2" />
                <CardTitle>Real-Time Coaching</CardTitle>
                <CardDescription>
                  Enhance every conversation with intelligent prompts that guide deals to completion
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Users className="w-8 h-8 text-blue-500 mb-2" />
                <CardTitle>CRM Integration</CardTitle>
                <CardDescription>
                  Automatic sync with Salesforce and other major CRM platforms
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <BarChart3 className="w-8 h-8 text-cyan-600 mb-2" />
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
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Never Miss a Pain Point</p>
                    <p className="text-gray-600">AI identifies and maps customer pain points to your value propositions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Perfect Follow-Up Every Time</p>
                    <p className="text-gray-600">Get intelligent next-step recommendations based on meeting context</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Seamless CRM Updates</p>
                    <p className="text-gray-600">Automatically sync structured data to your CRM without manual entry</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100/50 to-cyan-100/50 rounded-lg p-8 border border-blue-200/20">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Ready to Transform Your Sales Process?</CardTitle>
                  <CardDescription className="text-center">
                    Join thousands of sales professionals who are already using Saprism
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
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
            <SaprismLogo size="sm" className="text-white" />
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Saprism. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
