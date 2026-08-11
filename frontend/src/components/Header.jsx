import React from 'react';
import { Search, Bell, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';

export default function Header({ searchQuery, setSearchQuery, onRefresh }) {
  return (
    <header className="top-header">
      <div className="search-box">
        <Search size={16} color="var(--text-secondary)" />
        <input
          type="text"
          placeholder="Search models, prompt traces, tasks..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <button
          onClick={onRefresh}
          className="glass-panel"
          style={{ padding: '0.45rem 0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', border: '1px solid var(--border-color)', fontSize: '0.8rem', background: 'transparent' }}
          title="Refresh Live Metrics"
        >
          <RefreshCw size={14} />
          <span>Refresh</span>
        </button>

        <div className="status-indicator">
          <span className="status-dot"></span>
          <span>CLI & Cluster Online</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderLeft: '1px solid var(--border-color)', paddingLeft: '1.25rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--gradient-cyan-purple)', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
            AG
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Antigravity Dev</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>CLI Lease Active</div>
          </div>
        </div>
      </div>
    </header>
  );
}
