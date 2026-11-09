import { ContactButtons } from "@/components/ContactButtons";

const hours = [
  ["00:00", "Renouveau", "Un point de départ symbolique : qu’aimeriez-vous laisser derrière vous pour accueillir une nouvelle étape ?"],
  ["01:01", "Initiative", "Cette heure est parfois associée à l’élan personnel. Quelle petite action pourrait donner forme à une idée qui vous tient à cœur ?"],
  ["02:02", "Équilibre", "Le chiffre deux évoque souvent le lien et la coopération. Une relation ou un choix mérite-t-il une écoute plus attentive ?"],
  ["03:03", "Expression", "Souvent rapprochée de la créativité et de la parole, cette heure invite à exprimer plus clairement ce que vous ressentez."],
  ["04:04", "Stabilité", "Le quatre évoque les fondations et l’organisation. Quel repère concret pourrait vous aider à vous sentir plus ancré ?"],
  ["05:05", "Mouvement", "Cette heure est parfois lue comme une invitation au changement. Quelle évolution souhaitez-vous accueillir sans vous précipiter ?"],
  ["10:10", "Possibilités", "Une association populaire avec les nouveaux horizons. Quelles possibilités n’avez-vous pas encore pris le temps d’examiner ?"],
  ["11:11", "Attention", "Souvent considérée comme un moment de présence à soi, elle peut inviter à observer vos pensées et vos intentions du moment."],
  ["12:12", "Rythme", "Cette heure peut évoquer l’équilibre entre projet et patience. Quelle étape mérite d’être menée à son rythme ?"],
  ["13:13", "Transformation", "Dans certaines lectures numérologiques, elle accompagne l’idée de transition. Qu’êtes-vous prêt à faire évoluer ?"],
  ["20:20", "Patience", "Cette heure rappelle parfois que certaines choses demandent du temps. Où pourriez-vous vous accorder plus de douceur ?"],
  ["21:21", "Accomplissement", "Une lecture populaire y voit l’aboutissement d’une étape. Quel chemin parcouru pouvez-vous reconnaître aujourd’hui ?"],
  ["22:22", "Construction", "Le double deux évoque coopération et continuité. Quel projet gagnerait à être construit avec constance ou avec l’aide d’autrui ?"],
  ["23:23", "Intégration", "À la fin de la journée, cette heure peut servir de pause : que souhaitez-vous retenir de votre expérience récente ?"],
];

export default function MirrorHoursPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <span className="eyebrow">RYTHMES · COÏNCIDENCES · NUMÉROLOGIE POPULAIRE</span>
        <div className="page-heading-icon" aria-hidden="true">◷</div>
        <h1>Une heure attire votre regard ?</h1>
        <p className="lead">Les heures miroir fascinent depuis longtemps. Parcourez quelques interprétations populaires et choisissez celle qui vous invite à une réflexion personnelle.</p>
      </section>
      <div className="notice-card"><strong>À lire comme un symbole, pas comme un message certain</strong><p>Les significations des heures miroir relèvent de croyances et de traditions populaires. Elles n’ont pas de validation scientifique et ne permettent pas de prédire des événements.</p></div>
      <section className="hours mirror-hours-grid" aria-label="Interprétations symboliques des heures miroir">
        {hours.map(([hour, theme, meaning]) => (
          <article className="hour mirror-hour-card" key={hour}>
            <strong>{hour}</strong>
            <span className="card-kicker">{theme}</span>
            <p>{meaning}</p>
          </article>
        ))}
      </section>
      <ContactButtons />
    </div>
  );
}
