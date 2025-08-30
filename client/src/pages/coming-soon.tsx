import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Diamond, Sparkles, Clock } from "lucide-react";

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Diamond className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Saprism</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Sparkles className="w-16 h-16 text-cyan-400 opacity-30 absolute -top-4 -right-4 animate-pulse" />
              <Clock className="w-20 h-20 text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Something Amazing is 
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              {" "}Coming Soon
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We're putting the finishing touches on Saprism - your AI-powered sales coaching platform. 
            Get ready to transform your sales process like never before.
          </p>

          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Get Notified</CardTitle>
              <CardDescription className="text-center">
                Be the first to know when Saprism launches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                    Notify Me
                  </Button>
                </div>
                <p className="text-sm text-gray-500 text-center">
                  We'll never spam you. Unsubscribe at any time.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-gradient-to-br from-blue-50/50 to-cyan-50/50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What's Coming
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <Diamond className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>AI-Powered Insights</CardTitle>
                <CardDescription>
                  Intelligent analysis of your sales conversations and meetings
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Sparkles className="w-8 h-8 text-cyan-500 mb-2" />
                <CardTitle>Real-Time Coaching</CardTitle>
                <CardDescription>
                  Get instant suggestions and guidance during your sales calls
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Clock className="w-8 h-8 text-blue-500 mb-2" />
                <CardTitle>CRM Integration</CardTitle>
                <CardDescription>
                  Seamless sync with your existing sales tools and workflows
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Diamond className="w-6 h-6 text-blue-400" />
            <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">Saprism</span>
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2025 Saprism. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}