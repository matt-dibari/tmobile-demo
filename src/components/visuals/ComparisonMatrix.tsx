import React from 'react';
import { Layers, Check, X } from 'lucide-react';
import type { ProjectData } from '../../types/presentation';


interface Props {
  project: ProjectData;
}

export const ComparisonMatrix: React.FC<Props> = ({ project }) => {
  const comparisonRows = [
    {
      dimension: 'User Work Surface',
      legacy: '4 to 8 discrete SaaS portals & separate browser tabs',
      gemini: '1 unified, ambient work window with multi-modal context',
      advantage: 'gemini',
    },
    {
      dimension: 'Integration Paradigm',
      legacy: 'Swivel-chair (Human copies & pastes data across windows)',
      gemini: 'Headless API orchestration & automated enterprise dispatch',
      advantage: 'gemini',
    },
    {
      dimension: 'Cognitive & Attention Tax',
      legacy: '1,200+ context switches daily, heavy re-orientation friction',
      gemini: 'Continuous flow state, zero context switching',
      advantage: 'gemini',
    },
    {
      dimension: 'Security & Auth Surface',
      legacy: 'Fragmented session timeouts, disparate RBAC, shadow spreadsheets',
      gemini: 'Unified Okta/IAM boundary, zero data retention for training, audit logged',
      advantage: 'gemini',
    },
    {
      dimension: 'Operational Cycle Time',
      legacy: '15 to 25 minutes per cross-system transaction',
      gemini: 'Sub-minute resolution via natural language or single-tap action cards',
      advantage: 'gemini',
    },
    {
      dimension: 'Legacy System Disruption',
      legacy: 'Requires expensive, fragile custom portal point-to-point integrations',
      gemini: 'Zero changes to SAP or Salesforce backends; acts as the cognitive layer',
      advantage: 'gemini',
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {project.metrics.map((metric, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl glass-panel border border-white/5 relative overflow-hidden group hover:border-white/20 transition-all"
          >
            <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 mb-2 truncate">
              {metric.label}
            </div>

            <div className="flex items-baseline justify-between gap-2">
              <div>
                <span className="text-xl sm:text-2xl font-bold font-mono text-white">
                  {metric.geminiValue}
                </span>
                <span className="text-xs text-zinc-400 ml-1 font-mono">{metric.geminiUnit}</span>
              </div>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {metric.improvement}
              </span>
            </div>

            <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
              <span>Legacy:</span>
              <span className="line-through text-rose-400/80">
                {metric.legacyValue} {metric.legacyUnit}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="rounded-xl glass-panel border border-white/10 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10 bg-white/[0.01] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white tracking-wide">
              Architectural & Operational Breakdown
            </h3>
          </div>
          <span className="text-[11px] font-mono text-zinc-400">Side-by-Side Comparison</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/5 bg-black/40 text-zinc-400 font-mono uppercase text-[10px] tracking-wider">
                <th className="py-3 px-5 w-1/4">Evaluation Dimension</th>
                <th className="py-3 px-5 w-3/8 text-rose-300/90">Option A: Fragmented Systems</th>
                <th className="py-3 px-5 w-3/8 text-cyan-300">Option B: Gemini Enterprise Unified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {comparisonRows.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="py-3.5 px-5 font-medium text-zinc-300">
                    {row.dimension}
                  </td>
                  <td className="py-3.5 px-5 text-zinc-400 group-hover:text-zinc-300 transition-colors">
                    <div className="flex items-start gap-2">
                      <X className="w-3.5 h-3.5 text-rose-400/70 shrink-0 mt-0.5" />
                      <span>{row.legacy}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 text-white bg-indigo-950/10 group-hover:bg-indigo-950/20 transition-colors">
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="font-medium text-cyan-100">{row.gemini}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
