import { CONTACTS } from "@/lib/contact";

export function ContactButtons() {
  return (
    <div className="contact-buttons">
      <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" className="button primary">
        💬 WhatsApp
      </a>
      <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer" className="button secondary">
        ✈️ Telegram
      </a>
    </div>
  );
}
