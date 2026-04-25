// Single source of truth for WhatsApp contact details.
// Update WHATSAPP_NUMBER (digits only, with country code) when ready.
export const WHATSAPP_NUMBER = "919149192005";
export const WHATSAPP_DISPLAY = "+91 91491 92005";
export const DEFAULT_MESSAGE = "Hello, I need guidance regarding my problem";

export const buildWhatsAppLink = (message: string = DEFAULT_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
