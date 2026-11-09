import { ContactButtons } from "@/components/ContactButtons";

const arcana = [
  { number: "0", name: "Le Mat", theme: "Le départ et la liberté", meaning: "Le Mat évoque l’élan vers l’inconnu, la curiosité et la possibilité d’un nouveau départ. Il invite à avancer avec ouverture, tout en restant attentif au chemin que l’on choisit." },
  { number: "I", name: "Le Bateleur", theme: "L’initiative et les ressources", meaning: "Figure de commencement, le Bateleur rappelle les talents, les outils et les idées déjà à votre portée. Il suggère de transformer une intention en première action concrète." },
  { number: "II", name: "La Papesse", theme: "L’écoute et la connaissance intérieure", meaning: "La Papesse représente le temps de l’observation, de l’étude et de l’intuition. Elle invite à ne pas précipiter une réponse et à accueillir ce qui se révèle dans le silence." },
  { number: "III", name: "L’Impératrice", theme: "La créativité et l’expression", meaning: "Associée à la fécondité des idées et à la communication, l’Impératrice encourage à donner forme à ce qui grandit en vous et à partager votre regard avec confiance." },
  { number: "IV", name: "L’Empereur", theme: "La structure et les limites", meaning: "L’Empereur évoque l’organisation, la stabilité et la responsabilité. Il pose une question utile : quelle structure vous aiderait à rendre votre projet plus solide ?" },
  { number: "VI", name: "L’Amoureux", theme: "Le choix et l’accord avec soi-même", meaning: "Au-delà des relations, cette carte parle de choix, de valeurs et de cohérence. Elle invite à reconnaître ce qui compte vraiment avant de prendre une direction." },
];

export default function TarotPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <span className="eyebrow">ARCANES · ARCHÉTYPES · RÉFLEXION</span>
        <div className="page-heading-icon" aria-hidden="true">✧</div>
        <h1>Le tarot, un miroir de réflexion</h1>
        <p className="lead">Depuis des siècles, les cartes nourrissent des récits et des interprétations. Découvrez quelques figures majeures comme des invitations à regarder une situation sous un autre angle.</p>
      </section>
      <div className="notice-card"><strong>Une lecture ouverte</strong><p>Les significations ci-dessous s’inspirent de traditions symboliques. Elles ne prédisent pas l’avenir : votre expérience et votre discernement restent au centre de la lecture.</p></div>
      <section className="grid tarot-grid" aria-label="Quelques arcanes majeurs">
        {arcana.map((card) => (
          <article className="card tarot-card" key={card.number}>
            <span className="tarot-number">{card.number}</span>
            <span className="card-kicker">ARCANE MAJEUR</span>
            <h2>{card.name}</h2>
            <h3>{card.theme}</h3>
            <p>{card.meaning}</p>
          </article>
        ))}
      </section>
      <section className="contact-card"><h2>Une question vous accompagne ?</h2><p>Vous pouvez la poser dans un espace de consultation et l’explorer à votre rythme.</p><a className="button primary" href="/consultations">Découvrir les consultations</a></section>
      <ContactButtons />
    </div>
  );
}
