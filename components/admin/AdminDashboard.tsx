import React, { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { User, AdminStats, AdminUserSummary, AdminVerificationRecord } from '../../types';
import { adminService } from '../../services/adminService';
import Mandala from '../decor/Mandala';
import OverviewTab from './OverviewTab';
import UsersTab from './UsersTab';
import VerificationsTab from './VerificationsTab';

interface Props {
  user: User;
  onLogout: () => void;
}

type Tab = 'OVERVIEW' | 'USERS' | 'VERIFICATIONS';

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'OVERVIEW', label: 'Overview', icon: 'fa-chart-pie' },
  { key: 'USERS', label: 'Users', icon: 'fa-users' },
  { key: 'VERIFICATIONS', label: 'Verifications', icon: 'fa-shield-halved' },
];

const AdminDashboard: React.FC<Props> = ({ user, onLogout }) => {
  const [tab, setTab] = useState<Tab>('OVERVIEW');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<AdminUserSummary[]>([]);
  const [records, setRecords] = useState<AdminVerificationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsRes, usersRes, recordsRes] = await Promise.all([
        adminService.getStats(),
        adminService.getUsers(),
        adminService.getRecords(200),
      ]);
      setStats(statsRes);
      setUsers(usersRes);
      setRecords(recordsRes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-orange-50">
      <header className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-red-600 text-white">
        <div className="absolute -top-16 -right-16 text-white/10 pointer-events-none">
          <Mandala className="w-72 h-72" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/15 backdrop-blur-sm w-12 h-12 rounded-xl flex items-center justify-center border border-white/20">
                <i className="fas fa-om text-lg"></i>
              </div>
              <div>
                <h1 className="text-xl font-black leading-none">Admin Console</h1>
                <p className="text-[11px] font-semibold text-orange-100 mt-1 uppercase tracking-widest">
                  Temple Verifier &middot; Compliance Overview
                </p>
              </div>
            </div>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl pl-2 pr-3 py-2 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <i className="fas fa-user-shield text-sm"></i>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-black leading-none">{user.name}</p>
                  <p className="text-[10px] text-orange-100 font-semibold mt-0.5">Administrator</p>
                </div>
                <i className={`fas fa-chevron-down text-[10px] transition-transform ${menuOpen ? 'rotate-180' : ''}`}></i>
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-1 text-gray-900"
                  >
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <i className="fas fa-power-off text-xs"></i>
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <nav className="flex items-center gap-1 mt-8 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-1 w-fit">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`relative px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 ${
                  tab === t.key ? 'text-orange-700' : 'text-white/80 hover:text-white'
                }`}
              >
                {tab === t.key && (
                  <motion.span
                    layoutId="admin-tab-active"
                    className="absolute inset-0 bg-white rounded-xl shadow-sm"
                    transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <i className={`fas ${t.icon} text-xs`}></i>
                  {t.label}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {loading && (
          <div className="space-y-4 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-28 bg-white rounded-2xl border border-gray-100" />
              ))}
            </div>
            <div className="h-64 bg-white rounded-2xl border border-gray-100" />
          </div>
        )}

        {!loading && error && (
          <div className="bg-white rounded-2xl border border-red-100 p-10 text-center">
            <i className="fas fa-triangle-exclamation text-red-400 text-3xl mb-3"></i>
            <p className="text-gray-700 font-semibold mb-4">{error}</p>
            <button
              onClick={loadData}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              <i className="fas fa-rotate-right mr-2"></i>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && stats && (
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {tab === 'OVERVIEW' && <OverviewTab stats={stats} />}
              {tab === 'USERS' && <UsersTab users={users} />}
              {tab === 'VERIFICATIONS' && <VerificationsTab records={records} />}
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
