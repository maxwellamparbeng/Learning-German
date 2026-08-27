import React, { useState } from "react";
import { 
  loginWithEmail, 
  registerWithEmail, 
  loginWithGoogle, 
  resetPassword 
} from "../lib/firebase";
import { 
  Mail, 
  Lock, 
  User as UserIcon, 
  LogIn, 
  UserPlus, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  Sparkles,
  BookOpen,
  Award,
  Volume2,
  ShieldCheck,
  Phone,
  Globe
} from "lucide-react";

const POPULAR_COUNTRIES = [
  "Germany",
  "Austria",
  "Switzerland",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "France",
  "Italy",
  "Spain",
  "Netherlands",
  "Poland",
  "Turkey",
  "Ukraine",
  "India",
  "Ghana",
  "Nigeria",
  "Kenya",
  "South Africa",
  "Brazil",
  "Mexico",
  "Other"
];

export const AuthScreen: React.FC = () => {
  const [mode, setMode] = useState<"login" | "register" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("Germany");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleResetForm = () => {
    setError(null);
    setSuccessMsg(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await loginWithEmail(email, password);
    } catch (err: any) {
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Invalid email or password. Please try again.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (err.code === "auth/operation-not-allowed") {
        setError("Email/Password sign-in is disabled in your Firebase Console. Please enable 'Email/Password' under Firebase Console > Authentication > Sign-in method.");
      } else {
        setError(err.message || "Failed to log in.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter an email and password.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await registerWithEmail(email, password, displayName, phoneNumber, country);
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (err.code === "auth/operation-not-allowed") {
        setError("Email/Password registration is disabled in your Firebase Console. Please enable 'Email/Password' under Firebase Console > Authentication > Sign-in method.");
      } else {
        setError(err.message || "Failed to create account.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      if (err.code === "auth/operation-not-allowed") {
        setError("Google Sign-In is disabled in your Firebase Console. Please enable 'Google' under Firebase Console > Authentication > Sign-in method.");
      } else {
        setError(err.message || "Google sign-in failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      await resetPassword(email);
      setSuccessMsg("Password reset link sent to your email!");
    } catch (err: any) {
      setError(err.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
      {/* Container Card */}
      <div className="w-full max-w-4xl bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Branding Panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#58cc02] to-[#46a302] p-8 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-black/10 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#46a302] flex items-center justify-center font-black text-xl shadow-md">
                dG
              </div>
              <div>
                <h1 className="font-extrabold text-2xl tracking-tight text-white leading-tight">deutschGrid</h1>
                <span className="inline-block bg-white/20 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-white">
                  A1 &ndash; B2 German Vocabulary Grid
                </span>
              </div>
            </div>

            <p className="text-white/90 text-sm leading-relaxed mb-6 font-medium">
              Welcome! Please log in or register to access interactive flashcards, quizzes, voice coach, and synchronized cloud progress.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20">
                <BookOpen className="w-5 h-5 text-amber-300 shrink-0" />
                <span className="text-xs font-bold text-white">German A1-B2 Core Vocabulary List</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20">
                <Award className="w-5 h-5 text-cyan-300 shrink-0" />
                <span className="text-xs font-bold text-white">Streak Counter &amp; Cloud Saved Mastery</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20">
                <Volume2 className="w-5 h-5 text-pink-300 shrink-0" />
                <span className="text-xs font-bold text-white">Native German Pronunciation &amp; Voice Coach</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8 pt-4 border-t border-white/20 flex items-center justify-between text-[11px] text-white/80 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Secure Firestore Database
            </span>
            <span>v2.4</span>
          </div>
        </div>

        {/* Right Auth Forms Panel */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
          
          {/* Header & Mode Switcher */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-black text-slate-900">
                {mode === "login" ? "Log In to Your Account" : mode === "register" ? "Create New Account" : "Reset Password"}
              </h2>
            </div>

            {mode !== "reset" && (
              <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => { setMode("login"); handleResetForm(); }}
                  className={`py-2.5 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    mode === "login" 
                      ? "bg-white text-slate-900 shadow-sm border border-slate-200" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => { setMode("register"); handleResetForm(); }}
                  className={`py-2.5 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    mode === "register" 
                      ? "bg-white text-slate-900 shadow-sm border border-slate-200" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <UserPlus className="w-4 h-4" />
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Feedback Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-xs font-semibold mb-4 flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl text-xs font-semibold mb-4 flex items-start gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Login Form */}
          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-[#1cb0f6] transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => { setMode("reset"); handleResetForm(); }}
                    className="text-xs font-bold text-[#1899d6] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-[#1cb0f6] transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#58cc02] hover:bg-[#46a302] text-white font-black text-sm uppercase tracking-wider rounded-2xl border-b-4 border-[#46a302] transition-all cursor-pointer flex items-center justify-center gap-2 active:translate-y-[2px] shadow-sm"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Log In to Continue"}
              </button>
            </form>
          )}

          {/* Register Form */}
          {mode === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Full Name / Nickname
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Alex"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-[#1cb0f6] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-[#1cb0f6] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+49 123 45678"
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-[#1cb0f6] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Country
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-[#1cb0f6] transition-colors appearance-none"
                    >
                      {POPULAR_COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-[#1cb0f6] transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#1cb0f6] hover:bg-[#1899d6] text-white font-black text-sm uppercase tracking-wider rounded-2xl border-b-4 border-[#1899d6] transition-all cursor-pointer flex items-center justify-center gap-2 active:translate-y-[2px] shadow-sm"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Register & Create Account"}
              </button>
            </form>
          )}

          {/* Reset Password Form */}
          {mode === "reset" && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-[#1cb0f6] transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-black text-sm uppercase tracking-wider rounded-2xl border-b-4 border-amber-600 transition-all cursor-pointer flex items-center justify-center gap-2 active:translate-y-[2px]"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Password Reset Email"}
              </button>

              <button
                type="button"
                onClick={() => { setMode("login"); handleResetForm(); }}
                className="w-full text-xs font-bold text-slate-500 hover:text-slate-800 text-center py-2 cursor-pointer"
              >
                Back to Login
              </button>
            </form>
          )}

          {/* Google SSO Option */}
          {mode !== "reset" && (
            <div className="mt-6 pt-5 border-t border-slate-200">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                type="button"
                className="w-full py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl border-2 border-slate-200 border-b-4 transition-all cursor-pointer flex items-center justify-center gap-2.5 shadow-xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Sign in with Google
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
