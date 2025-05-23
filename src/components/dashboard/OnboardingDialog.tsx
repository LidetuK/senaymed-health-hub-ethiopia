
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface OnboardingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;
  formData: {
    fullName: string;
    dateOfBirth: string;
    gender: string;
    phoneNumber: string;
    address: string;
    emergencyContact: string;
    allergies: string;
    existingConditions: string;
    currentMedications: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  skipOnboarding: () => void;
}

const OnboardingDialog: React.FC<OnboardingDialogProps> = ({
  open,
  onOpenChange,
  onboardingStep,
  formData,
  handleInputChange,
  handleNextStep,
  handlePreviousStep,
  skipOnboarding
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">
            {onboardingStep === 1 && "Welcome to SenayMed!"}
            {onboardingStep === 2 && "Health Information"}
            {onboardingStep === 3 && "Almost Done!"}
          </DialogTitle>
          <DialogDescription>
            {onboardingStep === 1 && "Let's set up your profile to get started"}
            {onboardingStep === 2 && "Tell us about your health conditions"}
            {onboardingStep === 3 && "Final details to complete your profile"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center mb-6">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${onboardingStep >= 1 ? "bg-senay-blue-500 text-white" : "bg-gray-200"}`}>
              1
            </div>
            <div className={`w-16 h-1 ${onboardingStep >= 2 ? "bg-senay-blue-500" : "bg-gray-200"}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${onboardingStep >= 2 ? "bg-senay-blue-500 text-white" : "bg-gray-200"}`}>
              2
            </div>
            <div className={`w-16 h-1 ${onboardingStep >= 3 ? "bg-senay-blue-500" : "bg-gray-200"}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${onboardingStep >= 3 ? "bg-senay-blue-500 text-white" : "bg-gray-200"}`}>
              3
            </div>
          </div>
        </div>

        {onboardingStep === 1 && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleInputChange} 
                placeholder="John Doe" 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input 
                id="dateOfBirth" 
                name="dateOfBirth" 
                value={formData.dateOfBirth} 
                onChange={handleInputChange} 
                type="date" 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
              <Input 
                id="gender" 
                name="gender" 
                value={formData.gender} 
                onChange={handleInputChange} 
                placeholder="Male/Female/Other" 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input 
                id="phoneNumber" 
                name="phoneNumber" 
                value={formData.phoneNumber} 
                onChange={handleInputChange} 
                placeholder="+1 234 567 8900" 
              />
            </div>
          </div>
        )}

        {onboardingStep === 2 && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="allergies">Do you have any allergies?</Label>
              <Textarea 
                id="allergies" 
                name="allergies" 
                value={formData.allergies} 
                onChange={handleInputChange} 
                placeholder="List any allergies you may have" 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="existingConditions">Existing Medical Conditions</Label>
              <Textarea 
                id="existingConditions" 
                name="existingConditions" 
                value={formData.existingConditions} 
                onChange={handleInputChange} 
                placeholder="Diabetes, Hypertension, etc." 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="currentMedications">Current Medications</Label>
              <Textarea 
                id="currentMedications" 
                name="currentMedications" 
                value={formData.currentMedications} 
                onChange={handleInputChange} 
                placeholder="List any medications you are currently taking" 
              />
            </div>
          </div>
        )}

        {onboardingStep === 3 && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="address">Home Address</Label>
              <Textarea 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleInputChange} 
                placeholder="Enter your full address" 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input 
                id="emergencyContact" 
                name="emergencyContact" 
                value={formData.emergencyContact} 
                onChange={handleInputChange} 
                placeholder="Name and phone number" 
              />
            </div>
            <div className="p-4 bg-senay-blue-100 rounded-md">
              <p className="text-sm text-muted-foreground">
                By completing your profile, you'll get personalized health recommendations and medication reminders.
              </p>
            </div>
          </div>
        )}

        <DialogFooter className="flex justify-between">
          <div>
            {onboardingStep > 1 ? (
              <Button variant="outline" onClick={handlePreviousStep}>
                Back
              </Button>
            ) : (
              <Button variant="ghost" onClick={skipOnboarding}>
                Skip for now
              </Button>
            )}
          </div>
          <Button onClick={handleNextStep} className="bg-senay-blue-500 hover:bg-senay-blue-600">
            {onboardingStep < 3 ? "Next" : "Complete Setup"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingDialog;
