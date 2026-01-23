import { useState } from "react";
import OmGlow from "../../OmGlow";
import "../../styles/auth.css";
import { config } from "../../../src/config";

interface RegisterProps {
  onSwitchToLogin: () => void;
}

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isStrongPassword = (password: string) =>
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
    password
  );

const Register: React.FC<RegisterProps> = ({ onSwitchToLogin }) => {
  const API_BASE = config.API_BASE_URL;

  const [form, setForm] = useState({
    name: "",
    email: "",
    templeId: "",
    password: "",
    confirm: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (loading) return; // 🔒 prevent double click

    setError(null);
    setSuccess(null);

    if (
      !form.name ||
      !form.email ||
      !form.templeId ||
      !form.password ||
      !form.confirm
    ) {
      setError("All fields are required");
      return;
    }

    if (!isValidEmail(form.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!isStrongPassword(form.password)) {
      setError(
        "Password must contain at least 8 characters, a letter, a number, and a special character"
      );
      return;
    }

    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          temple_id: form.templeId,
        }),
      });

      let data: any = null;
      const contentType = response.headers.get("content-type");

      // ✅ SAFE JSON PARSING
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(
          data?.detail || data?.message || "Registration failed"
        );
      }

      setSuccess("Registration successful. Please login.");
      setForm({
        name: "",
        email: "",
        templeId: "",
        password: "",
        confirm: "",
      });
    } catch (err: any) {
      setError(
        err.message === "Failed to fetch"
          ? "Backend is not reachable."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <OmGlow />

        <h1 className="auth-title">Temple Verifier</h1>
        <p className="auth-subtitle">
          Sacred Registration for Daily Ritual Compliance
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded-xl mt-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 text-sm p-3 rounded-xl mt-4">
            {success}
          </div>
        )}

        <div className="space-y-4 mt-6">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="auth-input"
          />
          <input
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="auth-input"
          />
          <input
            name="templeId"
            placeholder="Temple ID"
            value={form.templeId}
            onChange={handleChange}
            className="auth-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="auth-input"
          />
          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            value={form.confirm}
            onChange={handleChange}
            className="auth-input"
          />
        </div>

        <button
          onClick={handleRegister}
          disabled={loading || !!success}
          className="auth-button mt-6 disabled:opacity-60"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="auth-footer">
          Already registered?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-orange-600 font-bold hover:underline"
          >
            Enter Sacred Login Portal
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
