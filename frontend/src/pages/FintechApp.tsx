import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Shield, Smartphone, Laptop, HelpCircle, MapPin, Zap, Bot, KeyRound, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface LogEntry {
  user: string;
  status: "Success" | "Failed";
  time: string;
}

const FintechApp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [device, setDevice] = useState("laptop");
  const [location, setLocation] = useState("pune");
  const [activityLog, setActivityLog] = useState<LogEntry[]>([
    { user: "john@example.com", status: "Success", time: "2 min ago" },
    { user: "admin@fintech.io", status: "Success", time: "5 min ago" },
    { user: "test@mail.com", status: "Failed", time: "8 min ago" },
  ]);

  const addLog = (user: string, status: "Success" | "Failed") => {
    setActivityLog((prev) => [
      { user, status, time: "Just now" },
      ...prev.slice(0, 4),
    ]);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Missing fields", description: "Please enter email and password.", variant: "destructive" });
      return;
    }
    addLog(email, "Success");
    toast({ title: "Login Successful", description: `Welcome back, ${email}` });
    setEmail("");
    setPassword("");
  };

  const simulateAttack = (type: string) => {
    const fakeUsers = ["bot_1@spam.net", "attacker@dark.io", "script@auto.ru", "crawl@bot.com"];
    fakeUsers.forEach((u, i) => {
      setTimeout(() => addLog(u, "Failed"), i * 300);
    });
    toast({ title: `${type} Initiated`, description: "Simulation running in background..." });
  };

  const devices = [
    { value: "mobile", label: "Mobile", icon: Smartphone },
    { value: "laptop", label: "Laptop", icon: Laptop },
    { value: "unknown", label: "Unknown", icon: HelpCircle },
  ];

  const locations = [
    { value: "pune", label: "Pune" },
    { value: "mumbai", label: "Mumbai" },
    { value: "delhi", label: "Delhi" },
    { value: "international", label: "International" },
  ];

  return (
    <div className="min-h-screen bg-[hsl(220,20%,97%)]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[hsl(220,15%,90%)]">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="flex items-center gap-2 text-[hsl(220,15%,40%)] hover:text-[hsl(220,15%,20%)] transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <Shield className="h-6 w-6 text-[hsl(210,100%,50%)]" />
            <span className="text-base font-bold text-[hsl(220,20%,15%)]">ThreatMonitor AI</span>
            <span className="hidden sm:inline text-sm text-[hsl(220,10%,55%)] font-medium">— FinTech App</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-[hsl(210,100%,95%)] flex items-center justify-center">
            <User className="h-4 w-4 text-[hsl(210,100%,50%)]" />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8">
          {/* Login Card */}
          <div className="lg:col-span-3">
            <Card className="border-[hsl(220,15%,90%)] bg-white shadow-[0_4px_24px_hsl(220,20%,90%/0.5)]">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-8 w-8 rounded-lg bg-[hsl(210,100%,95%)] flex items-center justify-center">
                    <KeyRound className="h-4 w-4 text-[hsl(210,100%,50%)]" />
                  </div>
                  <CardTitle className="text-xl text-[hsl(220,20%,15%)]">Secure Login</CardTitle>
                </div>
                <CardDescription className="text-[hsl(220,10%,55%)]">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[hsl(220,15%,30%)]">Email / Username</Label>
                    <Input
                      id="email"
                      type="text"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[hsl(220,20%,98%)] border-[hsl(220,15%,88%)] text-[hsl(220,20%,15%)] placeholder:text-[hsl(220,10%,65%)] focus-visible:ring-[hsl(210,100%,50%)] h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-[hsl(220,15%,30%)]">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-[hsl(220,20%,98%)] border-[hsl(220,15%,88%)] text-[hsl(220,20%,15%)] placeholder:text-[hsl(220,10%,65%)] focus-visible:ring-[hsl(210,100%,50%)] h-11"
                    />
                  </div>

                  {/* Device Type */}
                  <div className="space-y-2">
                    <Label className="text-[hsl(220,15%,30%)]">Device Type</Label>
                    <div className="flex gap-2">
                      {devices.map((d) => (
                        <button
                          key={d.value}
                          type="button"
                          onClick={() => setDevice(d.value)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                            device === d.value
                              ? "bg-[hsl(210,100%,50%)] text-white border-[hsl(210,100%,50%)] shadow-[0_2px_8px_hsl(210,100%,50%/0.3)]"
                              : "bg-white text-[hsl(220,10%,45%)] border-[hsl(220,15%,88%)] hover:border-[hsl(210,100%,70%)]"
                          }`}
                        >
                          <d.icon className="h-4 w-4" />
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label className="text-[hsl(220,15%,30%)] flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" /> Location
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {locations.map((l) => (
                        <button
                          key={l.value}
                          type="button"
                          onClick={() => setLocation(l.value)}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                            location === l.value
                              ? "bg-[hsl(210,100%,96%)] text-[hsl(210,100%,40%)] border-[hsl(210,100%,70%)]"
                              : "bg-white text-[hsl(220,10%,45%)] border-[hsl(220,15%,88%)] hover:border-[hsl(210,100%,70%)]"
                          }`}
                        >
                          {l.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold bg-[hsl(210,100%,50%)] hover:bg-[hsl(210,100%,45%)] text-white shadow-[0_2px_12px_hsl(210,100%,50%/0.3)]"
                  >
                    Login
                  </Button>
                </form>

                {/* Simulation Tools */}
                <div className="mt-8 pt-6 border-t border-[hsl(220,15%,92%)]">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="h-4 w-4 text-[hsl(220,10%,55%)]" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(220,10%,55%)]">
                      Testing Tools (Simulation Mode)
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "Simulate Credential Stuffing", icon: KeyRound },
                      { label: "Simulate Brute Force Attack", icon: Shield },
                      { label: "Simulate Bot Attack", icon: Bot },
                    ].map((btn) => (
                      <Button
                        key={btn.label}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => simulateAttack(btn.label.replace("Simulate ", ""))}
                        className="text-xs border-[hsl(0,60%,85%)] text-[hsl(0,50%,45%)] hover:bg-[hsl(0,80%,97%)] hover:border-[hsl(0,60%,70%)]"
                      >
                        <btn.icon className="h-3.5 w-3.5 mr-1.5" />
                        {btn.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Log */}
          <div className="lg:col-span-2">
            <Card className="border-[hsl(220,15%,90%)] bg-white shadow-[0_4px_24px_hsl(220,20%,90%/0.5)]">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-[hsl(220,20%,15%)]">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {activityLog.map((entry, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-[hsl(220,20%,98%)] border border-[hsl(220,15%,93%)]"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {entry.status === "Success" ? (
                        <CheckCircle2 className="h-4 w-4 text-[hsl(145,60%,42%)] shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 text-[hsl(0,70%,55%)] shrink-0" />
                      )}
                      <span className="text-sm text-[hsl(220,15%,25%)] truncate">{entry.user}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          entry.status === "Success"
                            ? "bg-[hsl(145,60%,95%)] text-[hsl(145,60%,35%)]"
                            : "bg-[hsl(0,70%,96%)] text-[hsl(0,60%,45%)]"
                        }`}
                      >
                        {entry.status}
                      </span>
                      <span className="text-xs text-[hsl(220,10%,60%)]">{entry.time}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FintechApp;
