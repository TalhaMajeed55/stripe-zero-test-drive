
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, TestTube, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Stripe Integration Test Drive
          </h1>
          <p className="text-xl text-gray-600">
            Test your Stripe payment integration with dummy data
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5 text-blue-500" />
                Payment Test
              </CardTitle>
              <CardDescription>
                Try out the payment flow with dummy data and test card numbers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/stripe-test">
                <Button className="w-full group">
                  Test Payment Flow
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-green-500" />
                Integration Ready
              </CardTitle>
              <CardDescription>
                When ready, connect your real Stripe account for live payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>
                Connect Stripe Account
                <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
                  Coming Soon
                </span>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">What's Included:</h3>
          <ul className="text-left space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Complete payment form with validation
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Test card numbers for different scenarios
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Success and error handling
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Responsive design with modern UI
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
