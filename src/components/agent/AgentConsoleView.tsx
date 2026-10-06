import React, { useState } from 'react';
import {
  Headphones,
  User,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Send,
  Sparkles,
  Laptop,
  CreditCard,
  ArrowLeft,
  Search,
  Filter,
  Layers,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  Check,
} from 'lucide-react';
import type { AgentQueueItem, ChatMessage } from '../../data/compassData';
import { MOCK_AGENT_QUEUE } from '../../data/compassData';

interface Props {
  onSwitchToUser: () => void;
  userMessages: ChatMessage[];
  onAgentSendMessage: (text: string) => void;
}

export const AgentConsoleView: React.FC<Props> = ({
  onSwitchToUser,
  userMessages,
  onAgentSendMessage,
}) => {
  const [queue, setQueue] = useState<AgentQueueItem[]>(MOCK_AGENT_QUEUE);
  const [selectedQueueId, setSelectedQueueId] = useState<string>('queue-matt');
  const [agentInput, setAgentInput] = useState('');
  const [actionDoneMsg, setActionDoneMsg] = useState<string | null>(null);

  const selectedItem = queue.find((q) => q.id === selectedQueueId) || queue[0];

  const handleSendAgentReply = (text?: string) => {
    const toSend = text || agentInput;
    if (!toSend.trim()) return;
    onAgentSendMessage(toSend);
    setAgentInput('');
  };

  const handleTriggerAction = (msg: string) => {
    setActionDoneMsg(msg);
    handleSendAgentReply(`[System Action]: ${msg}`);
    setTimeout(() => {
      setActionDoneMsg(null);
    }, 3000);
  };

  return (
    <div className="w-full h-[calc(100vh-45px)] bg-[#0E1117] text-gray-200 flex flex-col font-sans overflow-hidden">
      {/* 1. Agent Console Top Navbar */}
      <header className="h-14 bg-[#161B22] border-b border-gray-800 px-4 sm:px-6 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={onSwitchToUser}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-200 border border-gray-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to User Front-End (Compass)</span>
          </button>

          <span className="text-gray-700">|</span>

          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-white tracking-wide">
              ServiceNow IT Agent Workspace · Tier 2 Specialist
            </span>
            <span className="text-[10px] font-mono bg-[#E20074]/20 text-[#E20074] border border-[#E20074]/30 px-2 py-0.5 rounded-full font-bold">
              Live Escalation Desk
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
          <div className="hidden md:flex items-center gap-2">
            <span>Specialist:</span>
            <strong className="text-white">Sarah K. (Bellevue)</strong>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-950/40 text-emerald-400 px-2.5 py-1 rounded border border-emerald-500/20">
            <span>Status: Available</span>
          </div>
        </div>
      </header>

      {/* 2. Three-Column Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT COLUMN: Queue of Incoming Chats */}
        <aside className="w-80 lg:w-96 border-r border-gray-800 bg-[#12161F] flex flex-col shrink-0">
          <div className="p-3 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#E20074]" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Incoming Queue ({queue.length})
              </h3>
            </div>
            <span className="text-[10px] font-mono text-gray-400">SLA: 98.2%</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-800/60">
            {queue.map((item) => {
              const isSelected = item.id === selectedQueueId;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedQueueId(item.id)}
                  className={`p-3.5 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#1C2230] border-l-4 border-[#E20074]'
                      : 'hover:bg-gray-800/40 border-l-4 border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gray-700 text-white flex items-center justify-center font-bold text-[11px]">
                        {item.userAvatar}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white truncate max-w-[130px]">
                          {item.userName}
                        </h4>
                        <span className="text-[10px] text-gray-400 block truncate max-w-[130px]">
                          {item.department}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                          item.priority === 'P1'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : item.priority === 'P2'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}
                      >
                        {item.priority}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {item.waitTime}
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] font-semibold text-[#E20074] mb-1">
                    {item.topic}
                  </div>
                  <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </aside>

        {/* CENTER COLUMN: Active Escalation Session & Transcript */}
        <section className="flex-1 flex flex-col bg-[#0B0E14] overflow-hidden">
          {/* Active Session Header Strip */}
          <div className="p-4 bg-[#141822] border-b border-gray-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#E20074] text-white flex items-center justify-center font-bold text-xs shadow">
                {selectedItem.userAvatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{selectedItem.userName}</h3>
                  <span className="text-[10px] font-mono text-gray-400">
                    ({selectedItem.userRole})
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.2 rounded">
                    {selectedItem.incidentNumber}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">
                  {selectedItem.location} · {selectedItem.device}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-right text-[11px] font-mono">
                <span className="text-gray-500 block text-[9px] uppercase">SLA Target</span>
                <span className="text-emerald-400 font-bold">14m 20s Remaining</span>
              </div>
            </div>
          </div>

          {/* AI Pre-Briefing Card (TeSS Context Transfer) */}
          <div className="p-4 border-b border-gray-800 bg-[#161D29]/60 shrink-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#E20074]">
                <Sparkles className="w-3.5 h-3.5 text-[#E20074]" />
                <span>TeSS AI Hand-off Context & Diagnostic Telemetry</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                100% Context Preserved
              </span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              <strong>AI Diagnostic Summary:</strong> {selectedItem.summary}
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-gray-800 text-[11px] font-mono">
              <span className="text-gray-400">Pre-checks:</span>
              <span className="text-emerald-300 bg-emerald-950/30 px-2 py-0.5 rounded">
                ✓ Hardware scan completed
              </span>
              <span className="text-emerald-300 bg-emerald-950/30 px-2 py-0.5 rounded">
                ✓ Okta SSO verified
              </span>
              <span className="text-cyan-300 bg-cyan-950/30 px-2 py-0.5 rounded">
                ⚡ Tech Bar slot 2:30 PM reserved
              </span>
            </div>
          </div>

          {/* Transcript Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="text-center">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest bg-gray-900 px-3 py-1 rounded-full border border-gray-800">
                Escalation Session Transcript
              </span>
            </div>

            {selectedQueueId === 'queue-matt' ? (
              // Live messages between Matt and TeSS/Agent
              userMessages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${
                    m.sender === 'agent'
                      ? 'items-end'
                      : m.sender === 'user'
                      ? 'items-start'
                      : 'items-center'
                  } space-y-1`}
                >
                  <span className="text-[10px] font-mono text-gray-500 px-1">
                    {m.sender === 'user'
                      ? 'Matt DiBari (Employee)'
                      : m.sender === 'agent'
                      ? 'Sarah K. (Tier 2 Agent · You)'
                      : 'TeSS (AI Assistant)'}
                  </span>

                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-2.5 text-xs leading-relaxed ${
                      m.sender === 'agent'
                        ? 'bg-[#E20074] text-white rounded-br-none font-medium'
                        : m.sender === 'user'
                        ? 'bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-none font-medium'
                        : 'bg-gray-900/80 text-gray-300 border border-gray-800 text-center italic'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500 text-xs font-mono">
                No active transcript for this historical queue item. Select "Matt DiBari" to interact with the live escalation session.
              </div>
            )}
          </div>

          {/* Agent Reply Box */}
          <div className="p-4 bg-[#141822] border-t border-gray-800 shrink-0 space-y-3">
            {/* Quick Macro Pills */}
            <div className="flex flex-wrap gap-2 text-[11px]">
              <button
                onClick={() =>
                  handleSendAgentReply(
                    "Hi Matt! I see TeSS already scanned your MacBook and flagged the battery. I have pre-staged a replacement 16\" M3 Max at the Bellevue Tech Bar for your 2:30 PM slot!"
                  )
                }
                className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 transition-colors"
              >
                💬 Pre-Stage Hardware Reply
              </button>
              <button
                onClick={() =>
                  handleTriggerAction('Approved Building 4 24/7 Lab RFID clearance on security controller')
                }
                className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-emerald-400 border border-gray-700 transition-colors"
              >
                🏢 Approve Bld 4 Badge
              </button>
              <button
                onClick={() =>
                  handleSendAgentReply(
                    "Your loaner rig is ready. Stop by Building 2 Tech Bar whenever you're free, no waiting required."
                  )
                }
                className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 transition-colors"
              >
                ⚡ Ready for Pickup
              </button>
            </div>

            {/* Notification alert */}
            {actionDoneMsg && (
              <div className="p-2 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{actionDoneMsg}</span>
              </div>
            )}

            {/* Input form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendAgentReply();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={agentInput}
                onChange={(e) => setAgentInput(e.target.value)}
                placeholder="Type response as Tier 2 Specialist Sarah K. to Matt..."
                className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E20074] font-medium"
              />
              <button
                type="submit"
                disabled={!agentInput.trim()}
                className="px-4 py-2.5 rounded-xl bg-[#E20074] hover:bg-[#c40064] disabled:opacity-40 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send to Matt</span>
              </button>
            </form>
          </div>
        </section>

        {/* RIGHT COLUMN: User 360 & Quick Actions */}
        <aside className="hidden xl:flex w-80 bg-[#12161F] border-l border-gray-800 flex-col shrink-0 p-4 space-y-5 overflow-y-auto">
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              User 360° Profile
            </h3>

            <div className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Employee ID:</span>
                <span className="font-mono text-white">EMP-48912</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Cost Center:</span>
                <span className="font-mono text-white">CC-ARCH-90</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Manager:</span>
                <span className="text-white">Director, Engineering</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">VIP Flag:</span>
                <span className="text-[#E20074] font-bold">Executive Direct</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Assigned Hardware
            </h3>
            <div className="p-3 rounded-xl bg-gray-900/80 border border-gray-800 space-y-2 text-xs">
              <div className="flex items-center justify-between font-semibold text-white">
                <div className="flex items-center gap-1.5">
                  <Laptop className="w-3.5 h-3.5 text-[#E20074]" />
                  <span>MacBook Pro 16" (M3 Max)</span>
                </div>
              </div>
              <div className="text-[11px] text-rose-400 font-mono">
                Serial: C02G9012MD · Battery: 68%
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              One-Click Agent Actions
            </h3>
            <div className="space-y-2">
              <button
                onClick={() =>
                  handleTriggerAction('Dispatched M3 Max replacement order to Tech Bar (Reservation #TB-8891)')
                }
                className="w-full py-2 px-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-left text-xs text-white border border-gray-700 flex items-center justify-between transition-colors"
              >
                <span>⚡ Stage Tech Bar Swap</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
              </button>

              <button
                onClick={() =>
                  handleTriggerAction('Approved Building 4 Lab 24/7 RFID Badge access')
                }
                className="w-full py-2 px-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-left text-xs text-white border border-gray-700 flex items-center justify-between transition-colors"
              >
                <span>🏢 Authorize RFID Badge</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
              </button>

              <button
                onClick={() =>
                  handleTriggerAction('Closed INC0091823 as Resolved - Hardware Staged')
                }
                className="w-full py-2 px-3 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/40 text-left text-xs text-emerald-400 border border-emerald-500/30 flex items-center justify-between transition-colors font-semibold"
              >
                <span>✅ Mark Incident Resolved</span>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
