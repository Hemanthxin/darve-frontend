import { useState } from "react";
import { motion } from "framer-motion";
import { User, PoojaRecord } from "../types";
import { verifyPooja } from "../services/darveService";

interface PoojaUploadProps {
  user: User;
  yesterdayRecord?: PoojaRecord;
  onRecordCreated: (record: PoojaRecord) => void;
}

const PoojaUpload: React.FC<PoojaUploadProps> = ({
  user,
  yesterdayRecord,
  onRecordCreated,
}) => {
  const [todayImage, setTodayImage] = useState<File | null>(null);
  const [yesterdayImage, setYesterdayImage] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!todayImage || !yesterdayImage) {
      alert("Please upload both images");
      return;
    }

    try {
      setLoading(true);
      const response = await verifyPooja(todayImage, yesterdayImage);
      setResult(response);

      if (response) {
        const record: PoojaRecord = {
          id: Math.random().toString(),
          userId: user.id,
          userName: user.name,
          templeId: user.templeId,
          imageUrls: [URL.createObjectURL(todayImage)],
          date: new Date().toLocaleDateString(),
          uploadTime: new Date().toLocaleTimeString(),
          status: response.status,
          aiFeedback: response.reasons?.join(", "),
          confidenceScore: response.confidence,
          timestamp: Date.now(),
        };
        onRecordCreated(record);
      }
    } catch (e) {
      alert("Verification failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (status: string) => {
    if (status === "DONE") return "bg-green-500/20 text-green-700";
    if (status === "NOT_DONE") return "bg-red-500/20 text-red-700";
    return "bg-yellow-500/20 text-yellow-700";
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
      <div className="flex items-start gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center flex-shrink-0">
          <i className="fas fa-users"></i>
        </div>
        <div>
          <h2 className="font-black text-gray-900">AI Ritual Verifier</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Upload today's and yesterday's pooja images for AI verification.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <UploadCard
          label="Today's Pooja Image"
          file={todayImage}
          onChange={setTodayImage}
        />

        <div className="hidden sm:flex w-10 h-10 rounded-full bg-orange-100 text-orange-500 font-black text-xs items-center justify-center flex-shrink-0">
          VS
        </div>

        <UploadCard
          label="Yesterday's Pooja Image"
          file={yesterdayImage}
          onChange={setYesterdayImage}
        />
      </div>

      <motion.button
        onClick={handleVerify}
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.01 }}
        whileTap={{ scale: loading ? 1 : 0.99 }}
        className={`mt-6 w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-colors flex items-center justify-center gap-2
          ${
            loading
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
          }`}
      >
        <i className="fas fa-wand-magic-sparkles"></i>
        {loading ? "Analyzing Ritual..." : "Verify with AI"}
      </motion.button>

      <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1.5">
        <i className="fas fa-shield-halved"></i>
        Your images are secure and used only for verification purposes.
      </p>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-orange-50/80 border border-orange-100 rounded-2xl p-5"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-gray-500">
              Verification Result
            </span>
            <span
              className={`px-4 py-1 rounded-full text-xs font-black uppercase ${statusColor(
                result.status
              )}`}
            >
              {result.status}
            </span>
          </div>

          <div className="space-y-2">
            {result.reasons?.map((r: string, i: number) => (
              <div
                key={i}
                className="bg-white rounded-xl p-3 border border-orange-100 shadow-sm flex items-start"
              >
                <span className="text-orange-500 mr-2 mt-0.5 text-xs">✦</span>
                <p className="text-sm text-gray-800 leading-relaxed">{r}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

/* ---------------- UPLOAD CARD ---------------- */

const UploadCard = ({
  label,
  file,
  onChange,
}: {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) onChange(dropped);
  };

  return (
    <div className="relative group w-full">
      <label className="block text-xs font-bold text-gray-600 mb-2">
        {label}
      </label>

      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 cursor-pointer bg-gray-50/50 transition-colors
          ${dragActive ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/40"}`}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) =>
            onChange(e.target.files ? e.target.files[0] : null)
          }
        />

        {!file ? (
          <>
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mb-3">
              <i className="fas fa-cloud-arrow-up"></i>
            </div>
            <p className="text-sm font-semibold text-gray-700">
              Click to upload image
            </p>
            <p className="text-xs text-gray-400 mt-1">or drag and drop</p>
            <p className="text-[10px] text-gray-300 mt-1 uppercase tracking-wide">
              JPG, PNG up to 10MB
            </p>
          </>
        ) : (
          <>
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="h-24 w-24 object-cover rounded-xl shadow-sm mb-2"
            />
            <p className="text-xs font-semibold text-gray-600 truncate max-w-full">
              {file.name}
            </p>
          </>
        )}
      </label>
    </div>
  );
};

export default PoojaUpload;
