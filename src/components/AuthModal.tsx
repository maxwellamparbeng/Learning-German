import React, { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { 
  loginWithEmail, 
  registerWithEmail, 
  loginWithGoogle, 
  resetPassword, 
  logoutUser,
  getUserProfile,
  UserProfileData
} from "../lib/firebase";
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  LogOut, 
  LogIn, 
  UserPlus, 
  KeyRound, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  Sparkles,
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

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, currentUser }) => {
  const [mode, setMode] = useState<"login" | "register" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("Germany");
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      getUserProfile(currentUser.uid).then(profile => {
        if (profile) setUserProfile(profile);
      }).catch(console.error);
    } else {
      setUserProfile(null);
    }
  }, [currentUser]);

  if (!isOpen) return null;

  const handleResetForm = () => {
    setError(null);
    setSuccessMsg(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await loginWithEmail(email, password);
      onClose();
    } catch (err: any) {
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Invalid email or password. Please try again.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (err.code === "auth/operation-not-allowed") {
        setError("Email/Password sign-in is disabled in your Firebase Console. Please enable 'Email/Password' under Firebase Console > Authentication > Sign-in method.");
      } else {
        setError(err.message || "Failed to log in. Please try again.");
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
      onClose();
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
      onClose();
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
      setError("Please enter your account email address.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      await resetPassword(email);
      setSuccessMsg("Password reset email sent! Check your inbox.");
    } catch (err: any) {
      setError(err.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to log out.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-md rounded-3xl border-2 border-slate-200 shadow-2xl overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-[#58cc02] text-white flex items-center justify-center font-black text-base shadow-[0_3px_0_#46a302]">
              dG
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-base leading-tight">
                {currentUser ? "Account Profile" : mode === "login" ? "Welcome Back!" : mode === "register" ? "Create Account" : "Reset Password"}
              </h3>
              <p className="text-slate-500 text-xs">
                {currentUser ? "Sync progress across devices" : "Save your vocabulary progress online"}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {currentUser ? (
            /* Logged In View */
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#58cc02] to-emerald-400 p-1 shadow-lg">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-3xl font-extrabold text-[#46a302]">
                  {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : currentUser.email ? currentUser.email[0].toUpperCase() : "U"}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-black text-slate-900">
                  {currentUser.displayName || "German Learner"}
                </h4>
                <p className="text-sm font-medium text-slate-500 mt-0.5">
                  {currentUser.email}
                </p>
                <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold mt-3 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Synced with Cloud Database
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left space-y-2 text-xs text-slate-600">
                {userProfile?.phoneNumber && (
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-500">Phone:</span>
                    <span className="font-medium text-slate-800 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" />
                      {userProfile.phoneNumber}
                    </span>
                  </div>
                )}
                {userProfile?.country && (
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-500">Country:</span>
                    <span className="font-medium text-slate-800 flex items-center gap-1">
                      <Globe className="w-3 h-3 text-slate-400" />
                      {userProfile.country}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-500">Account ID:</span>
                  <span className="font-mono text-slate-700 text-[11px] truncate max-w-[180px]">{currentUser.uid}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-500">Status:</span>
                  <span className="font-bold text-[#46a302] flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#58cc02] animate-pulse"></span>
                    Active Session
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 font-extrabold rounded-2xl border-2 border-red-200 border-b-4 hover:border-red-300 transition-all cursor-pointer active:translate-y-[2px]"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogOut className="w-5 h-5" />}
                Log Out
              </button>
            </div>
          ) : (
            /* Auth Forms */
            <div>
              {/* Tab Selector */}
              {mode !== "reset" && (
                <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-2xl border border-slate-200 mb-5">
                  <button
                    onClick={() => { setMode("login"); handleResetForm(); }}
                    className={`py-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      mode === "login" 
                        ? "bg-white text-slate-900 shadow-sm border border-slate-200" 
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <LogIn className="w-4 h-4" />
                    Log In
                  </button>
                  <button
                    onClick={() => { setMode("register"); handleResetForm(); }}
                    className={`py-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
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

              {/* Error Callout */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 rounded-2xl text-xs font-semibold mb-4 flex items-start gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Success Callout */}
              {successMsg && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-2.5 rounded-2xl text-xs font-semibold mb-4 flex items-start gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Login Form */}
              {mode === "login" && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
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
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => { setMode("reset"); handleResetForm(); }}
                        className="text-xs font-bold text-[#1899d6] hover:underline"
                      >
                        Forgot?
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
                    className="w-full py-3 bg-[#58cc02] hover:bg-[#46a302] text-white font-black text-sm uppercase tracking-wider rounded-2xl border-b-4 border-[#46a302] transition-all cursor-pointer flex items-center justify-center gap-2 active:translate-y-[2px]"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Log In"}
                  </button>
                </form>
              )}

              {/* Register Form */}
              {mode === "register" && (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                      Display Name
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
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="+49 123 45678"
                          className="w-full pl-10 pr-2.5 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-[#1cb0f6] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                        Country
                      </label>
                      <div className="relative">
                        <Globe className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full pl-10 pr-2 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-[#1cb0f6] transition-colors appearance-none"
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
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-[#1cb0f6] transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#1cb0f6] hover:bg-[#1899d6] text-white font-black text-sm uppercase tracking-wider rounded-2xl border-b-4 border-[#1899d6] transition-all cursor-pointer flex items-center justify-center gap-2 active:translate-y-[2px]"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
                  </button>
                </form>
              )}

              {/* Password Reset Form */}
              {mode === "reset" && (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                      Your Email Address
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
                    className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-black text-sm uppercase tracking-wider rounded-2xl border-b-4 border-amber-600 transition-all cursor-pointer flex items-center justify-center gap-2 active:translate-y-[2px]"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Reset Email"}
                  </button>

                  <button
                    type="button"
                    onClick={() => { setMode("login"); handleResetForm(); }}
                    className="w-full text-xs font-bold text-slate-500 hover:text-slate-800 text-center py-1"
                  >
                    Back to Login
                  </button>
                </form>
              )}

              {/* Google Sign In Divider */}
              {mode !== "reset" && (
                <div className="mt-5 pt-4 border-t border-slate-200">
                  <button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    type="button"
                    className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl border-2 border-slate-200 border-b-4 transition-all cursor-pointer flex items-center justify-center gap-2.5"
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
                    Continue with Google
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
