import Link from "next/link";
import { ContactButtons } from "@/components/ContactButtons";

const features = [
  ["🌙", "Rêves", "Explorez les symboles et émotions de vos rêves.", "/dreams"],
  ["🔮", "Consultation personnelle", "Décrivez votre situation et obtenez une première analyse.", "/consultations"],
  ["🃏", "Tarot", "Découvrez les traditions et les tirages symboliques.", "/tarot"],
  ["👼", "Archanges", "Explorez les traditions et symboles associés aux archanges.", "/archangels"],
  ["🕐", "Heures miroir", "Découvrez les interprétations symboliques des heures répétées.", "/mirror-hours"],
  ["🌌", "Astrologie", "Explorez le thème astral et ses interprétations symboliques.", "/astrology"]
];

export default function Home() {
  return (
    <div className="page">
      <section className="hero">
        <span className="eyebrow">EXPLORATION SPIRITUELLE • IA • SYMBOLISME</span>
        <h1>Comprendre, réfléchir et avancer.</h1>
        <p>
          AstroConsu réunit rêves, tarot, archanges, heures miroir, astrologie
          et consultations personnelles dans une expérience simple et confidentielle.
        </p>
        <div className="actions">
          <Link href="/consultations" className="button primary">Commencer une consultation</Link>
          <Link href="/dreams" className="button ghost">Interpréter un rêve</Link>
        </div>
      </section>

      <section className="grid">
        {features.map(([icon, title, description, href]) => (
          <Link className="card" href={href} key={title}>
            <div className="icon">{icon}</div>
            <h2>{title}</h2>
            <p>{description}</p>
            <span className="learn">En savoir plus →</span>
          </Link>
        ))}
      </section>

      <section className="contact-card">
        <h2>Vous souhaitez approfondir ?</h2>
        <p>Après votre première exploration, vous pouvez nous rejoindre directement.</p>
        <ContactButtons />
      </section>

      <p className="disclaimer">
        Les contenus spirituels, astrologiques et symboliques sont proposés comme
        supports de réflexion. Ils ne constituent pas des prédictions certaines,
        diagnostics médicaux ou conseils professionnels.
      </p>
    </div>
  );
}
