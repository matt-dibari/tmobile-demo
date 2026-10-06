import React, { useState } from 'react';
import type { ProjectData } from '../../types/presentation';
import { Sparkles, Play, RotateCcw, CheckCircle2, ArrowRight, MousePointer } from 'lucide-react';

import { sound } from '../../utils/sound';

interface Props {
  project: ProjectData;
}

export const InteractiveSimulatorView: React.FC<Props> = ({ project }) => {
  // Option A Simulation State
  const [legacyStep, setLegacyStep] = useState<number>(0);
  const [legacyClicks, setLegacyClicks] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<boolean>(false);
  const [pastedSap, setPastedSap] = useState<boolean>(false);
  const [approvedSnow, setApprovedSnow] = useState<boolean>(false);
  const [sentSlack, setSentSlack] = useState<boolean>(false);

  // Option B Simulation State
  const [geminiStatus, setGeminiStatus] = useState<'idle' | 'running' | 'synthesized' | 'dispatched'>('idle');
  const [geminiClicks, setGeminiClicks] = useState<number>(0);

  // Active sandbox view tab
  const [activeSandbox, setActiveSandbox] = useState<'both' | 'legacy' | 'gemini'>('both');

  // Legacy Step Handlers
  const handleCopySalesforce = () => {
    sound.playClick();
    setCopiedId(true);
    setLegacyClicks((c) => c + 1);
    setLegacyStep(1);
  };

  const handlePasteSap = () => {
    sound.playClick();
    if (!copiedId) return;
    setPastedSap(true);
    setLegacyClicks((c) => c + 1);
    setLegacyStep(2);
  };

  const handleApproveServiceNow = () => {
    sound.playClick();
    setApprovedSnow(true);
    setLegacyClicks((c) => c + 1);
    setLegacyStep(3);
  };

  const handleSendSlack = () => {
    sound.playClick();
    setSentSlack(true);
    setLegacyClicks((c) => c + 1);
    setLegacyStep(4);
    sound.playSuccess();
  };

  const handleResetLegacy = () => {
    sound.playClick();
    setLegacyStep(0);
    setLegacyClicks(0);
    setCopiedId(false);
    setPastedSap(false);
    setApprovedSnow(false);
    setSentSlack(false);
  };

  // Gemini Step Handlers
  const handleRunGemini = () => {
    sound.playClick();
    setGeminiClicks((c) => c + 1);
    setGeminiStatus('running');
    setTimeout(() => {
      setGeminiStatus('synthesized');
      sound.playSuccess();
    }, 900);
  };

  const handleDispatchGemini = () => {
    sound.playClick();
    setGeminiClicks((c) => c + 1);
    setGeminiStatus('dispatched');
    sound.playSuccess();
  };

  const handleResetGemini = () => {
    sound.playClick();
    setGeminiStatus('idle');
    setGeminiClicks(0);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.06]">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-widest uppercase text-cyan-400 font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              Interactive Workflow Benchmark
            </span>
            <span className="text-zinc-600 font-mono text-xs">/</span>
            <span className="text-xs font-mono text-zinc-400">Live Task Execution Simulation</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Workflow Simulator: Test The Difference Yourself
          </h1>

          <p className="text-sm text-zinc-400 font-normal leading-relaxed">
            Scenario: <strong>"Customer Escalation & Contract Renewal for Acme Corp Global"</strong>.
            Execute the same high-stakes operational workflow using the 4-portal status quo vs. Gemini Enterprise.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center bg-[#0d1017] p-1 rounded-xl border border-white/10 shrink-0 self-start md:self-end">
          <button
            onClick={() => {
              sound.playClick();
              setActiveSandbox('both');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeSandbox === 'both' ? 'bg-white/15 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Split Simulation
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveSandbox('legacy');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeSandbox === 'legacy' ? 'bg-rose-500/20 text-rose-300' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Option A Only
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveSandbox('gemini');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeSandbox === 'gemini' ? 'bg-cyan-500/20 text-cyan-300' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Option B Only
          </button>
        </div>
      </div>

      {/* Main Dual Playground */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* LEFT: LEGACY PORTAL RUNNER */}
        {(activeSandbox === 'both' || activeSandbox === 'legacy') && (
          <div className="rounded-2xl glass-panel p-6 border border-rose-500/20 space-y-6 glow-fragmented">
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-semibold">
                  Option A Simulator
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  The Multi-Portal Swivel-Chair Run
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-[11px] font-mono text-zinc-400 bg-black/40 px-2.5 py-1 rounded border border-white/5">
                  Clicks: <strong className="text-amber-300">{legacyClicks}</strong>
                </div>
                <button
                  onClick={handleResetLegacy}
                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
                  title="Reset legacy run"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Stepper Guide */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider">
                Follow The Portal Steps:
              </span>

              {/* Step 1: Salesforce */}
              <div
                className={`p-3.5 rounded-xl border transition-all ${
                  legacyStep === 0
                    ? 'bg-[#0f141f] border-sky-500/50 ring-1 ring-sky-500/30'
                    : copiedId
                    ? 'bg-black/30 border-white/5 opacity-70'
                    : 'bg-black/20 border-white/5 opacity-40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      Tab 1 · Salesforce
                    </span>
                    <span className="text-xs font-semibold text-white">Find Account ID</span>
                  </div>
                  {copiedId ? (
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> ID Copied
                    </span>
                  ) : (
                    <button
                      onClick={handleCopySalesforce}
                      className="text-xs px-3 py-1 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-medium flex items-center gap-1 shadow-sm"
                    >
                      <MousePointer className="w-3 h-3" />
                      <span>Copy "ACM-8892"</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Step 2: SAP S/4HANA */}
              <div
                className={`p-3.5 rounded-xl border transition-all ${
                  legacyStep === 1
                    ? 'bg-[#151214] border-amber-500/50 ring-1 ring-amber-500/30'
                    : pastedSap
                    ? 'bg-black/30 border-white/5 opacity-70'
                    : 'bg-black/20 border-white/5 opacity-40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      Tab 2 · SAP ERP
                    </span>
                    <span className="text-xs font-semibold text-white">Paste ID & Query Overages</span>
                  </div>
                  {pastedSap ? (
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Reconciled
                    </span>
                  ) : (
                    <button
                      onClick={handlePasteSap}
                      disabled={!copiedId}
                      className="text-xs px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-30 text-black font-semibold flex items-center gap-1 shadow-sm"
                    >
                      <MousePointer className="w-3 h-3" />
                      <span>Paste & Run Ledger</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Step 3: ServiceNow */}
              <div
                className={`p-3.5 rounded-xl border transition-all ${
                  legacyStep === 2
                    ? 'bg-[#0f1715] border-emerald-500/50 ring-1 ring-emerald-500/30'
                    : approvedSnow
                    ? 'bg-black/30 border-white/5 opacity-70'
                    : 'bg-black/20 border-white/5 opacity-40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Tab 3 · ServiceNow
                    </span>
                    <span className="text-xs font-semibold text-white">Submit VP SLA Exception</span>
                  </div>
                  {approvedSnow ? (
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> SLA Approved
                    </span>
                  ) : (
                    <button
                      onClick={handleApproveServiceNow}
                      disabled={!pastedSap}
                      className="text-xs px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-30 text-white font-medium flex items-center gap-1 shadow-sm"
                    >
                      <MousePointer className="w-3 h-3" />
                      <span>Approve Exception</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Step 4: Slack */}
              <div
                className={`p-3.5 rounded-xl border transition-all ${
                  legacyStep === 3
                    ? 'bg-[#18111c] border-purple-500/50 ring-1 ring-purple-500/30'
                    : sentSlack
                    ? 'bg-black/30 border-white/5 opacity-70'
                    : 'bg-black/20 border-white/5 opacity-40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      Tab 4 · Slack
                    </span>
                    <span className="text-xs font-semibold text-white">Notify Deal Desk & Account VP</span>
                  </div>
                  {sentSlack ? (
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Message Sent
                    </span>
                  ) : (
                    <button
                      onClick={handleSendSlack}
                      disabled={!approvedSnow}
                      className="text-xs px-3 py-1 rounded-lg bg-purple-500 hover:bg-purple-600 disabled:opacity-30 text-white font-medium flex items-center gap-1 shadow-sm"
                    >
                      <MousePointer className="w-3 h-3" />
                      <span>Post Notification</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Legacy Outcome Box */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-zinc-300">Legacy Workflow Score:</span>
                <span className="font-mono text-amber-300">
                  {sentSlack ? 'Finished with high friction' : `${4 - legacyStep} tabs remaining`}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-[11px] pt-1 border-t border-white/5">
                <div>
                  <span className="text-zinc-500 block">Switches:</span>
                  <span className="text-white font-mono font-medium">4 tabs</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Est. Time:</span>
                  <span className="text-rose-400 font-mono font-medium">18 mins</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Error Risk:</span>
                  <span className="text-amber-400 font-mono font-medium">High</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RIGHT: GEMINI UNIFIED RUNNER */}
        {(activeSandbox === 'both' || activeSandbox === 'gemini') && (
          <div className="rounded-2xl glass-panel-elevated p-6 border border-cyan-500/30 space-y-6 glow-gemini">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Option B Simulator
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  Gemini Enterprise Single-Window Run
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-[11px] font-mono text-cyan-300 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-500/30">
                  Clicks: <strong className="text-white">{geminiClicks}</strong>
                </div>
                <button
                  onClick={handleResetGemini}
                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
                  title="Reset Gemini run"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Prompt Window */}
            <div className="p-4 rounded-xl bg-[#080b12] border border-indigo-500/30 space-y-3">
              <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider block">
                Single Prompt Intent
              </span>
              <p className="text-xs font-mono text-zinc-200 bg-black/40 p-2.5 rounded-lg border border-white/5">
                "Cross-reference Acme Corp Salesforce renewal with SAP billing overages, apply rule DM-88 discount policy, and draft executive sign-off."
              </p>

              {geminiStatus === 'idle' && (
                <button
                  onClick={handleRunGemini}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white text-xs font-semibold shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Execute Headless Enterprise Query (1 Click)</span>
                </button>
              )}

              {geminiStatus === 'running' && (
                <div className="py-3 flex items-center justify-center gap-2 text-cyan-300 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>Orchestrating Salesforce, SAP, and ServiceNow in parallel (0.8s)...</span>
                </div>
              )}
            </div>

            {/* Gemini Synthesized Canvas */}
            {(geminiStatus === 'synthesized' || geminiStatus === 'dispatched') && (
              <div className="p-4 rounded-xl bg-indigo-950/20 border border-cyan-500/30 space-y-3 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Cross-System Synthesis Ready</span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    Fetched in 0.82s
                  </span>
                </div>

                <div className="text-xs text-zinc-300 bg-black/40 p-3 rounded-lg border border-white/5 space-y-1 font-sans">
                  <p>
                    <strong>Summary:</strong> Acme Corp ($490k ARR target). Disputed $34,800 overages credited against multi-year extension. SLA approval auto-granted per policy.
                  </p>
                </div>

                {geminiStatus === 'synthesized' ? (
                  <button
                    onClick={handleDispatchGemini}
                    className="w-full py-2.5 rounded-lg bg-white text-black hover:bg-zinc-200 text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Approve & Dispatch to All 3 Backends (1 Click)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Synchronized! SAP Ledger updated · Salesforce Stage updated · Slack notified</span>
                  </div>
                )}
              </div>
            )}

            {/* Gemini Outcome Box */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-zinc-300">Gemini Unified Score:</span>
                <span className="font-mono text-cyan-300">
                  {geminiStatus === 'dispatched' ? 'Completed Flawlessly' : 'Single Surface'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-[11px] pt-1 border-t border-white/5">
                <div>
                  <span className="text-zinc-500 block">Switches:</span>
                  <span className="text-cyan-300 font-mono font-medium">0 switches</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Est. Time:</span>
                  <span className="text-emerald-300 font-mono font-medium">45 secs</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Accuracy:</span>
                  <span className="text-cyan-300 font-mono font-medium">100% API Bound</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delta Scoreboard */}
      <div className="p-6 rounded-2xl glass-panel-elevated border border-white/10 flex flex-wrap items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block">
            Executive Velocity Takeaway
          </span>
          <h4 className="text-lg font-bold text-white mt-0.5">
            96% Reduction in Workflow Cycle Latency
          </h4>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            Employees don't want another software destination. They need a single ambient window that orchestrates the software they already have.
          </p>
        </div>

        <div className="flex items-center gap-6 font-mono text-right">
          <div>
            <span className="text-xs text-zinc-500 block">Total Clicks Saved</span>
            <span className="text-2xl font-bold text-cyan-300">~15 clicks</span>
          </div>
          <div className="h-10 w-[1px] bg-white/10" />
          <div>
            <span className="text-xs text-zinc-500 block">Time Reclaimed / Task</span>
            <span className="text-2xl font-bold text-emerald-400">17.5 mins</span>
          </div>
        </div>
      </div>
    </div>
  );
};
