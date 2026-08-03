import React, { useState } from "react";
import axios from "axios";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { User } from "../../../types";
import { config } from "../../../src/config";
import AuthLayout from "./AuthLayout";
import GoogleIcon from "./GoogleIcon";
import "../../styles/login.css";

interface LoginProps {
  onLogin: (user: User) => void;
  onSwitchToRegister: () => void;
}

/* =======================
   HELPERS
======================= */
const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const brandContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const brandItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Forgot password
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMsg, setForgotMsg] = useState<string | null>(null);

  /* =======================
     LOGIN HANDLER
  ======================= */
  const handleLogin = async () => {
    setError(null);

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${config.API_BASE_URL}/auth/login`,
        { email, password }
      );

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("authToken", res.data.access_token);
      storage.setItem("authUser", JSON.stringify(res.data.user));
      onLogin(res.data.user);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     FORGOT PASSWORD HANDLER
  ======================= */
  const handleForgotPassword = async () => {
    setForgotMsg(null);

    if (!forgotEmail) {
      setForgotMsg("Email is required");
      return;
    }

    if (!isValidEmail(forgotEmail)) {
      setForgotMsg("Enter a valid email address");
      return;
    }

    try {
      setForgotLoading(true);

      await axios.post(
        `${config.API_BASE_URL}/auth/forgot-password`,
        { email: forgotEmail }
      );

      setForgotMsg(
        "If the email exists, a password reset link has been sent."
      );
    } catch {
      setForgotMsg("Failed to send reset link");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <>
      {/* =======================
         DESKTOP (unchanged split hero + floating card)
      ======================= */}
      <div className="hidden lg:block">
        <AuthLayout>
          <div className="login-card-logo">
            <div className="login-card-logo-circle">
              <i className="fa-solid fa-place-of-worship" />
            </div>
            <h2>Temple Rituals</h2>
            <h3>Verifier</h3>
            <p>Secure Login Portal</p>
          </div>

          {error && <div className="login-error">{error}</div>}

          <div className="login-input-group">
            <i className="fa-solid fa-user login-input-icon" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-input-group">
            <i className="fa-solid fa-lock login-input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="login-eye-toggle"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`} />
            </button>
          </div>

          <div className="login-forgot-row">
            <button onClick={() => setShowForgot(true)}>Forgot password?</button>
          </div>

          <motion.button
            className="login-submit"
            onClick={handleLogin}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="fa-solid fa-shield-halved" />
            {loading ? "Logging in..." : "Login"}
          </motion.button>

          <div className="login-divider">
            <span>or continue with</span>
          </div>

          <div className="login-social-row">
            <button className="login-social-btn" aria-label="Continue with SSO">
              <i className="fa-solid fa-shield-halved" />
            </button>
          </div>

          <p className="login-register-row">
            New here?{" "}
            <button onClick={onSwitchToRegister}>Create an account</button>
          </p>
        </AuthLayout>
      </div>

      {/* =======================
         MOBILE (bottom-sheet design)
      ======================= */}
      <div
        className="lg:hidden min-h-screen flex flex-col bg-cover bg-top"
        style={{ backgroundImage: "url(/temple-bg.png)" }}
      >
        <motion.div
          className="flex-grow flex flex-col items-center justify-center pt-16 pb-20 px-6 text-center"
          initial="hidden"
          animate="visible"
          variants={brandContainer}
        >
          <motion.div
            variants={brandItem}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-900/20 flex items-center justify-center mb-4"
          >
            <i className="fa-solid fa-om text-white text-2xl" />
          </motion.div>

          <motion.h1 variants={brandItem} className="text-2xl font-black text-gray-900">
            Temple <span className="text-orange-600">Verifier</span>
          </motion.h1>

          <motion.div variants={brandItem} className="flex items-center gap-2 mt-2">
            <span className="h-px w-6 bg-orange-300" />
            <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500">
              AI RITUAL COMPLIANCE SYSTEM
            </p>
            <span className="h-px w-6 bg-orange-300" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          className="relative bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] px-7 pt-10 pb-8"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.4 }}
            className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center"
          >
            <div className="w-11 h-11 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
              <i className="fa-solid fa-shield-halved text-lg" />
            </div>
          </motion.div>

          <h2 className="text-center text-xl font-black text-gray-900 mt-2">Welcome Back</h2>
          <p className="text-center text-sm text-gray-400 mt-1">
            Sign in to continue your sacred journey
          </p>

          {error && (
            <div className="mt-5 bg-red-100 text-red-600 text-sm text-center rounded-xl py-2.5">
              {error}
            </div>
          )}

          <div className="mt-6 space-y-4">
            <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3.5 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition">
              <i className="fa-solid fa-user text-gray-400 mr-3"></i>
              <input
                type="email"
                placeholder="Username or Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 outline-none text-sm text-gray-800 placeholder:text-gray-400 bg-transparent"
              />
            </div>

            <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3.5 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition">
              <i className="fa-solid fa-lock text-gray-400 mr-3"></i>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 outline-none text-sm text-gray-800 placeholder:text-gray-400 bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"} text-gray-400`}></i>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded accent-orange-500"
              />
              Remember me
            </label>
            <button
              onClick={() => setShowForgot(true)}
              className="text-xs font-bold text-orange-600"
            >
              Forgot Password?
            </button>
          </div>

          <motion.button
            onClick={handleLogin}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className={`mt-6 w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-orange-900/10 transition-colors ${
              loading ? "bg-orange-300" : "bg-gradient-to-r from-orange-500 to-red-600"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
            {!loading && <i className="fa-solid fa-arrow-right text-sm"></i>}
          </motion.button>

          <div className="flex items-center gap-3 my-6">
            <span className="flex-1 h-px bg-gray-100"></span>
            <span className="text-xs text-gray-400">or continue with</span>
            <span className="flex-1 h-px bg-gray-100"></span>
          </div>

          <div className="flex justify-center">
            <button
              aria-label="Continue with Google"
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-sm"
            >
              <GoogleIcon />
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            New to Temple Verifier?{" "}
            <button onClick={onSwitchToRegister} className="font-bold text-orange-600">
              Create Account
            </button>
          </p>
        </motion.div>
      </div>

      {/* =======================
         FORGOT PASSWORD MODAL (shared across breakpoints)
      ======================= */}
      <AnimatePresence>
        {showForgot && (
          <motion.div
            className="login-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="login-modal"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <h2>Forgot Password</h2>
              <p>Enter your registered email</p>

              <div className="login-input-group">
                <i className="fa-solid fa-user login-input-icon" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
              </div>

              {forgotMsg && <p className="login-modal-msg">{forgotMsg}</p>}

              <button
                className="login-submit"
                onClick={handleForgotPassword}
                disabled={forgotLoading}
              >
                {forgotLoading ? "Sending..." : "Send Reset Link"}
              </button>

              <button
                className="login-modal-cancel"
                onClick={() => {
                  setShowForgot(false);
                  setForgotEmail("");
                  setForgotMsg(null);
                }}
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Login;
