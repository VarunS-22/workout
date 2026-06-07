import { useState } from "react";
import { supabase } from "./store";

const C = {
  bg: "#0a0d10", panel: "#14181d", border: "#262e36",
  text: "#e8eef3", muted: "#8593a0", lime: "#c6f24a", red: "#f0664f",
};

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handle = async () => {
    setLoading(true);
    setError("");
    const fn = isSignUp
      ? supabase.auth.signUp({ email, password })
      : supabase.auth.signInWithPassword({ email, password });
    const { error } = await fn;
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui" }}>
      <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 16, padding: 32, width: "100%", maxWidth: 360 }}>
        <div style={{ color: C.lime, fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 800, marginBottom: 4 }}>Overload</div>
        <h1 style={{ color: C.text, fontSize: 28, fontWeight: 800, margin: "0 0 24px", textTransform: "uppercase" }}>
          {isSignUp ? "Create account" : "Welcome back"}
        </h1>

        <label style={{ color: C.muted, fontSize: 11, textTransform: "uppercase" }}>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={{ display: "block", width: "100%", background: "#1b2128", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", color: C.text, fontSize: 14, margin: "4px 0 16px", boxSizing: "border-box" }} />

        <label style={{ color: C.muted, fontSize: 11, textTransform: "uppercase" }}>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="minimum 6 characters"
          style={{ display: "block", width: "100%", background: "#1b2128", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", color: C.text, fontSize: 14, margin: "4px 0 16px", boxSizing: "border-box" }} />

        {error && <p style={{ color: C.red, fontSize: 13, margin: "0 0 12px" }}>{error}</p>}

        <button onClick={handle} disabled={loading}
          style={{ width: "100%", background: C.lime, color: C.bg, border: "none", borderRadius: 8, padding: "12px", fontSize: 14, fontWeight: 800, textTransform: "uppercase", cursor: "pointer", marginBottom: 12 }}>
          {loading ? "Please wait..." : isSignUp ? "Create account" : "Sign in"}
        </button>

        <button onClick={() => { setIsSignUp(!isSignUp); setError(""); }}
          style={{ width: "100%", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px", fontSize: 13, color: C.muted, cursor: "pointer" }}>
          {isSignUp ? "Already have an account? Sign in" : "No account? Sign up"}
        </button>
      </div>
    </div>
  );
}