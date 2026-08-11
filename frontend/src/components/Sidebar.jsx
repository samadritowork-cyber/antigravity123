import React from 'react';
import { LayoutDashboard, Cpu, Terminal, Bot, Settings, Zap, Activity } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'models', label: 'Model Benchmarks', icon: Cpu, badge: 'v3.6' },
    { id: 'playground', label: 'Prompt Simulator', icon: Terminal },
    { id: 'agents', label: 'Subagents Monitor', icon: Bot, badge: '3 Active' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Zap size={22} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>Nexus AI</h2>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block' }}>Command Center</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', padding: '0 0.8rem 0.5rem' }}>
          DASHBOARD
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          );
        })}

        <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', padding: '0 0.8rem 0.5rem' }}>
            SYSTEM TIER
          </div>
          <div className="glass-panel" style={{ padding: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-emerald)', boxShadow: '0 0 8px var(--accent-emerald)' }}></div>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Gemini 3.6 Pro (High)</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Unlimited Quota • Active</div>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}
