import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../../../src/config";

/* =======================
   HELPERS
======================= */
const isStrongPassword = (password: string) =>
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
    password
  );

const ResetPassword: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  /* =======================
     READ TOKEN FROM URL
     /reset-password?token=xxxx
  ======================= */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token");
    setToken(t);
  }, []);

  /* =======================
     RESET PASSWORD
  ======================= */
  const handleResetPassword = async () => {
    setError(null);
    setSuccess(null);

    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }

    if (!password || !confirm) {
      setError("All fields are required");
      return;
    }

    if (!isStrongPassword(password)) {
      setError(
        "Password must be at least 8 characters long and include a letter, a number, and a special character"
      );
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${config.API_BASE_URL}/auth/reset-password`,
        {
          token,
          new_password: password,
        }
      );

      setSuccess("Password reset successful. You can now log in.");
      setPassword("");
      setConfirm("");
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
        "Reset link is invalid or expired"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="text-5xl text-orange-600 mb-2">🕉️</div>
          <h1 className="text-2xl font-black">Reset Password</h1>
          <p className="text-sm text-gray-400">
            Set a new secure password
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 text-sm p-3 rounded-xl mb-4">
            {success}
          </div>
        )}

        <input
          type="password"
          placeholder="New Password"
          className="w-full mb-3 p-3 border rounded-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-4 p-3 border rounded-xl"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button
          onClick={handleResetPassword}
          disabled={loading}
          className="w-full bg-orange-600 text-white p-3 rounded-xl font-bold hover:bg-orange-700 disabled:opacity-60"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
