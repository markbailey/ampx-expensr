export function formatCurrency(
  amount: number,
  currency: string,
  locale?: Intl.LocalesArgument
): string {
  return amount.toLocaleString(locale, {
    style: 'currency',
    currency,
  });
}
