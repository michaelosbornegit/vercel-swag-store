const formatters = new Map<string, Intl.NumberFormat>();

function getFormatter(currency: string) {
  let formatter = formatters.get(currency);
  if (!formatter) {
    formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    });
    formatters.set(currency, formatter);
  }
  return formatter;
}

/**
 * Format an integer-cents amount as currency.
 * @param cents - Amount in the smallest currency unit (e.g. 3000 → $30.00).
 * @param currency - ISO 4217 code (defaults to USD).
 */
export function formatPrice(cents: number, currency = "USD"): string {
  return getFormatter(currency).format(cents / 100);
}
