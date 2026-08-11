# FinSight System Architecture

## Overview
FinSight is a financial intelligence and risk analytics platform built using a clean monorepo architecture. 

```
                                  ┌───────────────────────────┐
                                  │   React 18 + Vite UI      │
                                  │ (Analytical Dashboard)    │
                                  └─────────────┬─────────────┘
                                                │ REST / JSON
                                                ▼
                                  ┌───────────────────────────┐
                                  │     FastAPI Backend       │
                                  │  (Pydantic v2 + OpenAPI)  │
                                  └──────┬──────┬──────┬──────┘
                                         │      │      │
                    ┌────────────────────┘      │      └────────────────────┐
                    ▼                           ▼                           ▼
        ┌───────────────────────┐   ┌───────────────────────┐   ┌───────────────────────┐
        │ Quantitative Engine   │   │  Machine Learning     │   │ RAG Intelligence Engine│
        │ • Market Analytics    │   │ • Feature Pipeline    │   │ • Ingestion & Chunking│
        │ • Portfolio VaR & MCR │   │ • Market Regime GMM   │   │ • Embeddings Vector DB│
        │ • Black-Scholes Greeks│   │ • Volatility Predict  │   │ • LLM Grounding + Source│
        └───────────┬───────────┘   └───────────┬───────────┘   └───────────┬───────────┘
                    │                           │                           │
                    └────────────────────┬──────┴───────────────────────────┘
                                         ▼
                             ┌───────────────────────┐
                             │ PostgreSQL Database   │
                             │  (SQLAlchemy 2.0 ORM) │
                             └───────────────────────┘
```

## Key Architectural Principles
1. **Abstract Data Ingestion**: The system uses `AbstractMarketDataProvider` to decouple financial analytics and ML models from data vendors.
2. **Time-Series ML Validation**: Zero look-ahead bias and data leakage by employing purged time-series validation.
3. **Modular RAG Pipeline**: Clear separation between document ingestion, chunking, vector storage, retrieval, context formatting, and LLM generation.
4. **Backend API Security Proxying**: All LLM API keys and market credentials reside strictly inside the backend environment.
5. **Analytical UI Priority**: The frontend prioritizes clear financial charts, risk tables, and model transparency over superficial decorative visual elements.
