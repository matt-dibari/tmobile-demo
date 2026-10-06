import React, { useState } from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  ChevronDown,
  Volume2,
  VolumeX,
  MoreHorizontal,
  Maximize2,
  Laptop,
  CreditCard,
  Key,
  ClipboardList,
  UserPlus,
  ArrowRight,
  ExternalLink,
  Sparkles,
  HelpCircle,
  FileText,
  Clock,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';
import {
  COMPASS_NAV,
  TOPICS_DATA,
  SUPPORT_RESOURCES,
  ACTIVE_ITEMS,
} from '../../data/compassData';
import type { TopicItem } from '../../data/compassData';

import { sound } from '../../utils/sound';

interface Props {
  onOpenChat: (initialPrompt?: string) => void;
  showBrowserChrome?: boolean;
}

export const CompassWebsite: React.FC<Props> = ({ onOpenChat, showBrowserChrome = true }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Technology Services');

  const handleTopicClick = (topic: TopicItem) => {
    sound.playClick();
    onOpenChat(topic.quickPrompt);
  };

  return (
    <div className="w-full bg-[#F4F5F8] text-gray-900 font-sans min-h-screen">
      {/* 1. Optional Realistic Browser URL Chrome Bar */}
      {showBrowserChrome && (
        <div className="bg-[#EAEAEA] border-b border-gray-300 px-4 py-2 flex items-center justify-between text-xs text-gray-600 select-none">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 mr-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-md border border-gray-300 w-[420px] sm:w-[580px] shadow-xs truncate font-mono text-[11px] text-gray-700">
              <span className="text-emerald-600">🔒</span>
              <span className="truncate">
                https://compass.t-mobile.com/compass?id=employee_taxonomy_topic&topic_id=06d3df67c3053010069aec4b7d40dd70
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenChat()}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E20074] text-white text-[11px] font-semibold hover:bg-[#c40064] transition-colors shadow-xs"
            >
              <Sparkles className="w-3 h-3 text-white" />
              <span>Ask TeSS AI</span>
            </button>
            <div className="w-6 h-6 rounded-full bg-gray-400 text-white flex items-center justify-center text-[10px] font-bold">
              TP
            </div>
          </div>
        </div>
      )}

      {/* 2. Top White Compass Global Header Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* COMPASS Logo */}
          <div className="flex items-center gap-2 cursor-pointer select-none">
            <div className="flex items-center tracking-tight font-black text-2xl text-gray-950 font-sans">
              <span>C</span>
              {/* Compass Star Icon inside the O */}
              <div className="relative inline-flex items-center justify-center w-6 h-6 mx-0.5">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#E20074] fill-current">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
                <div className="absolute w-2 h-2 rounded-full bg-white" />
                <div className="absolute w-1 h-1 rounded-full bg-[#E20074]" />
              </div>
              <span>MPASS</span>
            </div>
          </div>

          {/* Central Search Bar */}
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    onOpenChat(searchQuery);
                  }
                }}
                placeholder="Search"
                className="w-full bg-gray-50 border border-gray-300 rounded-full py-2 pl-4 pr-10 text-xs text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E20074] focus:border-transparent font-medium"
              />
              <button
                onClick={() => searchQuery.trim() && onOpenChat(searchQuery)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#E20074] transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Navigation Items */}
          <div className="flex items-center gap-4 text-xs font-semibold text-gray-800">
            <button
              onClick={() => onOpenChat('What are my open to-dos?')}
              className="hover:text-[#E20074] transition-colors flex items-center gap-1"
            >
              <span>My To-Dos</span>
              <span className="w-4 h-4 rounded-full bg-[#E20074] text-white text-[10px] flex items-center justify-center font-bold">
                3
              </span>
            </button>

            <button
              onClick={() => onOpenChat('Show my active IT requests')}
              className="hover:text-[#E20074] transition-colors flex items-center gap-1"
            >
              <span>My Requests</span>
              <span className="w-4 h-4 rounded-full bg-gray-200 text-gray-700 text-[10px] flex items-center justify-center font-bold">
                2
              </span>
            </button>

            <button className="hidden lg:inline hover:text-[#E20074] transition-colors">
              My Favorites
            </button>

            {/* Profile Avatar Bubble */}
            <div className="flex items-center gap-1 cursor-pointer pl-1">
              <div className="w-7 h-7 rounded-full bg-gray-200 border border-gray-300 text-gray-700 flex items-center justify-center font-bold text-xs">
                TP
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </div>

            <button className="flex items-center gap-1 hover:text-[#E20074] transition-colors">
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
            </button>

            <button className="hidden md:inline hover:text-[#E20074] transition-colors">
              Tours
            </button>
          </div>
        </div>
      </header>

      {/* 3. Authentic T-Mobile Magenta Navigation Bar */}
      <nav className="bg-[#E20074] text-white font-medium text-xs shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center overflow-x-auto no-scrollbar">
          {COMPASS_NAV.mainCategories.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                sound.playClick();
                setActiveTab(item.name);
              }}
              className={`px-4 py-3 flex items-center gap-1 whitespace-nowrap transition-colors border-b-2 font-semibold ${
                activeTab === item.name
                  ? 'border-white bg-black/10'
                  : 'border-transparent hover:bg-black/5 opacity-90 hover:opacity-100'
              }`}
            >
              <span>{item.name}</span>
              {item.hasDropdown && <ChevronDown className="w-3 h-3 opacity-80" />}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
        {/* 4. Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
          <span className="hover:text-[#E20074] cursor-pointer">Home</span>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-900 font-bold">Technology Services</span>
        </div>

        {/* 5. Hero Banner (Neon Magenta Cityscape) */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-[#110519] min-h-[190px] flex items-center">
          {/* Cityscape background image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/hero-banner.png"
              alt="Technology Services Cityscape"
              className="w-full h-full object-cover opacity-85 object-center"
              onError={(e) => {
                // Fallback styled neon cityscape gradient
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
            {/* Magenta dark gradient overlay to ensure text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
          </div>

          {/* Text Content Overlay */}
          <div className="relative z-10 p-6 sm:p-8 max-w-xl text-white space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Technology Services
            </h1>
            <p className="text-xs sm:text-sm text-gray-200 font-normal leading-relaxed">
              Technical support for your personal devices and shared workplace equipment
            </p>
          </div>

          {/* Top Right Favorite Heart Box */}
          <button
            onClick={() => {
              sound.playClick();
              setIsFavorited(!isFavorited);
            }}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg bg-black/40 hover:bg-black/60 border border-white/20 text-white flex items-center justify-center transition-all"
            title="Add to Favorites"
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorited ? 'fill-[#E20074] text-[#E20074]' : 'text-white'
              }`}
            />
          </button>

          {/* Center Video/Media Playback Controls Simulation */}
          <div className="absolute bottom-4 right-1/2 translate-x-1/2 z-10 flex items-center gap-3 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/70 text-xs">
            <VolumeX className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
            <div className="w-[1px] h-3 bg-white/20" />
            <Volume2 className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
            <div className="w-[1px] h-3 bg-white/20" />
            <MoreHorizontal className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* 6. Featured Services Row (Ask TeSS! and TechExpress) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Ask TeSS! */}
          <div
            onClick={() => {
              sound.playClick();
              onOpenChat();
            }}
            className="group bg-white rounded-2xl p-5 border border-gray-200 hover:border-[#E20074] hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center gap-4 relative overflow-hidden"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-full bg-[#E20074] flex items-center justify-center overflow-hidden shadow-md">
              <img
                src="/tess-icon.png"
                alt="Ask TeSS!"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-gray-950 group-hover:text-[#E20074] transition-colors">
                  Ask TeSS!
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E20074]/10 text-[#E20074] font-bold">
                  Instant AI
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-normal">
                Get instant IT help or connect to the Service Desk.
              </p>
            </div>

            <div className="ml-auto pr-2 text-gray-300 group-hover:text-[#E20074] transition-colors">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>

          {/* Card 2: TechExpress */}
          <div
            onClick={() => {
              sound.playClick();
              onOpenChat('Book an appointment at the TechExpress Bar for hardware support');
            }}
            className="group bg-white rounded-2xl p-5 border border-gray-200 hover:border-[#E20074] hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center gap-4 relative overflow-hidden"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm p-2">
              <img
                src="/techexpress-icon.png"
                alt="TechExpress"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-gray-950 group-hover:text-[#E20074] transition-colors">
                  TechExpress
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-bold">
                  Bellevue & Remote
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-normal">
                Join the queue or make an appointment - hardware help is just a click away.
              </p>
            </div>

            <div className="ml-auto pr-2 text-gray-300 group-hover:text-[#E20074] transition-colors">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* 7. Technology Services Topics */}
        <div className="space-y-3 pt-2">
          <h2 className="text-sm font-bold text-gray-900 tracking-tight">
            Technology Services topics
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {TOPICS_DATA.map((t) => {
              let IconComponent = Laptop;
              if (t.iconName === 'badge') IconComponent = CreditCard;
              if (t.iconName === 'key') IconComponent = Key;
              if (t.iconName === 'clipboard') IconComponent = ClipboardList;
              if (t.iconName === 'onboarding') IconComponent = UserPlus;

              return (
                <button
                  key={t.id}
                  onClick={() => handleTopicClick(t)}
                  className="bg-white rounded-xl p-3 border border-gray-200 hover:border-[#E20074] hover:shadow-md transition-all text-left flex items-center gap-2.5 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-pink-50 border border-pink-100 text-[#E20074] flex items-center justify-center shrink-0 group-hover:bg-[#E20074] group-hover:text-white transition-colors">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-gray-800 group-hover:text-[#E20074] transition-colors line-clamp-2 leading-tight">
                    {t.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 8. Lower Split: Support Resources vs My Active Items */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Left: Support resources (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900 tracking-tight">
                Support resources
              </h2>
              <span className="text-xs text-[#E20074] font-semibold cursor-pointer hover:underline">
                View all articles
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 overflow-hidden shadow-xs">
              {SUPPORT_RESOURCES.map((res) => (
                <div
                  key={res.id}
                  onClick={() => onOpenChat(`Help me with: ${res.title}`)}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors flex items-start justify-between gap-4 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded bg-gray-100 text-gray-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:text-[#E20074]">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#E20074] transition-colors">
                        {res.title}
                      </h4>
                      <div className="flex items-center gap-3 text-[11px] text-gray-500 font-mono mt-1">
                        <span>{res.category}</span>
                        <span>·</span>
                        <span>{res.readTime}</span>
                        <span>·</span>
                        <span>{res.views} views</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#E20074] shrink-0 mt-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: My active items (1 col) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900 tracking-tight">
                My active items
              </h2>
              <span className="text-xs text-[#E20074] font-semibold cursor-pointer hover:underline">
                Track all
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 overflow-hidden shadow-xs">
              {ACTIVE_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onOpenChat(`What is the status of ${item.number} (${item.title})?`)}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors space-y-1.5 group"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-[#E20074] font-bold">{item.number}</span>
                    <span className="text-gray-400 font-mono">{item.updated}</span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#E20074] transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
                    <span>{item.stage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Floating Ask TeSS Chat Launcher Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            sound.playClick();
            onOpenChat();
          }}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#E20074] hover:bg-[#c40064] text-white shadow-xl shadow-[#E20074]/30 transition-all hover:scale-105 active:scale-95 border-2 border-white"
        >
          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center overflow-hidden">
            <img src="/tess-icon.png" alt="TeSS" className="w-full h-full object-cover" />
          </div>
          <span className="text-xs font-bold tracking-wide">Ask TeSS!</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      </div>
    </div>
  );
};
