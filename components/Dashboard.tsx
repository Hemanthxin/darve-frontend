
import React from 'react';
import { PoojaRecord, PoojaStatus } from '../types';
import StatusBadge from './StatusBadge';
import CalendarView from './CalendarView';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Props {
  records: PoojaRecord[];
  adminView?: boolean;
}

const Dashboard: React.FC<Props> = ({ records }) => {
  const stats = {
    total: records.length,
    done: records.filter(r => r.status === PoojaStatus.DONE).length,
    notDone: records.filter(r => r.status === PoojaStatus.NOT_DONE).length,
    unclear: records.filter(r => r.status === PoojaStatus.UNCLEAR).length
  };

  const complianceRate = stats.total > 0 
    ? Math.round((stats.done / stats.total) * 100) 
    : 0;

  const chartData = [
    { name: 'Done', value: stats.done, color: '#10b981' },
    { name: 'Not Done', value: stats.notDone, color: '#ef4444' },
    { name: 'Unclear', value: stats.unclear, color: '#f59e0b' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-2xl shadow-lg text-white md:col-span-2 flex flex-col justify-between">
          <div>
            <p className="text-orange-100 text-xs font-bold uppercase tracking-widest">Compliance Score</p>
            <h3 className="text-5xl font-black mt-2">{complianceRate}%</h3>
          </div>
          <p className="text-orange-100 text-xs mt-4 font-medium">
            Based on {stats.total} recent daily audits
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-red-100">
          <p className="text-red-500 text-[10px] font-black uppercase tracking-wider">Alerts (Pooja Missed)</p>
          <h3 className="text-3xl font-black mt-1 text-red-700">{stats.notDone}</h3>
          <div className="mt-2 text-[10px] text-red-400 font-bold">Action Required</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-yellow-100">
          <p className="text-yellow-500 text-[10px] font-black uppercase tracking-wider">Manual Review</p>
          <h3 className="text-3xl font-black mt-1 text-yellow-700">{stats.unclear}</h3>
          <div className="mt-2 text-[10px] text-yellow-400 font-bold">Awaiting Verification</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CalendarView records={records} />
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6">Distribution Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-800">Recent Activity Log</h3>
          <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-1 rounded font-bold">REAL-TIME</span>
        </div>
        <div className="divide-y divide-gray-50">
          {records.length === 0 ? (
            <div className="p-12 text-center text-gray-400 italic">No records found.</div>
          ) : (
            records.slice(0, 5).map(record => (
              <div key={record.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img src={record.imageUrls[0]} alt="Pooja" className="w-14 h-14 rounded-xl object-cover ring-2 ring-gray-100" />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white 
                      ${record.status === PoojaStatus.DONE ? 'bg-green-500' : record.status === PoojaStatus.NOT_DONE ? 'bg-red-500' : 'bg-yellow-500'}`}>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-sm text-gray-900">{record.userName}</span>
                      <StatusBadge status={record.status} />
                    </div>
                    <p className="text-[10px] text-gray-500 flex items-center mb-2 font-bold uppercase tracking-tight">
                      <i className="far fa-calendar mr-1"></i> {record.date} • {record.uploadTime}
                    </p>
                    <p className="text-xs text-gray-600 italic line-clamp-1 border-l-2 border-gray-200 pl-2">
                      "{record.aiFeedback}"
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
