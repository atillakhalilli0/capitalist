export function formatNumber(
  value: number,
  locale = "az-AZ"
) {
  return new Intl.NumberFormat(
    locale
  ).format(value);
}

export function formatCompactNumber(
  value: number,
  locale = "az-AZ"
) {
  return new Intl.NumberFormat(
    locale,
    {
      notation: "compact",
      maximumFractionDigits: 1,
    }
  ).format(value);
}

export function formatCurrency(
  value: number,
  currency = "AZN",
  locale = "az-AZ"
) {
  return new Intl.NumberFormat(
    locale,
    {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }
  ).format(value);
}

export function formatPercent(
  value: number,
  locale = "az-AZ"
) {
  return new Intl.NumberFormat(
    locale,
    {
      style: "percent",
      maximumFractionDigits: 2,
    }
  ).format(value);
}