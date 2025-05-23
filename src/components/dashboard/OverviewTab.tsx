
import React from 'react';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { List, CheckCircle, Bell, Crown } from 'lucide-react';

const OverviewTab: React.FC = () => {
  const handleSubscribe = () => {
    // Subscription logic would go here
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border shadow-md">
          <CardHeader className="pb-2">
            <CardTitle>Total Saved Medications</CardTitle>
            <CardDescription>Medications in your list</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-senay-blue-500">8</div>
              <div className="h-12 w-12 rounded-full bg-senay-blue-100 flex items-center justify-center">
                <List className="h-6 w-6 text-senay-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border shadow-md">
          <CardHeader className="pb-2">
            <CardTitle>Tracked Conditions</CardTitle>
            <CardDescription>Health conditions you monitor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-senay-teal-500">3</div>
              <div className="h-12 w-12 rounded-full bg-senay-teal-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-senay-teal-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border shadow-md md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Subscription Status</CardTitle>
            <CardDescription>Your current plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-xl font-medium text-orange-500">Free Plan</div>
              <Button size="sm" onClick={handleSubscribe}>
                <Crown className="mr-1 h-4 w-4" /> Upgrade
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card className="border shadow-md">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-2 rounded-md bg-accent/50">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <List className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Added medication to list</p>
                  <p className="text-sm text-muted-foreground">Lisinopril 10mg</p>
                  <p className="text-xs text-muted-foreground">Today, 10:45 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 rounded-md bg-accent/50">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Added new condition</p>
                  <p className="text-sm text-muted-foreground">Hypertension</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 3:20 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border shadow-md">
          <CardHeader>
            <CardTitle>Medication Reminders</CardTitle>
            <CardDescription>Upcoming medication schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start justify-between p-2 rounded-md bg-accent/50">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-senay-blue-100 flex items-center justify-center">
                    <Bell className="h-4 w-4 text-senay-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">Lisinopril 10mg</p>
                    <p className="text-xs text-muted-foreground">1 tablet</p>
                  </div>
                </div>
                <p className="text-sm font-medium">8:00 PM</p>
              </div>
              <div className="flex items-start justify-between p-2 rounded-md bg-accent/50">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-senay-blue-100 flex items-center justify-center">
                    <Bell className="h-4 w-4 text-senay-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">Metformin 500mg</p>
                    <p className="text-xs text-muted-foreground">1 tablet with food</p>
                  </div>
                </div>
                <p className="text-sm font-medium">9:00 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default OverviewTab;
