import React, { useState } from "react";
console.log(import.meta.env.VITE_API_URL)
import Login from "./components/src/pages/Login";
import Register from "./components/src/pages/Register";
import PoojaUpload from "./components/PoojaUpload";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";

import { User, PoojaRecord } from "./types";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [records, setRecords] = useState<PoojaRecord[]>([]);
  const [showRegister, setShowRegister] = useState(false);

  /* ---------- AUTH ---------- */

  const handleLogin = (loggedUser: User) => {
    setUser(loggedUser);
  };

  const handleLogout = () => {
    setUser(null);
    setRecords([]);
  };

  /* ---------- RECORD ---------- */

  const addRecord = (record: PoojaRecord) => {
    setRecords(prev => [record, ...prev]);
  };

  /* ---------- AUTH UI ---------- */

  if (!user) {
    return showRegister ? (
      <Register onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <Login
        onLogin={handleLogin}
        onSwitchToRegister={() => setShowRegister(true)}
      />
    );
  }

  /* ---------- MAIN APP ---------- */

  return (
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
  );
};

export default App;
