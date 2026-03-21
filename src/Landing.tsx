import React from "react";
import {
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  Globe,
  Star,
  CheckCircle,
  Building2,
} from "lucide-react";

interface LandingProps {
  onStart: () => void;
  onSearchCompany: () => void; // Added this prop
}
import logoUrl from "./assets/logo-icon-only.svg";

const TrustBridgeLanding: React.FC<LandingProps> = ({
  onStart,
  onSearchCompany,
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30 font-sans">
      {/* Navigation */}
      <nav className="fixed w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoUrl} alt="Logo" className="w-10 h-10" />

            <span className="text-xl font-bold tracking-tight text-white italic">
              TrustBridge
            </span>
          </div>
          <button
            onClick={onStart}
            className="bg-white text-slate-950 px-5 py-2 rounded-full text-sm font-bold hover:bg-indigo-50 transition-colors cursor-pointer"
          >
            Build Profile
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-8">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
              Portable Trust Layer
            </div>
            <h1 className="text-6xl font-black text-white leading-[1.1] mb-6">
              B2B Trust, <span className="text-indigo-500">Verified</span> in
              Seconds.
            </h1>
            <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed">
              Skip weeks of manual KYB. TrustBridge lets startups and
              crypto-native companies build reusable, evidence-backed trust
              profiles anchored on IOTA.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold transition-transform active:scale-95 cursor-pointer"
                onClick={onStart}
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </button>

              {/* --- NAVIGATION TRIGGER HERE --- */}
              <button
                onClick={onSearchCompany}
                className="flex items-center gap-2 bg-slate-900 border border-white/10 hover:border-white/20 text-white px-8 py-4 rounded-xl font-bold transition-colors cursor-pointer"
              >
                Explore Directory
              </button>
            </div>
          </div>

          {/* Trust Card Preview (Points to the Verifier UI) */}
          <div
            onClick={onSearchCompany}
            className="relative group cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-slate-900 border border-white/10 p-8 rounded-3xl shadow-2xl">
              <div className="flex justify-between items-start mb-10">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-white/5">
                    <Building2 className="text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      Acme Global Labs
                    </h3>
                    <p className="text-slate-500 text-sm flex items-center gap-1">
                      <Globe className="w-3 h-3" /> acme-labs.io
                    </p>
                  </div>
                </div>
                <div className="bg-emerald-500/10 text-emerald-400 text-[10px] font-black px-2 py-1 rounded border border-emerald-500/20 uppercase">
                  Live Status
                </div>
              </div>

              <div className="space-y-4">
                <TrustStarItem
                  level={1}
                  label="Verified"
                  detail="KYB Documents Approved"
                  value="Auth: Global-Reg"
                  active
                />
                <TrustStarItem
                  level={2}
                  label="Staked"
                  detail="Skin in the Game"
                  value="12,500 MIOTA"
                  active
                />
                <div className="text-center py-2">
                  <span className="text-xs text-slate-500 font-bold animate-pulse italic">
                    Click card to verify on-chain...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logic/Value Section (Static) */}
      <section className="py-24 px-6 border-t border-white/5 bg-slate-900/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center md:text-left">
          <FeatureItem
            icon={<Zap className="text-indigo-400" />}
            title="Frictionless Flow"
            desc="Companies create a profile once. Verifiers check it instantly."
          />
          <FeatureItem
            icon={<Lock className="text-amber-400" />}
            title="Economic Honesty"
            desc="Fraud leads to slashing. Honesty is the only rational choice."
          />
          <FeatureItem
            icon={<CheckCircle className="text-cyan-400" />}
            title="Immutable Evidence"
            desc="Anchored on IOTA Tangle for zero-gas integrity."
          />
        </div>
      </section>
    </div>
  );
};

// --- Sub-components ---

const TrustStarItem: React.FC<{
  level: number;
  label: string;
  detail: string;
  value: string;
  active?: boolean;
}> = ({ level, label, detail, value, active }) => (
  <div
    className={`flex items-center gap-4 p-4 rounded-2xl border ${active ? "bg-white/5 border-white/10" : "opacity-40"}`}
  >
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${active ? "border-indigo-500 bg-indigo-600/20" : "border-slate-800"}`}
    >
      <Star
        className={`w-5 h-5 ${active ? "text-indigo-400 fill-indigo-400" : "text-slate-700"}`}
      />
    </div>
    <div className="flex-1 text-left">
      <span className="text-[10px] font-black text-slate-500 uppercase">
        Level 0{level}
      </span>
      <h4 className="font-bold text-white text-sm">{label}</h4>
    </div>
    <div className="text-right font-mono text-xs text-indigo-400">{value}</div>
  </div>
);

const FeatureItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
}> = ({ icon, title, desc }) => (
  <div className="space-y-4">
    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mx-auto md:mx-0">
      {icon}
    </div>
    <h4 className="text-xl font-bold text-white">{title}</h4>
    <p className="text-slate-400 text-sm">{desc}</p>
  </div>
);

export default TrustBridgeLanding;
