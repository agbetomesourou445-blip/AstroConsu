import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ContactButtons } from "@/components/ContactButtons";
import { LogoutButton } from "@/components/LogoutButton";
import { PayButton } from "@/components/PayButton";
import { AnalyzeConsultationButton } from "@/components/AnalyzeConsultationButton";
import { HumanRequestButton } from "@/components/HumanRequestButton";
import { Notifications } from "@/components/Notifications";

const typeLabels: Record<string, string> = {
  DREAM: "Rêve & symbolique",
  PERSONAL: "Consultation personnelle",
  TAROT: "Lecture tarot",
  ASTROLOGY: "Thème astral",
};

const statusLabels: Record<string, string> = {
  PENDING: "En attente de paiement",
  PAID: "Paiement confirmé",
  PROCESSING: "En cours de traitement",
  COMPLETED: "Terminée",
  CANCELLED: "Annulée",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const consultations = await prisma.consultation.findMany({
    where: { userId: user.id },
    include: {
      payments: { orderBy: { createdAt: "desc" }, take: 1 },
      analyses: { orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const paidCount = consultations.filter((item) => ["PAID", "PROCESSING", "COMPLETED"].includes(item.status)).length;
  const pendingCount = consultations.filter((item) => item.status === "PENDING").length;

  return (
    <div className="page dashboard-page">
      <div className="dashboard-topbar"><span className="eyebrow">VOTRE OBSERVATOIRE PERSONNEL</span><Notifications /></div>

      <section className="dashboard-welcome">
        <div>
          <span className="card-kicker">BIENVENUE DANS VOTRE ESPACE</span>
          <h1>Bonjour{user.name ? `, ${user.name}` : ""}</h1>
          <p>Retrouvez ici vos consultations, leurs étapes et vos lectures personnelles.</p>
        </div>
        <Link href="/consultations" className="button primary">Nouvelle consultation <span aria-hidden="true">→</span></Link>
      </section>

      <section className="dashboard-overview" aria-label="Résumé du compte">
        <article className="overview-card"><span className="overview-symbol" aria-hidden="true">✦</span><div><span className="card-kicker">CONSULTATIONS</span><strong>{consultations.length}</strong><span>sur cette page</span></div></article>
        <article className="overview-card"><span className="overview-symbol" aria-hidden="true">◷</span><div><span className="card-kicker">EN ATTENTE</span><strong>{pendingCount}</strong><span>à finaliser</span></div></article>
        <article className="overview-card"><span className="overview-symbol" aria-hidden="true">☾</span><div><span className="card-kicker">SUIVIES</span><strong>{paidCount}</strong><span>confirmées ou en cours</span></div></article>
      </section>

      <section className="section-block dashboard-shortcuts" aria-labelledby="shortcuts-title">
        <div className="section-intro"><span className="eyebrow">RACCOURCIS</span><h2 id="shortcuts-title">Poursuivre votre exploration</h2></div>
        <div className="grid">
          <Link className="card dashboard-shortcut" href="/dreams"><span className="exploration-icon" aria-hidden="true">☾</span><h3>Mon carnet de rêves</h3><p>Enregistrer un récit et retrouver ses lectures.</p><span className="learn">Ouvrir le carnet →</span></Link>
          <Link className="card dashboard-shortcut" href="/consultations"><span className="exploration-icon" aria-hidden="true">✦</span><h3>Mes consultations</h3><p>Créer une demande ou suivre un accompagnement.</p><span className="learn">Explorer →</span></Link>
          <Link className="card dashboard-shortcut" href="/tarot"><span className="exploration-icon" aria-hidden="true">✧</span><h3>Les arcanes</h3><p>Découvrir les figures symboliques du tarot.</p><span className="learn">Découvrir →</span></Link>
        </div>
      </section>

      <section className="section-block" aria-labelledby="consultations-title">
        <div className="section-intro dashboard-list-heading"><div><span className="eyebrow">VOTRE PARCOURS</span><h2 id="consultations-title">Consultations récentes</h2></div><Link className="learn" href="/consultations">Nouvelle demande →</Link></div>
        {consultations.length === 0 ? (
          <div className="empty-state dashboard-empty"><span aria-hidden="true">✧</span><h3>Votre espace est prêt</h3><p>Quand vous créerez une consultation, son statut et son suivi apparaîtront ici.</p><Link href="/consultations" className="button primary">Créer ma première demande</Link></div>
        ) : (
          <div className="consultation-list">
            {consultations.map((consultation) => {
              const latestPayment = consultation.payments[0];
              const latestAnalysis = consultation.analyses[0];
              const status = consultation.status;
              return (
                <article className="card dashboard-consultation" key={consultation.id}>
                  <div className="consultation-card-heading">
                    <div><span className="card-kicker">DOSSIER · #{consultation.id}</span><h3>{typeLabels[consultation.type] ?? consultation.type}</h3></div>
                    <span className={`status-pill status-${status.toLowerCase()}`}><span aria-hidden="true">●</span>{statusLabels[status] ?? status}</span>
                  </div>
                  <p className="consultation-summary">{consultation.subject || consultation.question.slice(0, 180)}{!consultation.subject && consultation.question.length > 180 ? "…" : ""}</p>
                  <div className="consultation-meta"><strong>{Number(consultation.price).toLocaleString("fr-FR")} {consultation.currency}</strong><span>Créée le {new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(consultation.createdAt)}</span></div>
                  {latestPayment?.status === "PENDING" && <p className="inline-status">Le paiement est en attente de confirmation.</p>}
                  {latestPayment?.status === "FAILED" && <p className="inline-status error">Le paiement précédent n’a pas été confirmé. Vous pouvez réessayer.</p>}
                  <div className="consultation-actions">
                    {status === "PENDING" && <PayButton consultationId={consultation.id} amount={Number(consultation.price)} />}
                    {status === "PAID" && <AnalyzeConsultationButton consultationId={consultation.id} />}
                    {status === "PAID" && <HumanRequestButton consultationId={consultation.id} />}
                  </div>
                  {latestAnalysis && <div className="saved-reading"><span className="card-kicker">VOTRE DERNIÈRE LECTURE</span><p>{latestAnalysis.content}</p></div>}
                  {consultation.humanRequested && <p className="inline-status">Votre demande d’accompagnement humain a été transmise.</p>}
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="dashboard-account-bar"><div><span className="card-kicker">COMPTE CONNECTÉ</span><p>{user.email}</p></div><LogoutButton /></section>
      <section className="dashboard-contact"><h2>Besoin d’aide ?</h2><p>Notre équipe peut vous orienter pour la suite de votre parcours.</p><ContactButtons /></section>
    </div>
  );
}
