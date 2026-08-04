import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { AdminUserSummary, UserRole } from '../../types';
import { Reveal, RevealGroup, RevealItem } from '../motion/Reveal';
import Mandala from '../decor/Mandala';

type SortKey = 'name' | 'totalSubmissions' | 'doneCount' | 'createdAt';

interface Props {
  users: AdminUserSummary[];
}

const UsersTab: React.FC<Props> = ({ users }) => {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('totalSubmissions');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const rows = q
      ? users.filter(
          (u) =>
            u.name.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q) ||
            u.templeId.toLowerCase().includes(q)
        )
      : users;

    const sorted = [...rows].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = typeof av === 'string' ? av.localeCompare(bv as string) : (av as number) - (bv as number);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return sorted;
  }, [users, search, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const SortHeader: React.FC<{ label: string; sortKeyName: SortKey; className?: string }> = ({ label, sortKeyName, className }) => (
    <button
      onClick={() => toggleSort(sortKeyName)}
      className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-gray-400 hover:text-gray-600 transition-colors ${className || ''}`}
    >
      {label}
      {sortKey === sortKeyName && (
        <i className={`fas fa-caret-${sortDir === 'asc' ? 'up' : 'down'} text-orange-500`}></i>
      )}
    </button>
  );

  return (
    <div className="space-y-4">
      <Reveal>
        <div className="relative">
          <i className="fas fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm"></i>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or temple ID..."
            className="w-full bg-white border border-gray-200 rounded-2xl pl-11 pr-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all"
          />
        </div>
      </Reveal>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-16 flex flex-col items-center text-center">
          <Mandala className="w-24 h-24 text-orange-200 mb-4" />
          <p className="text-gray-500 font-semibold">No users match your search.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_0.8fr] gap-4 px-6 py-3 border-b border-gray-50 bg-gray-50/50">
            <SortHeader label="User" sortKeyName="name" />
            <SortHeader label="Submissions" sortKeyName="totalSubmissions" />
            <SortHeader label="Compliance" sortKeyName="doneCount" />
            <SortHeader label="Joined" sortKeyName="createdAt" />
          </div>

          <RevealGroup className="divide-y divide-gray-50">
            {filtered.map((u) => {
              const compliance = u.totalSubmissions > 0 ? Math.round((u.doneCount / u.totalSubmissions) * 100) : null;
              return (
                <RevealItem key={u.id} className="px-6 py-4 hover:bg-gray-50/70 transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_0.8fr] gap-2 md:gap-4 md:items-center">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                        <i className={`fas ${u.role === UserRole.ADMIN ? 'fa-user-shield' : 'fa-user'} text-sm`}></i>
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-gray-900 truncate">{u.name}</p>
                        <p className="text-[11px] text-gray-400 truncate">{u.email} &middot; {u.templeId}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                      <span className="font-black text-gray-900">{u.totalSubmissions}</span>
                      total
                      {u.notDoneCount > 0 && (
                        <span className="text-[10px] bg-red-50 text-red-500 px-1.5 py-0.5 rounded font-bold">{u.notDoneCount} missed</span>
                      )}
                    </div>

                    <div>
                      {compliance === null ? (
                        <span className="text-[11px] text-gray-300 italic">No data yet</span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${compliance}%` }}
                              transition={{ duration: 0.6, ease: 'easeOut' }}
                              className={`h-full rounded-full ${compliance >= 70 ? 'bg-green-500' : compliance >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            />
                          </div>
                          <span className="text-xs font-black text-gray-700">{compliance}%</span>
                        </div>
                      )}
                    </div>

                    <div className="text-[11px] text-gray-400 font-semibold">
                      {new Date(u.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      )}
    </div>
  );
};

export default UsersTab;
