import React, { useState, useEffect } from "react";
import {
  Coins,
  Lock,
  TrendingUp,
  ShieldCheck,
  ExternalLink,
  ArrowUpRight,
  Wallet,
  Clock,
} from "lucide-react";

interface StakingPageProps {
  isStaked: boolean;
  onStake: () => void;
  isStaking: boolean;
}

const FIXED_STAKE = 100_000; // 100,000 IOTA
const EUR_VALUE = 5_000; // ~€5,000
const APY = 6.5; // 6.5% annual yield
const TRUSTBRIDGE_WALLET = "0xTB89...f2a1";

const StakingPage: React.FC<StakingPageProps> = ({
  isStaked,
  onStake,
  isStaking,
}) => {
  // Simulate real-time interest accumulation
  const [accumulatedInterest, setAccumulatedInterest] = useState(0);
  const [daysSinceStake] = useState(42); // Simulated: staked 42 days ago

  useEffect(() => {
    if (!isStaked) return;

    // Calculate base interest for 42 days
    const dailyRate = APY / 365 / 100;
    const baseInterest = FIXED_STAKE * dailyRate * daysSinceStake;
    setAccumulatedInterest(baseInterest);

    // Animate real-time accumulation
    const interval = setInterval(() => {
      setAccumulatedInterest((prev) => prev + FIXED_STAKE * dailyRate / 86400);
    }, 1000);

    return () => clearInterval(interval);
  }, [isStaked, daysSinceStake]);

  const totalValue = FIXED_STAKE + accumulatedInterest;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">Staking</h3>
        <p className="text-sm text-slate-400 max-w-lg">
          Stake 100,000 IOTA (~€5,000) as economic collateral to earn the ★★
          Staked star. Your tokens are held in the TrustBridge escrow wallet and
          accumulate interest over time.
        </p>
      </div>

      {isStaked ? (
        <>
          {/* Active Stake Overview */}
          <div className="bg-gradient-to-r from-indigo-900/40 to-slate-900 border border-indigo-500/20 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Lock size={120} className="text-white" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Staked Amount
                </p>
                <p className="text-3xl font-black text-white">
                  {FIXED_STAKE.toLocaleString()}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  IOTA (~€{EUR_VALUE.toLocaleString()})
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Accumulated Interest
                </p>
                <p className="text-3xl font-black text-emerald-400">
                  +{accumulatedInterest.toFixed(2)}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  IOTA ({APY}% APY)
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Total Value
                </p>
                <p className="text-3xl font-black text-white">
                  {totalValue.toFixed(2)}
                </p>
                <p className="text-xs text-indigo-400 mt-1 flex items-center gap-1">
                  <TrendingUp size={12} />
                  Growing in real-time
                </p>
              </div>
            </div>
          </div>

          {/* Wallet Details */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* TrustBridge Escrow Wallet */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <Wallet className="text-indigo-400" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    TrustBridge Escrow Wallet
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Your stake is held securely here
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Wallet Address</span>
                  <span className="font-mono text-slate-300">
                    {TRUSTBRIDGE_WALLET}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Your Stake</span>
                  <span className="font-mono text-white font-bold">
                    {FIXED_STAKE.toLocaleString()} IOTA
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Interest Earned</span>
                  <span className="font-mono text-emerald-400">
                    +{accumulatedInterest.toFixed(4)} IOTA
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Annual Rate</span>
                  <span className="font-mono text-indigo-400">{APY}% APY</span>
                </div>
                <div className="pt-3 border-t border-white/5">
                  <a
                    href="https://explorer.iota.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[10px] text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-wider"
                  >
                    <ExternalLink size={10} /> View on IOTA Explorer
                  </a>
                </div>
              </div>
            </div>

            {/* Staking Terms */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <ShieldCheck className="text-amber-400" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Staking Terms
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Economic honesty mechanism
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-400 leading-relaxed">
                <div className="flex gap-3">
                  <div className="w-1 shrink-0 bg-indigo-500/30 rounded-full" />
                  <p>
                    <span className="text-white font-bold">Fixed stake:</span>{" "}
                    100,000 IOTA (~€5,000) locked as collateral.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1 shrink-0 bg-emerald-500/30 rounded-full" />
                  <p>
                    <span className="text-white font-bold">Interest:</span>{" "}
                    {APY}% annual yield while your stake is active and your
                    profile is in good standing.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1 shrink-0 bg-rose-500/30 rounded-full" />
                  <p>
                    <span className="text-white font-bold">Slashing:</span> If
                    fraud is proven, your entire stake (including interest) is
                    confiscated and redistributed.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1 shrink-0 bg-amber-500/30 rounded-full" />
                  <p>
                    <span className="text-white font-bold">Withdrawal:</span>{" "}
                    You may unstake at any time, but you lose the ★★ Staked star
                    and your interest resets.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
              Staking History
            </h4>
            <div className="space-y-3">
              <HistoryRow
                date="Mar 15, 2026"
                event="Stake Deposited"
                amount={`+${FIXED_STAKE.toLocaleString()} IOTA`}
                type="deposit"
              />
              <HistoryRow
                date="Ongoing"
                event="Interest Accruing"
                amount={`+${accumulatedInterest.toFixed(2)} IOTA`}
                type="interest"
              />
            </div>
          </div>
        </>
      ) : (
        /* Not yet staked */
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-8">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Coins className="text-indigo-400" size={32} />
            </div>

            <h3 className="text-xl font-bold text-white mb-3">
              Stake to Earn Trust
            </h3>
            <p className="text-sm text-slate-400 mb-8 leading-relaxed">
              Lock 100,000 IOTA tokens (~€5,000) as economic collateral. This
              proves you have skin in the game and earns you the ★★ Staked
              reputation star. Your tokens accumulate {APY}% APY while staked.
            </p>

            <div className="bg-slate-950 border border-white/5 rounded-xl p-4 mb-6 space-y-2 text-left">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Stake Amount</span>
                <span className="text-white font-mono font-bold">
                  {FIXED_STAKE.toLocaleString()} IOTA
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">EUR Value</span>
                <span className="text-slate-300 font-mono">
                  ~€{EUR_VALUE.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Annual Yield</span>
                <span className="text-emerald-400 font-mono">{APY}% APY</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Escrow Wallet</span>
                <span className="text-slate-400 font-mono text-[10px]">
                  {TRUSTBRIDGE_WALLET}
                </span>
              </div>
            </div>

            <button
              onClick={onStake}
              disabled={isStaking}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isStaking ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Anchoring on IOTA...
                </>
              ) : (
                <>
                  <Lock size={16} /> Commit{" "}
                  {FIXED_STAKE.toLocaleString()} IOTA Stake
                </>
              )}
            </button>

            <p className="text-[10px] text-slate-600 mt-3">
              By staking, you agree to the slashing terms. Fraudulent behavior
              results in full stake confiscation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Sub-component
const HistoryRow: React.FC<{
  date: string;
  event: string;
  amount: string;
  type: "deposit" | "interest" | "slash";
}> = ({ date, event, amount, type }) => (
  <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
    <div className="flex items-center gap-3">
      <div
        className={`p-1.5 rounded-lg ${
          type === "deposit"
            ? "bg-indigo-500/10"
            : type === "interest"
              ? "bg-emerald-500/10"
              : "bg-rose-500/10"
        }`}
      >
        {type === "deposit" ? (
          <ArrowUpRight className="text-indigo-400" size={14} />
        ) : type === "interest" ? (
          <TrendingUp className="text-emerald-400" size={14} />
        ) : (
          <Clock className="text-rose-400" size={14} />
        )}
      </div>
      <div>
        <p className="text-xs font-bold text-white">{event}</p>
        <p className="text-[10px] text-slate-500">{date}</p>
      </div>
    </div>
    <span
      className={`text-xs font-mono font-bold ${
        type === "slash" ? "text-rose-400" : "text-emerald-400"
      }`}
    >
      {amount}
    </span>
  </div>
);

export default StakingPage;
