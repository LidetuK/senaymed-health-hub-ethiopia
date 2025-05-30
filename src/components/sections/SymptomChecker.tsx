import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { MapPin, AlertTriangle, Check, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Symptom {
  id: string;
  name: string;
  description?: string;
}

interface Condition {
  id: string;
  name: string;
  matchedSymptoms: number;
  details?: string;
  treatment?: string;
}

const SymptomChecker: React.FC = () => {
  const [symptom, setSymptom] = useState('');
  const [activeTab, setActiveTab] = useState('info');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [suggestions, setSuggestions] = useState<Symptom[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [possibleConditions, setPossibleConditions] = useState<Condition[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);
  const { toast } = useToast();
  
  // Update environment variable access for Vite
  const deepSeekApiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;

  const generateAgeOptions = () => {
    const options = [];
    for (let i = 1; i <= 100; i++) {
      options.push(
        <SelectItem key={i} value={i.toString()}>
          {i}
        </SelectItem>
      );
    }
    return options;
  };

  const fetchSymptomSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);

    try {
      if (!deepSeekApiKey) {
        throw new Error('API key not configured');
      }

      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${deepSeekApiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: 'You are a medical assistant. The user will provide symptoms. Return a JSON array of possible symptom matches with format [{id: "unique-id", name: "Symptom Name", description: "Brief description"}]. Provide 5-7 relevant matches only. No additional text, just the JSON array.'
            },
            {
              role: 'user',
              content: `Find symptom matches for: ${query}`
            }
          ],
          temperature: 0.1
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.choices?.[0]?.message?.content) {
        throw new Error('Invalid API response format');
      }

      // Extract the JSON array from the response
      const content = data.choices[0].message.content;
      
      try {
        // Parse the JSON string to get the array of symptoms
        const parsedSymptoms = JSON.parse(content);
        
        // Validate the parsed data structure
        if (!Array.isArray(parsedSymptoms)) {
          throw new Error('API response is not an array');
        }

        // Validate each symptom object
        const validSymptoms = parsedSymptoms.filter(symptom => 
          typeof symptom === 'object' &&
          typeof symptom.id === 'string' &&
          typeof symptom.name === 'string'
        );

        if (validSymptoms.length === 0) {
          throw new Error('No valid symptoms found in response');
        }

        setSuggestions(validSymptoms);
      } catch (err) {
        console.error('Error parsing symptoms JSON:', err);
        toast({
          title: "Error",
          description: "Failed to parse symptom suggestions. Please try again.",
          variant: "destructive"
        });
        // Fallback suggestions if parsing fails
        setSuggestions([
          { id: '1', name: 'Cough', description: 'Persistent, dry cough' },
          { id: '2', name: 'Coughing up blood', description: 'Hemoptysis' },
          { id: '3', name: 'Coughing phlegm', description: 'Productive cough with mucus' },
          { id: '4', name: 'Night cough', description: 'Coughing that worsens at night' }
        ]);
      }
    } catch (error) {
      console.error('Error fetching symptom suggestions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch symptom suggestions. Please try again.",
        variant: "destructive"
      });
      // Fallback suggestions if API call errors
      setSuggestions([
        { id: '1', name: 'Cough', description: 'Persistent, dry cough' },
        { id: '2', name: 'Coughing up blood', description: 'Hemoptysis' },
        { id: '3', name: 'Coughing phlegm', description: 'Productive cough with mucus' },
        { id: '4', name: 'Night cough', description: 'Coughing that worsens at night' }
      ]);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (symptom) {
        fetchSymptomSuggestions(symptom);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [symptom]);

  const handleSelectSymptom = (symptomItem: Symptom) => {
    if (!selectedSymptoms.some(s => s.id === symptomItem.id)) {
      setSelectedSymptoms([...selectedSymptoms, symptomItem]);
      setSymptom('');
      setSuggestions([]);
      
      // Show toast notification when symptom is added
      toast({
        title: "Symptom Added",
        description: `"${symptomItem.name}" has been added to your symptom list.`,
      });
    }
  };

  const handleRemoveSymptom = (id: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Symptoms search form submitted:', { age, sex, selectedSymptoms });
    if (selectedSymptoms.length > 0) {
      setActiveTab('symptoms');
    }
  };

  const handleContinue = () => {
    if (activeTab === 'info' && selectedSymptoms.length > 0) {
      setActiveTab('symptoms');
    } else if (activeTab === 'symptoms') {
      // Generate possible conditions based on selected symptoms
      generatePossibleConditions();
      setActiveTab('conditions');
    } else if (activeTab === 'conditions') {
      setActiveTab('details');
    } else if (activeTab === 'details') {
      setActiveTab('treatment');
    }
  };

  const handlePrevious = () => {
    if (activeTab === 'symptoms') {
      setActiveTab('info');
    } else if (activeTab === 'conditions') {
      setActiveTab('symptoms');
    } else if (activeTab === 'details') {
      setActiveTab('conditions');
    } else if (activeTab === 'treatment') {
      setActiveTab('details');
    }
  };

  const generatePossibleConditions = () => {
    // This would normally call an API, but for now we'll generate mock data
    // based on the selected symptoms
    if (selectedSymptoms.length === 0) return;
    
    // Example condition data - in real app, this would come from an API
    const conditions: Condition[] = [
      {
        id: '1',
        name: 'Common Cold',
        matchedSymptoms: Math.min(selectedSymptoms.length, 3),
        details: "The common cold is a viral infection of your nose and throat (upper respiratory tract). It's usually harmless, although it might not feel that way. Many types of viruses can cause a common cold. Symptoms typically appear one to three days after exposure to a cold-causing virus and can include runny nose, sore throat, cough, congestion, slight body aches, a mild headache, sneezing, and low-grade fever.",
        treatment: "Rest and drink plenty of fluids. Over-the-counter medicines can help ease symptoms but won't make your cold go away any faster. Antibiotics are of no use against cold viruses. Try saline nasal drops or sprays, and use a humidifier or cool mist vaporizer in your room."
      },
      {
        id: '2',
        name: 'Seasonal Allergies',
        matchedSymptoms: Math.max(1, Math.floor(selectedSymptoms.length / 2)),
        details: "Seasonal allergies, also called hay fever and allergic rhinitis, can make you miserable with symptoms like runny nose, itchy eyes, congestion, and sneezing. Tree pollens in spring, grasses in summer, and weeds in fall can trigger these symptoms in susceptible individuals. Diagnosis often includes skin or blood tests to identify specific allergens.",
        treatment: "Avoid known allergens when possible. Consider over-the-counter or prescription antihistamines, decongestants, or nasal corticosteroids. For severe allergies, your doctor might recommend immunotherapy through allergy shots or sublingual tablets."
      },
      {
        id: '3',
        name: 'Influenza (Flu)',
        matchedSymptoms: Math.min(selectedSymptoms.length, 4),
        details: "The flu is a contagious respiratory illness caused by influenza viruses that infect the nose, throat, and sometimes the lungs. It can cause mild to severe illness, and at times can lead to death. Flu is different from a cold and usually comes on suddenly. People who have flu often feel some or all of these symptoms: fever, chills, cough, sore throat, runny or stuffy nose, muscle or body aches, headaches, and fatigue.",
        treatment: "If diagnosed early (within 48 hours of symptoms), antiviral medications may be prescribed to shorten the duration and reduce severity. Otherwise, rest, fluids, and over-the-counter medications to relieve symptoms are recommended. In high-risk cases, hospitalization may be necessary."
      },
    ];
    
    // Randomly sort conditions but ensure at least one condition shows
    const shuffled = [...conditions].sort(() => 0.5 - Math.random());
    setPossibleConditions(shuffled.slice(0, Math.min(shuffled.length, 3)));
  };

  const handleSelectCondition = (condition: Condition) => {
    setSelectedCondition(condition);
  };

  const handleFindHospital = () => {
    toast({
      title: "Finding Hospitals",
      description: "Searching for hospitals near your location...",
    });
    
    // In a real app, this would navigate to a hospital finder page or use geolocation
    console.log("Find hospital location");
  };

  const showBodyImage = sex !== '';
  
  return (
    <section className="py-16 bg-gradient-to-b from-white to-senay-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Symptom Checker</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Identify possible conditions and treatments by checking your symptoms
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-6 md:p-8 bg-white">
                <Tabs defaultValue="info" className="mb-6" value={activeTab} onValueChange={(value) => setActiveTab(value)}>
                  <TabsList className="grid grid-cols-5 mb-8">
                    <TabsTrigger value="info" className={activeTab === 'info' ? 'border-b-2 border-senay-blue-500' : ''}>INFO</TabsTrigger>
                    <TabsTrigger value="symptoms" className={activeTab === 'symptoms' ? 'border-b-2 border-senay-blue-500' : ''}>SYMPTOMS</TabsTrigger>
                    <TabsTrigger value="conditions" className={activeTab === 'conditions' ? 'border-b-2 border-senay-blue-500' : ''}>CONDITIONS</TabsTrigger>
                    <TabsTrigger value="details" className={activeTab === 'details' ? 'border-b-2 border-senay-blue-500' : ''}>DETAILS</TabsTrigger>
                    <TabsTrigger value="treatment" className={activeTab === 'treatment' ? 'border-b-2 border-senay-blue-500' : ''}>TREATMENT</TabsTrigger>
                  </TabsList>

                  <TabsContent value="info" className="mt-0">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">Basic Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <Label htmlFor="age" className="block mb-2 font-medium">Age</Label>
                        <Select value={age} onValueChange={setAge}>
                          <SelectTrigger id="age" className="w-full">
                            <SelectValue placeholder="Select age" />
                          </SelectTrigger>
                          <SelectContent>
                            {generateAgeOptions()}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="block mb-2 font-medium">Sex</Label>
                        <RadioGroup value={sex} onValueChange={setSex} className="flex gap-4">
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">What are your symptoms?</h3>
                    
                    <div className="relative">
                      <form onSubmit={handleSubmit}>
                        <Input 
                          type="text" 
                          placeholder="Type your symptoms here" 
                          className="mb-1" 
                          value={symptom}
                          onChange={(e) => setSymptom(e.target.value)}
                        />
                      </form>

                      {suggestions.length > 0 && (
                        <div className="absolute z-10 w-full bg-white rounded-md border shadow-md mt-1">
                          <Command>
                            <CommandList>
                              {suggestions.map((item) => (
                                <CommandItem 
                                  key={item.id} 
                                  onSelect={() => handleSelectSymptom(item)}
                                  className="cursor-pointer hover:bg-gray-100"
                                >
                                  <div className="flex flex-col">
                                    <span className="font-medium">{item.name}</span>
                                    {item.description && (
                                      <span className="text-xs text-gray-500">{item.description}</span>
                                    )}
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandList>
                          </Command>
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      {selectedSymptoms.length > 0 ? (
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-medium mb-2">Selected symptoms:</h4>
                          <ul className="space-y-2">
                            {selectedSymptoms.map((item) => (
                              <li key={item.id} className="flex justify-between items-center bg-white p-2 rounded border">
                                <span>{item.name}</span>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleRemoveSymptom(item.id)}
                                  className="h-6 w-6 p-0"
                                >
                                  ✕
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="mt-8 bg-gray-50 p-6 rounded-md text-center">
                          <div className="flex justify-center mb-4">
                            <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center">
                              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M9 9L11 11L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 3L12 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                              </svg>
                            </div>
                          </div>
                          <p className="text-gray-500">No symptoms added</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="symptoms" className="mt-0">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <h4 className="font-medium mb-2">SELECTED SYMPTOMS</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-2">
                        {selectedSymptoms.map(symptom => (
                          <li key={symptom.id}>{symptom.name}</li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="conditions" className="mt-0">
                    <p className="text-gray-600">Based on your symptoms, here are some possible conditions:</p>
                    <div className="mt-4 space-y-3">
                      {possibleConditions.length > 0 ? (
                        <>
                          {possibleConditions.map(condition => (
                            <div 
                              key={condition.id}
                              className={`p-3 border rounded-md bg-gray-50 cursor-pointer ${selectedCondition?.id === condition.id ? 'ring-2 ring-senay-blue-400' : ''}`}
                              onClick={() => handleSelectCondition(condition)}
                            >
                              <div className="flex justify-between items-center">
                                <h4 className="font-medium">{condition.name}</h4>
                                {selectedCondition?.id === condition.id && (
                                  <Check size={16} className="text-senay-blue-500" />
                                )}
                              </div>
                              <p className="text-sm text-gray-600">Matches {condition.matchedSymptoms} of your symptoms</p>
                            </div>
                          ))}
                          <p className="text-xs text-gray-500 mt-2">Select a condition to see more details</p>
                        </>
                      ) : (
                        <p className="text-gray-600">Select symptoms first to see possible conditions.</p>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="details" className="mt-0">
                    {selectedCondition ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Info size={20} className="text-senay-blue-500" />
                          <h3 className="text-xl font-medium">{selectedCondition.name} Details</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{selectedCondition.details}</p>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-medium mb-2">Matched Symptoms</h4>
                          <p className="text-gray-600">This condition matches {selectedCondition.matchedSymptoms} of your reported symptoms.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-6">
                        <p className="text-gray-600">Please select a condition from the previous step to see details.</p>
                        <Button 
                          variant="outline" 
                          onClick={() => setActiveTab('conditions')} 
                          className="mt-4"
                        >
                          Go back to select condition
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="treatment" className="mt-0">
                    {selectedCondition ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-medium">{selectedCondition.name} Treatment</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{selectedCondition.treatment}</p>
                        
                        <Alert className="bg-amber-50 border-amber-200">
                          <AlertTriangle className="h-5 w-5 text-amber-500" />
                          <AlertTitle className="text-amber-800">Warning</AlertTitle>
                          <AlertDescription className="text-amber-700">
                            This treatment information is AI-generated and for educational purposes only. 
                            For accurate diagnosis and treatment, please consult with a healthcare professional.
                          </AlertDescription>
                        </Alert>

                        <div className="bg-senay-blue-50 border border-senay-blue-100 p-4 rounded-md mt-6 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-senay-blue-100 p-2 rounded-full">
                              <MapPin size={20} className="text-senay-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-senay-blue-800">Find Nearest Hospital</h4>
                              <p className="text-sm text-senay-blue-600">Get professional medical advice</p>
                            </div>
                          </div>
                          <Button 
                            onClick={handleFindHospital}
                            className="bg-senay-blue-600 hover:bg-senay-blue-700"
                          >
                            Find Location
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-6">
                        <p className="text-gray-600">Please select a condition from the conditions step to see treatment options.</p>
                        <Button 
                          variant="outline" 
                          onClick={() => setActiveTab('conditions')} 
                          className="mt-4"
                        >
                          Go back to select condition
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>

                <div className="flex justify-between mt-auto pt-4">
                  <Button 
                    variant="outline" 
                    disabled={activeTab === 'info'} 
                    onClick={handlePrevious}
                  >
                    Previous
                  </Button>
                  <Button 
                    disabled={activeTab === 'info' && (selectedSymptoms.length === 0 || !age || !sex)} 
                    onClick={handleContinue}
                  >
                    Continue
                  </Button>
                </div>
              </div>
              
              <div className={`bg-gray-50 flex items-center justify-center p-4 relative ${!showBodyImage ? 'hidden' : ''}`}>
                {sex === 'male' ? (
                  <img 
                    src="/lovable-uploads/13dd0ee5-d2bb-4411-a448-7ce01794b734.png" 
                    alt="Male body diagram for symptom selection" 
                    className="h-[400px] object-contain"
                  />
                ) : sex === 'female' ? (
                  <img 
                    src="/lovable-uploads/3414ea35-31e0-4eda-9e8d-dfd8f6d28510.png" 
                    alt="Female body diagram for symptom selection" 
                    className="h-[400px] object-contain"
                  />
                ) : null}
                
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                  <Button variant="outline" size="icon" className="bg-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 15V9M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="bg-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="bg-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 15H16M8 15L11 12M8 15L11 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Button>
                </div>
                
                <div className="absolute right-4 bottom-4">
                  <Button variant="outline" className="bg-white">SKIN</Button>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="text-center mt-6">
            <Button variant="outline" className="bg-white">Learn more about SenayMed Symptom Checker</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SymptomChecker;
