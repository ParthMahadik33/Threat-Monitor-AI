import { ShieldAlert, Activity, Brain, Zap } from "lucide-react";

const features = [
  {
    icon: ShieldAlert,
    title: "Credential Stuffing Detection",
    description: "Detect multiple login attempts from automated bots in real time.",
  },
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    description: "Analyze login activity instantly with sub-second latency.",
  },
  {
    icon: Brain,
    title: "AI-Based Analysis",
    description: "Identify anomalies using intelligent pattern recognition models.",
  },
  {
    icon: Zap,
    title: "Automated Response",
    description: "Block suspicious IPs and protect accounts automatically.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Capabilities</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Core Features</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="card-glow group rounded-2xl border border-border/50 p-6 hover:border-primary/40 transition-all duration-500 cursor-default animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
