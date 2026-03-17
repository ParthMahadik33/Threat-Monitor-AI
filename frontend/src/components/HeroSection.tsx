import { ArrowRight, Play, Activity, Lock, Wifi, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden grid-bg">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-neon-blue/10 blur-[120px]" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-xs font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
              </span>
              System Active — All Endpoints Monitored
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              <span className="text-foreground">ThreatMonitor</span>{" "}
              <span className="text-primary neon-text">AI</span>
            </h1>

            <p className="text-lg md:text-xl text-primary/80 font-medium">
              Real-Time Detection of Automated Attacks on FinTech Systems
            </p>

            <p className="text-muted-foreground leading-relaxed max-w-lg">
              Monitor login activity, detect credential stuffing attacks, and secure systems using intelligent pattern analysis.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base font-semibold px-8 py-6 neon-glow animate-pulse-glow bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/app"><Play className="mr-2 h-5 w-5" /> Open FinTech App</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base font-semibold px-8 py-6 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60">
                <Link to="/dashboard">View Security Dashboard <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </div>

          {/* Right — Dashboard Preview */}
          <div className="relative animate-float" style={{ animationDelay: "0.3s" }}>
            <div className="card-glow rounded-2xl border border-border/50 p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Live Threat Monitor</span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neon-green/10 text-neon-green border border-neon-green/20">
                  Live
                </span>
              </div>

              {/* Chart mockup */}
              <div className="h-32 flex items-end gap-1.5">
                {[35, 55, 25, 70, 45, 90, 60, 40, 85, 50, 30, 75, 95, 55, 40, 65, 80, 45, 60, 70].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm transition-all duration-300"
                    style={{
                      height: `${h}%`,
                      background: h > 80
                        ? "hsl(0 84% 60%)"
                        : h > 60
                        ? "hsl(45 100% 50%)"
                        : "hsl(185 100% 50%)",
                      opacity: 0.7 + (i / 60),
                    }}
                  />
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Requests/s", value: "2,847", icon: Wifi },
                  { label: "Blocked", value: "142", icon: Lock },
                  { label: "Risk Score", value: "23%", icon: BarChart3 },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-lg bg-secondary/50 border border-border/30 p-3 text-center">
                    <stat.icon className="h-4 w-4 text-primary mx-auto mb-1" />
                    <div className="text-lg font-bold text-foreground">{stat.value}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating alert */}
            <div className="absolute -bottom-4 -left-4 md:-left-8 card-glow rounded-xl border border-destructive/30 px-4 py-3 flex items-center gap-3 animate-slide-in" style={{ animationDelay: "1s" }}>
              <div className="h-8 w-8 rounded-full bg-destructive/20 flex items-center justify-center">
                <Lock className="h-4 w-4 text-destructive" />
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground">Brute Force Blocked</div>
                <div className="text-[10px] text-muted-foreground">IP 192.168.4.22 · 3s ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
