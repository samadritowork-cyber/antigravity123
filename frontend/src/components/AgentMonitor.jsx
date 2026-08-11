import React, { useState } from 'react';
import { Bot, CheckCircle2, Clock, Loader2, Play, Terminal, Search, Filter } from 'lucide-react';

export default function AgentMonitor({ searchQuery }) {
  const [filterStatus, setFilterStatus] = useState('all');

  const agents = [
    {
      id: 'agent-sub-8812',
      role: 'Codebase Researcher & AST Inspector',
      model: 'Gemini 3.6 Flash (High)',
      task: 'Scanning third-party API dependencies and building sitemap index',
      status: 'Running',
      runtime: '4m 12s',
      stepsCompleted: 14,
      totalSteps: 18,
      lastAction: 'Reading C:/Users/samth/.gemini/config/skills/SKILL.md'
    },
    {
      id: 'agent-sub-7491',
      role: 'Unit Test Generator',
      model: 'Gemini 3.6 Pro',
      task: 'Synthesizing edge-case assertion test suites for auth handler',
      status: 'Completed',
      runtime: '1m 45s',
      stepsCompleted: 8,
      totalSteps: 8,
      lastAction: 'Verified test suite pass rate: 100% (24/24 passed)'
    },
    {
      id: 'agent-sub-9014',
      role: 'Performance Profiler & Benchmarker',
      model: 'Gemini 3.6 Flash',
      task: 'Executing high-concurrency throughput stress tests on memory buffer',
      status: 'Queued',
      runtime: '0s',
      stepsCompleted: 0,
      totalSteps: 12,
      lastAction: 'Waiting for worker process slot...'
    }
  ];

  const filteredAgents = agents.filter((ag) => {
    const matchesSearch = ag.role.toLowerCase().includes(searchQuery.toLowerCase()) || ag.task.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ag.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bot color="var(--accent-cyan)" size={20} />
            Autonomous Subagents & Task Monitor
          </h2>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Track background subagents executing concurrent research, test generation, and code profiling tasks.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', 'running', 'completed', 'queued'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-color)',
                background: filterStatus === st ? 'var(--accent-purple)' : 'rgba(15, 23, 42, 0.6)',
                color: filterStatus === st ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.75rem',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="agent-grid">
        {filteredAgents.map((agent) => (
          <div key={agent.id} className="glass-panel glass-panel-interactive agent-card">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1 }}>
              <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
                <Bot size={22} color="var(--accent-cyan)" />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{agent.role}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>[{agent.id}]</span>
                  <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: 'var(--radius-sm)', background: 'rgba(255, 255, 255, 0.06)', color: 'var(--text-secondary)' }}>
                    {agent.model}
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
                  {agent.task}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                  <Terminal size={12} />
                  <span>{agent.lastAction}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', minWidth: '160px' }}>
              <span className={`badge ${
                agent.status === 'Running' ? 'badge-running' : agent.status === 'Completed' ? 'badge-completed' : 'badge-queued'
              }`}>
                {agent.status === 'Running' && <Loader2 size={12} className="spin" style={{ animation: 'spin 2s linear infinite' }} />}
                {agent.status === 'Completed' && <CheckCircle2 size={12} />}
                {agent.status === 'Queued' && <Clock size={12} />}
                {agent.status}
              </span>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Duration: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{agent.runtime}</span>
              </div>

              <div style={{ width: '100%', marginTop: '0.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                  <span>Progress</span>
                  <span>{agent.stepsCompleted}/{agent.totalSteps} steps</span>
                </div>
                <div className="progress-bar-bg" style={{ height: '6px' }}>
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${(agent.stepsCompleted / agent.totalSteps) * 100}%`,
                      background: agent.status === 'Completed' ? 'var(--gradient-emerald)' : 'var(--gradient-cyan-purple)'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
