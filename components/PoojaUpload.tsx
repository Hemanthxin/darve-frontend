import { useState } from "react";
import exifr from "exifr";
import { User, PoojaRecord } from "../types";
import { verifyPooja } from "../services/darveService";

interface PoojaUploadProps {
  user: User;
  yesterdayRecord?: PoojaRecord;
  onRecordCreated: (record: PoojaRecord) => void;
}

/* ---------- CAMERA + GPS VALIDATION ---------- */
const validateCameraImage = async (file: File): Promise<boolean> => {
  if (!file.type.startsWith("image/")) {
    alert("Only image files are allowed");
    return false;
  }

  try {
    const exif = await exifr.parse(file, { gps: true });

    if (!exif || !exif.latitude || !exif.longitude) {
      alert("❌ Please capture image using camera with location enabled");
      return false;
    }

    return true;
  } catch {
    alert("❌ Invalid image. Use camera only with location ON");
    return false;
  }
};

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
      alert("Please capture both images");
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
          imageUrls: [],
          date: new Date().toLocaleDateString(),
          uploadTime: new Date().toLocaleTimeString(),
          status: response.status,
          aiFeedback: response.reasons?.join(", "),
          confidenceScore: response.confidence,
          timestamp: Date.now(),
        };
        onRecordCreated(record);
      }
    } catch {
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
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white/80 backdrop-blur-xl border border-orange-200 shadow-2xl rounded-[2.5rem] p-10">

        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-3">🕉️</div>
          <h1 className="text-3xl font-black text-orange-700 tracking-tight uppercase">
            Daily Pooja Verification
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-2">
            AI Ritual Compliance System
          </p>
        </div>

        {/* UPLOADS */}
        <div className="space-y-6">
          <UploadCard
            label="Capture Today Pooja Image"
            file={todayImage}
            onChange={setTodayImage}
          />

          <UploadCard
            label="Capture Same Pooja Image Again"
            file={yesterdayImage}
            onChange={setYesterdayImage}
          />
        </div>

        {/* VERIFY */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className={`mt-10 w-full py-5 rounded-2xl font-black uppercase tracking-widest text-white shadow-xl transition-all
            ${
              loading
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 hover:scale-[1.03]"
            }`}
        >
          {loading ? "Analyzing Ritual..." : "Verify Pooja"}
        </button>

        {/* RESULT */}
        {result && (
          <div className="mt-10 bg-orange-50/80 border border-orange-200 rounded-2xl p-6 animate-fadeIn">
            <div className="flex justify-between items-center mb-5">
              <span className="text-xs font-black uppercase tracking-widest text-gray-500">
                Verification Result
              </span>
              <span
                className={`px-5 py-1 rounded-full text-xs font-black uppercase ${statusColor(
                  result.status
                )}`}
              >
                {result.status}
              </span>
            </div>

            <div className="space-y-3">
              {result.reasons?.map((r: string, i: number) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 border border-orange-100 shadow-sm flex items-start"
                >
                  <span className="text-orange-500 mr-3 mt-1">✦</span>
                  <p className="text-sm text-gray-800 leading-relaxed">
                    {r}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------- UPLOAD CARD ---------- */

const UploadCard = ({
  label,
  file,
  onChange,
}: {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
}) => {
  return (
    <div className="relative group">
      <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">
        {label}
      </label>

      <label className="flex flex-col items-center justify-center border-2 border-dashed border-orange-300 rounded-2xl p-6 cursor-pointer bg-white hover:bg-orange-50 transition">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files ? e.target.files[0] : null;
            if (!file) {
              onChange(null);
              return;
            }

            const valid = await validateCameraImage(file);
            if (!valid) {
              e.target.value = "";
              onChange(null);
              return;
            }

            onChange(file);
          }}
        />

        {!file ? (
          <>
            <div className="text-3xl mb-2">📸</div>
            <p className="text-sm font-semibold text-orange-600">
              Tap to capture image
            </p>
            <p className="text-[10px] text-gray-400 mt-1 uppercase">
              Camera only • Location ON
            </p>
          </>
        ) : (
          <>
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="h-32 w-32 object-cover rounded-xl shadow-lg mb-3"
            />
            <p className="text-xs font-bold text-gray-600 truncate max-w-full">
              {file.name}
            </p>
          </>
        )}
      </label>
    </div>
  );
};

export default PoojaUpload;
