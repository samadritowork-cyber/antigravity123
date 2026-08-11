# FinSight Cloud Deployment & Container Architecture

## AWS Deployment Architecture

```
                                    ┌──────────────────────┐
                                    │    Route 53 / ALB    │
                                    └──────────┬───────────┘
                                               │
                                 ┌─────────────┴─────────────┐
                                 ▼                           ▼
                    ┌─────────────────────────┐ ┌─────────────────────────┐
                    │ AWS App Runner / ECS    │ │ AWS App Runner / ECS    │
                    │ (FastAPI Backend)       │ │ (React Frontend)        │
                    └────────────┬────────────┘ └─────────────────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │ AWS RDS PostgreSQL      │
                    │ (Managed Database)      │
                    └─────────────────────────┘
```

## Security & Secrets Management
- All API keys (`LLM_API_KEY`, DB passwords) managed via AWS Secrets Manager or Environment Variables.
- No direct external access to database instances.
- HTTPS enforced across all endpoints.
