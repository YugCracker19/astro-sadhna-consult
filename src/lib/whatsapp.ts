// Single source of truth for WhatsApp contact details.
// Number must be digits only with country code (no +, spaces, or dashes).
export const WHATSAPP_NUMBER = "917247836664"; // 91 (India) + 7247836664
export const WHATSAPP_DISPLAY = "+91 72478 36664";
export const DEFAULT_MESSAGE = "Hello, I need guidance regarding my problem";

// api.whatsapp.com/send is the most reliable cross-device endpoint —
// it correctly routes to the WhatsApp app on mobile and WhatsApp Web on desktop.
export const buildWhatsAppLink = (message: string = DEFAULT_MESSAGE) =>
  `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;

