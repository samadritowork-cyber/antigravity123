# FinSight Financial & Quantitative Methodology

## 1. Market Analytics
- **Daily Log & Arithmetic Returns**: \( r_t = \ln(P_t / P_{t-1}) \)
- **Annualized Volatility**: \( \sigma_{ann} = \sigma_{daily} \times \sqrt{252} \)
- **Sharpe Ratio**: \( S = \frac{R_p - R_f}{\sigma_p} \)
- **Sortino Ratio**: Downside risk-adjusted return ratio evaluating returns against negative volatility only.
- **Maximum Drawdown**: Peak-to-trough decline over a specified timeframe.
- **Beta**: Asset sensitivity relative to benchmark return (\( \beta = \frac{Cov(R_a, R_m)}{Var(R_m)} \)).

## 2. Value at Risk (VaR)
- **Parametric VaR**: Assumes normal distribution of returns (\( VaR_{\alpha} = - (\mu + z_{\alpha} \sigma) \)).
- **Historical VaR**: Non-parametric quantile evaluation of actual empirical return distributions.

## 3. Portfolio Risk Analytics
- **Marginal Contribution to Risk (MCR)**: Measures each individual asset's contribution to total portfolio variance.
- **Concentration Risk**: Herfindahl-Hirschman Index (HHI) applied to portfolio weights.

## 4. Options Analytics (Black-Scholes Model)
- **Call Price**: \( C = S_0 N(d_1) - K e^{-r T} N(d_2) \)
- **Put Price**: \( P = K e^{-r T} N(-d_2) - S_0 N(-d_1) \)
- **Greeks**: Analytical derivation of Delta (\( \Delta \)), Gamma (\( \Gamma \)), Vega (\( \mathcal{V} \)), Theta (\( \Theta \)), Rho (\( \rho \)).

*Disclaimer: FinSight financial analytics are strictly for quantitative education and research.*
