import os
from typing import List, Union
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "FinSight — AI-Powered Financial Research & Risk Platform"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # Database Settings
    DATABASE_URL: str = "postgresql://finsight_user:finsight_pass@localhost:5432/finsight_db"

    # LLM & RAG Configuration (Stored backend-side ONLY)
    LLM_PROVIDER: str = "openai"
    LLM_API_KEY: str = ""
    EMBEDDING_MODEL_NAME: str = "sentence-transformers/all-MiniLM-L6-v2"

    # Market Data Provider
    MARKET_DATA_PROVIDER: str = "yfinance"

    # CORS Configuration
    ALLOWED_ORIGINS: Union[str, List[str]] = "http://localhost:3000,http://localhost:5173"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    @property
    def cors_origins(self) -> List[str]:
        if isinstance(self.ALLOWED_ORIGINS, str):
            return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",") if origin.strip()]
        return self.ALLOWED_ORIGINS


settings = Settings()
