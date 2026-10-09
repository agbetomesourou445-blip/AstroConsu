import { ContactButtons } from "@/components/ContactButtons";

export default function AstrologyPage() {
  return (
    <div className="page narrow">
      <span className="eyebrow">🌌 ASTROLOGIE</span>
      <div className="page-heading-icon" aria-hidden="true">☽</div><h1>Thème astral & symbolisme</h1>
      <p>Explorez les signes, planètes et maisons comme outils d'interprétation symbolique.</p>
      <form className="form-card">
        <label>Date de naissance<input type="date" /></label>
        <label>Heure de naissance<input type="time" /></label>
        <label>Lieu de naissance<input placeholder="Ville, pays" /></label>
        <button className="button primary" type="button">Préparer mon thème</button>
      </form>
      <p className="disclaimer">L’astrologie est présentée comme une pratique symbolique et non comme une science prédictive.</p>
      <ContactButtons />
    </div>
  );
}
