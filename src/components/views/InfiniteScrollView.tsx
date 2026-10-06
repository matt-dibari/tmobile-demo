import React, { useState, useEffect } from 'react';
import type { ProjectData } from '../../types/presentation';
import { FragmentedSystemsVisual } from '../visuals/FragmentedSystemsVisual';
import { GeminiEnterpriseVisual } from '../visuals/GeminiEnterpriseVisual';
import { ComparisonMatrix } from '../visuals/ComparisonMatrix';
import { ArrowDown, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

import { sound } from '../../utils/sound';

interface Props {
  project: ProjectData;
}

export const InfiniteScrollView: React.FC<Props> = ({ project }) => {
  const [activeSection, setActiveSection] = useState<string>('intro');

  const sections = [
    { id: 'intro', label: '01 / The Crisis of Context' },
    { id: 'legacy', label: '02 / The Multi-Portal Tax' },
    { id: 'gemini', label: '03 / Unified Ambient Window' },
    { id: 'matrix', label: '04 / Operational Telemetry' },
    { id: 'verdict', label: '05 / Strategic Verdict' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      {/* Floating Scrollytelling Table of Contents (Fixed right on desktop) */}
      <aside className="hidden xl:block fixed right-8 top-32 z-30 w-52 p-4 rounded-xl glass-panel border border-white/5 space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
          Document Flow
        </span>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className={`block w-full text-left text-xs font-mono py-1 px-2 rounded transition-all truncate ${
              activeSection === s.id
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border-l-2 border-cyan-400'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {s.label}
          </button>
        ))}
      </aside>

      <div className="max-w-4xl mx-auto space-y-24">
        {/* SECTION 1: Editorial Hero */}
        <section id="intro" className="space-y-6 pt-4 border-b border-white/[0.06] pb-16">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-widest uppercase text-cyan-400 font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              Executive Paradigm Shift
            </span>
            <span className="text-zinc-600 font-mono">/</span>
            <span className="text-xs font-mono text-zinc-400">{project.category}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Where Enterprise Work <br />
            <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Actually Happens
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
            Over the past two decades, enterprises invested billions procuring best-of-breed SaaS applications. The unintended consequence: our employees now spend their days acting as human copy-paste bridges between disconnected browser tabs.
          </p>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">The Core Question</h4>
            <p className="text-sm font-medium text-white italic leading-relaxed">
              "Do we continue asking workers to visit 6 to 8 specialized portals for every operational task, or do we bring the capability of those portals into a single ambient work window?"
            </p>
          </div>

          <button
            onClick={() => scrollTo('legacy')}
            className="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors pt-2"
          >
            <span>Begin Narrative Journey</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </section>

        {/* SECTION 2: Option A — The Multi-Portal Tax */}
        <section id="legacy" className="space-y-6 pt-4 border-b border-white/[0.06] pb-16">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-rose-400 font-semibold">
              Option 01 · Status Quo Architecture
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              The Multi-Web-Page Quagmire
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              In the traditional model, work is bound to individual portal destinations. An employee resolving an account request must authenticate into Salesforce, jump to SAP S/4HANA, check ServiceNow, and ping Slack.
            </p>
          </div>

          {/* Interactive Visual */}
          <FragmentedSystemsVisual interactive={true} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-1.5">
              <span className="font-semibold text-rose-300">Attention Fragmentation</span>
              <p className="text-zinc-400 leading-relaxed">
                1,200 window switches a day induces cognitive exhaustion. Studies show returning to deep focus after an interruption takes up to 23 minutes.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-1.5">
              <span className="font-semibold text-rose-300">Fractured Audit Trails</span>
              <p className="text-zinc-400 leading-relaxed">
                When human copy-paste drives cross-system consistency, data drift is inevitable. Discrepancies between CRM opportunity values and ERP billing records cost millions.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Option B — Gemini Enterprise Unified Window */}
        <section id="gemini" className="space-y-6 pt-4 border-b border-white/[0.06] pb-16">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" /> Option 02 · Target Architecture
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Gemini Enterprise: The Unified Ambient Work Window
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Instead of migrating systems or rewriting portals, Gemini operates as an intelligent cognitive orchestration layer. Salesforce, SAP, and ServiceNow remain your secure systems of record, while Gemini serves as the user's unified work window.
            </p>
          </div>

          {/* Interactive Visual */}
          <GeminiEnterpriseVisual interactive={true} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-1.5">
              <span className="font-semibold text-cyan-300">Headless API Orchestration</span>
              <p className="text-zinc-400 leading-relaxed">
                Gemini communicates with backend enterprise APIs in parallel. Multi-modal synthesis pulls structured data and unstructured context into one actionable view.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-1.5">
              <span className="font-semibold text-cyan-300">Enterprise Security Guarantees</span>
              <p className="text-zinc-400 leading-relaxed">
                Zero data retention for training, full IAM and Okta permission enforcement, and immutable cryptographic audit logging for every dispatched action.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Operational Telemetry Matrix */}
        <section id="matrix" className="space-y-6 pt-4 border-b border-white/[0.06] pb-16">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              04 // Telemetry & Impact
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Operational Impact Scorecard
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Measurable improvements across velocity, accuracy, security exposure, and employee focus.
            </p>
          </div>

          <ComparisonMatrix project={project} />
        </section>

        {/* SECTION 5: Strategic Verdict */}
        <section id="verdict" className="space-y-6 pt-4 pb-16">
          <div className="p-8 rounded-2xl glass-panel-elevated border border-indigo-500/30 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider">
                  The Path Forward
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Strategic Recommendation: Abstract, Don't Replace
                </h3>
              </div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed font-normal">
              Replacing SAP or Salesforce is a multi-year, high-risk endeavor that yields minimal end-user velocity. Implementing Gemini Enterprise as the ambient work window delivers instant, compounding value in weeks without disrupting existing compliance, billing, or CRM workflows.
            </p>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-mono text-zinc-400">
                Ready to review the interactive simulation?
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
              >
                <span>Back to Top</span>
                <ChevronRight className="w-3.5 h-3.5 rotate-[-90deg]" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
