import { ContactButtons } from "@/components/ContactButtons";

export default function TarotPage() {
  return (
    <div className="page">
      <span className="eyebrow">🃏 TAROT</span>
      <div className="page-heading-icon" aria-hidden="true">✧</div><h1>Tarot & interprétation symbolique</h1>
      <p>Explorez les archétypes du tarot et utilisez-les comme support de réflexion personnelle.</p>
      <div className="grid">
        {["Le Mat", "Le Magicien", "La Papesse", "L’Impératrice", "L’Empereur", "Les Amoureux"].map(card => (
          <div className="card" key={card}><div className="icon">🃏</div><h2>{card}</h2><p>Interprétation traditionnelle à découvrir.</p></div>
        ))}
      </div>
      <ContactButtons />
    </div>
  );
}
