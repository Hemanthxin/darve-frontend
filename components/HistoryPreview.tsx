import React from "react";
import { PoojaRecord, PoojaStatus } from "../types";

interface Props {
  records: PoojaRecord[];
  onViewAll: () => void;
}

const HistoryPreview: React.FC<Props> = ({ records, onViewAll }) => {
  const preview = records.slice(0, 4);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 flex flex-col h-full">
      <div className="flex items-start gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center flex-shrink-0">
          <i className="fas fa-clock-rotate-left"></i>
        </div>
        <div>
          <h2 className="font-black text-gray-900">Verification History</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            View your recent verification results.
          </p>
        </div>
      </div>

      <div className="flex-grow divide-y divide-gray-50">
        {preview.length === 0 ? (
          <div className="py-10 text-center text-gray-400 text-sm italic">
            No verifications yet. Upload your first pooja image to get started.
          </div>
        ) : (
          preview.map((record) => {
            const verified = record.status === PoojaStatus.DONE;
            return (
              <button
                key={record.id}
                className="w-full flex items-center gap-3 py-3 text-left hover:bg-gray-50/80 rounded-xl px-2 -mx-2 transition-colors"
              >
                {record.imageUrls[0] ? (
                  <img
                    src={record.imageUrls[0]}
                    alt=""
                    className="w-11 h-11 rounded-xl object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-300">
                    <i className="fas fa-image"></i>
                  </div>
                )}

                <div className="flex-grow min-w-0">
                  <p className="text-xs text-gray-400 font-semibold">
                    {record.date} • {record.uploadTime}
                  </p>
                  <p
                    className={`text-sm font-bold mt-0.5 ${
                      verified ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {verified ? "Pooja Verified" : "Pooja Missed"}
                  </p>
                </div>

                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    verified ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
                  }`}
                >
                  <i className={`fas ${verified ? "fa-check" : "fa-xmark"} text-xs`}></i>
                </div>

                <i className="fas fa-chevron-right text-gray-300 text-xs"></i>
              </button>
            );
          })
        )}
      </div>

      <button
        onClick={onViewAll}
        className="mt-4 w-full py-3 rounded-xl border border-gray-100 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
      >
        View All History
        <i className="fas fa-arrow-right text-xs"></i>
      </button>
    </div>
  );
};

export default HistoryPreview;
