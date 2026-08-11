from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
import pandas as pd


class AbstractMarketDataProvider(ABC):
    """
    Abstract Interface for Financial Market Data Providers.
    Decouples financial analytics and ML features from underlying data APIs (yfinance, Alpha Vantage, Polygon, etc.).
    """

    @abstractmethod
    def fetch_historical_bars(
        self, symbol: str, start_date: str, end_date: str, interval: str = "1d"
    ) -> pd.DataFrame:
        """
        Fetch historical price bars.
        
        Returned DataFrame MUST contain standard columns:
        ['date', 'open', 'high', 'low', 'close', 'adj_close', 'volume', 'symbol']
        """
        pass

    @abstractmethod
    def fetch_quote(self, symbol: str) -> Dict[str, Any]:
        """Fetch current market snapshot/quote for a given symbol."""
        pass

    @abstractmethod
    def validate_symbol(self, symbol: str) -> bool:
        """Verify if a ticker symbol exists and is active."""
        pass
