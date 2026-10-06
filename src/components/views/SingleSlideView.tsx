import React, { useState } from 'react';
import type { ProjectData } from '../../types/presentation';
import { FragmentedSystemsVisual } from '../visuals/FragmentedSystemsVisual';
import { GeminiEnterpriseVisual } from '../visuals/GeminiEnterpriseVisual';
import { ComparisonMatrix } from '../visuals/ComparisonMatrix';
import { Sparkles, Split } from 'lucide-react';

import { sound } from '../../utils/sound';

interface Props {
  project: ProjectData;
}

export const SingleSlideView: React.FC<Props> = ({ project }) => {
  const [displayMode, setDisplayMode] = useState<'split' | 'legacy' | 'gemini'>('split');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Hero Headline & Paradigm Framing */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.06]">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-widest uppercase text-cyan-400 font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              Executive Paradigm Briefing
            </span>
            <span className="text-zinc-600 font-mono text-xs">/</span>
            <span className="text-xs font-mono text-zinc-400">Where Work Actually Happens</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Fragmented Portals <span className="text-zinc-600 font-light">vs.</span>{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Unified Gemini Surface
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl font-normal">
            Evaluating the enterprise shift: whether knowledge workers navigate across disconnected SaaS destinations, or operate within a single ambient window orchestrating systems headlessly.
          </p>
        </div>

        {/* Display Selector Pill */}
        <div className="flex items-center bg-[#0d1017] p-1.5 rounded-xl border border-white/10 shrink-0 self-start md:self-end">
          <button
            onClick={() => {
              sound.playClick();
              setDisplayMode('split');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              displayMode === 'split'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Split className="w-3.5 h-3.5 text-cyan-400" />
            <span>Side-by-Side</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setDisplayMode('legacy');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              displayMode === 'legacy'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>Option A: Portals</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setDisplayMode('gemini');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              displayMode === 'gemini'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Option B: Gemini</span>
          </button>
        </div>
      </div>

      {/* Main Visual Arena */}
      {displayMode === 'split' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Fragmented */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-semibold">
                  Option 01 · Status Quo
                </span>
                <h3 className="text-lg font-bold text-white tracking-wide mt-0.5">
                  Multi-Portal Fragmented Workday
                </h3>
              </div>
              <span className="text-[11px] font-mono text-zinc-400 bg-black/40 px-2 py-0.5 rounded border border-white/5">
                Swivel-Chair Model
              </span>
            </div>
            <FragmentedSystemsVisual interactive={true} />
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
              <h4 className="font-semibold text-zinc-300">Core Failure Mode:</h4>
              <p className="text-zinc-400 leading-relaxed">
                Employees spend 20%+ of workday reconciling disparate identifiers, waiting for slow portal page loads, and manually bridging data between CRM and ERP.
              </p>
            </div>
          </div>

          {/* Right Column: Gemini */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                  Option 02 · Target State
                </span>
                <h3 className="text-lg font-bold text-white tracking-wide mt-0.5">
                  Gemini Enterprise Ambient Window
                </h3>
              </div>
              <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/30">
                Orchestrated Model
              </span>
            </div>
            <GeminiEnterpriseVisual interactive={true} />
            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-2 text-xs">
              <h4 className="font-semibold text-cyan-200">Architectural Advantage:</h4>
              <p className="text-zinc-300 leading-relaxed">
                Legacy systems remain untouched as secure headless APIs. Gemini acts as the ambient cognitive surface—synthesizing data in 800ms and dispatching certified actions.
              </p>
            </div>
          </div>
        </div>
      )}

      {displayMode === 'legacy' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-rose-400">
              Deep Dive · Option A
            </span>
            <h2 className="text-2xl font-bold text-white">The Multi-Portal Swivel-Chair Workflow</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              When work is distributed across multiple discrete destinations, the human operator becomes the bottleneck. Every workflow step requires human attention to context switch, re-authenticate, and verify inconsistent data.
            </p>
          </div>
          <FragmentedSystemsVisual interactive={true} />
        </div>
      )}

      {displayMode === 'gemini' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Deep Dive · Option B
            </span>
            <h2 className="text-2xl font-bold text-white">Gemini Enterprise: Unified Work Window</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              By abstracting SaaS portals behind an enterprise-grade agentic orchestration mesh, users gain an ambient, single-pane interface. Actions execute deterministically, grounded in your corporate IAM boundaries.
            </p>
          </div>
          <GeminiEnterpriseVisual interactive={true} />
        </div>
      )}

      {/* Comparative Telemetry & Summary */}
      <div className="pt-6 border-t border-white/[0.06]">
        <ComparisonMatrix project={project} />
      </div>
    </div>
  );
};
