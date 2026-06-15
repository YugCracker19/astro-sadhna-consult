import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, ArrowLeft, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const { signIn, signUp, user, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [pendingConfirmation, setPendingConfirmation] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate("/admin", { replace: true });
  }, [user, loading, navigate]);

  const handleResendConfirmation = async () => {
    setResending(true);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    setResending(false);
    if (error) {
      toast({ title: error.message, variant: "destructive" });
    } else {
      toast({ title: "Confirmation email sent", description: "Check your inbox and click the link." });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    setBusy(true);
    setPendingConfirmation(false);
    const { error } = mode === "login" ? await signIn(email, password) : await signUp(email, password);
    setBusy(false);
    if (error) {
      if (error.toLowerCase().includes("email not confirmed") || error.toLowerCase().includes("email not verified")) {
        setPendingConfirmation(true);
        toast({
          title: "Email not confirmed yet",
          description: "Check your inbox for the confirmation link, or resend below.",
          variant: "destructive"
        });
      } else {
        toast({ title: error, variant: "destructive" });
      }
      return;
    }
    if (mode === "signup") {
      setPendingConfirmation(true);
      toast({
        title: "Account created",
        description: "Please check your email and click the confirmation link before signing in."
      });
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 starfield opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-[var(--gradient-radial)] pointer-events-none" />

      <div className="relative w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to site
        </Link>

        <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-[var(--shadow-soft)]">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Admin Panel
            </div>
            <h1 className="font-display text-3xl font-bold">
              {mode === "login" ? "Welcome back" : "Create admin account"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === "login"
                ? "Sign in to manage your website"
                : "First account becomes the website admin"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                className="mt-1.5"
              />
            </div>
            <Button type="submit" disabled={busy} className="w-full btn-glow text-primary-foreground font-semibold h-11 rounded-full">
              {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {mode === "login" ? "Sign in" : "Create account"}
            </Button>
          </form>

          {pendingConfirmation && (
            <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
              <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium mb-1">Confirm your email</p>
              <p className="text-xs text-muted-foreground mb-3">
                We sent a confirmation link to <span className="font-medium text-foreground">{email}</span>
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleResendConfirmation}
                disabled={resending}
                className="w-full"
              >
                {resending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Resend confirmation email
              </Button>
              <button
                onClick={() => { setPendingConfirmation(false); setMode("login"); }}
                className="text-xs text-muted-foreground hover:text-primary mt-3 block mx-auto"
              >
                Already confirmed? Sign in
              </button>
            </div>
          )}

          {!pendingConfirmation && (
            <p className="text-center text-sm text-muted-foreground mt-6">
              {mode === "login" ? "No account yet?" : "Already have an account?"}{" "}
              <button
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="text-primary font-semibold hover:underline"
              >
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Auth;
