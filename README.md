# 📈 FinSight — AI-Powered Financial Research & Risk Analytics Platform

> Production-grade quantitative finance, machine learning, financial RAG intelligence, and risk analytics platform built with **FastAPI**, **PostgreSQL**, **scikit-learn**, **React**, and **Docker**.

---

### ⚠️ Educational Disclaimer
**FinSight is built strictly for quantitative research and educational purposes. It does not provide personalized investment, financial, tax, or legal advice. All analytics, derivatives calculations, risk estimates, and machine learning models are theoretical representations.**

---

## 🌟 Architecture & Key Features

* 📊 **Quantitative Market Analytics**: Daily/annualized returns, volatility, Sharpe ratio, Sortino ratio, Beta, Max Drawdown, Parametric & Historical Value at Risk (VaR).
* 💼 **Portfolio Risk & Attribution Engine**: Asset risk contribution (Marginal Contribution to Risk - MCR), concentration risk (HHI), correlation matrices, and portfolio VaR.
* 📈 **Derivatives & Options Analytics**: Analytical Black-Scholes pricing engine & complete Greeks suite ($\Delta, \Gamma, \mathcal{V}, \Theta, \rho$).
* 🤖 **Defensible Machine Learning Pipeline**: 
  - Model comparison across **Statistical Baseline**, **Supervised Classifier**, and **Unsupervised GMM Regime Detector**.
  - Strict **time-series validation** with purging/embargoing to guarantee zero look-ahead bias and data leakage.
* 🧠 **Modular RAG Intelligence Assistant**: Grounded financial Q&A over financial reports and news with explicit source citations and metadata preservation.
* 🛡️ **Abstract Data Ingestion Layer**: Provider abstraction layer decoupling market analytics from vendor APIs (`AbstractMarketDataProvider` -> `YFinanceProvider`).
* 🔐 **Secure Backend API Proxy**: Zero client-side API key leakage; all external models and LLM integrations are proxied backend-side via FastAPI.

---

## 🏗️ Repository Architecture

```
antigravity123/
├── backend/            # FastAPI application & core configuration
│   └── app/
│       ├── api/        # REST API Endpoints
│       ├── core/       # Settings, Logging, Disclaimer
│       └── main.py     # FastAPI application entrypoint
├── data/               # Market Data Provider Abstraction Layer
│   └── providers/      # AbstractMarketDataProvider & YFinanceProvider
├── finance/            # Quantitative Financial Engine
├── ml/                 # Machine Learning Pipeline & Time-Series Validation
├── rag/                # Modular Financial RAG System
├── frontend/           # React 18 + Vite Analytics UI
├── tests/              # Pytest Suite
├── docs/               # Comprehensive System Documentation
├── requirements.txt    # Python production dependencies
├── .env.example        # Configuration template
└── README.md
```

---

## 🚀 Quick Start (Development)

### Prerequisites
* Python 3.10+
* Node.js v18+ & npm

### Setup
1. **Clone repository & enter environment:**
   ```bash
   git clone https://github.com/samadritowork-cyber/antigravity123.git
   cd antigravity123
   ```
2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
3. **Run unit tests:**
   ```bash
   pytest
   ```
4. **Start FastAPI backend:**
   ```bash
   python -m backend.app.main
   ```
   Backend interactive API docs will be available at `http://localhost:8000/docs`.

---

