import React from 'react';
import { Command, Monitor, Layers, BookOpen, PlayCircle, Eye, EyeOff, Volume2, VolumeX } from 'lucide-react';
import type { ProjectData, ViewMode } from '../types/presentation';

import { sound } from '../utils/sound';

interface Props {
  project: ProjectData;
  viewMode: ViewMode;
  onSelectViewMode: (mode: ViewMode) => void;
  onOpenProjectMenu: () => void;
  zenMode: boolean;
  onToggleZenMode: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const HeaderNav: React.FC<Props> = ({
  project,
  viewMode,
  onSelectViewMode,
  onOpenProjectMenu,
  zenMode,
  onToggleZenMode,
  soundEnabled,
  onToggleSound,
}) => {
  if (zenMode) {
    return (
      <div className="fixed top-3 right-4 z-50 opacity-20 hover:opacity-100 transition-opacity">
        <button
          onClick={onToggleZenMode}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 border border-white/10 text-xs font-mono text-zinc-400 hover:text-white backdrop-blur-md"
        >
          <EyeOff className="w-3.5 h-3.5" />
          <span>Exit Zen (F)</span>
        </button>
      </div>
    );
  }

  const modes: { id: ViewMode; label: string; icon: React.ComponentType<{ className?: string }>; key: string }[] = [
    { id: 'single', label: 'Single Slide', icon: Monitor, key: '1' },
    { id: 'deck', label: 'Deck Mode', icon: Layers, key: '2' },
    { id: 'scroll', label: 'Infinite Scroll', icon: BookOpen, key: '3' },
    { id: 'interactive', label: 'Interactive Lab', icon: PlayCircle, key: '4' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 backdrop-blur-xl bg-[#07080B]/80 border-b border-white/[0.06] transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand & Hidden Menu Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onOpenProjectMenu();
            }}
            className="group flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-all text-left"
            title="Open Project Menu (⌘K or M)"
          >
            <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center p-[1px]">
              <div className="w-full h-full bg-[#07080B] rounded-[5px] flex items-center justify-center">
                <Command className="w-3 h-3 text-cyan-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 font-semibold">
                  {project.code}
                </span>
                <span className="text-[10px] text-zinc-600">/</span>
                <span className="text-xs font-semibold text-white tracking-tight truncate max-w-[160px] sm:max-w-[220px]">
                  {project.title.split(':')[0]}
                </span>
              </div>
            </div>
            <span className="hidden sm:inline-block ml-1 text-[10px] font-mono text-zinc-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/5 group-hover:border-white/20">
              ⌘K
            </span>
          </button>
        </div>

        {/* Center: View Mode Segmented Controls */}
        <nav className="flex items-center bg-[#0d1017] p-1 rounded-xl border border-white/10 shadow-inner">
          {modes.map((m) => {
            const Icon = m.icon;
            const active = viewMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  sound.playClick();
                  onSelectViewMode(m.id);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? 'bg-gradient-to-r from-indigo-600/80 to-cyan-600/80 text-white shadow-sm shadow-cyan-500/20 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-zinc-500'}`} />
                <span className="hidden md:inline">{m.label}</span>
                <span className="hidden lg:inline text-[9px] font-mono opacity-50">[{m.key}]</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Sound & Presentation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              onToggleSound();
            }}
            className="w-8 h-8 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
            title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
            )}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onToggleZenMode();
            }}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            title="Zen presentation mode (hide chrome) (F)"
          >
            <Eye className="w-3.5 h-3.5 text-indigo-400" />
            <span>Zen (F)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
