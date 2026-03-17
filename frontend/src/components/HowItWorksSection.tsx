import { LogIn, Search, AlertTriangle, ShieldCheck, ArrowRight } from "lucide-react";

const steps = [
  { icon: LogIn, label: "Login Attempt", desc: "User or bot initiates login" },
  { icon: Search, label: "Behavior Analysis", desc: "Pattern matching & fingerprinting" },
  { icon: AlertTriangle, label: "Attack Detection", desc: "Anomaly scoring in real time" },
  { icon: ShieldCheck, label: "Alert & Response", desc: "Auto-block & notify team" },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Process</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">How It Works</h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="flex flex-col items-center text-center w-40">
                <div className="h-16 w-16 rounded-2xl card-glow border border-border/50 flex items-center justify-center mb-4 hover:border-primary/40 transition-colors">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{step.label}</h3>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="h-5 w-5 text-primary/40 mx-4 hidden md:block flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
