
import React from 'react';
import { PoojaRecord, PoojaStatus } from '../types';

interface Props {
  records: PoojaRecord[];
}

const CalendarView: React.FC<Props> = ({ records }) => {
  const daysInMonth = 30; // Simple simulation for current month
  const today = new Date().getDate();
  
  const getStatusForDay = (day: number) => {
    const dateStr = `2023-10-${day.toString().padStart(2, '0')}`;
    const record = records.find(r => r.date === dateStr);
    return record?.status || null;
  };

  const statusColors = {
    [PoojaStatus.DONE]: "bg-green-500",
    [PoojaStatus.NOT_DONE]: "bg-red-500",
    [PoojaStatus.UNCLEAR]: "bg-yellow-500",
    [PoojaStatus.PENDING]: "bg-gray-300"
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-800">Monthly Compliance Calendar</h3>
        <div className="flex gap-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">
          <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span> Done</div>
          <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-500 mr-1"></span> Not Done</div>
          <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></span> Manual</div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
          <div key={day} className="text-center text-xs font-bold text-gray-400 py-1">{day}</div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1;
          const status = getStatusForDay(dayNum);
          const isToday = dayNum === today;

          return (
            <div 
              key={i} 
              className={`aspect-square flex flex-col items-center justify-center rounded-lg border text-sm transition-all
                ${isToday ? 'border-orange-500 ring-1 ring-orange-200' : 'border-gray-50'}
                ${status ? 'bg-opacity-10' : 'bg-gray-50'}
              `}
            >
              <span className={`font-medium ${isToday ? 'text-orange-600' : 'text-gray-600'}`}>{dayNum}</span>
              {status && (
                <div className={`w-1.5 h-1.5 rounded-full mt-1 ${statusColors[status]}`}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
