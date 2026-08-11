# FinSight Machine Learning Architecture & Methodology

## Model Comparison Strategy
FinSight avoids black-box predictions and single-model bias by evaluating three distinct modeling paradigms:

1. **Statistical / Naive Baseline**:
   - Simple rolling quantile thresholds and historical volatility benchmarks.
2. **Supervised Market Regime Classifier**:
   - Random Forest / Logistic Regression trained on volatility-return state labels.
   - Evaluated via Precision, Recall, F1 Score, Confusion Matrix, and ROC-AUC.
3. **Unsupervised Regime Detector**:
   - Gaussian Mixture Models (GMM) clustering return distributions and rolling ATR/volatility features into Low Vol Bull, High Vol Bear, and Neutral regimes.

## Time-Series Validation & Leakage Prevention
- **Chronological Split**: Strict time-series split using expanding or rolling walk-forward windows.
- **Purging & Embargoing**: Removing overlap between training and validation windows to prevent look-ahead bias and data leakage.
- **Feature Engineering Guardrails**: Technical indicators (RSI, MACD, Volatility) computed strictly using past data points ($t \le T$).
