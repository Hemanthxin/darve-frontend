import React, { useState } from "react";
import axios from "axios";
import { User } from "../../../types";
import { config } from "../../../src/config";

interface LoginProps {
  onLogin: (user: User) => void;
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${config.API_BASE_URL}/auth/login`, {
        email,
        password
      });

      onLogin(res.data.user);
    } catch (err) {
      alert("Login failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="text-5xl text-orange-600 mb-2">🕉️</div>
          <h1 className="text-2xl font-black">Temple Verifier</h1>
          <p className="text-sm text-gray-400">Login</p>
        </div>

        <input
          className="w-full mb-3 p-3 border rounded-xl"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-3 border rounded-xl"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-orange-600 text-white p-3 rounded-xl font-bold hover:bg-orange-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-4 text-sm">
          New here?{" "}
          <button
            onClick={onSwitchToRegister}
            className="text-orange-600 font-bold"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
