
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import OverviewTab from "@/components/dashboard/OverviewTab";
import AccountDetailsTab from "@/components/dashboard/AccountDetailsTab";
import MyMedListTab from "@/components/dashboard/MyMedListTab";
import SupportGroupsTab from "@/components/dashboard/SupportGroupsTab";
import SubscriptionTab from "@/components/dashboard/SubscriptionTab";
import NotificationsTab from "@/components/dashboard/NotificationsTab";
import OnboardingDialog from "@/components/dashboard/OnboardingDialog";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    address: "",
    emergencyContact: "",
    allergies: "",
    existingConditions: "",
    currentMedications: "",
  });
  const username = localStorage.getItem("username") || "User";
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem("onboardingCompleted");
    
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (onboardingStep < 3) {
      setOnboardingStep(prev => prev + 1);
    } else {
      completeOnboarding();
    }
  };

  const handlePreviousStep = () => {
    if (onboardingStep > 1) {
      setOnboardingStep(prev => prev - 1);
    }
  };

  const completeOnboarding = () => {
    localStorage.setItem("onboardingCompleted", "true");
    localStorage.setItem("userProfile", JSON.stringify(formData));
    setShowOnboarding(false);
    
    toast({
      title: "Profile Complete!",
      description: "Your profile has been successfully set up.",
    });
  };

  const skipOnboarding = () => {
    localStorage.setItem("onboardingCompleted", "true");
    setShowOnboarding(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Onboarding Dialog */}
      <OnboardingDialog
        open={showOnboarding}
        onOpenChange={setShowOnboarding}
        onboardingStep={onboardingStep}
        setOnboardingStep={setOnboardingStep}
        formData={formData}
        handleInputChange={handleInputChange}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep}
        skipOnboarding={skipOnboarding}
      />
      
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            {/* Sidebar */}
            <DashboardSidebar 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              username={username}
            />

            {/* Main Content */}
            <div className="flex-1">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsContent value="overview">
                  <OverviewTab />
                </TabsContent>
                
                <TabsContent value="account">
                  <AccountDetailsTab />
                </TabsContent>
                
                <TabsContent value="medList">
                  <MyMedListTab />
                </TabsContent>
                
                <TabsContent value="groups">
                  <SupportGroupsTab />
                </TabsContent>
                
                <TabsContent value="subscription">
                  <SubscriptionTab />
                </TabsContent>
                
                <TabsContent value="notifications">
                  <NotificationsTab />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
