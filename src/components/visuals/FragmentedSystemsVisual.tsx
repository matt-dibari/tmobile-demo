import React, { useState, useEffect } from 'react';
import { Copy, AlertCircle, RefreshCw, Key, Layers, Clock } from 'lucide-react';
import { sound } from '../../utils/sound';


interface Props {
  interactive?: boolean;
}

export const FragmentedSystemsVisual: React.FC<Props> = ({ interactive = true }) => {
  const [activeWindow, setActiveWindow] = useState<'salesforce' | 'sap' | 'servicenow' | 'slack'>('salesforce');
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [pastedStatus, setPastedStatus] = useState<string>('Unsynced');
  const [switchCount, setSwitchCount] = useState<number>(14);
  const [animatingStep, setAnimatingStep] = useState<number>(0);

  // Auto-cycle simulation flow if not manually interacting
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatingStep((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const handleSelectWindow = (id: 'salesforce' | 'sap' | 'servicenow' | 'slack') => {
    sound.playClick();
    setActiveWindow(id);
    setSwitchCount((c) => c + 1);
  };

  const handleCopy = (val: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setCopiedValue(val);
  };

  const handlePaste = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    if (copiedValue) {
      setPastedStatus('Synced (Manual)');
    }
  };

  return (
    <div className="relative w-full rounded-2xl glass-panel p-6 overflow-hidden border border-white/10 glow-fragmented">
      {/* Background radial gradient accent */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header telemetry / status strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/5 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-xs uppercase tracking-widest font-mono text-rose-400 font-semibold">
            Status Quo Architecture · 4 Disconnected Portals
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/5">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Context Switches:</span>
            <span className="text-amber-300 font-bold">{switchCount}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/5">
            <Clock className="w-3.5 h-3.5 text-rose-400" />
            <span>Time Spent:</span>
            <span className="text-rose-300 font-bold">14m 20s</span>
          </div>
        </div>
      </div>

      {/* Flow visualization notice */}
      <div className="flex items-center justify-between bg-rose-950/20 border border-rose-500/20 rounded-lg px-4 py-2.5 mb-6 text-xs text-rose-200">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>
            Human worker operates as the manual data shuttle between disparate browser tabs.
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-rose-300/80">
          <span>Flow:</span>
          <span className={animatingStep === 0 ? 'text-white font-bold underline' : ''}>CRM</span>
          <span>→</span>
          <span className={animatingStep === 1 ? 'text-white font-bold underline' : ''}>SAP</span>
          <span>→</span>
          <span className={animatingStep === 2 ? 'text-white font-bold underline' : ''}>ServiceNow</span>
          <span>→</span>
          <span className={animatingStep === 3 ? 'text-white font-bold underline' : ''}>Slack</span>
        </div>
      </div>

      {/* Grid of Simulated Browser Windows */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        {/* Animated Laser connector between windows */}
        <div className="hidden md:block absolute inset-0 pointer-events-none z-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path
              d="M 240 120 Q 300 200 480 140 T 360 280"
              fill="none"
              stroke="url(#laserGrad)"
              strokeWidth="2"
              className="animate-pulse-flow opacity-60"
            />
          </svg>
        </div>

        {/* WINDOW 1: Salesforce CRM */}
        <div
          onClick={() => interactive && handleSelectWindow('salesforce')}
          className={`group rounded-xl border transition-all duration-300 p-4 relative cursor-pointer ${
            activeWindow === 'salesforce' || animatingStep === 0
              ? 'bg-[#0f141f] border-sky-500/50 shadow-lg shadow-sky-500/10 ring-1 ring-sky-500/30'
              : 'bg-[#0a0d14]/80 border-white/5 hover:border-white/20'
          }`}
        >
          {/* Fake Browser Chrome */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <span className="text-[11px] font-mono text-zinc-400 truncate max-w-[130px]">
                salesforce.lightning.com
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
              CRM Portal
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-zinc-400 font-mono">Account Record</p>
                <h4 className="text-sm font-semibold text-white">Acme Corp Global</h4>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Renewal Pending
              </span>
            </div>

            <div className="bg-black/40 p-2.5 rounded-lg border border-white/5 flex items-center justify-between text-xs">
              <div>
                <span className="text-zinc-500 text-[10px] block">CUST_ID (Required for SAP)</span>
                <span className="font-mono text-white tracking-wider">ACM-88921-X</span>
              </div>
              <button
                onClick={(e) => handleCopy('ACM-88921-X', e)}
                className="flex items-center gap-1 text-[11px] px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Copy to clipboard"
              >
                <Copy className="w-3 h-3 text-sky-400" />
                <span>{copiedValue === 'ACM-88921-X' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-white/[0.02] p-2 rounded border border-white/5">
                <span className="text-zinc-500 block">Current ARR</span>
                <span className="text-white font-mono font-medium">$420,000</span>
              </div>
              <div className="bg-white/[0.02] p-2 rounded border border-white/5">
                <span className="text-zinc-500 block">Renewal Target</span>
                <span className="text-sky-300 font-mono font-medium">$490,000 (+16%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* WINDOW 2: SAP S/4HANA ERP */}
        <div
          onClick={() => interactive && handleSelectWindow('sap')}
          className={`group rounded-xl border transition-all duration-300 p-4 relative cursor-pointer ${
            activeWindow === 'sap' || animatingStep === 1
              ? 'bg-[#151214] border-amber-500/50 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30'
              : 'bg-[#0a0d14]/80 border-white/5 hover:border-white/20'
          }`}
        >
          {/* Fake Browser Chrome */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <span className="text-[11px] font-mono text-zinc-400 truncate max-w-[130px]">
                sap-fiori.corp.internal:8443
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              ERP Financials
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-zinc-400 font-mono">Ledger Query</p>
                <h4 className="text-sm font-semibold text-white">Billing & Unposted Credits</h4>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-amber-400">
                <Key className="w-3 h-3" />
                <span className="text-[10px]">Session: 4m left</span>
              </div>
            </div>

            <div className="bg-black/40 p-2.5 rounded-lg border border-white/5 flex items-center justify-between text-xs">
              <div className="w-full">
                <span className="text-zinc-500 text-[10px] block">Customer Match</span>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="font-mono text-zinc-300">
                    {copiedValue ? copiedValue : 'Querying ID...'}
                  </span>
                  <button
                    onClick={handlePaste}
                    className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30"
                  >
                    Paste ID
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-rose-950/30 border border-rose-500/30 p-2 rounded flex items-center justify-between text-[11px]">
              <span className="text-rose-300">Unbilled Overages Flagged:</span>
              <span className="font-mono font-bold text-rose-400">$34,800 (Disputed)</span>
            </div>
          </div>
        </div>

        {/* WINDOW 3: ServiceNow Ticketing */}
        <div
          onClick={() => interactive && handleSelectWindow('servicenow')}
          className={`group rounded-xl border transition-all duration-300 p-4 relative cursor-pointer ${
            activeWindow === 'servicenow' || animatingStep === 2
              ? 'bg-[#0f1715] border-emerald-500/50 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/30'
              : 'bg-[#0a0d14]/80 border-white/5 hover:border-white/20'
          }`}
        >
          {/* Fake Browser Chrome */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <span className="text-[11px] font-mono text-zinc-400 truncate max-w-[130px]">
                enterprise.service-now.com
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              IT & Approvals
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-zinc-400 font-mono">REQ-0091823</p>
                <h4 className="text-sm font-semibold text-white">VP Discount Authorization</h4>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Pending SLA
              </span>
            </div>

            <p className="text-xs text-zinc-400 line-clamp-2">
              Requires manual cross-reference to SAP contract #8812 and Salesforce opportunity stage 4.
            </p>

            <div className="flex items-center justify-between text-[11px] pt-1 text-zinc-400 border-t border-white/5">
              <span>Assigned: Deal Desk Team</span>
              <span className="text-amber-400 font-mono">Wait Time: 4.2h</span>
            </div>
          </div>
        </div>

        {/* WINDOW 4: Slack / Teams Chat */}
        <div
          onClick={() => interactive && handleSelectWindow('slack')}
          className={`group rounded-xl border transition-all duration-300 p-4 relative cursor-pointer ${
            activeWindow === 'slack' || animatingStep === 3
              ? 'bg-[#18111c] border-purple-500/50 shadow-lg shadow-purple-500/10 ring-1 ring-purple-500/30'
              : 'bg-[#0a0d14]/80 border-white/5 hover:border-white/20'
          }`}
        >
          {/* Fake Browser Chrome */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <span className="text-[11px] font-mono text-zinc-400 truncate max-w-[130px]">
                app.slack.com/client
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
              #deal-desk-urgent
            </span>
          </div>

          <div className="space-y-2">
            <div className="bg-black/40 p-2.5 rounded border border-white/5 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-purple-300">@sarah.finance</span>
                <span className="text-[10px] text-zinc-500 font-mono">11:42 AM</span>
              </div>
              <p className="text-zinc-300 text-[11px]">
                "Did anyone update the SAP record for Acme? Their Salesforce still shows old pricing!"
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
              <span className="text-rose-400">Status: {pastedStatus}</span>
              <span className="text-zinc-400">3 unread mentions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Swivel-Chair Summary */}
      <div className="mt-5 p-3.5 rounded-xl bg-black/40 border border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-zinc-300">
          <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>
            <strong>Friction Vector:</strong> 4 separate logins · 3 clipboard operations · high cognitive overhead
          </span>
        </div>
        <div className="text-[11px] font-mono text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded border border-rose-500/20">
          Swivel-Chair Tax: ~22% productive loss
        </div>
      </div>
    </div>
  );
};
