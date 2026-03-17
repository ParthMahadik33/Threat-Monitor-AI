import { AlertTriangle, Globe, Ban, TrendingUp } from "lucide-react";

const SystemPreview = () => {
  return (
    <section id="dashboard" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Dashboard</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">System Preview</h2>
        </div>

        <div className="max-w-lg mx-auto card-glow rounded-2xl border border-destructive/30 p-8 space-y-6 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-destructive/20 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">⚠ Attack Detected</h3>
              <p className="text-xs text-muted-foreground">Credential stuffing attempt identified</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-secondary/50 border border-border/30 p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-destructive" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Risk Score</span>
              </div>
              <div className="text-3xl font-black text-destructive">92%</div>
            </div>
            <div className="rounded-xl bg-secondary/50 border border-border/30 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Source IP</span>
              </div>
              <div className="text-lg font-bold text-foreground font-mono">192.168.4.22</div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-destructive/10 border border-destructive/20 px-5 py-3">
            <div className="flex items-center gap-2">
              <Ban className="h-4 w-4 text-destructive" />
              <span className="text-sm font-semibold text-foreground">Status</span>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-destructive/20 text-destructive border border-destructive/30">
              Blocked
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemPreview;
