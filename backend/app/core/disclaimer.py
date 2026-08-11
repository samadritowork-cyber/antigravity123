"""
FinSight Financial & Analytical Disclaimer Module.
"""

FINANCIAL_DISCLAIMER_TEXT = (
    "DISCLAIMER: FinSight is an educational and quantitative research platform built strictly for "
    "analytical and informational purposes. FinSight does NOT provide personalized financial, investment, "
    "legal, or tax advice. Market analysis, derivatives pricing models, risk calculations (including VaR), "
    "and machine learning outputs represent theoretical models with inherent quantitative assumptions and "
    "limitations. Past performance is not indicative of future returns. Users must perform their own "
    "due diligence before making financial decisions."
)

def get_disclaimer() -> dict:
    """Return structured disclaimer metadata."""
    return {
        "disclaimer": FINANCIAL_DISCLAIMER_TEXT,
        "is_educational_only": True,
    }
