# T-Mobile Compass × TeSS Generative AI Demo

An interactive prototype demonstrating the next-generation workplace experience for T-Mobile:
1. **T-Mobile Compass Portal**: A pixel-accurate replication of the internal Technology Services employee portal (`compass.t-mobile.com`).
2. **TeSS Rich AI Chat Interface**: Ambient assistant with generative UI, thought reasoning traces, and embedded ServiceNow forms.
3. **IT Agent Console**: Bi-directional Tier 2 Service Desk workspace with incoming chat queues, AI telemetry hand-offs, and live resolution sync.

---

## 🌟 Key Features

### 1. T-Mobile Compass Portal
- **Authentic Brand Identity**: T-Mobile Magenta (`#E20074`), custom typography, and the COMPASS starburst emblem.
- **Top Header & Global Navigation**: Quick access to *My To-Dos*, *My Requests*, *My Favorites*, and user profile controls.
- **Hero Banner**: Nighttime magenta cyber cityscape with favorite heart toggles and interactive media bar.
- **Featured Services**:
  - **Ask TeSS!**: Instant AI conversational assistant for IT self-service.
  - **TechExpress**: Hardware queue reservation and Tech Bar appointment scheduling.
- **Topics & Resources**: Corporate Badge Access, Access Management, IT Approvals, and knowledge base resources.

### 2. TeSS Rich AI Chat with Generative UI
- **ServiceNow Create Request Flow**:
  - Collapsible **`Show reasoning >`** thinking trace.
  - ServiceNow Actions V2 permission card (`Deny` / `Allow once`).
  - Embedded **ServiceNow Create Request** form with auto-filled fields, group search dropdown, and 1-click submission.
- **Corporate RFID Badge Access**:
  - Interactive digital badge preview, campus picker (Bellevue HQ Bld 4, Overland Park, Frisco), and clearance tier authorization.
- **TechExpress Diagnostic & Booking**:
  - Hardware health scan (MacBook battery health, thermal throttling), and Bellevue Tech Bar time slot selector.
- **IT Approvals**:
  - AWS Production sandbox approval with itemized budget breakdown ($4,200/mo) and 1-click Approve / Reject.
- **Self-Healing Network Diagnostic**:
  - Live Wi-Fi ping, GlobalProtect VPN status, and 802.1X certificate renewal.

### 3. Bi-Directional IT Agent Console
- **Perspective Toggle**: Switch anytime between **User View (Compass)** and **Agent Console (Backend)** via the top demo toolbar.
- **Incoming Queue**: Real-time overview of incoming employee sessions with priority badges (`P1` - `P4`), wait times, and AI summaries.
- **AI Hand-off Briefing**: Preserved telemetry and pre-checks passed by TeSS (zero re-typing).
- **Live Response & Synchronization**: Replies or one-click macros sent from the agent console immediately appear in the user's chat!

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/matt-dibari/tmobile-demo.git

# Navigate to the project directory
cd tmobile-demo

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be accessible at `http://localhost:5173/`.

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 7
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
