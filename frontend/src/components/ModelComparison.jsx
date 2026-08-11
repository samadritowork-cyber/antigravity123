import React, { useState } from 'react';
import { Cpu, CheckCircle2, Zap, Sparkles, Filter, Award } from 'lucide-react';

export default function ModelComparison({ searchQuery }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const models = [
    {
      name: 'Gemini 3.6 Flash (High)',
      tagline: 'Recommended for daily CLI & fast pair-programming',
      type: 'Flash',
      context: '1,000,000 tokens',
      latency: '120 ms',
      throughput: '185 tok/s',
      cost: '$0.075 / 1M',
      accuracy: 94.8,
      recommended: true,
      status: 'Active'
    },
    {
      name: 'Gemini 3.6 Pro',
      tagline: 'Deep reasoning, multi-file refactoring & architecture',
      type: 'Pro',
      context: '2,000,000 tokens',
      latency: '340 ms',
      throughput: '95 tok/s',
      cost: '$1.250 / 1M',
      accuracy: 98.2,
      recommended: false,
      status: 'Active'
    },
    {
      name: 'Gemini Flash Lite',
      tagline: 'Ultra-low latency for search & quick lookups',
      type: 'Lite',
      context: '500,000 tokens',
      latency: '65 ms',
      throughput: '260 tok/s',
      cost: '$0.020 / 1M',
      accuracy: 89.4,
      recommended: false,
      status: 'Ready'
    },
    {
      name: 'Gemini 3.0 Ultra (Experimental)',
      tagline: 'High-capability reasoning for massive codebases',
      type: 'Ultra',
      context: '2,000,000 tokens',
      latency: '580 ms',
      throughput: '60 tok/s',
      cost: '$3.500 / 1M',
      accuracy: 99.1,
      recommended: false,
      status: 'Preview'
    }
  ];

  const filteredModels = models.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || m.type.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu color="var(--accent-cyan)" size={20} />
            Model Performance & Benchmark Matrix
          </h2>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Compare benchmark scores, token throughput speeds, and cost metrics across available Google Antigravity models.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', 'flash', 'pro', 'lite', 'ultra'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-color)',
                background: selectedCategory === cat ? 'var(--accent-cyan)' : 'rgba(15, 23, 42, 0.6)',
                color: selectedCategory === cat ? '#090d16' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: 0.78 + 'rem',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Model Name</th>
              <th>Context Window</th>
              <th>Avg TTFT Latency</th>
              <th>Throughput</th>
              <th>Cost / 1M Tokens</th>
              <th>Eval Benchmark Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredModels.map((model, idx) => (
              <tr key={idx}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{model.name}</div>
                    {model.recommended && (
                      <span style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem', borderRadius: 'var(--radius-full)', background: 'rgba(56, 189, 248, 0.2)', color: 'var(--accent-cyan)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                        <Award size={10} /> Recommended
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{model.tagline}</div>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{model.context}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-emerald)' }}>{model.latency}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>{model.throughput}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{model.cost}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="progress-bar-bg" style={{ width: '100px' }}>
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${model.accuracy}%`,
                          background: model.accuracy > 95 ? 'var(--gradient-emerald)' : 'var(--gradient-cyan-purple)'
                        }}
                      ></div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600 }}>{model.accuracy}%</span>
                  </div>
                </td>
                <td>
                  <span className={`badge ${model.status === 'Active' ? 'badge-completed' : 'badge-queued'}`}>
                    {model.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
