import React, { useState } from "react";
import {
  ShieldCheck,
  LayoutDashboard,
  FileText,
  Coins,
  History,
  Share2,
  CheckCircle,
  ArrowUpRight,
  Star,
  Link as LinkIcon,
  LogOut,
} from "lucide-react";

interface DashboardProps {
  onLogout: () => void;
}

// Sub-component Interfaces
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

interface ActionCardProps {
  title: string;
  star: string;
  description: string;
  active: boolean;
  children: React.ReactNode;
  isConcept?: boolean;
}

const CompanyDashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  // Explicitly type the stars state
  const [stars, setStars] = useState<boolean[]>([true, false, false, false]);
  const [isStaking, setIsStaking] = useState<boolean>(false);
  const [stakeAmount, setStakeAmount] = useState<number>(5000);

  const handleStake = () => {
    setIsStaking(true);
    setTimeout(() => {
      const newStars = [...stars];
      newStars[1] = true; // Activate Star 2 (Staked)
      setStars(newStars);
      setIsStaking(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/5 bg-slate-900/50 hidden md:flex flex-col">
        <div
          className="p-6 flex items-center gap-2 border-b border-white/5 cursor-pointer hover:bg-white/5"
          onClick={onLogout}
        >
          <div className="bg-indigo-600 p-1 rounded-lg">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-white tracking-tight">
            TrustBridge
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavItem
            icon={<LayoutDashboard size={18} />}
            label="Overview"
            active
          />
          <NavItem icon={<FileText size={18} />} label="Credentials" />
          <NavItem icon={<Coins size={18} />} label="Staking" />
          <NavItem icon={<History size={18} />} label="Deal History" />
        </nav>

        <div className="p-4 mt-auto border-t border-white/5 space-y-4">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/5 rounded-xl transition-all group cursor-pointer"
          >
            <LogOut
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-sm font-bold">Log Out</span>
          </button>

          <div className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20">
            <p className="text-[10px] uppercase font-bold text-indigo-400 mb-1 tracking-widest">
              Connected Wallet
            </p>
            <p className="text-xs font-mono text-slate-300 truncate">
              0x71C...a342
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-md sticky top-0 z-10">
          <h2 className="font-bold text-white">
            Trust Profile: Acme Global Labs
          </h2>
          <div className="flex gap-4 items-center">
            <div className="flex -space-x-1">
              {[0, 1, 2, 3].map((i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${stars[i] ? "text-indigo-400 fill-indigo-400" : "text-slate-700"}`}
                />
              ))}
            </div>
            <button className="text-xs font-bold bg-white text-slate-950 px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-slate-200 transition-colors">
              <Share2 size={14} /> Share Profile
            </button>
          </div>
        </header>

        <div className="p-8 max-w-5xl mx-auto space-y-8">
          {/* Trust Score Banner */}
          <section className="bg-gradient-to-r from-indigo-900/40 to-slate-900 border border-indigo-500/20 rounded-2xl p-8 flex justify-between items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck size={120} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Build Your Trust Record
              </h3>
              <p className="text-slate-400 max-w-md text-sm leading-relaxed">
                Every star you earn is anchored to the IOTA Tangle, creating an
                immutable proof of your business legitimacy.
              </p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-black text-white">
                Level {stars.filter(Boolean).length}
              </p>
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                Active Star Rating
              </p>
            </div>
          </section>

          {/* Action Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <ActionCard
              title="Verified Identity"
              star="1"
              active={stars[0]}
              description="Upload Incorporation Documents and Business ID for Attester review."
            >
              <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-3">
                <CheckCircle className="text-emerald-400" size={18} />
                <span className="text-xs font-medium text-emerald-400">
                  KYB Documents Verified by Global-ID
                </span>
              </div>
            </ActionCard>

            <ActionCard
              title="Staked Reputation"
              star="2"
              active={stars[1]}
              description="Lock tokens as economic collateral. If fraud is proven, your stake is slashed."
            >
              {!stars[1] ? (
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Amount to Stake</span>
                    <span className="text-white font-mono">
                      {stakeAmount} MIOTA
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="1000"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <button
                    onClick={handleStake}
                    disabled={isStaking}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-all disabled:opacity-50"
                  >
                    {isStaking ? "Anchoring on IOTA..." : "Commit Stake"}
                  </button>
                </div>
              ) : (
                <div className="mt-4 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex justify-between items-center">
                  <div className="flex items-center gap-3 text-indigo-400">
                    <Coins size={18} />
                    <span className="text-xs font-bold uppercase tracking-tight">
                      Active Stake: {stakeAmount} MIOTA
                    </span>
                  </div>
                  <button className="text-[10px] font-bold text-slate-500 hover:text-white uppercase">
                    Manage
                  </button>
                </div>
              )}
            </ActionCard>

            <ActionCard
              title="Proven History"
              star="3"
              active={stars[2]}
              description="Import your completed deal history to prove your reliability on-chain."
            >
              <button className="mt-4 w-full py-2 border border-white/10 hover:border-white/20 text-slate-300 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                Connect Settlement Engine <ArrowUpRight size={14} />
              </button>
            </ActionCard>

            <ActionCard
              title="Social Vouchers"
              star="4"
              active={stars[3]}
              description="Get trusted partners to sign a voucher for your business profile."
              isConcept
            >
              <div className="mt-4 opacity-50 cursor-not-allowed">
                <div className="flex items-center gap-2 text-xs text-indigo-300 font-bold mb-3 italic">
                  <LinkIcon size={14} /> Request vouch from partner...
                </div>
                <div className="h-2 bg-slate-800 rounded-full w-full"></div>
              </div>
            </ActionCard>
          </div>

          {/* Real-time Integrity Feed */}
          <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Real-time Integrity Feed (IOTA Tangle)
            </h4>
            <div className="font-mono text-[10px] space-y-2">
              <p className="text-slate-500">
                [ 14:20:01 ]{" "}
                <span className="text-white font-bold">MSG_TYPE:</span>{" "}
                ANCHOR_PROFILE_METADATA{" "}
                <span className="text-indigo-400 italic">0x72e...9a2</span>
              </p>
              {stars[1] && (
                <p className="text-slate-500">
                  [ 14:22:10 ]{" "}
                  <span className="text-white font-bold">MSG_TYPE:</span>{" "}
                  STAKE_LOCK_EVENT{" "}
                  <span className="text-indigo-400 italic text-[9px]">
                    Confirmed on Tangle
                  </span>
                </p>
              )}
              {isStaking && (
                <p className="text-indigo-400 animate-pulse">
                  [ JUST NOW ] SENDING STAKE_LOCK_EVENT TO TANGLE...
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Sub-components (with TypeScript) ---

const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false }) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-colors ${
        active
          ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20"
          : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
      }`}
    >
      {icon}
      <span className="text-sm font-bold">{label}</span>
    </div>
  );
};

const ActionCard: React.FC<ActionCardProps> = ({
  title,
  star,
  description,
  active,
  children,
  isConcept = false,
}) => {
  return (
    <div
      className={`p-6 rounded-2xl border transition-all ${
        active
          ? "bg-slate-900/80 border-white/10"
          : "bg-slate-900/40 border-dashed border-white/5 grayscale"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                active
                  ? "bg-indigo-500 text-white"
                  : "bg-slate-800 text-slate-500"
              }`}
            >
              STAR {star}
            </span>
            {isConcept && (
              <span className="text-[9px] font-bold text-indigo-300 uppercase">
                Concept
              </span>
            )}
          </div>
          <h4 className="text-lg font-bold text-white tracking-tight">
            {title}
          </h4>
        </div>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center border ${
            active
              ? "border-indigo-500 text-indigo-400"
              : "border-slate-800 text-slate-700"
          }`}
        >
          <Star size={16} fill={active ? "currentColor" : "none"} />
        </div>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed mb-4">
        {description}
      </p>
      {children}
    </div>
  );
};

export default CompanyDashboard;
