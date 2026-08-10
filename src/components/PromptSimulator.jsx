import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Sparkles, Terminal as TermIcon, Sliders, Zap, CheckCircle } from 'lucide-react';

export default function PromptSimulator({ onSimulationComplete }) {
  const [prompt, setPrompt] = useState('Refactor the memory management module in Rust to prevent allocation spikes during high throughput operations.');
  const [selectedModel, setSelectedModel] = useState('Gemini 3.6 Flash (High)');
  const [temperature, setTemperature] = useState(0.3);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamOutput, setStreamOutput] = useState('');
  const [metrics, setMetrics] = useState({ tokens: 0, ttft: 0, speed: 0, cost: 0 });

  const terminalRef = useRef(null);

  const sampleResponses = {
    'Gemini 3.6 Flash (High)': `// [Gemini 3.6 Flash Output - High Speed Execution]
pub struct MemoryPool<T> {
    storage: Vec<T>,
    capacity: usize,
}

impl<T: Default> MemoryPool<T> {
    pub font fn with_capacity(capacity: usize) -> Self {
        let mut storage = Vec::with_capacity(capacity);
        for _ in 0..capacity {
            storage.push(T::default());
        }
        MemoryPool { storage, capacity }
    }

    pub fn acquire(&mut self) -> Option<T> {
        self.storage.pop()
    }
}
// Verification: Zero heap allocations during hot-path loop. Estimated execution speed: 185 tokens/sec.`,
    'Gemini 3.6 Pro': `/* [Gemini 3.6 Pro Output - Deep Architecture Reasoning]
   1. Analyzed heap allocator telemetry logs.
   2. Identified fragmenting lock contention in multi-threaded queue.
   3. Proposed ring-buffer slab allocation with atomic atomic pointer CAS.
*/

use std::sync::atomic::{AtomicUsize, Ordering};

pub struct SlabAllocator {
    head: AtomicUsize,
    tail: AtomicUsize,
    buffer_size: usize,
}

// Lock-free queue guarantee: O(1) Push and Pop under high concurrency without lock spinning.`,
    'Gemini Flash Lite': `// [Gemini Flash Lite Output - Ultra-Low Latency Search & Inline Fix]
// Quick inline patch: Replace dynamic Box allocation with static stack buffer.
let mut buffer = [0u8; 4096];
// Done in 45ms.`
  };

  const handleSimulate = () => {
    if (isStreaming) return;
    setIsStreaming(true);
    setStreamOutput('');
    setMetrics({ tokens: 0, ttft: 110, speed: 0, cost: 0 });

    const fullText = sampleResponses[selectedModel] || sampleResponses['Gemini 3.6 Flash (High)'];
    const words = fullText.split(' ');
    let currentWordIndex = 0;
    let accumulatedText = '';
    const startTime = Date.now();

    const interval = setInterval(() => {
      if (currentWordIndex < words.length) {
        accumulatedText += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex];
        setStreamOutput(accumulatedText);
        
        const elapsedTime = (Date.now() - startTime) / 1000;
        const generatedTokens = Math.floor(accumulatedText.length / 4);
        const currentSpeed = elapsedTime > 0 ? Math.round(generatedTokens / elapsedTime) : 0;
        const currentCost = (generatedTokens * 0.0000001).toFixed(6);

        setMetrics({
          tokens: generatedTokens,
          ttft: 110,
          speed: currentSpeed,
          cost: currentCost
        });

        currentWordIndex++;
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        setIsStreaming(false);
        if (onSimulationComplete) {
          onSimulationComplete(Math.floor(fullText.length / 4));
        }
      }
    }, 40);
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles color="var(--accent-purple)" size={20} />
            Live Prompt & Token Generation Simulator
          </h2>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Simulate token stream responses, track time-to-first-token (TTFT), and evaluate model inference latency in real time.
          </p>
        </div>
      </div>

      <div className="simulator-container">
        <div className="editor-box glass-panel" style={{ background: 'rgba(12, 16, 29, 0.5)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              PROMPT INPUT
            </label>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {prompt.length} characters
            </span>
          </div>

          <textarea
            className="prompt-textarea"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your prompt instruction here..."
          />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>Target Model</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  style={{
                    background: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    padding: '0.4rem 0.8rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    outline: 'none'
                  }}
                >
                  <option value="Gemini 3.6 Flash (High)">Gemini 3.6 Flash (High)</option>
                  <option value="Gemini 3.6 Pro">Gemini 3.6 Pro</option>
                  <option value="Gemini Flash Lite">Gemini Flash Lite</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>Temperature ({temperature})</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  style={{ width: '100px', accentColor: 'var(--accent-cyan)' }}
                />
              </div>
            </div>

            <button
              onClick={handleSimulate}
              disabled={isStreaming}
              className="button-primary"
            >
              {isStreaming ? (
                <>
                  <Square size={16} fill="white" />
                  <span>Streaming Tokens...</span>
                </>
              ) : (
                <>
                  <Play size={16} fill="white" />
                  <span>Run Token Simulation</span>
                </>
              )}
            </button>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <TermIcon size={16} color="var(--accent-cyan)" />
              <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                STREAM OUTPUT TERMINAL
              </span>
            </div>

            <div className="output-terminal" ref={terminalRef}>
              {streamOutput || <span style={{ color: 'var(--text-muted)' }}>Click "Run Token Simulation" to stream tokens live...</span>}
            </div>
          </div>
        </div>

        {/* Live Metrics Sidebar Panel */}
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexContent: 'column', gap: '1.25rem', background: 'rgba(12, 16, 29, 0.6)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            Inference Telemetry
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="glass-panel" style={{ padding: '0.85rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Generated Tokens</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
                {metrics.tokens}
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '0.85rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Streaming Speed</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)' }}>
                {metrics.speed} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>tok/s</span>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '0.85rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>TTFT Latency</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-purple)' }}>
                {metrics.ttft} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ms</span>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '0.85rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Estimated Prompt Cost</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)' }}>
                ${metrics.cost}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
