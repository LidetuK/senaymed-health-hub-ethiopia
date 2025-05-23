
import React from 'react';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { List } from 'lucide-react';

const medications = [
  { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
  { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
  { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily at bedtime" }
];

const MyMedListTab: React.FC = () => {
  return (
    <Card className="border shadow-md">
      <CardHeader>
        <CardTitle>My Med List</CardTitle>
        <CardDescription>
          Manage your list of drugs and conditions, with detailed interaction warnings. 
          Get notified of new treatments or alerts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Button>
            <List className="mr-2 h-4 w-4" /> Add Medication
          </Button>
        </div>
        <div className="space-y-3">
          {medications.map((med, index) => (
            <div key={index} className="p-4 border rounded-md bg-accent/30 flex justify-between">
              <div>
                <h3 className="font-semibold">{med.name}</h3>
                <p className="text-sm text-muted-foreground">{med.dosage} • {med.frequency}</p>
              </div>
              <Button variant="ghost" size="sm" className="text-destructive">Remove</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MyMedListTab;
