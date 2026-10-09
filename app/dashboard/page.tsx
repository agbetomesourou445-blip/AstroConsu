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

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const consultations = await prisma.consultation.findMany({
    where: { userId: user.id },
    include: { payments: { orderBy: { createdAt: "desc" }, take: 1 } },
    orderBy: { createdAt: "desc" },
    take: 10
  });

  return <div className="page">
    <Notifications />
    <span className="eyebrow">👤 MON ESPACE</span>
    <h1>Bonjour {user.name ?? user.email}</h1>
    <p>Votre espace personnel AstroConsu.</p>

    <div className="grid">
      <Link className="card" href="/dreams"><div className="icon">🌙</div><h2>Mes rêves</h2><p>Enregistrer et consulter vos rêves.</p></Link>
      <Link className="card" href="/consultations"><div className="icon">🔮</div><h2>Consultations</h2><p>Créer et suivre vos consultations.</p></Link>
      <Link className="card" href="/tarot"><div className="icon">🃏</div><h2>Tarot</h2><p>Explorer vos tirages.</p></Link>
    </div>

    <section className="section">
      <h2>Mes consultations</h2>
      {consultations.length === 0 ? <p>Aucune consultation pour le moment.</p> : consultations.map((c) => {
        const latest = c.payments[0];
        return <div className="card" key={c.id}>
          <h3>{c.type}</h3>
          <p>{c.subject ?? c.question.slice(0, 140)}</p>
          <p><strong>{Number(c.price).toLocaleString("fr-FR")} {c.currency}</strong> · {c.status}</p>
          {c.status !== "PAID" && <PayButton consultationId={c.id} amount={Number(c.price)} />}
          {c.status === "PAID" && <AnalyzeConsultationButton consultationId={c.id} />}
          {c.status === "PAID" && <HumanRequestButton consultationId={c.id} />}
          {latest?.status === "PENDING" && <small>Paiement en attente de confirmation.</small>}
        </div>;
      })}
    </section>

    <LogoutButton />
    <ContactButtons />
  </div>;
}
