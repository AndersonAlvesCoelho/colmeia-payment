//  dd/MM/yyyy
export function formatDateBR(dateString?: string | Date): string {
  if (!dateString) return '-';
  const date =
    typeof dateString === 'string' ? new Date(dateString) : dateString;
  if (isNaN(date.getTime())) return '-';
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

//   Formata um número para moeda brasileira
export function formatCurrencyBR(
  value: number,
  currency: string = 'BRL'
): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(value);
}
