import { ContactButtons } from "@/components/ContactButtons";

const archangels = [
  { name: "Michel", symbol: "✧", tradition: "Protection · courage", description: "Dans plusieurs traditions, Michel est associé à la protection et à la force morale. Sa figure peut évoquer le courage de poser des limites, de défendre ses valeurs et d’avancer avec détermination." },
  { name: "Gabriel", symbol: "☼", tradition: "Annonce · expression", description: "Messager dans différents récits religieux, Gabriel est souvent lié à l’annonce et à la transmission. Sur le plan symbolique, il invite à écouter ce qui cherche à être formulé et à communiquer avec clarté." },
  { name: "Raphaël", symbol: "☾", tradition: "Voyage · réconfort", description: "Raphaël est associé au voyage et au réconfort dans certaines traditions. Sa présence symbolique peut rappeler l’importance de prendre soin de soi et de chercher un soutien adapté lorsque l’on en a besoin." },
  { name: "Uriel", symbol: "✦", tradition: "Lumière · discernement", description: "Souvent rapproché de la lumière et de la sagesse dans les traditions mystiques, Uriel peut représenter le désir de comprendre, de clarifier une situation et de prendre le temps du discernement." },
  { name: "Jophiel", symbol: "✺", tradition: "Beauté · contemplation", description: "Dans certaines traditions spirituelles modernes, Jophiel est associé à la beauté et à la sagesse. Son symbolisme invite à remarquer ce qui nourrit l’inspiration et à porter un regard plus attentif sur le quotidien." },
  { name: "Métatron", symbol: "✧", tradition: "Ordre · mystique", description: "Figure importante de certains courants mystiques, Métatron est associé à des thèmes d’ordre et de connaissance. Les récits qui le concernent varient selon les traditions et leurs interprétations." },
];

export default function ArchangelsPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <span className="eyebrow">RÉCITS · TRADITIONS · SYMBOLIQUE</span>
        <div className="page-heading-icon" aria-hidden="true">☼</div>
        <h1>Les archanges à travers les traditions</h1>
        <p className="lead">Découvrez des figures spirituelles dont les récits ont traversé les cultures. Leurs symboles peuvent ouvrir un espace de contemplation et de réflexion personnelle.</p>
      </section>
      <div className="notice-card"><strong>Des traditions diverses</strong><p>Les noms, récits et attributs des archanges diffèrent selon les textes, les religions et les courants spirituels. Ces présentations sont des repères culturels et symboliques, non des affirmations universelles.</p></div>
      <section className="grid">
        {archangels.map((angel) => (
          <article className="card angel-card" key={angel.name}>
            <span className="exploration-icon" aria-hidden="true">{angel.symbol}</span>
            <span className="card-kicker">{angel.tradition}</span>
            <h2>{angel.name}</h2>
            <p>{angel.description}</p>
            <p className="reflection-prompt"><strong>Piste de réflexion :</strong> quelle qualité de cette figure résonne avec votre question du moment ?</p>
          </article>
        ))}
      </section>
      <ContactButtons />
    </div>
  );
}
