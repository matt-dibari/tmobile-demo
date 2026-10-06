import { useEffect } from 'react';
import { X, Check, Command, Volume2, VolumeX, Maximize2, Monitor, BookOpen, Layers, PlayCircle } from 'lucide-react';
import type { ProjectData, ViewMode } from '../types/presentation';


import { sound } from '../utils/sound';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectData[];
  activeProject: ProjectData;
  onSelectProject: (project: ProjectData) => void;
  viewMode: ViewMode;
  onSelectViewMode: (mode: ViewMode) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  zenMode: boolean;
  onToggleZenMode: () => void;
}

export const ProjectMenuModal: React.FC<Props> = ({
  isOpen,
  onClose,
  projects,
  activeProject,
  onSelectProject,
  viewMode,
  onSelectViewMode,
  soundEnabled,
  onToggleSound,
  zenMode,
  onToggleZenMode,
}) => {
  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl rounded-2xl glass-panel-elevated border border-white/15 p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient subtle glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <Command className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white tracking-wide">
                Project Control & Presentation Modes
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                Select strategic scenario and viewing paradigm
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center border border-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* SECTION 1: Project Selector */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase font-mono tracking-wider text-zinc-400">
              01 // Choose Concept Project
            </span>
            <span className="text-[11px] font-mono text-zinc-500">
              {projects.length} Available Concepts
            </span>
          </div>

          <div className="space-y-2.5">
            {projects.map((proj) => {
              const isSelected = proj.id === activeProject.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectProject(proj);
                  }}
                  className={`group p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                    isSelected
                      ? 'bg-indigo-950/30 border-cyan-400/50 ring-1 ring-cyan-400/30'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">
                        {proj.code}
                      </span>
                      <h3
                        className={`text-sm font-semibold tracking-wide ${
                          isSelected ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                        }`}
                      >
                        {proj.title}
                      </h3>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          proj.status === 'Ready'
                            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                            : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                        }`}
                      >
                        {proj.status}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-1">{proj.subtitle}</p>
                  </div>

                  <div className="pt-1">
                    {isSelected ? (
                      <div className="w-5 h-5 rounded-full bg-cyan-400/20 border border-cyan-400/50 flex items-center justify-center">
                        <Check className="w-3 h-3 text-cyan-300" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-white/10 group-hover:border-white/30" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: View Modes */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase font-mono tracking-wider text-zinc-400">
              02 // Presentation Format (Keys 1-4)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                mode: 'single' as ViewMode,
                keyNum: '1',
                label: 'Single Slide',
                sub: 'Executive Overview',
                icon: Monitor,
              },
              {
                mode: 'deck' as ViewMode,
                keyNum: '2',
                label: 'Slide Deck',
                sub: 'Keynote Presentation',
                icon: Layers,
              },
              {
                mode: 'scroll' as ViewMode,
                keyNum: '3',
                label: 'Infinite Scroll',
                sub: 'Editorial Flow',
                icon: BookOpen,
              },
              {
                mode: 'interactive' as ViewMode,
                keyNum: '4',
                label: 'Interactive Lab',
                sub: 'Live Sandbox',
                icon: PlayCircle,
              },
            ].map((item) => {
              const active = viewMode === item.mode;
              const Icon = item.icon;
              return (
                <button
                  key={item.mode}
                  onClick={() => {
                    sound.playClick();
                    onSelectViewMode(item.mode);
                    onClose();
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all relative ${
                    active
                      ? 'bg-cyan-500/10 border-cyan-400/60 text-white shadow-lg shadow-cyan-500/10'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/20 text-zinc-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-zinc-500'}`} />
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">
                      {item.keyNum}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-white">{item.label}</h4>
                  <p className="text-[10px] text-zinc-400 font-mono mt-0.5">{item.sub}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: Presentation Polish & Shortcuts */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onToggleSound();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 transition-colors"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Audio Feedback: On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Audio Feedback: Muted</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onToggleZenMode();
                onClose();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Zen Presentation Mode (F)</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-2">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">Esc</kbd> to return</span>
          </div>
        </div>
      </div>
    </div>
  );
};
