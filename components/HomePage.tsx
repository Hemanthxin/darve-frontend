import React from "react";
import { User, PoojaRecord } from "../types";
import PoojaUpload from "./PoojaUpload";
import HistoryPreview from "./HistoryPreview";
import { Reveal, RevealGroup, RevealItem } from "./motion/Reveal";

interface HomePageProps {
  user: User;
  records: PoojaRecord[];
  onRecordCreated: (record: PoojaRecord) => void;
  onViewHistory: () => void;
}

const aboutSteps = [
  {
    icon: "fa-images",
    title: "Upload Two Photos",
    text: "Priests upload today's pooja photo alongside a reference photo from a previously verified day.",
  },
  {
    icon: "fa-microchip",
    title: "AI Compares Instantly",
    text: "Our AI model checks ritual setup, items and consistency between the two images within seconds.",
  },
  {
    icon: "fa-clock-rotate-left",
    title: "Track Compliance Over Time",
    text: "Every verification is logged, so temple administrators can audit daily ritual compliance at a glance.",
  },
];

const stats = [
  { icon: "fa-shield-halved", value: "99.2%", label: "AI Accuracy", sub: "High Precision" },
  { icon: "fa-lock", value: "100%", label: "Secure & Private", sub: "Data Protection" },
  { icon: "fa-bolt", value: "Instant", label: "Real-time Verification", sub: "Quick Results" },
  { icon: "fa-landmark", value: "Trusted", label: "Built for Temples", sub: "Across India" },
];

const HomePage: React.FC<HomePageProps> = ({ user, records, onRecordCreated, onViewHistory }) => {
  const yesterdayRecord = records[0];

  return (
    <div>
      {/* ============ HERO ============ */}
      <section
        className="relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url(/temple-bg.png)" }}
      >
        <div className="absolute inset-0 bg-white/85" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-14">
          <Reveal>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 leading-tight">
              AI-Powered
              <br />
              <span className="text-orange-600">Ritual Verification</span>
              <br />
              for Temples
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-lg text-gray-500 text-sm sm:text-base leading-relaxed">
              Ensure daily rituals are performed with devotion and verified with the power of AI.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-4 relative">
        {/* ============ AI VERIFIER + HISTORY ============ */}
        <RevealGroup className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch" id="ai-verifier">
          <RevealItem>
            <PoojaUpload
              user={user}
              yesterdayRecord={yesterdayRecord}
              onRecordCreated={onRecordCreated}
            />
          </RevealItem>
          <RevealItem>
            <HistoryPreview records={records} onViewAll={onViewHistory} />
          </RevealItem>
        </RevealGroup>

        {/* ============ ABOUT ============ */}
        <section className="py-20 sm:py-24">
          <Reveal className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
              What Temple Verifier Does
            </h2>
            <p className="mt-3 text-gray-500 text-sm sm:text-base">
              A simple, AI-powered workflow that keeps daily temple rituals accountable and transparent.
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-3">
            {aboutSteps.map((step, i) => (
              <RevealItem key={step.title} className="text-center px-4">
                <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 shadow-sm shadow-orange-900/10 flex items-center justify-center text-white">
                  <span className="text-sm font-black">0{i + 1}</span>
                </div>
                <h3 className="font-black text-gray-900 mt-4">
                  <i className={`fas ${step.icon} text-orange-500 mr-2`}></i>
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{step.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* ============ STATS BAR ============ */}
        <Reveal className="pb-16">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl border border-orange-100 grid grid-cols-2 sm:grid-cols-4 gap-6 px-6 sm:px-10 py-8">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white text-orange-500 flex items-center justify-center shadow-sm flex-shrink-0">
                  <i className={`fas ${s.icon}`}></i>
                </div>
                <div>
                  <p className="font-black text-gray-900 leading-none">{s.value}</p>
                  <p className="text-[11px] text-gray-500 font-semibold mt-1">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default HomePage;
