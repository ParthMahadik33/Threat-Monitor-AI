import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Shield className="h-7 w-7 text-primary" />
          <span className="text-lg font-bold tracking-tight text-foreground">
            ThreatMonitor <span className="text-primary">AI</span>
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">How It Works</a>
          <a href="#dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">Dashboard</a>
          <div className="flex items-center gap-2 ml-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-green"></span>
            </span>
            <span className="text-xs font-medium text-neon-green">Secure</span>
          </div>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl px-4 pb-4">
          <div className="flex flex-col gap-4 pt-4">
            <a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>Features</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>How It Works</a>
            <a href="#dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>Dashboard</a>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-green"></span>
              </span>
              <span className="text-xs font-medium text-neon-green">Secure</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
