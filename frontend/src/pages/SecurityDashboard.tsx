import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Shield, Activity, Ban, AlertTriangle, Users,
  Wifi, Lock, Globe, Clock, Zap, ShieldCheck, KeyRound,
  Smartphone, Mail, User
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from "recharts";

// ── types ──
interface Alert {
  id: number;
  type: string;
  risk: number;
  ip: string;
  status: "Blocked" | "Monitoring";
  time: string;
}

interface SuspiciousIP {
  ip: string;
  attempts: number;
  location: string;
  status: "Blocked" | "Monitoring" | "Flagged";
}

interface ActivityEntry {
  user: string;
  ip: string;
  status: "Success" | "Failed";
  time: string;
}

// ── seed data ──
const initialChartData = [
  { time: "00:00", normal: 120, suspicious: 5 },
  { time: "02:00", normal: 80, suspicious: 3 },
  { time: "04:00", normal: 45, suspicious: 2 },
  { time: "06:00", normal: 190, suspicious: 8 },
  { time: "08:00", normal: 380, suspicious: 15 },
  { time: "10:00", normal: 520, suspicious: 22 },
  { time: "12:00", normal: 610, suspicious: 18 },
  { time: "14:00", normal: 580, suspicious: 45 },
  { time: "16:00", normal: 490, suspicious: 12 },
  { time: "18:00", normal: 420, suspicious: 8 },
  { time: "20:00", normal: 310, suspicious: 6 },
  { time: "22:00", normal: 180, suspicious: 4 },
];

const initialAlerts: Alert[] = [
  { id: 1, type: "Credential Stuffing", risk: 92, ip: "192.168.1.45", status: "Blocked", time: "2 min ago" },
  { id: 2, type: "Brute Force", risk: 87, ip: "10.0.0.234", status: "Blocked", time: "5 min ago" },
  { id: 3, type: "Bot Attack", risk: 78, ip: "172.16.0.89", status: "Monitoring", time: "12 min ago" },
];

const initialIPs: SuspiciousIP[] = [
  { ip: "192.168.1.45", attempts: 120, location: "Unknown", status: "Blocked" },
  { ip: "10.0.0.234", attempts: 89, location: "Russia", status: "Blocked" },
  { ip: "172.16.0.89", attempts: 56, location: "China", status: "Flagged" },
  { ip: "203.0.113.12", attempts: 34, location: "Nigeria", status: "Monitoring" },
];

const initialActivity: ActivityEntry[] = [
  { user: "john@fintech.io", ip: "192.168.1.10", status: "Success", time: "1 min ago" },
  { user: "admin@bank.com", ip: "10.0.0.5", status: "Success", time: "3 min ago" },
  { user: "bot_1@spam.net", ip: "192.168.1.45", status: "Failed", time: "4 min ago" },
  { user: "script@auto.ru", ip: "10.0.0.234", status: "Failed", time: "5 min ago" },
  { user: "user@example.com", ip: "172.16.0.1", status: "Success", time: "8 min ago" },
];

const responseActions = [
  { label: "IP Blocked", icon: Ban, count: 142 },
  { label: "Account Locked", icon: Lock, count: 23 },
  { label: "OTP Triggered", icon: Smartphone, count: 67 },
  { label: "Alert Sent", icon: Mail, count: 89 },
];

