import { ContactButtons } from "@/components/ContactButtons";

const archangels = [
  ["Michel", "Traditionnellement associé à la protection et au courage."],
  ["Gabriel", "Traditionnellement associé au message et à l’annonce."],
  ["Raphaël", "Traditionnellement associé à la guérison dans certaines traditions."],
  ["Uriel", "Associé à la lumière, la sagesse ou la connaissance dans certaines traditions."],
  ["Métatron", "Figure présente surtout dans certaines traditions mystiques et ésotériques."],
  ["Jophiel", "Associé à la beauté et à la sagesse dans certaines traditions modernes."]
];

export default function ArchangelsPage() {
  return (
    <div className="page">
      <span className="eyebrow">👼 ARCHANGES</span>
      <div className="page-heading-icon" aria-hidden="true">🪽</div><h1>Archanges & traditions spirituelles</h1>
      <p>Découvrez leurs histoires, symboles et interprétations selon différentes traditions.</p>
      <div className="grid">
        {archangels.map(([name, description]) => (
          <div className="card" key={name}><div className="icon">👼</div><h2>{name}</h2><p>{description}</p><span className="learn">En savoir plus →</span></div>
        ))}
      </div>
      <ContactButtons />
    </div>
  );
}
