import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  X,
  Share2,
  Plus,
  MoreHorizontal,
  Headphones,
  RotateCcw,
} from 'lucide-react';
import type { ChatMessage } from '../../data/compassData';
import { BadgeAccessWidget } from './widgets/BadgeAccessWidget';
import { TechExpressWidget } from './widgets/TechExpressWidget';
import { ITApprovalWidget } from './widgets/ITApprovalWidget';
import { NetworkDiagnosticWidget } from './widgets/NetworkDiagnosticWidget';
import { EscalationCard } from './widgets/EscalationCard';
import { ServiceNowRequestWidget } from './widgets/ServiceNowRequestWidget';

interface Props {
  onClose?: () => void;
  isDrawer?: boolean;
  initialPrompt?: string;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onResetMessages: () => void;
  isEscalated?: boolean;
}

export const RichChatInterface: React.FC<Props> = ({
  onClose,
  isDrawer = false,
  initialPrompt,
  messages,
  onSendMessage,
  onResetMessages,
  isEscalated = false,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const handledPromptRef = useRef<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialPrompt && initialPrompt !== handledPromptRef.current) {
      handledPromptRef.current = initialPrompt;
      onSendMessage(initialPrompt);
    }
  }, [initialPrompt, onSendMessage]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue('');
  };

  return (
    <div className="flex flex-col h-full bg-white text-gray-900 border-l border-gray-200 overflow-hidden font-sans">
      {/* 1. Clean TeSS Header matching Screenshot 1 */}
      <div className="px-5 py-3.5 bg-white border-b border-gray-200 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-2">
          {/* Subtle TeSS Emblem */}
          <div className="w-5 h-5 flex items-center justify-center text-gray-700">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
              <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-4 4 4 4 0 0 1-4-4V6a4 4 0 0 1 4-4z" />
              <path d="M6 13a6 6 0 0 0 12 0" />
              <line x1="12" y1="19" x2="12" y2="22" />
              <line x1="8" y1="22" x2="16" y2="22" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-800 tracking-tight">
            TeSS IT Help
          </h3>
        </div>

        {/* Right Header Actions matching Screenshot 1 */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="w-7 h-7 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center transition-colors"
            title="More Options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          <button
            type="button"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 hover:border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5 text-gray-500" />
            <span>Share</span>
          </button>

          <button
            type="button"
            onClick={onResetMessages}
            className="px-3 py-1 rounded-full border border-gray-200 hover:border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-xs"
          >
            New chat
          </button>

          {isDrawer && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center transition-colors ml-1"
              title="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Message History Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            } space-y-2`}
          >
            {/* Sender Label for Live Agent */}
            {msg.sender === 'agent' && (
              <span className="text-[10px] font-mono text-[#E20074] font-bold flex items-center gap-1">
                <Headphones className="w-3 h-3 text-[#E20074]" />
                <span>Sarah K. (Tier 2 IT Specialist)</span>
              </span>
            )}

            {/* Bubble */}
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-[#E5E7EB] text-gray-900 rounded-br-none font-medium'
                  : msg.sender === 'agent'
                  ? 'bg-[#18181B] text-white rounded-bl-none border-l-4 border-[#E20074]'
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
              }`}
            >
              <p className="whitespace-pre-wrap font-normal text-xs">{msg.text}</p>
            </div>

            {/* Rich Interactive Widgets */}
            {msg.richWidget && (
              <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-2 duration-300">
                {msg.richWidget.type === 'servicenow_request' && (
                  <ServiceNowRequestWidget onComplete={scrollToBottom} />
                )}
                {msg.richWidget.type === 'badge_access' && (
                  <BadgeAccessWidget onComplete={scrollToBottom} />
                )}
                {msg.richWidget.type === 'techexpress_booking' && (
                  <TechExpressWidget onComplete={scrollToBottom} />
                )}
                {msg.richWidget.type === 'it_approval' && (
                  <ITApprovalWidget onComplete={scrollToBottom} />
                )}
                {msg.richWidget.type === 'network_diag' && (
                  <NetworkDiagnosticWidget onComplete={scrollToBottom} />
                )}
                {msg.richWidget.type === 'escalation_card' && <EscalationCard />}
              </div>
            )}

            {/* Suggested Action Pills */}
            {msg.suggestedActions && msg.suggestedActions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {msg.suggestedActions.map((act, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const clean = act.replace(/^[^\w\s]+/, '').trim();
                      onSendMessage(clean);
                    }}
                    className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-xs hover:border-gray-400 transition-all"
                  >
                    {act}
                  </button>
                ))}
              </div>
            )}

            {/* Timestamp */}
            <span className="text-[10px] text-gray-400 font-mono px-1">
              {msg.timestamp}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-gray-500 font-mono py-2">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-spin" />
            </div>
            <span>TeSS is reasoning...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Bottom Input Bar matching Screenshot 1 */}
      <div className="p-3 sm:p-4 bg-white border-t border-gray-100">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center bg-white border border-gray-300 rounded-full px-3 py-2 shadow-xs focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500 transition-all"
        >
          {/* Plus icon on left */}
          <button
            type="button"
            className="w-7 h-7 rounded-full hover:bg-gray-100 text-gray-500 flex items-center justify-center mr-1"
            title="Attach or Add"
          >
            <Plus className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Create, ask, or search anything"
            className="flex-1 bg-transparent text-xs text-gray-900 placeholder-gray-400 focus:outline-none font-normal"
          />

          {/* Black circle submit button on right */}
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="w-7 h-7 rounded-full bg-black hover:bg-gray-800 disabled:opacity-30 text-white flex items-center justify-center transition-all shrink-0 ml-1"
            title="Send"
          >
            <div className="w-2.5 h-2.5 rounded-[1px] bg-white" />
          </button>
        </form>

        <div className="text-center pt-2 text-[10px] text-gray-400 font-sans">
          Powered by AI. Check outputs for accuracy and applicability.
        </div>
      </div>
    </div>
  );
};
