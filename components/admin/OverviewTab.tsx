import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import { AdminStats, PoojaStatus } from '../../types';
import { Reveal, RevealGroup, RevealItem } from '../motion/Reveal';

const STATUS_COLORS: Record<string, string> = {
  [PoojaStatus.DONE]: '#10b981',
  [PoojaStatus.NOT_DONE]: '#ef4444',
  [PoojaStatus.UNCLEAR]: '#f59e0b',
  [PoojaStatus.PENDING]: '#9ca3af',
};

const AnimatedNumber: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = '' }) => {
  const [display, setDisplay] = useState(0);
  const prevValue = useRef(0);

  useEffect(() => {
    const controls = animate(prevValue.current, value, {
      duration: 0.8,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    prevValue.current = value;
    return () => controls.stop();
  }, [value]);

  return <>{display}{suffix}</>;
};

interface Props {
  stats: AdminStats;
}

const OverviewTab: React.FC<Props> = ({ stats }) => {
  const doneCount = stats.statusBreakdown.find((s) => s.status === PoojaStatus.DONE)?.count ?? 0;
  const notDoneCount = stats.statusBreakdown.find((s) => s.status === PoojaStatus.NOT_DONE)?.count ?? 0;
  const unclearCount = stats.statusBreakdown.find((s) => s.status === PoojaStatus.UNCLEAR)?.count ?? 0;
  const complianceRate = stats.totalRecords > 0 ? Math.round((doneCount / stats.totalRecords) * 100) : 0;

  const maxTempleCount = Math.max(1, ...stats.perTemple.map((t) => t.count));

  return (
    <div className="space-y-6">
      <RevealGroup className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <RevealItem className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-2xl shadow-lg text-white md:col-span-2 flex flex-col justify-between">
          <div>
            <p className="text-orange-100 text-xs font-bold uppercase tracking-widest">Compliance Score</p>
            <h3 className="text-5xl font-black mt-2"><AnimatedNumber value={complianceRate} suffix="%" /></h3>
          </div>
          <p className="text-orange-100 text-xs mt-4 font-medium">
            Based on <AnimatedNumber value={stats.totalRecords} /> verified submissions across <AnimatedNumber value={stats.totalUsers} /> users
          </p>
        </RevealItem>
        <RevealItem className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-wider">Total Users</p>
          <h3 className="text-3xl font-black mt-1 text-gray-800"><AnimatedNumber value={stats.totalUsers} /></h3>
          <div className="mt-2 text-[10px] text-gray-400 font-bold">Registered Priests</div>
        </RevealItem>
        <RevealItem className="bg-white p-4 rounded-xl shadow-sm border border-red-100">
          <p className="text-red-500 text-[10px] font-black uppercase tracking-wider">Alerts (Missed)</p>
          <h3 className="text-3xl font-black mt-1 text-red-700"><AnimatedNumber value={notDoneCount} /></h3>
          <div className="mt-2 text-[10px] text-red-400 font-bold">Action Required</div>
        </RevealItem>
      </RevealGroup>

      <RevealGroup className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevealItem className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6">Status Distribution</h3>
          {stats.totalRecords === 0 ? (
            <EmptyChartState message="No verification submissions yet" />
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.statusBreakdown.map((s) => ({ name: s.status.replace('_', ' '), value: s.count, key: s.status }))}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={11} />
                  <YAxis axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {stats.statusBreakdown.map((s, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[s.status] || '#9ca3af'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </RevealItem>

        <RevealItem className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6">Submissions — Last 15 Days</h3>
          {stats.totalRecords === 0 ? (
            <EmptyChartState message="Trend will appear once priests start submitting" />
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.recordsByDay}>
                  <defs>
                    <linearGradient id="admin-trend-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    fontSize={10}
                    tickFormatter={(d) => d.slice(5)}
                  />
                  <YAxis axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="count" stroke="#f97316" strokeWidth={2} fill="url(#admin-trend-fill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </RevealItem>
      </RevealGroup>

      <Reveal className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
          <h3 className="font-bold text-gray-800">Per-Temple Breakdown</h3>
        </div>
        <div className="p-6 space-y-3">
          {stats.perTemple.length === 0 ? (
            <EmptyChartState message="No temple activity recorded yet" />
          ) : (
            stats.perTemple
              .sort((a, b) => b.count - a.count)
              .map((t) => (
                <div key={t.templeId} className="flex items-center gap-4">
                  <span className="w-28 shrink-0 text-xs font-bold text-gray-600 truncate">{t.templeId}</span>
                  <div className="flex-grow h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-700"
                      style={{ width: `${(t.count / maxTempleCount) * 100}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-xs font-black text-gray-700">{t.count}</span>
                </div>
              ))
          )}
        </div>
      </Reveal>

      {unclearCount > 0 && (
        <Reveal className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-3">
          <i className="fas fa-circle-question text-yellow-500 text-xl"></i>
          <p className="text-sm text-yellow-800 font-semibold">
            {unclearCount} submission{unclearCount > 1 ? 's' : ''} flagged as unclear — review them in the Verifications tab.
          </p>
        </Reveal>
      )}
    </div>
  );
};

const EmptyChartState: React.FC<{ message: string }> = ({ message }) => (
  <div className="h-64 flex flex-col items-center justify-center text-center text-gray-400">
    <i className="fas fa-chart-simple text-3xl mb-2 opacity-40"></i>
    <p className="text-sm font-medium">{message}</p>
  </div>
);

export default OverviewTab;
