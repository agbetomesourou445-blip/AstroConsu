import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

const publicLinks = [
  { href: "/dreams", label: "Rêves" },
  { href: "/consultations", label: "Consultations" },
  { href: "/tarot", label: "Tarot" },
  { href: "/archangels", label: "Archanges" },
  { href: "/mirror-hours", label: "Heures miroir" },
  { href: "/astrology", label: "Astrologie" },
];

export async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="header site-header">
      <Link href="/" className="brand" aria-label="AstroConsu, accueil">
        <span className="brand-mark" aria-hidden="true">✦</span>
        <span>AstroConsu</span>
      </Link>
      <nav className="site-nav" aria-label="Navigation principale">
        {publicLinks.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        <Link href="/language" aria-label="Changer de langue">Langue</Link>
        {user ? (
          <>
            {user.role === "CONSULTANT" && <Link href="/consultant">Espace consultant</Link>}
            {user.role === "ADMIN" && <Link href="/admin">Administration</Link>}
            <Link href="/dashboard" className="nav-account">Mon espace</Link>
          </>
        ) : (
          <Link href="/login" className="nav-account">Se connecter</Link>
        )}
      </nav>
    </header>
  );
}
