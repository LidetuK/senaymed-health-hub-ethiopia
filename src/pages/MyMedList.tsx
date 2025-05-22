
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Plus, FileText, Printer, Download, Clock } from 'lucide-react';

const MyMedList: React.FC = () => {
  const [medications, setMedications] = useState<
    Array<{ id: number; name: string; dosage: string; frequency: string }>
  >([]);
  const [newMed, setNewMed] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newFrequency, setNewFrequency] = useState('');

  const handleAddMedication = () => {
    if (newMed.trim()) {
      setMedications([
        ...medications,
        {
          id: Date.now(),
          name: newMed,
          dosage: newDosage || 'Not specified',
          frequency: newFrequency || 'Not specified'
        }
      ]);
      setNewMed('');
      setNewDosage('');
      setNewFrequency('');
    }
  };

  const handleRemoveMedication = (id: number) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">My Medication List</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <Card className="border shadow-md h-full">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Your Medications</h2>
                    
                    {medications.length > 0 ? (
                      <div className="space-y-3">
                        {medications.map(med => (
                          <div key={med.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-md">
                            <div>
                              <h3 className="font-medium">{med.name}</h3>
                              <p className="text-sm text-gray-600">
                                {med.dosage} • {med.frequency}
                              </p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRemoveMedication(med.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-md">
                        <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
                          <FileText className="h-6 w-6 text-gray-400" />
                        </div>
                        <p className="text-gray-500">No medications added yet</p>
                        <p className="text-gray-400 text-sm mt-1">
                          Add medications using the form on the right
                        </p>
                      </div>
                    )}
                    
                    {medications.length > 0 && (
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex gap-1">
                          <Printer className="h-4 w-4" />
                          <span>Print</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex gap-1">
                          <Download className="h-4 w-4" />
                          <span>Export</span>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="border shadow-md">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Add Medication</h2>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="med-name" className="block text-sm font-medium text-gray-700 mb-1">
                          Medication Name
                        </label>
                        <Input
                          id="med-name"
                          value={newMed}
                          onChange={(e) => setNewMed(e.target.value)}
                          placeholder="Enter medication name"
                        />
                      </div>
                      <div>
                        <label htmlFor="dosage" className="block text-sm font-medium text-gray-700 mb-1">
                          Dosage
                        </label>
                        <Input
                          id="dosage"
                          value={newDosage}
                          onChange={(e) => setNewDosage(e.target.value)}
                          placeholder="e.g., 10mg"
                        />
                      </div>
                      <div>
                        <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                          Frequency
                        </label>
                        <Input
                          id="frequency"
                          value={newFrequency}
                          onChange={(e) => setNewFrequency(e.target.value)}
                          placeholder="e.g., Twice daily"
                        />
                      </div>
                      <Button 
                        onClick={handleAddMedication}
                        disabled={!newMed.trim()}
                        className="w-full flex items-center gap-1"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Medication</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Medication Reminders</h2>
              <p className="text-gray-600 mb-4">
                Set up reminders to take your medications on time. You can receive notifications
                via email or through our mobile app.
              </p>
              <Button variant="outline" className="flex gap-2">
                <Clock className="h-4 w-4" />
                <span>Set Up Reminders</span>
              </Button>
            </div>
            
            <div className="prose max-w-none">
              <h2>Benefits of Maintaining a Medication List</h2>
              <p>
                Keeping an updated list of your medications is an important part of managing your health. A current medication list:
              </p>
              <ul>
                <li>Helps healthcare providers make safe treatment decisions</li>
                <li>Reduces the risk of medication errors and harmful drug interactions</li>
                <li>Improves communication with your healthcare team</li>
                <li>Serves as a helpful reference during medical emergencies</li>
                <li>Assists pharmacists in checking for potential drug interactions</li>
              </ul>
              
              <p>
                Remember to include all prescription medications, over-the-counter drugs, vitamins, and supplements
                in your medication list. Update your list whenever there are changes to your medication regimen.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyMedList;
