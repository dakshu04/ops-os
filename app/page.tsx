import Link from "next/link"; // Import Link for client-side navigation
import { ArrowRight, Zap, Eye, Move, Clock, Settings, LayoutDashboard } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AiImpact from "./components/AiImpact";

const Index = () => {
  return (
    <div className="h-screen bg-[#000000]">
      <Navbar />
      <Hero />
    </div>
  );
};

export default Index;