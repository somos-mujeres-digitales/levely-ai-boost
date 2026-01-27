import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import CVBuilder from "./pages/CVBuilder";
import CareerAccelerator from "./pages/CareerAccelerator";
import Partners from "./pages/Partners";
import Empresas from "./pages/Empresas";
import Resources from "./pages/Resources";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Creditos from "./pages/app/Creditos";
import Oportunidades from "./pages/app/Oportunidades";
import CVs from "./pages/app/CVs";
import Feedback from "./pages/app/Feedback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/creditos" element={<Creditos />} />
              <Route path="/dashboard/oportunidades" element={<Oportunidades />} />
              <Route path="/dashboard/cvs" element={<CVs />} />
              <Route path="/dashboard/feedback" element={<Feedback />} />
              <Route path="/cv-builder" element={<CVBuilder />} />
              <Route path="/career-accelerator" element={<CareerAccelerator />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/empresas" element={<Empresas />} />
              <Route path="/resources" element={<Resources />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