// ── component ──
const SecurityDashboard = () => {
  const [isUnderAttack, setIsUnderAttack] = useState(false);
  const [metrics, setMetrics] = useState({
    totalLogins: 12847,
    suspicious: 342,
    blockedIPs: 142,
    activeThreats: 3,
  });
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [chartData, setChartData] = useState(initialChartData);
  const [activity, setActivity] = useState<ActivityEntry[]>(initialActivity);

  // Simulate live ticking metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        totalLogins: prev.totalLogins + Math.floor(Math.random() * 5),
        suspicious: prev.suspicious + (Math.random() > 0.7 ? 1 : 0),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Simulate occasional attack pulses
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        triggerAttack();
      }
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const triggerAttack = useCallback(() => {
    setIsUnderAttack(true);
    const newAlert: Alert = {
      id: Date.now(),
      type: ["Credential Stuffing", "Brute Force", "Bot Attack"][Math.floor(Math.random() * 3)],
      risk: 75 + Math.floor(Math.random() * 25),
      ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      status: "Blocked",
      time: "Just now",
    };
    setAlerts((prev) => [newAlert, ...prev.slice(0, 4)]);
    setMetrics((prev) => ({
      ...prev,
      suspicious: prev.suspicious + Math.floor(Math.random() * 20) + 10,
      blockedIPs: prev.blockedIPs + 1,
      activeThreats: prev.activeThreats + 1,
    }));
    setChartData((prev) =>
      prev.map((d, i) =>
        i === prev.length - 1 ? { ...d, suspicious: d.suspicious + 60 + Math.floor(Math.random() * 40) } : d
      )
    );
    setActivity((prev) => [
      { user: "attacker@dark.io", ip: newAlert.ip, status: "Failed", time: "Just now" },
      ...prev.slice(0, 4),
    ]);
    setTimeout(() => setIsUnderAttack(false), 5000);
  }, []);

  const metricCards = [
    { label: "Total Logins", value: metrics.totalLogins.toLocaleString(), icon: Users, color: "hsl(185 100% 50%)" },
    { label: "Suspicious", value: metrics.suspicious.toLocaleString(), icon: AlertTriangle, color: "hsl(45 100% 50%)" },
    { label: "Blocked IPs", value: metrics.blockedIPs.toLocaleString(), icon: Ban, color: "hsl(0 84% 60%)" },
    { label: "Active Threats", value: metrics.activeThreats.toLocaleString(), icon: Activity, color: "hsl(150 100% 50%)" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── HEADER ── */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-base font-bold">ThreatMonitor AI</span>
            <span className="hidden sm:inline text-sm text-muted-foreground">— Security Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-500 ${
                isUnderAttack
                  ? "bg-destructive/20 text-destructive border border-destructive/30 shadow-[0_0_15px_hsl(0_84%_60%/0.3)]"
                  : "bg-neon-green/10 text-neon-green border border-neon-green/20"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isUnderAttack ? "bg-destructive" : "bg-neon-green"
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    isUnderAttack ? "bg-destructive" : "bg-neon-green"
                  }`}
                />
              </span>
              {isUnderAttack ? "Under Attack" : "Secure"}
            </div>
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* ── METRIC CARDS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metricCards.map((m) => (
            <Card
              key={m.label}
              className="card-glow border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] group"
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <m.icon className="h-5 w-5" style={{ color: m.color }} />
                  <div
                    className="h-2 w-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: m.color, boxShadow: `0 0 8px ${m.color}` }}
                  />
                </div>
                <div className="text-2xl md:text-3xl font-black tracking-tight">{m.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{m.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── CHART + ALERTS ── */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart */}
          <Card className="lg:col-span-2 card-glow border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                Login Activity Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="normalGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(185 100% 50%)" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="hsl(185 100% 50%)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="suspGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(0 84% 60%)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="hsl(0 84% 60%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
                    <XAxis dataKey="time" tick={{ fill: "hsl(215 20% 55%)", fontSize: 11 }} axisLine={false} />
                    <YAxis tick={{ fill: "hsl(215 20% 55%)", fontSize: 11 }} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(222 44% 9%)",
                        border: "1px solid hsl(222 30% 18%)",
                        borderRadius: "0.5rem",
                        color: "hsl(210 40% 92%)",
                        fontSize: 12,
                      }}
                    />
                    <Area type="monotone" dataKey="normal" stroke="hsl(185 100% 50%)" fill="url(#normalGrad)" strokeWidth={2} />
                    <Area type="monotone" dataKey="suspicious" stroke="hsl(0 84% 60%)" fill="url(#suspGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-6 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-primary" /> Normal
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-destructive" /> Suspicious
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="card-glow border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                Live Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
              {alerts.map((a) => (
                <div
                  key={a.id}
                  className="rounded-xl border border-destructive/20 bg-destructive/5 p-3.5 space-y-2 animate-fade-in"
                  style={{ boxShadow: "0 0 12px hsl(0 84% 60% / 0.1)" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-destructive flex items-center gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5" /> Attack Detected
                    </span>
                    <span className="text-[10px] text-muted-foreground">{a.time}</span>
                  </div>
                  <div className="text-sm font-semibold">{a.type}</div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Risk: <span className="text-destructive font-bold">{a.risk}%</span></span>
                    <span className="text-muted-foreground">IP: {a.ip}</span>
                  </div>
                  <span
                    className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      a.status === "Blocked"
                        ? "bg-destructive/20 text-destructive"
                        : "bg-neon-cyan/10 text-primary"
                    }`}
                  >
                    {a.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* ── IP TABLE + ACTIVITY ── */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Suspicious IPs */}
          <Card className="card-glow border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                Suspicious IPs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-muted-foreground uppercase tracking-wider border-b border-border/30">
                      <th className="text-left py-2 pr-4">IP Address</th>
                      <th className="text-left py-2 pr-4">Attempts</th>
                      <th className="text-left py-2 pr-4">Location</th>
                      <th className="text-left py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {initialIPs.map((ip) => (
                      <tr key={ip.ip} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                        <td className="py-2.5 pr-4 font-mono text-xs">{ip.ip}</td>
                        <td className="py-2.5 pr-4 text-destructive font-semibold">{ip.attempts}</td>
                        <td className="py-2.5 pr-4 text-muted-foreground">{ip.location}</td>
                        <td className="py-2.5">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              ip.status === "Blocked"
                                ? "bg-destructive/20 text-destructive"
                                : ip.status === "Flagged"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            {ip.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Activity Log */}
          <Card className="card-glow border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-muted-foreground uppercase tracking-wider border-b border-border/30">
                      <th className="text-left py-2 pr-4">User</th>
                      <th className="text-left py-2 pr-4">IP</th>
                      <th className="text-left py-2 pr-4">Status</th>
                      <th className="text-left py-2">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activity.map((a, i) => (
                      <tr key={i} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                        <td className="py-2.5 pr-4 truncate max-w-[140px]">{a.user}</td>
                        <td className="py-2.5 pr-4 font-mono text-xs text-muted-foreground">{a.ip}</td>
                        <td className="py-2.5 pr-4">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              a.status === "Success"
                                ? "bg-neon-green/10 text-neon-green"
                                : "bg-destructive/20 text-destructive"
                            }`}
                          >
                            {a.status}
                          </span>
                        </td>
                        <td className="py-2.5 text-xs text-muted-foreground">{a.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── AUTOMATED RESPONSE ── */}
        <Card className="card-glow border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="h-4 w-4 text-neon-green" />
              Automated Response Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {responseActions.map((r) => (
                <div
                  key={r.label}
                  className="flex items-center gap-3 rounded-xl border border-border/30 bg-secondary/30 p-4 hover:bg-secondary/50 transition-colors"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <r.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">{r.count}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{r.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SecurityDashboard;
