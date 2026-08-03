import { useState } from "react";
import { motion } from "framer-motion";
import AuthLayout from "./AuthLayout";
import "../../styles/login.css";
import { config } from "../../../src/config";

interface RegisterProps {
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitchToLogin }) => {
  const API_BASE = config.API_BASE_URL;

  const [form, setForm] = useState({
    name: "",
    email: "",
    templeId: "",
    password: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError(null);
    setSuccess(null);

    if (!form.name || !form.email || !form.templeId || !form.password) {
      setError("All fields are required");
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.message || "Registration failed");
      }

      setSuccess("Registration successful. A welcome email has been sent(Please Check in Spam if u didn't find mail). Please login.");
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
    <AuthLayout>
      <div className="login-card-logo">
        <div className="login-card-logo-circle">
          <i className="fa-solid fa-place-of-worship" />
        </div>
        <h2>Temple Rituals</h2>
        <h3>Register</h3>
        <p>Create Your Sacred Account</p>
      </div>

      {error && <div className="login-error">{error}</div>}
      {success && <div className="login-success">{success}</div>}

      <div className="login-input-group">
        <i className="fa-solid fa-user login-input-icon" />
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="login-input-group">
        <i className="fa-solid fa-envelope login-input-icon" />
        <input
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="login-input-group">
        <i className="fa-solid fa-id-badge login-input-icon" />
        <input
          name="templeId"
          placeholder="Temple ID"
          value={form.templeId}
          onChange={handleChange}
        />
      </div>

      <div className="login-input-group">
        <i className="fa-solid fa-lock login-input-icon" />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
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

      <div className="login-input-group">
        <i className="fa-solid fa-lock login-input-icon" />
        <input
          type={showConfirm ? "text" : "password"}
          name="confirm"
          placeholder="Confirm Password"
          value={form.confirm}
          onChange={handleChange}
        />
        <button
          type="button"
          className="login-eye-toggle"
          onClick={() => setShowConfirm((v) => !v)}
          aria-label={showConfirm ? "Hide password" : "Show password"}
        >
          <i className={`fa-solid ${showConfirm ? "fa-eye" : "fa-eye-slash"}`} />
        </button>
      </div>

      <motion.button
        className="login-submit"
        onClick={handleRegister}
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <i className="fa-solid fa-user-plus" />
        {loading ? "Registering..." : "Register"}
      </motion.button>

      <p className="login-register-row">
        Already registered?{" "}
        <button onClick={onSwitchToLogin}>Enter Sacred Login Portal</button>
      </p>
    </AuthLayout>
  );
};

export default Register;
