
import React from 'react';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, CreditCard } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const SubscriptionTab: React.FC = () => {
  const { toast } = useToast();
  
  const handleSubscribe = () => {
    // Implement subscription logic here
    toast({
      title: "Coming Soon",
      description: "Subscription feature will be implemented with payment integration",
    });
  };

  return (
    <Card className="border shadow-md">
      <CardHeader>
        <CardTitle>Subscription Plans</CardTitle>
        <CardDescription>Choose the plan that works best for you</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Free Plan */}
          <div className="border rounded-lg p-6 bg-accent/20">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Free</h3>
              <div className="mt-2 text-3xl font-bold">$0<span className="text-base font-normal text-muted-foreground">/month</span></div>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">Basic med list tracking</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">Limited drug information</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">Community forum access</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full">Current Plan</Button>
          </div>
          
          {/* Premium Plan */}
          <div className="border-2 border-primary rounded-lg p-6 bg-accent/30 relative">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg rounded-tr-lg">
              POPULAR
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Premium</h3>
              <div className="mt-2 text-3xl font-bold">$9.99<span className="text-base font-normal text-muted-foreground">/month</span></div>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">Advanced med list management</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">Full drug database access</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">Medication reminders</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">Priority community support</span>
              </li>
            </ul>
            <Button onClick={handleSubscribe} className="w-full">Subscribe</Button>
          </div>
          
          {/* Professional Plan */}
          <div className="border rounded-lg p-6 bg-accent/20">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Professional</h3>
              <div className="mt-2 text-3xl font-bold">$19.99<span className="text-base font-normal text-muted-foreground">/month</span></div>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">Everything in Premium</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">AI-powered health insights</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">Expert consultation</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">Family account (up to 5 profiles)</span>
              </li>
            </ul>
            <Button onClick={handleSubscribe} className="w-full" variant="outline">Subscribe</Button>
          </div>
        </div>
        
        <div className="mt-8 p-4 border rounded bg-muted/50 flex items-center gap-3">
          <CreditCard className="h-8 w-8 text-muted-foreground" />
          <div>
            <h4 className="font-medium">Secure Payment</h4>
            <p className="text-sm text-muted-foreground">Your payment information is processed securely. We do not store credit card details.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionTab;
