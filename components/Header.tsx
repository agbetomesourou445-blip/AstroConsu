import Link from "next/link";

export function Header() {
  return (
    <header className="header">
      <Link href="/" className="brand">✨ AstroConsu</Link>
      <nav>
        <Link href="/dreams">Rêves</Link>
        <Link href="/consultations">Consultations</Link>
        <Link href="/tarot">Tarot</Link>
        <Link href="/archangels">Archanges</Link>
        <Link href="/mirror-hours">Heures miroir</Link>
        <Link href="/astrology">Astrologie</Link>
        <Link href="/language" aria-label="Changer de langue">🌐 Langue</Link>
        <Link href="/dashboard">Mon espace</Link>
      </nav>
    </header>
  );
}
