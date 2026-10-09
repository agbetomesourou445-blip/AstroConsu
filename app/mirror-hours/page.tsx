import { ContactButtons } from "@/components/ContactButtons";

const hours = ["00:00", "01:01", "02:02", "03:03", "04:04", "05:05", "10:10", "11:11", "12:12", "13:13", "20:20", "21:21", "22:22", "23:23"];

export default function MirrorHoursPage() {
  return (
    <div className="page">
      <span className="eyebrow">🕐 HEURES MIROIR</span>
      <div className="page-heading-icon" aria-hidden="true">◷</div><h1>Quelle heure avez-vous remarquée ?</h1>
      <p>Les significations présentées ici sont des interprétations populaires, numérologiques ou symboliques.</p>
      <div className="hours">
        {hours.map(hour => <div className="hour" key={hour}><strong>{hour}</strong><span>Voir la signification →</span></div>)}
      </div>
      <ContactButtons />
    </div>
  );
}
