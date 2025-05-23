
import React from 'react';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NotificationsTab: React.FC = () => {
  return (
    <Card className="border shadow-md">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Manage your notification preferences and view important alerts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Recent Alerts</h3>
            <div className="space-y-3">
              <div className="p-3 border rounded-md bg-yellow-50 border-yellow-200">
                <h4 className="font-medium text-yellow-800">FDA Alert: Metformin Recall</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Certain batches of Metformin have been recalled. Please check your medication.
                </p>
                <p className="text-xs text-yellow-600 mt-2">May 15, 2024</p>
              </div>
              <div className="p-3 border rounded-md bg-blue-50 border-blue-200">
                <h4 className="font-medium text-blue-800">New Treatment Available</h4>
                <p className="text-sm text-blue-700 mt-1">
                  A new treatment option is available for your condition: Hypertension.
                </p>
                <p className="text-xs text-blue-600 mt-2">April 28, 2024</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Notification Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Medication Reminders</p>
                  <p className="text-sm text-muted-foreground">Receive alerts for your medication schedule</p>
                </div>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">FDA Alerts</p>
                  <p className="text-sm text-muted-foreground">Notifications about drug recalls and warnings</p>
                </div>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Treatments</p>
                  <p className="text-sm text-muted-foreground">Updates about new treatment options</p>
                </div>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Community Messages</p>
                  <p className="text-sm text-muted-foreground">Replies and mentions in community forums</p>
                </div>
                <Button variant="outline" size="sm">Disabled</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsTab;
