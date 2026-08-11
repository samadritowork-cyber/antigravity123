import React from 'react';
import { Cpu, Zap, DollarSign, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function KpiCards({ kpis }) {
  const cards = [
    {
      title: 'Tokens Processed (24h)',
      value: kpis.tokensProcessed,
      change: '+18.4%',
      positive: true,
      icon: Zap,
      color: 'var(--accent-cyan)',
      sparkline: 'M0 25 Q 15 5, 30 18 T 60 10 T 90 22 T 120 5'
    },
    {
      title: 'Avg Latency (TTFT)',
      value: kpis.avgLatency,
      change: '-12.3ms',
      positive: true,
      icon: Clock,
      color: 'var(--accent-emerald)',
      sparkline: 'M0 10 Q 20 22, 40 12 T 80 25 T 120 8'
    },
    {
      title: 'Active Model Instances',
      value: kpis.activeModels,
      change: '+2 instances',
      positive: true,
      icon: Cpu,
      color: 'var(--accent-purple)',
      sparkline: 'M0 18 Q 30 10, 60 20 T 90 8 T 120 15'
    },
    {
      title: 'Estimated API Cost',
      value: kpis.estimatedCost,
      change: '-4.2%',
      positive: true,
      icon: DollarSign,
      color: 'var(--accent-amber)',
      sparkline: 'M0 20 Q 25 15, 50 25 T 75 10 T 120 18'
    }
  ];

  return (
    <div className="kpi-grid">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div key={index} className="glass-panel glass-panel-interactive kpi-card">
            <div className="kpi-header">
              <span className="kpi-title">{card.title}</span>
              <div className="kpi-icon-wrapper" style={{ color: card.color }}>
                <Icon size={20} />
              </div>
            </div>

            <div className="kpi-value">{card.value}</div>

            <div className="kpi-footer">
              <span className={`trend-badge ${card.positive ? 'positive' : 'negative'}`}>
                {card.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {card.change}
              </span>

              {/* Sparkline SVG */}
              <svg width="100" height="30" viewBox="0 0 120 30" style={{ overflow: 'visible' }}>
                <path
                  d={card.sparkline}
                  fill="none"
                  stroke={card.color}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
