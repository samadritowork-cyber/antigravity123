# ⚡ Nexus AI Analytics & Command Center Hub

> State-of-the-art AI Analytics, Model Benchmarking, and Autonomous Subagent Monitoring Command Center built with **React**, **Vite**, **Vanilla CSS Glassmorphism**, and **Lucide Icons**.

---

## 🌟 Key Features

* 📊 **Real-time Telemetry & KPI Cards**: Track total token throughput, time-to-first-token (TTFT) latency, active model instances, and estimated API costs with dynamic SVG sparkline charts.
* 🤖 **AI Model Benchmark Matrix**: Compare evaluation scores, context window limits, token generation speeds (`tok/s`), and cost metrics across **Gemini 3.6 Flash (High)**, **Gemini 3.6 Pro**, **Gemini Flash Lite**, and **Gemini Ultra**.
* ⚡ **Live Prompt & Token Simulator**: Emulate real-time LLM token streaming with adjustable temperature, token generation speed counters, and an auto-scrolling terminal display.
* 🛰️ **Autonomous Subagents Monitor**: Track background subagents executing concurrent research, edge-case test generation, and code profiling with progress bars and terminal logs.
* 🎨 **Dark Glassmorphism Design System**: Built with modern typography (`Outfit`, `Inter`, `JetBrains Mono`), vibrant HSL gradients, high-contrast glass backdrop filters, and smooth micro-animations.

---

## 🏗️ Tech Stack

* **Frontend Library**: [React 18](https://react.dev/)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Styling**: Vanilla CSS (Custom Design System with Variables & Glassmorphism)
* **Iconography**: [Lucide React](https://lucide.dev/)
* **Fonts**: Google Fonts (`Outfit`, `Inter`, `JetBrains Mono`)

---

## 🚀 Quick Start

### Prerequisites
* **Node.js** (v18.0.0 or higher)
* **npm** (v9.0.0 or higher)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/samadritowork-cyber/antigravity123.git
   cd antigravity123
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000/`.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📁 Project Architecture

```
antigravity123/
├── index.html              # HTML5 entry with Google Fonts & SEO metadata
├── package.json            # Project dependencies and npm scripts
├── vite.config.js          # Vite server configuration (Port 3000)
├── src/
│   ├── main.jsx            # React root mount entry point
│   ├── App.jsx             # Shell container managing active tabs & global telemetry
│   ├── index.css           # Glassmorphism design tokens & global CSS styles
│   └── components/
│       ├── Sidebar.jsx     # Navigation sidebar & active lease status
│       ├── Header.jsx      # Top bar search input & telemetry refresh action
│       ├── KpiCards.jsx    # Metric cards with SVG sparkline trends
│       ├── ModelComparison.jsx # Benchmark comparison matrix table
│       ├── PromptSimulator.jsx # Real-time token streaming playground & terminal
│       └── AgentMonitor.jsx  # Background subagent task timeline tracker
└── README.md
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
