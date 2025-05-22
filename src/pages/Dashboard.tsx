
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CheckCircle, Settings, List, Users, Crown, CreditCard, User, BarChart3, Bell } from "lucide-react";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const username = localStorage.getItem("username") || "User";

  const handleSubscribe = () => {
    // Implement subscription logic here
    alert("Subscription feature will be implemented with payment integration");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            {/* Sidebar */}
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

            {/* Main Content */}
            <div className="flex-1">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsContent value="overview">
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
                </TabsContent>
                
                <TabsContent value="account">
                  <Card className="border shadow-md">
                    <CardHeader>
                      <CardTitle>Account Details</CardTitle>
                      <CardDescription>
                        Update the details associated with your Drugs.com account including email address, 
                        password, and other personal information.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First name</Label>
                            <Input id="firstName" placeholder="John" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last name</Label>
                            <Input id="lastName" placeholder="Doe" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email address</Label>
                          <Input id="email" type="email" placeholder="john.doe@example.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current password</Label>
                          <Input id="currentPassword" type="password" />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">New password</Label>
                            <Input id="newPassword" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm password</Label>
                            <Input id="confirmPassword" type="password" />
                          </div>
                        </div>
                        <Button type="submit">Update account</Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="medList">
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
                        {[
                          { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
                          { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
                          { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily at bedtime" }
                        ].map((med, index) => (
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
                </TabsContent>
                
                <TabsContent value="groups">
                  <Card className="border shadow-md">
                    <CardHeader>
                      <CardTitle>Support Groups</CardTitle>
                      <CardDescription>
                        Get your medical questions answered by helpful AI or SenayMed community.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg bg-accent/30">
                          <h3 className="text-lg font-semibold mb-2">Diabetes Support Group</h3>
                          <p className="text-muted-foreground mb-4">
                            Connect with others managing diabetes and share experiences.
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">324 members</span>
                            <Button size="sm">Join Group</Button>
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg bg-accent/30">
                          <h3 className="text-lg font-semibold mb-2">Heart Health Forum</h3>
                          <p className="text-muted-foreground mb-4">
                            Discuss cardiovascular health, medications, and lifestyle changes.
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">186 members</span>
                            <Button size="sm">Join Group</Button>
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg bg-accent/30">
                          <h3 className="text-lg font-semibold mb-2">Anxiety & Depression Support</h3>
                          <p className="text-muted-foreground mb-4">
                            A safe space to discuss mental health concerns and treatments.
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">412 members</span>
                            <Button size="sm">Join Group</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="subscription">
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
                </TabsContent>
                
                <TabsContent value="notifications">
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
