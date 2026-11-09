import Link from "next/link";
import { ContactButtons } from "./ContactButtons";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link href="/" className="brand"><span aria-hidden="true">✦</span> AstroConsu</Link>
          <p>Un observatoire de symboles, de récits et de chemins personnels.</p>
        </div>
        <div className="footer-contact">
          <h2>Continuons la conversation</h2>
          <p>Notre équipe est disponible pour vous orienter et répondre à vos questions.</p>
          <ContactButtons />
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} AstroConsu. Tous droits réservés.</p>
        <p className="muted">Les lectures proposées sont symboliques et destinées à la réflexion personnelle.</p>
      </div>
    </footer>
  );
}
