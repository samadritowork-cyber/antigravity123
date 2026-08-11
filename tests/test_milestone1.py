import pytest
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.core.config import settings
from backend.app.core.disclaimer import get_disclaimer, FINANCIAL_DISCLAIMER_TEXT
from data.providers.base import AbstractMarketDataProvider
from data.providers.yfinance_provider import YFinanceProvider

client = TestClient(app)


def test_health_check():
    """Verify health check endpoint returns 200 and healthy status."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "FinSight" in data["service"]


def test_disclaimer_endpoint():
    """Verify disclaimer endpoint returns educational compliance text."""
    response = client.get("/disclaimer")
    assert response.status_code == 200
    data = response.json()
    assert data["is_educational_only"] is True
    assert FINANCIAL_DISCLAIMER_TEXT in data["disclaimer"]


def test_settings_config():
    """Verify pydantic settings load defaults correctly."""
    assert settings.PROJECT_NAME != ""
    assert isinstance(settings.cors_origins, list)


def test_data_provider_interface():
    """Verify YFinanceProvider adheres to AbstractMarketDataProvider interface."""
    provider = YFinanceProvider()
    assert isinstance(provider, AbstractMarketDataProvider)
