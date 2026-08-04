import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { AdminVerificationRecord, PoojaStatus } from '../../types';
import { Reveal, RevealGroup, RevealItem } from '../motion/Reveal';
import StatusBadge from '../StatusBadge';
import Mandala from '../decor/Mandala';

type Filter = 'ALL' | PoojaStatus.DONE | PoojaStatus.NOT_DONE | PoojaStatus.UNCLEAR;

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'ALL', label: 'All' },
  { key: PoojaStatus.DONE, label: 'Done' },
  { key: PoojaStatus.NOT_DONE, label: 'Not Done' },
  { key: PoojaStatus.UNCLEAR, label: 'Unclear' },
];

interface Props {
  records: AdminVerificationRecord[];
}

const VerificationsTab: React.FC<Props> = ({ records }) => {
  const [filter, setFilter] = useState<Filter>('ALL');

  const filtered = useMemo(
    () => (filter === 'ALL' ? records : records.filter((r) => r.status === filter)),
    [records, filter]
  );

  return (
    <div className="space-y-4">
      <Reveal>
        <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-2xl p-1 w-fit shadow-sm">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                filter === f.key ? 'text-white' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {filter === f.key && (
                <motion.span
                  layoutId="verification-filter-active"
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl"
                  transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
                />
              )}
              <span className="relative">{f.label}</span>
            </button>
          ))}
        </div>
      </Reveal>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-16 flex flex-col items-center text-center">
          <Mandala className="w-24 h-24 text-orange-200 mb-4" />
          <p className="text-gray-500 font-semibold">No verification submissions yet.</p>
          <p className="text-gray-400 text-sm mt-1">They'll show up here as soon as priests submit their daily pooja.</p>
        </div>
      ) : (
        <RevealGroup className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
          {filtered.map((r) => (
            <RevealItem key={r.id} className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                  <i className="fas fa-hands-praying"></i>
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5 flex-wrap">
                    <span className="font-bold text-sm text-gray-900">{r.userName}</span>
                    <StatusBadge status={r.status} />
                  </div>
                  <p className="text-[10px] text-gray-500 flex items-center gap-2 mb-2 font-bold uppercase tracking-tight">
                    <span><i className="far fa-calendar mr-1"></i>{new Date(r.createdAt).toLocaleString()}</span>
                    <span className="text-gray-300">&middot;</span>
                    <span>{r.templeId}</span>
                    {r.confidence !== null && (
                      <>
                        <span className="text-gray-300">&middot;</span>
                        <span>{Math.round(r.confidence * 100)}% confidence</span>
                      </>
                    )}
                  </p>
                  {r.reasons.length > 0 && (
                    <p className="text-xs text-gray-600 italic border-l-2 border-gray-200 pl-2">
                      "{r.reasons.join(', ')}"
                    </p>
                  )}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </div>
  );
};

export default VerificationsTab;
