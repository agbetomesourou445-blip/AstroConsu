import { ContactButtons } from "./ContactButtons";

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <h3>Besoin d&apos;aller plus loin ?</h3>
        <p>Échangez avec nous pour approfondir votre consultation.</p>
        <ContactButtons />
      </div>
      <p className="muted">© {new Date().getFullYear()} AstroConsu. Interprétations symboliques et spirituelles.</p>
    </footer>
  );
}
