
import React from 'react';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const groups = [
  {
    name: "Diabetes Support Group",
    description: "Connect with others managing diabetes and share experiences.",
    members: 324
  },
  {
    name: "Heart Health Forum",
    description: "Discuss cardiovascular health, medications, and lifestyle changes.",
    members: 186
  },
  {
    name: "Anxiety & Depression Support",
    description: "A safe space to discuss mental health concerns and treatments.",
    members: 412
  }
];

const SupportGroupsTab: React.FC = () => {
  return (
    <Card className="border shadow-md">
      <CardHeader>
        <CardTitle>Support Groups</CardTitle>
        <CardDescription>
          Get your medical questions answered by helpful AI or SenayMed community.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {groups.map((group, index) => (
            <div key={index} className="p-4 border rounded-lg bg-accent/30">
              <h3 className="text-lg font-semibold mb-2">{group.name}</h3>
              <p className="text-muted-foreground mb-4">
                {group.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{group.members} members</span>
                <Button size="sm">Join Group</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportGroupsTab;
