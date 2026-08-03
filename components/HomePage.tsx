import React from "react";
import { motion } from "framer-motion";
import { User, PoojaRecord } from "../types";
import PoojaUpload from "./PoojaUpload";
import HistoryPreview from "./HistoryPreview";
import Footer from "./Footer";
import Mandala from "./decor/Mandala";
import { Reveal, RevealGroup, RevealItem } from "./motion/Reveal";

interface HomePageProps {
  user: User;
  records: PoojaRecord[];
  onRecordCreated: (record: PoojaRecord) => void;
  onViewHistory: () => void;
  onNavigate: (view: "HOME" | "HISTORY", anchor?: string) => void;
}

const heroStats = [
  { value: "99.2%", label: "AI Accuracy" },
  { value: "100%", label: "Secure & Private" },
  { value: "Instant", label: "Verification Time" },
  { value: "Trusted", label: "Across Temples" },
];

const steps = [
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

const trustPoints = [
  {
    icon: "fa-chart-line",
    title: "Compliance Tracking",
    text: "A running record of every ritual, so nothing slips through unnoticed.",
  },
  {
    icon: "fa-bolt",
    title: "Instant AI Feedback",
    text: "No waiting on manual review — get a verified result in seconds.",
  },
  {
    icon: "fa-lock",
    title: "Bank-Grade Security",
    text: "Photos and records are encrypted and used only for verification.",
  },
  {
    icon: "fa-landmark",
    title: "Built for Indian Temples",
    text: "Designed around real daily-pooja workflows, not generic checklists.",
  },
];

const gallery = [
  { image: "/temple-bg.png", position: "0% 35%", title: "Sacred Architecture", sub: "Centuries of devotion, carved in stone" },
  { image: "/ai-flower-detection.png", position: "50% 55%", title: "Daily Rituals", sub: "Verified with care, every single day" },
  { image: "/ai-lamp-identification.png", position: "20% 45%", title: "Living Tradition", sub: "Technology in service of faith" },
];

const HomePage: React.FC<HomePageProps> = ({ user, records, onRecordCreated, onViewHistory, onNavigate }) => {
  const yesterdayRecord = records[0];

  return (
    <div className="font-sans">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/hero-temple-bg.png)" }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1.5 text-xs font-bold text-orange-700">
                <i className="fas fa-sparkles text-[10px]"></i>
                AI-Powered Ritual Compliance
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1
                className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                AI-Powered
                <br />
                <span className="text-orange-600">Ritual Verification</span>
                <br />
                for Temples
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-5 max-w-md text-gray-500 text-base leading-relaxed">
                Ensure daily rituals are performed with devotion and verified with the power of AI —
                simple for priests, transparent for administrators.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate("HOME", "ai-verifier")}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-bold px-6 py-3.5 shadow-lg shadow-orange-900/15"
                >
                  Start Verifying
                  <i className="fas fa-arrow-right text-xs"></i>
                </motion.button>
                <button
                  onClick={() => onNavigate("HOME", "how-it-works")}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-bold px-6 py-3.5 transition-colors"
                >
                  See How It Works
                </button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-orange-900/10 border border-orange-100/60 aspect-[4/3]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url(/ai-deity-identification.png)" }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <i className="fas fa-check text-sm"></i>
              </div>
              <div>
                <p className="text-sm font-black text-gray-900 leading-none">Deity Identified</p>
                <p className="text-[11px] text-gray-400 mt-1">Lord Shiva · 99.7% confidence</p>
              </div>
            </motion.div>
          </Reveal>
        </div>

        {/* Stat strip straddling the hero's bottom edge */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 mt-16 sm:mt-20">
          <RevealGroup className="grid grid-cols-2 sm:grid-cols-4 gap-4 -mb-10 relative z-10">
            {heroStats.map((s) => (
              <RevealItem key={s.label}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-900/5 px-4 py-5 text-center">
                  <p className="text-xl sm:text-2xl font-black text-orange-600">{s.value}</p>
                  <p className="text-[11px] text-gray-500 font-semibold mt-1">{s.label}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ============ AI VERIFIER + HISTORY ============ */}
        <RevealGroup className="pt-24 sm:pt-28 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch" id="ai-verifier">
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

        {/* ============ HOW IT WORKS ============ */}
        <section id="how-it-works" className="py-20 sm:py-28">
          <Reveal className="max-w-2xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1.5 text-xs font-bold text-orange-700">
              How It Works
            </span>
            <h2
              className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              From Upload to Verified
            </h2>
            <p className="mt-3 text-gray-500 text-sm sm:text-base">
              A simple, AI-powered workflow that keeps daily temple rituals accountable and transparent.
            </p>
          </Reveal>

          <div className="relative mt-16">
            <div className="hidden sm:block absolute top-6 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200" />
            <RevealGroup className="grid gap-10 sm:grid-cols-3">
              {steps.map((step, i) => (
                <RevealItem key={step.title} className="relative text-center px-4">
                  <div className="relative mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-900/15 flex items-center justify-center text-white z-10">
                    <span className="text-sm font-black">0{i + 1}</span>
                  </div>
                  <h3 className="font-black text-gray-900 mt-5">
                    <i className={`fas ${step.icon} text-orange-500 mr-2`}></i>
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">{step.text}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ============ TEMPLE GALLERY ============ */}
        <section className="py-8 sm:py-12">
          <Reveal className="max-w-2xl mx-auto text-center">
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Sacred Spaces We Help Protect
            </h2>
            <p className="mt-3 text-gray-500 text-sm sm:text-base">
              Every verification honours the tradition and craftsmanship behind daily temple worship.
            </p>
          </Reveal>

          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-3">
            {gallery.map((g) => (
              <RevealItem key={g.title}>
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg shadow-gray-900/5 group">
                  <div
                    className="absolute inset-0 bg-cover transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${g.image})`, backgroundPosition: g.position }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white font-black">{g.title}</p>
                    <p className="text-white/70 text-xs mt-1">{g.sub}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* ============ WHY TEMPLES TRUST US ============ */}
        <section className="py-20 sm:py-28">
          <Reveal className="max-w-2xl mx-auto text-center">
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Why Temples Trust Us
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((t) => (
              <RevealItem key={t.title}>
                <div className="h-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center">
                    <i className={`fas ${t.icon}`}></i>
                  </div>
                  <h3 className="font-black text-gray-900 mt-4">{t.title}</h3>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">{t.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      </div>

      {/* ============ FINAL CTA ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 to-red-700 py-20 sm:py-24">
        <div className="absolute -bottom-20 -left-20 text-white/10">
          <Mandala className="w-96 h-96" />
        </div>
        <Reveal className="relative max-w-2xl mx-auto text-center px-4">
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to Verify Today's Ritual?
          </h2>
          <p className="mt-3 text-orange-50/90 text-sm sm:text-base">
            Upload today's pooja photo and get an AI-verified result in seconds.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate("HOME", "ai-verifier")}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white text-orange-700 text-sm font-bold px-7 py-3.5 shadow-lg"
          >
            Verify Now
            <i className="fas fa-arrow-right text-xs"></i>
          </motion.button>
        </Reveal>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default HomePage;
