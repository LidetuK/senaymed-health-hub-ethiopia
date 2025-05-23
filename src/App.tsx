import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DrugInteractionChecker from "./pages/DrugInteractionChecker";
import SideEffects from "./pages/SideEffects";
import Conditions from "./pages/Conditions";
import TreatmentGuides from "./pages/TreatmentGuides";
import CompareDrugs from "./pages/CompareDrugs";
import MyMedList from "./pages/MyMedList";
import Dashboard from "./pages/Dashboard";
import DrugList from "./pages/DrugList";

const queryClient = new QueryClient();

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/drug-interaction-checker" element={<DrugInteractionChecker />} />
          <Route path="/symptom-checker" element={<Index />} />
          <Route path="/side-effects" element={<SideEffects />} />
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/treatment-guides" element={<TreatmentGuides />} />
          <Route path="/compare-drugs" element={<CompareDrugs />} />
          <Route path="/my-med-list" element={<MyMedList />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/discount-card" element={<NotFound />} />
          <Route path="/fda-alerts" element={<NotFound />} />
          <Route path="/price-guide" element={<NotFound />} />
          <Route path="/phonetic-search" element={<NotFound />} />
          <Route path="/health-professionals" element={<NotFound />} />
          <Route path="/drugs/:letter" element={<DrugList />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
