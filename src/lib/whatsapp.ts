// Single source of truth for WhatsApp contact details.
// Update WHATSAPP_NUMBER (digits only, with country code) when ready.
export const WHATSAPP_NUMBER = "919999999999";
export const WHATSAPP_DISPLAY = "+91 99999 99999";
export const DEFAULT_MESSAGE = "Hello, I need guidance regarding my problem";

export const buildWhatsAppLink = (message: string = DEFAULT_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
