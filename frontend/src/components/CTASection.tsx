import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
      </div>
      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 max-w-2xl mx-auto leading-tight">
          Start Monitoring Your System <span className="text-primary neon-text">Today</span>
        </h2>
        <p className="text-muted-foreground mb-10 max-w-md mx-auto">
          Deploy in minutes. Protect your FinTech platform from automated attacks with zero configuration.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-base font-semibold px-8 py-6 neon-glow animate-pulse-glow bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/app"><Play className="mr-2 h-5 w-5" /> Open FinTech App</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base font-semibold px-8 py-6 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60">
            <Link to="/dashboard">View Dashboard <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
