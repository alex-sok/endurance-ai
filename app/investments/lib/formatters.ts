export const fmtUSD = (n: number, opts: { compact?: boolean } = {}) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    notation: opts.compact ? "compact" : "standard",
  }).format(n);

export const fmtInt = (n: number, opts: { compact?: boolean } = {}) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
    notation: opts.compact ? "compact" : "standard",
  }).format(n);

export const fmtPct = (n: number, digits = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: digits,
  }).format(n);
