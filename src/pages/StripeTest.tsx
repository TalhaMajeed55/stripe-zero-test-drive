
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Shield, CheckCircle } from 'lucide-react';

const StripeTest = () => {
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: 'test@example.com',
    cardNumber: '4242 4242 4242 4242',
    expiry: '12/25',
    cvc: '123',
    name: 'John Doe'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);
      console.log('Payment processed with dummy data:', formData);
    }, 2000);
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
                Your $0.00 test payment has been processed successfully.
              </p>
              <Button 
                onClick={() => setPaymentSuccess(false)}
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
            Stripe Payment Test
          </CardTitle>
          <CardDescription>
            Test your Stripe integration with dummy data ($0.00 charge)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Product Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900">Test Product</h3>
            <p className="text-sm text-gray-600">Stripe Integration Test</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-lg font-bold">$0.00</span>
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
              <Label htmlFor="name">Cardholder Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="John Doe"
              />
            </div>

            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                placeholder="4242 4242 4242 4242"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use 4242 4242 4242 4242 for testing
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  value={formData.expiry}
                  onChange={(e) => handleInputChange('expiry', e.target.value)}
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  value={formData.cvc}
                  onChange={(e) => handleInputChange('cvc', e.target.value)}
                  placeholder="123"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Security Notice */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="h-4 w-4" />
            <span>Your payment information is secure and encrypted</span>
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
                Processing Payment...
              </>
            ) : (
              'Pay $0.00 - Test Payment'
            )}
          </Button>

          {/* Test Information */}
          <div className="bg-blue-50 p-3 rounded-lg text-sm">
            <p className="font-semibold text-blue-900 mb-1">Test Card Numbers:</p>
            <ul className="text-blue-700 space-y-1">
              <li>• 4242 4242 4242 4242 (Visa)</li>
              <li>• 5555 5555 5555 4444 (Mastercard)</li>
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
