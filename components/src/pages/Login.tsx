import React, { useState } from "react";
import axios from "axios";
import { User } from "../../../types";
import { config } from "../../../src/config";

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
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="text-5xl text-orange-600 mb-2">🕉️</div>
          <h1 className="text-2xl font-black">Temple Verifier</h1>
          <p className="text-sm text-gray-400">
            Sacred Login Portal
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <input
          className="w-full mb-3 p-3 border rounded-xl"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-2 p-3 border rounded-xl"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="text-right mb-4">
          <button
            onClick={() => setShowForgot(true)}
            className="text-sm text-orange-600 font-semibold hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-orange-600 text-white p-3 rounded-xl font-bold hover:bg-orange-700 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-4 text-sm">
          New here?{" "}
          <button
            onClick={onSwitchToRegister}
            className="text-orange-600 font-bold hover:underline"
          >
            Register
          </button>
        </p>
      </div>

      {/* =======================
         FORGOT PASSWORD MODAL
      ======================= */}
      {showForgot && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm">
            <h2 className="text-xl font-bold mb-2">
              Forgot Password
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Enter your registered email
            </p>

            <input
              className="w-full mb-3 p-3 border rounded-xl"
              placeholder="Email address"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
            />

            {forgotMsg && (
              <p className="text-sm text-center mb-3 text-gray-700">
                {forgotMsg}
              </p>
            )}

            <button
              onClick={handleForgotPassword}
              disabled={forgotLoading}
              className="w-full bg-orange-600 text-white p-3 rounded-xl font-bold hover:bg-orange-700 disabled:opacity-60"
            >
              {forgotLoading ? "Sending..." : "Send Reset Link"}
            </button>

            <button
              onClick={() => {
                setShowForgot(false);
                setForgotEmail("");
                setForgotMsg(null);
              }}
              className="w-full mt-3 text-sm text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
