import React, { useState } from "react";
import Login from "./components/src/pages/Login";
import Register from "./components/src/pages/Register";
import ResetPassword from "./components/src/pages/ResetPassword";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { User, PoojaRecord } from "./types";

type View = "HOME" | "HISTORY";

const getStoredUser = (): User | null => {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  const storedUser = localStorage.getItem("authUser") || sessionStorage.getItem("authUser");

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
  const [view, setView] = useState<View>("HOME");

  const handleLogin = (loggedUser: User) => {
    setUser(loggedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("authUser");
    setUser(null);
    setRecords([]);
  };

  const addRecord = (record: PoojaRecord) => {
    setRecords(prev => [record, ...prev]);
  };

  const handleNavigate = (nextView: View, anchor?: string) => {
    setView(nextView);

    if (anchor) {
      setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
                  onNavigate={handleNavigate}
                  currentView={view}
                />
                {view === "HOME" ? (
                  <HomePage
                    user={user}
                    records={records}
                    onRecordCreated={addRecord}
                    onViewHistory={() => handleNavigate("HISTORY")}
                  />
                ) : (
                  <main className="max-w-4xl mx-auto p-4">
                    <Dashboard records={records} />
                  </main>
                )}
              </>
            }
          />
        )}

      </Routes>
    </BrowserRouter>
  );
};

export default App;
