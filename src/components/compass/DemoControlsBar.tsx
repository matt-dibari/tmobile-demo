import React from 'react';
import { Layout, Columns, MessageSquare, Monitor, Headphones, User } from 'lucide-react';

export type DemoViewLayout = 'portal' | 'split' | 'chat';
export type DemoPerspective = 'user' | 'agent';

interface Props {
  perspective: DemoPerspective;
  onSelectPerspective: (p: DemoPerspective) => void;
  layout: DemoViewLayout;
  onSelectLayout: (l: DemoViewLayout) => void;
  showBrowserChrome: boolean;
  onToggleChrome: () => void;
  onTriggerScenario: (prompt: string) => void;
  isEscalated: boolean;
}

export const DemoControlsBar: React.FC<Props> = ({
  perspective,
  onSelectPerspective,
  layout,
  onSelectLayout,
  showBrowserChrome,
  onToggleChrome,
  onTriggerScenario,
  isEscalated,
}) => {
  return (
    <div className="bg-[#18181B] text-white border-b border-gray-800 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs font-sans z-50 select-none">
      {/* Brand & Perspective Switcher */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E20074] animate-pulse" />
          <span className="font-bold text-white tracking-wide">T-Mobile Compass Demo</span>
        </div>

        <span className="text-gray-700">|</span>

        {/* Primary Perspective Toggle: User vs Agent */}
        <div className="flex items-center bg-black/60 p-1 rounded-xl border border-gray-700">
          <button
            onClick={() => onSelectPerspective('user')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              perspective === 'user'
                ? 'bg-[#E20074] text-white shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>User View (Compass)</span>
          </button>

          <button
            onClick={() => onSelectPerspective('agent')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
              perspective === 'agent'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Headphones className="w-3.5 h-3.5 text-cyan-400" />
            <span>Agent Console (Backend)</span>
            {isEscalated && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping ml-1" />
            )}
          </button>
        </div>
      </div>

      {/* When in User perspective: Show layout options */}
      {perspective === 'user' && (
        <div className="flex items-center bg-gray-900 p-1 rounded-xl border border-gray-800">
          <button
            onClick={() => onSelectLayout('portal')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              layout === 'portal'
                ? 'bg-gray-800 text-white font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
            title="Compass Website Only"
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Portal</span>
          </button>

          <button
            onClick={() => onSelectLayout('split')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              layout === 'split'
                ? 'bg-gray-800 text-white font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
            title="Side-by-Side: Compass & TeSS"
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Split View</span>
          </button>

          <button
            onClick={() => onSelectLayout('chat')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              layout === 'chat'
                ? 'bg-gray-800 text-white font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
            title="Full-Screen Rich Chat Studio"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat Studio</span>
          </button>
        </div>
      )}

      {/* Quick Scenario Shortcuts */}
      <div className="flex items-center gap-2">
        <div className="hidden lg:flex items-center gap-1 bg-gray-900/80 px-2 py-1 rounded-lg border border-gray-800 text-[11px] font-mono">
          <span className="text-gray-500">Quick Test:</span>
          <button
            onClick={() => {
              onSelectPerspective('user');
              onTriggerScenario('I need badge access for Bellevue HQ Building 4');
            }}
            className="hover:text-[#E20074] px-1.5 py-0.5 rounded hover:bg-white/5 transition-colors"
          >
            🏢 Badge
          </button>
          <span className="text-gray-700">·</span>
          <button
            onClick={() => {
              onSelectPerspective('user');
              onTriggerScenario('My MacBook battery is swollen and running hot');
            }}
            className="hover:text-[#E20074] px-1.5 py-0.5 rounded hover:bg-white/5 transition-colors"
          >
            ⚡ TechExpress
          </button>
          <button
            onClick={() => {
              onSelectPerspective('user');
              onTriggerScenario('I need to request access to a group. Can you help me submit a Request Group Access ticket?');
            }}
            className="hover:text-[#E20074] px-1.5 py-0.5 rounded hover:bg-white/5 transition-colors font-semibold text-emerald-400"
          >
            🔑 Group Access (ServiceNow)
          </button>
          <span className="text-gray-700">·</span>
          <button
            onClick={() => {
              onSelectPerspective('user');
              onTriggerScenario('I need to speak to a human representative now');
            }}
            className="hover:text-amber-400 px-1.5 py-0.5 rounded hover:bg-white/5 transition-colors text-amber-300 font-bold"
          >
            🎧 Escalate to Agent
          </button>

        </div>

        {perspective === 'user' && (
          <button
            onClick={onToggleChrome}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-colors flex items-center gap-1.5 ${
              showBrowserChrome
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'border-gray-800 text-gray-500 hover:text-gray-300'
            }`}
            title="Toggle browser URL address bar"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Browser URL</span>
          </button>
        )}
      </div>
    </div>
  );
};
