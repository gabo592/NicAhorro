interface FormatCurrencyProps {
  locales?: Intl.LocalesArgument;
  currencyISO3Code?: string;
  value: number;
}

export function formatCurrency({
  locales,
  currencyISO3Code,
  value,
}: FormatCurrencyProps) {
  return new Intl.NumberFormat(locales, {
    style: 'currency',
    currency: currencyISO3Code,
  }).format(value);
}
