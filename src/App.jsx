import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KpiCards from './components/KpiCards';
import ModelComparison from './components/ModelComparison';
import PromptSimulator from './components/PromptSimulator';
import AgentMonitor from './components/AgentMonitor';
import { Sparkles, Activity, ShieldCheck, Zap } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const [kpis, setKpis] = useState({
    tokensProcessed: '14.8 M',
    avgLatency: '118 ms',
    activeModels: '4 / 4',
    estimatedCost: '$1.12'
  });

  const handleRefresh = () => {
    setKpis({
      tokensProcessed: `${(14.8 + Math.random() * 0.5).toFixed(1)} M`,
      avgLatency: `${Math.floor(110 + Math.random() * 15)} ms`,
      activeModels: '4 / 4',
      estimatedCost: `$${(1.12 + Math.random() * 0.05).toFixed(2)}`
    });
  };

  const handleSimulationComplete = (newTokens) => {
    // Increment tokens metric live
    setKpis(prev => {
      const current = parseFloat(prev.tokensProcessed);
      return {
        ...prev,
        tokensProcessed: `${(current + newTokens / 1000000).toFixed(2)} M`
      };
    });
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="main-wrapper">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onRefresh={handleRefresh}
        />

        <main className="content-area">
          {/* Top Welcome & Context Banner */}
          <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(56, 189, 248, 0.08) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                <span className="badge badge-running">
                  <Sparkles size={12} /> Google Antigravity 2.0 Engine
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Connected to workspace: antigravity123</span>
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
                Nexus <span className="text-gradient">AI Command Center</span>
              </h1>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Real-time telemetry, model benchmark matrix, live token streaming simulator, and subagent process monitoring.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <div className="glass-panel" style={{ padding: '0.75rem 1.25rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>DEFAULT MODEL</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>Gemini 3.6 Flash (High)</div>
              </div>
              <div className="glass-panel" style={{ padding: '0.75rem 1.25rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>SYSTEM HEALTH</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>99.98% Optimal</div>
              </div>
            </div>
          </div>

          {/* Dynamic Views */}
          {activeTab === 'overview' && (
            <div className="dashboard-section">
              <KpiCards kpis={kpis} />
              <ModelComparison searchQuery={searchQuery} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <PromptSimulator onSimulationComplete={handleSimulationComplete} />
                <AgentMonitor searchQuery={searchQuery} />
              </div>
            </div>
          )}

          {activeTab === 'models' && (
            <div className="dashboard-section">
              <ModelComparison searchQuery={searchQuery} />
            </div>
          )}

          {activeTab === 'playground' && (
            <div className="dashboard-section">
              <PromptSimulator onSimulationComplete={handleSimulationComplete} />
            </div>
          )}

          {activeTab === 'agents' && (
            <div className="dashboard-section">
              <AgentMonitor searchQuery={searchQuery} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
