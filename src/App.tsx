import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AskAProChat from "@/components/AskAProChat";
import Index from "./pages/Index";
import Coaches from "./pages/Coaches";
import Scout from "./pages/Scout";
import Curriculum from "./pages/Curriculum";
import AIHub from "./pages/AIHub";
import Rewards from "./pages/Rewards";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/coaches" element={<Coaches />} />
          <Route path="/scout" element={<Scout />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/ai-hub" element={<AIHub />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <AskAProChat />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
