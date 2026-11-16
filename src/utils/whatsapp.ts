export const DEFAULT_WHATSAPP_MESSAGE =
  'Hello, I would like to know more about Zulekha Begam Educational Trust and admission details for 2026.';

export function buildWhatsAppUrl(
  rawPhone: string = '9322444499',
  message: string = DEFAULT_WHATSAPP_MESSAGE
): string {
  const digits = rawPhone.replace(/\D/g, '');
  const fullNumber = digits.length === 10 ? `91${digits}` : digits || '919322444499';
  return `https://wa.me/${fullNumber}?text=${encodeURIComponent(message)}`;
}

export function buildTelUrl(rawPhone: string): string {
  const digits = rawPhone.replace(/[^\d+]/g, '');
  return `tel:${digits}`;
}
