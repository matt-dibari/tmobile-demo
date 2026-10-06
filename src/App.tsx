import { useState } from 'react';
import { CompassWebsite } from './components/compass/CompassWebsite';
import { RichChatInterface } from './components/chat/RichChatInterface';
import { AgentConsoleView } from './components/agent/AgentConsoleView';
import { DemoControlsBar } from './components/compass/DemoControlsBar';
import type { DemoViewLayout, DemoPerspective } from './components/compass/DemoControlsBar';
import type { ChatMessage } from './data/compassData';
import { INITIAL_CHAT_MESSAGES } from './data/compassData';

export function App() {
  const [perspective, setPerspective] = useState<DemoPerspective>('user');
  const [demoLayout, setDemoLayout] = useState<DemoViewLayout>('split');
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);
  const [showBrowserChrome, setShowBrowserChrome] = useState(true);
  const [chatSeedPrompt, setChatSeedPrompt] = useState<string | undefined>(undefined);
  const [isEscalated, setIsEscalated] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);

  // Handle messages from the user to TeSS
  const handleUserSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text,
    };

    setMessages((prev) => [...prev, userMsg]);

    const lower = text.toLowerCase();

    // Check for human escalation keywords
    if (
      lower.includes('human') ||
      lower.includes('agent') ||
      lower.includes('escalate') ||
      lower.includes('representative') ||
      lower.includes('specialist') ||
      lower.includes('person') ||
      lower.includes('desk')
    ) {
      setIsEscalated(true);
      setTimeout(() => {
        const reply: ChatMessage = {
          id: `tess-${Date.now()}`,
          sender: 'tess',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: "I am connecting you with an IT Service Desk Specialist. Your session context, telemetry, and pre-checks have been transferred to Sarah K. at the Bellevue IT Bar.",
          richWidget: { type: 'escalation_card' },
          suggestedActions: ['🏢 Request Badge Access', '⚡ Book TechExpress Appointment'],
        };
        setMessages((prev) => [...prev, reply]);
      }, 700);
      return;
    }

    // Standard TeSS rich response generator
    setTimeout(() => {
      let reply: ChatMessage;

      if (
        lower.includes('group') ||
        lower.includes('servicenow') ||
        lower.includes('create request') ||
        lower.includes('catalog')
      ) {
        reply = {
          id: `tess-${Date.now()}`,
          sender: 'tess',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: "I can help with that. Using the ServiceNow Actions V2 integration, I've prepared the Request Group Access catalog form for you below:",
          richWidget: { type: 'servicenow_request' },
          suggestedActions: ['🏢 Request Badge Access', '⚡ Book TechExpress Appointment', '👤 Speak to Human Specialist'],
        };
      } else if (
        lower.includes('badge') ||
        lower.includes('rfid') ||
        lower.includes('building') ||
        (lower.includes('access') && !lower.includes('group'))
      ) {

        reply = {
          id: `tess-${Date.now()}`,
          sender: 'tess',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: "I can authorize badge access for you right now. I've pulled up your security profile with pre-clearance for Bellevue HQ Building 4. Please verify and confirm below:",
          richWidget: { type: 'badge_access' },
          suggestedActions: ['⚡ Book TechExpress Appointment', '👤 Speak to Human Agent'],
        };
      } else if (
        lower.includes('techexpress') ||
        lower.includes('laptop') ||
        lower.includes('hardware') ||
        lower.includes('battery') ||
        lower.includes('slow')
      ) {
        reply = {
          id: `tess-${Date.now()}`,
          sender: 'tess',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: "I ran a remote diagnostic on your assigned MacBook Pro (Asset: TM-MBP-90812). Your battery health has degraded to 68% and thermal throttling is active. You can reserve a dedicated slot at the TechExpress Bar today:",
          richWidget: { type: 'techexpress_booking' },
          suggestedActions: ['🏢 Request Badge Access', '👤 Connect to Human Agent'],
        };
      } else if (
        lower.includes('approval') ||
        lower.includes('sign') ||
        lower.includes('delegate') ||
        lower.includes('aws') ||
        lower.includes('budget')
      ) {
        reply = {
          id: `tess-${Date.now()}`,
          sender: 'tess',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: "You have 1 pending high-priority IT expenditure approval awaiting your sign-off for Alex Miller's AWS sandbox cluster. Here are the details and 1-click decision card:",
          richWidget: { type: 'it_approval' },
          suggestedActions: ['⚡ Book TechExpress Appointment', '👤 Escalate to Support Desk'],
        };
      } else if (
        lower.includes('wifi') ||
        lower.includes('vpn') ||
        lower.includes('network') ||
        lower.includes('connect')
      ) {
        reply = {
          id: `tess-${Date.now()}`,
          sender: 'tess',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: "Here is your real-time network telemetry. Your corporate WiFi and GlobalProtect VPN are active, but your 802.1X certificate is expiring in 4 days. You can renew it with one click below:",
          richWidget: { type: 'network_diag' },
          suggestedActions: ['🏢 Request Badge Access', '⚡ Book TechExpress Appointment'],
        };
      } else {
        reply = {
          id: `tess-${Date.now()}`,
          sender: 'tess',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `I've analyzed your inquiry regarding "${text}". As your Compass Technology Services copilot, I can orchestrate hardware appointments, security badges, network repairs, and approvals directly. What would you like to do?`,
          suggestedActions: [
            '🏢 Request Badge Access',
            '⚡ Book TechExpress Appointment',
            '📋 Review Pending Approvals',
            '👤 Speak to Human Specialist',
          ],
        };
      }

      setMessages((prev) => [...prev, reply]);
    }, 700);
  };

  // Handle messages from the live agent in the Agent Console
  const handleAgentSendMessage = (text: string) => {
    const agentMsg: ChatMessage = {
      id: `agent-${Date.now()}`,
      sender: 'agent',
      agentName: 'Sarah K. (Tier 2 IT Specialist)',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text,
    };
    setMessages((prev) => [...prev, agentMsg]);
  };

  const handleOpenChat = (prompt?: string) => {
    setChatSeedPrompt(prompt);
    if (demoLayout === 'portal') {
      setIsChatDrawerOpen(true);
    }
  };

  const handleTriggerScenario = (prompt: string) => {
    setChatSeedPrompt(prompt);
    if (demoLayout === 'portal') {
      setIsChatDrawerOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F8] text-gray-900 flex flex-col font-sans overflow-x-hidden selection:bg-[#E20074]/20 selection:text-[#E20074]">
      {/* Top Demo Bar Controls */}
      <DemoControlsBar
        perspective={perspective}
        onSelectPerspective={(p) => setPerspective(p)}
        layout={demoLayout}
        onSelectLayout={(l) => {
          setDemoLayout(l);
          if (l === 'portal') setIsChatDrawerOpen(false);
        }}
        showBrowserChrome={showBrowserChrome}
        onToggleChrome={() => setShowBrowserChrome(!showBrowserChrome)}
        onTriggerScenario={handleTriggerScenario}
        isEscalated={isEscalated}
      />

      {/* Main Perspective Render */}
      {perspective === 'agent' ? (
        /* BACKEND AGENT CONSOLE */
        <AgentConsoleView
          onSwitchToUser={() => setPerspective('user')}
          userMessages={messages}
          onAgentSendMessage={handleAgentSendMessage}
        />
      ) : (
        /* FRONTEND USER VIEW (Compass Portal & TeSS) */
        <div className="flex-1 flex overflow-hidden relative">
          {/* LAYOUT 1: PORTAL VIEW (with floating slide-over drawer when open) */}
          {demoLayout === 'portal' && (
            <div className="w-full overflow-y-auto">
              <CompassWebsite
                onOpenChat={handleOpenChat}
                showBrowserChrome={showBrowserChrome}
              />

              {/* Slide-over Drawer for Chat */}
              {isChatDrawerOpen && (
                <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
                  <div
                    className="w-full max-w-lg h-full shadow-2xl bg-white animate-in slide-in-from-right duration-300 flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <RichChatInterface
                      isDrawer={true}
                      onClose={() => setIsChatDrawerOpen(false)}
                      initialPrompt={chatSeedPrompt}
                      messages={messages}
                      onSendMessage={handleUserSendMessage}
                      onResetMessages={() => {
                        setMessages(INITIAL_CHAT_MESSAGES);
                        setIsEscalated(false);
                      }}
                      isEscalated={isEscalated}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* LAYOUT 2: SPLIT VIEW (Compass Website on Left, Rich Chat on Right) */}
          {demoLayout === 'split' && (
            <div className="w-full flex flex-col lg:flex-row h-[calc(100vh-45px)] overflow-hidden">
              {/* Left: Compass Website (Scrollable) */}
              <div className="flex-1 lg:w-3/5 overflow-y-auto border-r border-gray-200">
                <CompassWebsite
                  onOpenChat={handleOpenChat}
                  showBrowserChrome={showBrowserChrome}
                />
              </div>

              {/* Right: Rich Chat Interface (Docked & Interactive) */}
              <div className="w-full lg:w-2/5 h-[500px] lg:h-full bg-white flex flex-col shrink-0 shadow-lg">
                <RichChatInterface
                  isDrawer={false}
                  initialPrompt={chatSeedPrompt}
                  messages={messages}
                  onSendMessage={handleUserSendMessage}
                  onResetMessages={() => {
                    setMessages(INITIAL_CHAT_MESSAGES);
                    setIsEscalated(false);
                  }}
                  isEscalated={isEscalated}
                />
              </div>
            </div>
          )}

          {/* LAYOUT 3: RICH CHAT STUDIO (Full Screen Immersive Chat) */}
          {demoLayout === 'chat' && (
            <div className="w-full max-w-4xl mx-auto h-[calc(100vh-45px)] p-4 sm:p-6 flex flex-col">
              <div className="w-full h-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col">
                <RichChatInterface
                  isDrawer={false}
                  initialPrompt={chatSeedPrompt}
                  messages={messages}
                  onSendMessage={handleUserSendMessage}
                  onResetMessages={() => {
                    setMessages(INITIAL_CHAT_MESSAGES);
                    setIsEscalated(false);
                  }}
                  isEscalated={isEscalated}
                />
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default App;
