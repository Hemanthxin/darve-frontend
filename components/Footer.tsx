import React from "react";

interface FooterProps {
  onNavigate: (view: "HOME" | "HISTORY", anchor?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => (
  <footer className="bg-gray-900 text-gray-400">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
      <div>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-orange-500 to-red-600 flex items-center justify-center">
            <i className="fas fa-om text-white text-sm"></i>
          </div>
          <span className="font-black text-white">Temple Verifier</span>
        </div>
        <p className="text-sm mt-3 leading-relaxed max-w-xs">
          AI-powered ritual verification that helps temples keep daily poojas accountable,
          transparent and devotionally consistent.
        </p>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Navigate</p>
        <div className="flex flex-col gap-2 text-sm">
          <button onClick={() => onNavigate("HOME")} className="text-left hover:text-white transition-colors">
            Home
          </button>
          <button onClick={() => onNavigate("HOME", "ai-verifier")} className="text-left hover:text-white transition-colors">
            AI Verifier
          </button>
          <button onClick={() => onNavigate("HISTORY")} className="text-left hover:text-white transition-colors">
            History
          </button>
        </div>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Built For</p>
        <p className="text-sm leading-relaxed max-w-xs">
          Temples and religious institutions across India seeking a simple, trustworthy way
          to verify daily ritual compliance.
        </p>
      </div>
    </div>

    <div className="border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
        <span>© {new Date().getFullYear()} Temple Verifier. All rights reserved.</span>
        <span>AI Ritual Compliance System</span>
      </div>
    </div>
  </footer>
);

export default Footer;
