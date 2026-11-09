import Link from "next/link";
import { ContactButtons } from "@/components/ContactButtons";

const explorations = [
  { icon: "☾", label: "Rêves", title: "Le langage des rêves", description: "Revisitez les images, les émotions et les récits de vos nuits à travers une lecture symbolique.", href: "/dreams" },
  { icon: "✧", label: "Consultations", title: "Un espace pour votre question", description: "Prenez le temps de poser votre situation et d’explorer de nouvelles pistes de réflexion.", href: "/consultations" },
  { icon: "✦", label: "Tarot", title: "Les archétypes des cartes", description: "Découvrez les grandes figures du tarot et ce qu’elles peuvent évoquer dans un cheminement personnel.", href: "/tarot" },
  { icon: "☼", label: "Archanges", title: "Figures de guidance", description: "Parcourez les récits et les symboles associés aux archanges dans différentes traditions.", href: "/archangels" },
  { icon: "◷", label: "Heures miroir", title: "Les heures qui attirent l’attention", description: "Explorez les interprétations populaires de ces coïncidences du quotidien.", href: "/mirror-hours" },
  { icon: "☽", label: "Astrologie", title: "Lire les grands cycles", description: "Familiarisez-vous avec les signes, les planètes et les éléments du thème astral.", href: "/astrology" },
];

export default function Home() {
  return (
    <div className="page home-page">
      <section className="hero hero-cosmic">
        <span className="eyebrow">OBSERVATOIRE SYMBOLIQUE · RÊVES · CYCLES</span>
        <p className="hero-kicker">Un espace pour prendre du recul</p>
        <h1>Le ciel inspire.<br /><span>Votre chemin vous appartient.</span></h1>
        <p className="hero-copy">
          AstroConsu vous invite à explorer les rêves, les traditions du tarot,
          l’astrologie et les symboles qui résonnent dans votre quotidien — avec
          curiosité, douceur et liberté d’interprétation.
        </p>
        <div className="actions">
          <Link href="/consultations" className="button primary">Explorer une consultation <span aria-hidden="true">→</span></Link>
          <Link href="/dreams" className="button ghost">Commencer par un rêve</Link>
        </div>
        <p className="hero-note"><span aria-hidden="true">✦</span> Des pistes de réflexion, jamais des certitudes imposées.</p>
      </section>

      <section className="section-block" aria-labelledby="explorations-title">
        <div className="section-intro">
          <span className="eyebrow">VOTRE CARTE DU CIEL INTÉRIEURE</span>
          <h2 id="explorations-title">Choisissez votre porte d’entrée</h2>
          <p>Chaque exploration propose un regard différent. Suivez simplement le sujet qui vous appelle aujourd’hui.</p>
        </div>
        <div className="grid exploration-grid">
          {explorations.map((item) => (
            <Link className="card exploration-card" href={item.href} key={item.href}>
              <span className="exploration-icon" aria-hidden="true">{item.icon}</span>
              <span className="card-kicker">{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="learn">Découvrir <span aria-hidden="true">↗</span></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="contact-card home-contact">
        <span className="eyebrow">UN ÉCHANGE, À VOTRE RYTHME</span>
        <h2>Besoin d’un accompagnement plus personnel ?</h2>
        <p>Découvrez les consultations ou contactez notre équipe pour poursuivre votre réflexion.</p>
        <div className="actions">
          <Link href="/consultations" className="button primary">Voir les consultations</Link>
          <ContactButtons />
        </div>
      </section>

      <p className="disclaimer">Les contenus proposés sont des interprétations symboliques et des supports de réflexion personnelle. Ils ne constituent ni des prédictions certaines, ni des conseils médicaux, psychologiques, juridiques ou financiers.</p>
    </div>
  );
}
