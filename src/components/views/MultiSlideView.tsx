import React, { useState, useEffect } from 'react';
import type { ProjectData } from '../../types/presentation';
import { FragmentedSystemsVisual } from '../visuals/FragmentedSystemsVisual';
import { GeminiEnterpriseVisual } from '../visuals/GeminiEnterpriseVisual';
import { ComparisonMatrix } from '../visuals/ComparisonMatrix';
import { ArrowLeft, ArrowRight, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';

import { sound } from '../../utils/sound';

interface Props {
  project: ProjectData;
}

export const MultiSlideView: React.FC<Props> = ({ project }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [showNotes, setShowNotes] = useState<boolean>(false);

  const slides = project.slides;
  const currentSlide = slides[currentSlideIndex] || slides[0];

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      sound.playSlide();
      setCurrentSlideIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      sound.playSlide();
      setCurrentSlideIndex((i) => i - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, slides.length]);

  return (
    <div className="w-full min-h-[calc(100vh-68px)] max-w-7xl mx-auto px-4 sm:px-8 py-6 flex flex-col justify-between space-y-6">
      {/* Top Slide Meta Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-md border border-cyan-500/20">
            SLIDE {String(currentSlideIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
          <span className="text-zinc-600 font-mono text-xs">·</span>
          <span className="text-xs font-mono tracking-widest uppercase text-zinc-400">
            {currentSlide.eyebrow}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              setShowNotes(!showNotes);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border ${
              showNotes
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                : 'bg-white/[0.02] text-zinc-400 hover:text-white border-white/5'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Notes</span>
          </button>
        </div>
      </div>

      {/* Slide Body Stage */}
      <div className="flex-1 flex flex-col justify-center py-4">
        {/* Slide Header */}
        <div className="mb-6 space-y-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {currentSlide.title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-normal max-w-3xl leading-relaxed">
            {currentSlide.subtitle}
          </p>
        </div>

        {/* Dynamic Slide Content by Variant */}
        <div className="w-full">
          {currentSlide.contentVariant === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
              <div className="p-6 rounded-2xl glass-panel border border-rose-500/20 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-rose-400">
                  Option A: Multi-Portal Model
                </span>
                <h3 className="text-xl font-bold text-white">
                  User Navigates Across 8+ Discrete SaaS Portals
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Employees log in to Salesforce, SAP, Jira, ServiceNow, and Slack. Every task requires tab hopping, copy-pasting customer IDs, and waiting on siloed notifications.
                </p>
                <div className="pt-2 flex items-center gap-2 text-rose-300 font-mono text-xs">
                  <span>→ 1,200 context switches / day</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl glass-panel-elevated border border-cyan-500/20 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Option B: Gemini Enterprise
                </span>
                <h3 className="text-xl font-bold text-white">
                  One Ambient Work Surface Orchestrating All Systems
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Underlying enterprise systems operate headlessly. The user interacts through a unified conversational and visual card window that harmonizes context and executes verified cross-system actions.
                </p>
                <div className="pt-2 flex items-center gap-2 text-cyan-300 font-mono text-xs">
                  <span>→ 1 window · Sub-minute cycle time</span>
                </div>
              </div>
            </div>
          )}

          {currentSlide.contentVariant === 'fragmented_deepdive' && (
            <div className="space-y-4">
              <FragmentedSystemsVisual interactive={true} />
            </div>
          )}

          {currentSlide.contentVariant === 'gemini_deepdive' && (
            <div className="space-y-4">
              <GeminiEnterpriseVisual interactive={true} />
            </div>
          )}

          {currentSlide.contentVariant === 'simulation_compare' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div>
                <h4 className="text-xs font-mono uppercase text-rose-400 mb-2 font-semibold">
                  Legacy Flow (4 Portals)
                </h4>
                <FragmentedSystemsVisual interactive={false} />
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase text-cyan-400 mb-2 font-semibold">
                  Unified Gemini Window (1 Canvas)
                </h4>
                <GeminiEnterpriseVisual interactive={false} />
              </div>
            </div>
          )}

          {currentSlide.contentVariant === 'architecture_matrix' && (
            <ComparisonMatrix project={project} />
          )}

          {currentSlide.contentVariant === 'strategic_verdict' && (
            <div className="p-8 rounded-2xl glass-panel-elevated border border-indigo-500/30 space-y-6 max-w-4xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider">
                    Executive Recommendation
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    Consolidate the Work Surface, Not the Database
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <span className="font-mono text-zinc-400 uppercase text-[10px] block">01 / Protect Core Engines</span>
                  <p className="text-zinc-300">
                    Keep SAP, Salesforce, and ServiceNow as the authoritative systems of record without expensive custom portal rewrites.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <span className="font-mono text-zinc-400 uppercase text-[10px] block">02 / Unified Cognitive Plane</span>
                  <p className="text-zinc-300">
                    Deploy Gemini Enterprise as the unified work window where users prompt, review, and trigger actions.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <span className="font-mono text-zinc-400 uppercase text-[10px] block">03 / Rapid ROI Velocity</span>
                  <p className="text-zinc-300">
                    Eliminate 1,200 context switches daily per employee, delivering immediate productivity and reduced cognitive fatigue.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Key Takeaway Banner */}
        <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <span className="text-cyan-400 font-mono font-bold uppercase tracking-wider text-[10px] bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              Key Insight
            </span>
            <span className="text-zinc-300 font-medium">{currentSlide.keyTakeaway}</span>
          </div>
        </div>

        {/* Presenter Notes Drawer */}
        {showNotes && currentSlide.presenterNotes && (
          <div className="mt-4 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-indigo-300 font-mono text-xs font-semibold mb-1">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Presenter Speaking Points:</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {currentSlide.presenterNotes}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation Scrubber & Controls */}
      <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
        {/* Slide Progress Dots / Scrubber */}
        <div className="flex items-center gap-2">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                sound.playSlide();
                setCurrentSlideIndex(idx);
              }}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlideIndex
                  ? 'w-8 bg-cyan-400 shadow-sm shadow-cyan-400/50'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              title={`Slide ${idx + 1}: ${s.title}`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] disabled:opacity-30 disabled:hover:bg-white/[0.03] text-xs font-medium text-white border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Prev</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentSlideIndex === slides.length - 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 disabled:opacity-30 text-xs font-semibold text-white shadow-md shadow-cyan-500/20 transition-all"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
