import React, { useState } from "react";
import {
  ShieldCheck,
  Search,
  Globe,
  ExternalLink,
  Star,
  CheckCircle,
  ShieldAlert,
  ArrowLeft,
  Calendar,
} from "lucide-react";

interface VerifierProps {
  onBack: () => void;
}

// Sub-component for the Verification Timeline
interface TimelineItemProps {
  date: string;
  event: string;
  status: "success" | "pending";
}

const VerifierView: React.FC<VerifierProps> = ({ onBack }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const runIotaCheck = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header / Search Mockup */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-bold"
          >
            <ArrowLeft size={16} /> Back to Network
          </button>
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search Company, Domain, or DID..."
              className="w-full bg-slate-900 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Main Trust Card */}
        <div className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-indigo-600 p-1 text-center text-[10px] font-black uppercase tracking-[0.2em]">
            TrustBridge Verified Profile
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-black text-white tracking-tight">
                    Acme Global Labs
                  </h1>
                  {isVerified && (
                    <CheckCircle
                      className="text-emerald-400 fill-emerald-400/20"
                      size={28}
                    />
                  )}
                </div>
                <div className="flex items-center gap-4 text-slate-400 text-sm">
                  <span className="flex items-center gap-1">
                    <Globe size={14} /> acme-labs.io
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> Member since 2024
                  </span>
                </div>
              </div>

              <div className="bg-slate-950 border border-white/5 p-4 rounded-2xl text-center min-w-[140px]">
                <div className="flex justify-center gap-1 mb-1">
                  {[1, 2, 3].map((i) => (
                    <Star
                      key={i}
                      size={18}
                      className="text-indigo-400 fill-indigo-400"
                    />
                  ))}
                  <Star size={18} className="text-slate-800" />
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Trust Level 3
                </p>
              </div>
            </div>

            {/* The Verification Action */}
            <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-full ${isVerified ? "bg-emerald-500/20" : "bg-indigo-500/20"}`}
                >
                  <ShieldCheck
                    className={
                      isVerified ? "text-emerald-400" : "text-indigo-400"
                    }
                    size={32}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white">Live Integrity Check</h3>
                  <p className="text-xs text-slate-400">
                    Validate document signatures and stake status on IOTA.
                  </p>
                </div>
              </div>
              <button
                onClick={runIotaCheck}
                disabled={isVerifying || isVerified}
                className={`px-8 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                  isVerified
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-white text-slate-950 hover:bg-indigo-50"
                }`}
              >
                {isVerifying
                  ? "Querying Tangle..."
                  : isVerified
                    ? "Integrity Confirmed"
                    : "Verify Now"}
              </button>
            </div>

            {/* Detail Grid */}
            <div className="grid md:grid-cols-2 gap-12">
              <section>
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6">
                  Evidence Chain
                </h4>
                <div className="space-y-6">
                  <TimelineItem
                    date="Oct 24, 2025"
                    event="Business Registration Verified"
                    status="success"
                  />
                  <TimelineItem
                    date="Nov 12, 2025"
                    event="5,000 MIOTA Collateral Staked"
                    status="success"
                  />
                  <TimelineItem
                    date="Jan 05, 2026"
                    event="12 Successful Cross-border Deals"
                    status="success"
                  />
                </div>
              </section>

              <section className="bg-slate-950/50 p-6 rounded-2xl border border-white/5">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
                  Risk Assessment
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Slashing Risk</span>
                    <span className="text-emerald-400 font-bold italic text-xs">
                      LOW (STAKED)
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Entity Legitimacy</span>
                    <span className="text-white font-mono text-xs italic">
                      Confirmed by Auth-ID
                    </span>
                  </div>
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-amber-500 text-[10px] font-bold uppercase">
                      <ShieldAlert size={14} /> Fraud Protection Active
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                      In case of proven fraud, the 5,000 MIOTA stake is subject
                      to immediate redistribution.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="bg-slate-800/50 px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-slate-500 border-t border-white/5">
            <span>DID: did:iota:7zW1p...xR92</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 cursor-pointer hover:text-indigo-400 transition-colors">
                <ExternalLink size={12} /> View on Tangle Explorer
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component
const TimelineItem: React.FC<TimelineItemProps> = ({ date, event, status }) => (
  <div className="flex gap-4 relative">
    <div className="flex flex-col items-center">
      <div
        className={`w-2 h-2 rounded-full ${status === "success" ? "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" : "bg-slate-700"}`}
      />
      <div className="w-[1px] h-full bg-slate-800 mt-2" />
    </div>
    <div className="pb-6">
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
        {date}
      </p>
      <p className="text-sm font-medium text-white">{event}</p>
    </div>
  </div>
);

export default VerifierView;
