export interface TopicItem {
  id: string;
  title: string;
  iconName: 'laptop' | 'badge' | 'key' | 'clipboard' | 'onboarding';
  description: string;
  quickPrompt: string;
}

export interface SupportResource {
  id: string;
  title: string;
  category: string;
  readTime: string;
  views: number;
}

export interface ActiveItem {
  id: string;
  type: 'Request' | 'Approval' | 'Incident';
  number: string;
  title: string;
  stage: string;
  updated: string;
  urgent?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'tess' | 'agent';
  timestamp: string;
  text: string;
  agentName?: string;
  richWidget?: {
    type: 'badge_access' | 'techexpress_booking' | 'it_approval' | 'network_diag' | 'ticket_tracker' | 'escalation_card' | 'servicenow_request';
    data?: any;
  };
  suggestedActions?: string[];
}


export interface AgentQueueItem {
  id: string;
  userName: string;
  userAvatar: string;
  userRole: string;
  department: string;
  location: string;
  topic: string;
  summary: string;
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  status: 'Waiting' | 'In Progress' | 'Resolved';
  waitTime: string;
  incidentNumber: string;
  device: string;
  aiDiagnosticPassed: string;
  sentiment: 'Frustrated' | 'Neutral' | 'Urgent';
}

export const COMPASS_NAV = {
  mainCategories: [
    { name: 'Technology Services', active: true, hasDropdown: true },
    { name: 'myHR', active: false, hasDropdown: true },
    { name: 'Corporate Real Estate', active: false, hasDropdown: false },
    { name: 'Legal Front Door', active: false, hasDropdown: true },
    { name: 'myGRC', active: false, hasDropdown: true },
  ],
  topLinks: [
    { label: 'My To-Dos', count: 3 },
    { label: 'My Requests', count: 2 },
    { label: 'My Favorites', count: 0 },
    { label: 'Cart', count: 1 },
    { label: 'Tours', count: 0 },
  ],
};

export const TOPICS_DATA: TopicItem[] = [
  {
    id: 'tech-support',
    title: 'Technology Support',
    iconName: 'laptop',
    description: 'Hardware, software, and device diagnostics',
    quickPrompt: 'My laptop is running slow and battery drains quickly',
  },
  {
    id: 'badge-access',
    title: 'Corporate Badge Access',
    iconName: 'badge',
    description: 'Building security badges, guest passes, and floor permissions',
    quickPrompt: 'I need to request badge access for Bellevue HQ Building 4',
  },
  {
    id: 'access-mgmt',
    title: 'Access Management',
    iconName: 'key',
    description: 'Okta SSO, AWS, Snowflake, GitHub, and corporate VPN access',
    quickPrompt: 'Request access to AWS Production read-only and Snowflake analytics',
  },
  {
    id: 'it-approvals',
    title: 'IT Approvals & Delegations',
    iconName: 'clipboard',
    description: 'Pending approvals, hardware orders, and delegation rules',
    quickPrompt: 'Review my pending IT hardware and software approvals',
  },
  {
    id: 'tech-onboarding',
    title: 'Technology Onboarding & Equip...',
    iconName: 'onboarding',
    description: 'New hire setup, peripheral bundles, and mobile stipends',
    quickPrompt: 'Order standard developer peripheral equipment bundle',
  },
];

export const SUPPORT_RESOURCES: SupportResource[] = [
  { id: '1', title: 'T-Mobile Corporate GlobalProtect VPN Setup Guide (macOS & Windows)', category: 'Network', readTime: '3 min read', views: 4210 },
  { id: '2', title: 'Setting up Multi-Factor Authentication (MFA) via Microsoft Authenticator', category: 'Security', readTime: '2 min read', views: 8930 },
  { id: '3', title: 'Bellevue HQ & Overland Park TechExpress Walk-in Bar Hours & Policies', category: 'Hardware', readTime: '1 min read', views: 3120 },
  { id: '4', title: 'Requesting Emergency Hardware Replacement for Field & Retail Staff', category: 'Procurement', readTime: '4 min read', views: 1540 },
];

