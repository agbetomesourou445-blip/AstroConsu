import Link from "next/link";
import { ContactButtons } from "@/components/ContactButtons";

const planets = [
  ["☉", "Soleil", "Identité, vitalité et manière de rayonner"],
  ["☾", "Lune", "Vie intérieure, besoins et habitudes émotionnelles"],
  ["☿", "Mercure", "Pensée, curiosité et façon de communiquer"],
  ["♀", "Vénus", "Attachement, goûts et recherche d’harmonie"],
  ["♂", "Mars", "Élan, affirmation et manière d’agir"],
  ["♃", "Jupiter", "Expansion, confiance et quête de sens"],
];

export default function AstrologyPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <span className="eyebrow">ASTRONOMIE DU CIEL · SYMBOLIQUE ASTROLOGIQUE</span>
        <div className="page-heading-icon" aria-hidden="true">☽</div>
        <h1>Une carte symbolique du ciel</h1>
        <p className="lead">L’astrologie étudie les positions apparentes des astres à la naissance et leur donne une interprétation symbolique. Découvrez quelques repères pour mieux comprendre ce langage ancien.</p>
      </section>
      <div className="notice-card"><strong>Astrologie et astronomie : deux approches distinctes</strong><p>L’astronomie est une science qui étudie les objets et phénomènes célestes. L’astrologie relève de traditions symboliques et ne constitue pas une méthode scientifique de prédiction. Cette page propose une découverte culturelle et réflexive.</p></div>
      <section className="section-block">
        <div className="section-intro"><span className="eyebrow">QUELQUES REPÈRES</span><h2>Les planètes comme symboles</h2><p>Dans les traditions astrologiques, chaque planète est associée à des thèmes. Ces associations sont des pistes d’interprétation, pas des descriptions fixes de votre personnalité.</p></div>
        <div className="grid planet-grid">
          {planets.map(([symbol, name, description]) => (
            <article className="card planet-card" key={name}><span className="planet-symbol" aria-hidden="true">{symbol}</span><h3>{name}</h3><p>{description}</p></article>
          ))}
        </div>
      </section>
      <section className="contact-card"><h2>Vous souhaitez explorer votre situation ?</h2><p>Une consultation peut vous aider à formuler vos questions et à examiner différentes pistes de réflexion.</p><Link className="button primary" href="/consultations">Découvrir les consultations</Link></section>
      <p className="disclaimer">Une lecture astrologique ne détermine ni votre avenir ni vos décisions. Gardez votre esprit critique et votre liberté de choix.</p>
      <ContactButtons />
    </div>
  );
}
