import React, { useState } from "react";
import axios from "axios";
import { User } from "../../../types";
import { config } from "../../../src/config";
import AuthLayout from "./AuthLayout";
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

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      localStorage.setItem("authToken", res.data.access_token);
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

      <button
        className="login-submit"
        onClick={handleLogin}
        disabled={loading}
      >
        <i className="fa-solid fa-shield-halved" />
        {loading ? "Logging in..." : "Login"}
      </button>

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

      {/* =======================
         FORGOT PASSWORD MODAL
      ======================= */}
      {showForgot && (
        <div className="login-modal-overlay">
          <div className="login-modal">
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
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default Login;
