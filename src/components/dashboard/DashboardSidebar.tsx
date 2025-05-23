
import React from 'react';
import { Button } from "@/components/ui/button";
import { BarChart3, Settings, List, Users, Crown, Bell, User } from 'lucide-react';

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  username: string;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ 
  activeTab, 
  setActiveTab,
  username
}) => {
  return (
    <div className="w-full md:w-64 bg-sidebar rounded-lg shadow-md">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
            <User size={20} />
          </div>
          <div>
            <h3 className="font-medium">Welcome back</h3>
            <p className="text-sm text-sidebar-foreground">{username}</p>
          </div>
        </div>
      </div>
      
      <nav className="p-2">
        <Button 
          variant="ghost" 
          className={`w-full justify-start mb-1 ${activeTab === "overview" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          Overview
        </Button>
        <Button 
          variant="ghost" 
          className={`w-full justify-start mb-1 ${activeTab === "account" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}
          onClick={() => setActiveTab("account")}
        >
          <Settings className="mr-2 h-4 w-4" />
          Account Details
        </Button>
        <Button 
          variant="ghost" 
          className={`w-full justify-start mb-1 ${activeTab === "medList" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}
          onClick={() => setActiveTab("medList")}
        >
          <List className="mr-2 h-4 w-4" />
          My Med List
        </Button>
        <Button 
          variant="ghost" 
          className={`w-full justify-start mb-1 ${activeTab === "groups" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}
          onClick={() => setActiveTab("groups")}
        >
          <Users className="mr-2 h-4 w-4" />
          Support Groups
        </Button>
        <Button 
          variant="ghost" 
          className={`w-full justify-start mb-1 ${activeTab === "subscription" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}
          onClick={() => setActiveTab("subscription")}
        >
          <Crown className="mr-2 h-4 w-4" />
          Subscription
        </Button>
        <Button 
          variant="ghost" 
          className={`w-full justify-start mb-1 ${activeTab === "notifications" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}
          onClick={() => setActiveTab("notifications")}
        >
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </Button>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
