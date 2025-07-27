import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Shield, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const StripeTest = () => {
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: 'test@example.com',
    amount: '2999' // $29.99 in cents
  });

  useEffect(() => {
    // Check for success/cancel parameters
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      setPaymentSuccess(true);
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          amount: parseInt(formData.amount),
          customerEmail: formData.email
        }
      });

      if (error) {
        console.error('Error creating payment:', error);
        alert('Payment failed. Please try again.');
        setLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      window.open(data.url, '_blank');
      setLoading(false);
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
              <p className="text-gray-600 mb-4">
                Your payment has been processed successfully via Stripe.
              </p>
              <Button 
                onClick={() => {
                  setPaymentSuccess(false);
                  // Clear URL parameters
                  window.history.replaceState({}, document.title, "/stripe-test");
                }}
                className="w-full"
              >
                Test Another Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Stripe Payment Integration
          </CardTitle>
          <CardDescription>
            Real Stripe integration with test mode
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Product Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900">Test Product</h3>
            <p className="text-sm text-gray-600">Stripe Integration Demo</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-lg font-bold">${(parseInt(formData.amount) / 100).toFixed(2)}</span>
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                TEST MODE
              </span>
            </div>
          </div>

          <Separator />

          {/* Payment Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="amount">Amount (in cents)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                placeholder="2999"
              />
              <p className="text-xs text-gray-500 mt-1">
                Amount in cents (e.g., 2999 = $29.99)
              </p>
            </div>
          </div>

          <Separator />

          {/* Security Notice */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="h-4 w-4" />
            <span>Secure payment processing via Stripe</span>
          </div>

          {/* Payment Button */}
          <Button
            onClick={handlePayment}
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              `Pay $${(parseInt(formData.amount) / 100).toFixed(2)} via Stripe`
            )}
          </Button>

          {/* Test Information */}
          <div className="bg-blue-50 p-3 rounded-lg text-sm">
            <p className="font-semibold text-blue-900 mb-1">This uses real Stripe API:</p>
            <ul className="text-blue-700 space-y-1">
              <li>• You'll be redirected to Stripe Checkout</li>
              <li>• Use test card: 4242 4242 4242 4242</li>
              <li>• Any future expiry date</li>
              <li>• Any 3-digit CVC</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StripeTest;