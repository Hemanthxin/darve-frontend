import React, { useState } from "react";
import Login from "./components/src/pages/Login";
import Register from "./components/src/pages/Register";
import ResetPassword from "./components/src/pages/ResetPassword";
import PoojaUpload from "./components/PoojaUpload";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { User, PoojaRecord } from "./types";

const getStoredUser = (): User | null => {
  const token = localStorage.getItem("authToken");
  const storedUser = localStorage.getItem("authUser");

  if (!token || !storedUser) return null;

  try {
    return JSON.parse(storedUser) as User;
  } catch {
    return null;
  }
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(getStoredUser);
  const [records, setRecords] = useState<PoojaRecord[]>([]);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (loggedUser: User) => {
    setUser(loggedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setUser(null);
    setRecords([]);
  };

  const addRecord = (record: PoojaRecord) => {
    setRecords(prev => [record, ...prev]);
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* 🔓 Reset password must work without login */}
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* 🔐 Not logged in */}
        {!user && (
          <Route
            path="*"
            element={
              showRegister ? (
                <Register onSwitchToLogin={() => setShowRegister(false)} />
              ) : (
                <Login
                  onLogin={handleLogin}
                  onSwitchToRegister={() => setShowRegister(true)}
                />
              )
            }
          />
        )}

        {/* 🔒 Logged in */}
        {user && (
          <Route
            path="*"
            element={
              <>
                <Header
                  user={user}
                  onLogout={handleLogout}
                  setView={() => {}}
                  currentView="HOME"
                />
                <main className="max-w-4xl mx-auto p-4">
                  <PoojaUpload user={user} onRecordCreated={addRecord} />
                  <Dashboard records={records} />
                </main>
              </>
            }
          />
        )}

      </Routes>
    </BrowserRouter>
  );
};

export default App;
