// Single source of truth for WhatsApp contact details.
// Number must be digits only with country code (no +, spaces, or dashes).
export const WHATSAPP_NUMBER = "919149192005"; // 91 (India) + 9149192005
export const WHATSAPP_DISPLAY = "+91 91491 92005";
export const DEFAULT_MESSAGE = "Hello, I need guidance regarding my problem";

// api.whatsapp.com/send is the most reliable cross-device endpoint —
// it correctly routes to the WhatsApp app on mobile and WhatsApp Web on desktop.
export const buildWhatsAppLink = (message: string = DEFAULT_MESSAGE) =>
  `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;

