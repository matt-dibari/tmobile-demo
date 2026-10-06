import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Zap, Database, ArrowUpRight, Cpu, Play } from 'lucide-react';
import { sound } from '../../utils/sound';

interface Props {
  interactive?: boolean;
}

export const GeminiEnterpriseVisual: React.FC<Props> = ({ interactive = true }) => {
  const [activeIntent, setActiveIntent] = useState<string>(
    'Synthesize Acme Corp renewal from Salesforce, reconcile disputed SAP overages, and generate executive proposal.'
  );
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [actionCompleted, setActionCompleted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'synthesized' | 'audit' | 'connectors'>('synthesized');

  const intentPresets = [
    {
      label: 'Acme Corp Renewal & Billing Sync',
      prompt: 'Synthesize Acme Corp renewal from Salesforce, reconcile disputed SAP overages, and generate executive proposal.',
    },
    {
      label: 'Cross-System VIP Escalation',
      prompt: 'Check ServiceNow SLA breaches for Priority 1 accounts, map to Q4 revenue impact, and notify executive sponsors.',
    },
    {
      label: 'Instant Procurement Authorization',
      prompt: 'Validate SAP inventory vs purchase order PO-991, cross-reference contract pricing, and route for automated release.',
    },
  ];

  const handleSelectPreset = (preset: typeof intentPresets[0]) => {
    sound.playClick();
    setActiveIntent(preset.prompt);
    setActionCompleted(false);
  };

  const handleExecute = () => {
    sound.playClick();
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setActionCompleted(true);
      sound.playSuccess();
    }, 1200);
  };

  return (
    <div className="relative w-full rounded-2xl glass-panel-elevated p-6 overflow-hidden border border-indigo-500/20 glow-gemini">
      {/* Background ambient light */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10 mb-6">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1px]">
            <div className="w-full h-full bg-[#090b10] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-mono text-cyan-300 font-semibold">
                Gemini Enterprise · Unified Surface
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Live Orchestration
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
              Single Ambient Window · Headless Enterprise Integrations
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>IAM Grounded · Zero Retention</span>
          </div>
          <div className="flex items-center gap-1.5 bg-indigo-500/10 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/20">
            <Zap className="w-3.5 h-3.5" />
            <span>Latency: 0.8s</span>
          </div>
        </div>
      </div>

      {/* Ambient Intent Bar */}
      <div className="mb-6 relative">
        <div className="relative rounded-xl bg-[#090c14] border border-indigo-500/30 p-3 shadow-inner focus-within:border-cyan-400/60 transition-colors">
          <div className="flex items-start gap-3">
            <div className="mt-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <div className="flex-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Ambient Intent & Cross-System Query
              </label>
              <p className="text-sm font-medium text-white tracking-wide">
                {activeIntent}
              </p>
            </div>
            {interactive && (
              <button
                onClick={handleExecute}
                disabled={isExecuting}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white text-xs font-semibold shadow-md shadow-indigo-500/25 transition-all shrink-0 active:scale-95 disabled:opacity-50"
              >
                {isExecuting ? (
                  <>
                    <Cpu className="w-3.5 h-3.5 animate-spin" />
                    <span>Orchestrating...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Query</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Preset Prompt Pills */}
        {interactive && (
          <div className="flex flex-wrap items-center gap-2 mt-2.5">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Try Scenario:</span>
            {intentPresets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(p)}
                className={`text-[11px] font-mono px-2.5 py-1 rounded-md border transition-all ${
                  activeIntent === p.prompt
                    ? 'bg-cyan-500/20 text-cyan-200 border-cyan-500/40'
                    : 'bg-white/[0.02] text-zinc-400 border-white/5 hover:border-white/20 hover:text-zinc-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Headless Connector Matrix Ribbon */}
      <div className="mb-6 p-3 rounded-xl bg-black/50 border border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-zinc-400 font-mono text-[11px]">
          <Database className="w-3.5 h-3.5 text-cyan-400" />
          <span>Headless Real-Time Connectors:</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span>Salesforce CRM (API v59.0)</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>SAP S/4HANA (OData v4)</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ServiceNow (REST Table API)</span>
          </div>
        </div>
      </div>

      {/* Synthesized Cross-System Canvas */}
      <div className="rounded-xl border border-white/10 bg-[#0a0d14]/90 p-5 space-y-4">
        {/* Sub-Tabs */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('synthesized');
              }}
              className={`text-xs font-medium pb-1 border-b-2 transition-all ${
                activeTab === 'synthesized'
                  ? 'border-cyan-400 text-white'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Synthesized Intelligence
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('audit');
              }}
              className={`text-xs font-medium pb-1 border-b-2 transition-all ${
                activeTab === 'audit'
                  ? 'border-cyan-400 text-white'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Security & Audit Trace
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-300 bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-500/20">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Multi-Source Harmonized</span>
          </div>
        </div>

        {activeTab === 'synthesized' ? (
          <div className="space-y-4">
            {/* Top Cards: CRM + ERP live values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                  Salesforce Pipeline
                </span>
                <span className="text-base font-semibold text-white font-mono">$490,000</span>
                <span className="text-[10px] text-emerald-400 block mt-0.5">
                  Target ARR (+16% Expansion)
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                  SAP Reconciled Billing
                </span>
                <span className="text-base font-semibold text-amber-300 font-mono">$34,800</span>
                <span className="text-[10px] text-zinc-400 block mt-0.5">
                  Dispute auto-waived per VP policy
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                  ServiceNow SLA Status
                </span>
                <span className="text-base font-semibold text-emerald-400 font-mono">Approved</span>
                <span className="text-[10px] text-zinc-400 block mt-0.5">
                  Rule #104 pre-authorized
                </span>
              </div>
            </div>

            {/* Synthesized Briefing Box */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/30 to-cyan-950/20 border border-indigo-500/20 text-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  Unified Action Summary · Acme Corp Q3
                </h4>
                <span className="text-[10px] font-mono text-zinc-400">Execution ready</span>
              </div>

              <p className="text-zinc-300 leading-relaxed">
                Gemini cross-referenced the Salesforce renewal opportunity with the SAP unbilled overage dispute. By applying corporate discount matrix policy (rule DM-88), the $34,800 billing friction is consolidated into a 2-year enterprise commitment at $475k ARR.
              </p>

              <div className="flex flex-wrap items-center justify-between pt-2 border-t border-white/5 gap-2">
                <div className="text-[11px] text-zinc-400 font-mono">
                  Target: <strong className="text-white">Contract #CT-8891-2026</strong> · Net Margin: <strong className="text-emerald-300">+28.4%</strong>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExecute}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      actionCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-white text-black hover:bg-zinc-200'
                    }`}
                  >
                    {actionCompleted ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Dispatched to SAP & CRM</span>
                      </>
                    ) : (
                      <>
                        <span>Approve & Sync Both Systems</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Audit Trace View */
          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 rounded bg-black/40 border border-white/5 flex items-center justify-between">
              <span className="text-zinc-400">0.12s · IAM Auth verification via Okta SSO</span>
              <span className="text-emerald-400">SUCCESS</span>
            </div>
            <div className="p-2.5 rounded bg-black/40 border border-white/5 flex items-center justify-between">
              <span className="text-zinc-400">0.34s · Salesforce Opportunity read (ID: 0068Y0000)</span>
              <span className="text-emerald-400">200 OK (5 fields)</span>
            </div>
            <div className="p-2.5 rounded bg-black/40 border border-white/5 flex items-center justify-between">
              <span className="text-zinc-400">0.51s · SAP S/4HANA OData customer ledger query</span>
              <span className="text-emerald-400">200 OK (Matched ID)</span>
            </div>
            <div className="p-2.5 rounded bg-black/40 border border-white/5 flex items-center justify-between">
              <span className="text-zinc-400">0.78s · Gemini Enterprise Grounding & Policy Evaluation</span>
              <span className="text-cyan-400">Zero Retention Guaranteed</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Architectural Summary */}
      <div className="mt-5 p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-indigo-200">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>
            <strong>Unified Surface Advantage:</strong> 1 persistent window · Headless backend orchestration · Zero swivel-chair cognitive load
          </span>
        </div>
        <div className="text-[11px] font-mono text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
          Cycle Time: 45s vs 18min (96% drop)
        </div>
      </div>
    </div>
  );
};