export const ACTIVE_ITEMS: ActiveItem[] = [
  {
    id: 'item-1',
    type: 'Request',
    number: 'RITM0089214',
    title: 'Apple MacBook Pro 16" M3 Max Replacement',
    stage: 'In Fulfillment (TechExpress Queue)',
    updated: 'Today at 11:30 AM',
    urgent: true,
  },
  {
    id: 'item-2',
    type: 'Approval',
    number: 'APPR0048192',
    title: 'AWS Production Sandbox Access for Team Magenta',
    stage: 'Awaiting VP Sign-off',
    updated: 'Yesterday at 4:15 PM',
  },
  {
    id: 'item-3',
    type: 'Request',
    number: 'RITM0087612',
    title: 'Bellevue Campus Building 4 Lab RFID Access',
    stage: 'Access Granted · Card Synced',
    updated: 'Oct 04, 2026',
  },
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'tess',
    timestamp: '11:42 AM',
    text: "Hi Matt! I'm TeSS, your T-Mobile Technology Services Assistant. How can I help you today? You can ask about hardware issues, request badge access, check open requests, or speak directly to a Service Desk Specialist.",
    suggestedActions: [
      '🔑 Request Group Access',
      '🏢 Request Badge Access',
      '⚡ Book TechExpress Appointment',
      '👤 Connect to Human Agent',
    ],
  },
];


export const MOCK_AGENT_QUEUE: AgentQueueItem[] = [
  {
    id: 'queue-matt',
    userName: 'Matt DiBari',
    userAvatar: 'MD',
    userRole: 'Director, Solutions Architecture',
    department: 'Digital Product Innovation',
    location: 'Bellevue HQ - Building 2 (Floor 4)',
    topic: 'MacBook Hardware Throttle & Badge Access',
    summary: 'Device thermal throttling and 68% battery degradation. Needs TechExpress loaner staging and Building 4 lab RFID clearance for executive demo.',
    priority: 'P2',
    status: 'Waiting',
    waitTime: '0m 45s',
    incidentNumber: 'INC0091823',
    device: 'Apple MacBook Pro 16" M3 Max (TM-MBP-90812)',
    aiDiagnosticPassed: 'Battery degraded (68%), CPU throttling, Okta SSO verified',
    sentiment: 'Urgent',
  },
  {
    id: 'queue-sarah',
    userName: 'Sarah Jenkins',
    userAvatar: 'SJ',
    userRole: 'Sr. Financial Analyst',
    department: 'Corporate FP&A',
    location: 'Overland Park Campus',
    topic: 'SAP S/4HANA PO-991 Routing Failure',
    summary: 'PO-991 invoice workflow blocked on VP discount threshold error code ERR_403. Needs manual financial delegation bypass.',
    priority: 'P2',
    status: 'Waiting',
    waitTime: '1m 30s',
    incidentNumber: 'INC0091819',
    device: 'Lenovo ThinkPad X1 Carbon (TM-WIN-4412)',
    aiDiagnosticPassed: 'SAP OData endpoint authenticated, role mismatch detected',
    sentiment: 'Frustrated',
  },
  {
    id: 'queue-marcus',
    userName: 'Marcus Vance',
    userAvatar: 'MV',
    userRole: 'Network Engineer II',
    department: 'Magenta Core Infrastructure',
    location: 'Frisco Innovation Center',
    topic: 'GlobalProtect 802.1X Certificate Expired',
    summary: 'VPN reconnect looping every 60 seconds after macOS Sequoia 15.1 update. Automated profile re-push failed.',
    priority: 'P3',
    status: 'Waiting',
    waitTime: '3m 15s',
    incidentNumber: 'INC0091798',
    device: 'Apple MacBook Pro 14" M2 Pro (TM-MBP-81273)',
    aiDiagnosticPassed: '802.1X root CA expired on local keychain',
    sentiment: 'Neutral',
  },
  {
    id: 'queue-elena',
    userName: 'Elena Rostova',
    userAvatar: 'ER',
    userRole: 'HR Business Partner',
    department: 'People & Culture',
    location: 'Bellevue HQ - Building 1',
    topic: 'New Hire Equipment Staging for 12 Engineers',
    summary: 'Cohort arriving Monday Oct 13 requires pre-configured MacBook dev rigs and monitor docks delivered to Building 4 reception.',
    priority: 'P4',
    status: 'In Progress',
    waitTime: '6m 20s',
    incidentNumber: 'RITM0088912',
    device: 'Batch Order: 12x MBP 16" M3 Pro',
    aiDiagnosticPassed: 'ServiceNow catalog request pre-approved by VP',
    sentiment: 'Neutral',
  },
];
