import { Shield } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 py-8">
    <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary" />
        <span className="text-sm font-semibold text-foreground">ThreatMonitor <span className="text-primary">AI</span></span>
      </div>
      <p className="text-xs text-muted-foreground">© 2026 ThreatMonitor AI. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
