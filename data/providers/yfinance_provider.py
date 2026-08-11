from typing import Dict, Any
import pandas as pd
import yfinance as yf
from data.providers.base import AbstractMarketDataProvider
from backend.app.core.logging import logger


class YFinanceProvider(AbstractMarketDataProvider):
    """Concrete implementation of AbstractMarketDataProvider using Yahoo Finance."""

    def fetch_historical_bars(
        self, symbol: str, start_date: str, end_date: str, interval: str = "1d"
    ) -> pd.DataFrame:
        """Fetch historical price bars from Yahoo Finance and standardize schema."""
        logger.info(f"Fetching historical bars for {symbol} ({start_date} to {end_date})")
        try:
            ticker = yf.Ticker(symbol)
            df = ticker.history(start=start_date, end=end_date, interval=interval)
            
            if df.empty:
                logger.warning(f"No historical data returned for symbol {symbol}")
                return pd.DataFrame()

            df = df.reset_index()

            # Standardize column naming convention
            column_mapping = {
                "Date": "date",
                "Datetime": "date",
                "Open": "open",
                "High": "high",
                "Low": "low",
                "Close": "close",
                "Adj Close": "adj_close",
                "Volume": "volume",
            }
            df = df.rename(columns=column_mapping)

            if "adj_close" not in df.columns:
                df["adj_close"] = df["close"]

            df["symbol"] = symbol.upper()
            df["date"] = pd.to_datetime(df["date"]).dt.tz_localize(None)

            standard_cols = ["date", "symbol", "open", "high", "low", "close", "adj_close", "volume"]
            return df[standard_cols]
        except Exception as e:
            logger.error(f"Error fetching historical bars for {symbol}: {e}")
            raise RuntimeError(f"Failed to fetch market data for {symbol}: {str(e)}")

    def fetch_quote(self, symbol: str) -> Dict[str, Any]:
        """Fetch current quote snapshot."""
        try:
            ticker = yf.Ticker(symbol)
            fast_info = ticker.fast_info
            return {
                "symbol": symbol.upper(),
                "last_price": fast_info.last_price,
                "previous_close": fast_info.previous_close,
                "market_cap": getattr(fast_info, "market_cap", None),
                "currency": fast_info.currency,
            }
        except Exception as e:
            logger.error(f"Error fetching quote for {symbol}: {e}")
            return {"symbol": symbol.upper(), "error": str(e)}

    def validate_symbol(self, symbol: str) -> bool:
        """Check if symbol yields valid data."""
        try:
            ticker = yf.Ticker(symbol)
            history = ticker.history(period="5d")
            return not history.empty
        except Exception:
            return False
