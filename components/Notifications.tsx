"use client";

import { useEffect, useState } from "react";

type Notification = { id: number; type: string; title: string; message: string; readAt: string | null; createdAt: string };

export function Notifications() {
  const [items, setItems] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const response = await fetch("/api/notifications", { cache: "no-store" });
      if (!response.ok) throw new Error("NOTIFICATIONS_LOAD_FAILED");
      const data = await response.json();
      setItems(Array.isArray(data.notifications) ? data.notifications : []);
      setError("");
    } catch {
      setError("Les notifications sont momentanément indisponibles.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  async function read(id: number) {
    try {
      const response = await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("NOTIFICATION_READ_FAILED");
      setItems((current) => current.map((item) => item.id === id ? { ...item, readAt: new Date().toISOString() } : item));
    } catch {
      setError("Impossible de marquer cette notification comme lue.");
    }
  }

  const unread = items.filter((item) => !item.readAt).length;

  return (
    <div className="notification-box">
      <button
        type="button"
        className={`button ghost notification-trigger ${unread ? "has-unread" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="notification-panel"
        aria-label={unread ? `Notifications, ${unread} non lue${unread > 1 ? "s" : ""}` : "Notifications"}
      >
        <span className="notification-bell" aria-hidden="true">♧</span>
        <span>Notifications</span>
        {unread > 0 && <span className="notification-count" aria-hidden="true">{unread > 9 ? "9+" : unread}</span>}
      </button>
      {open && (
        <section className="notification-panel" id="notification-panel" aria-label="Centre de notifications">
          <div className="notification-heading"><div><span className="card-kicker">VOTRE ESPACE</span><h2>Notifications</h2></div><button type="button" className="notification-close" onClick={() => setOpen(false)} aria-label="Fermer les notifications">×</button></div>
          {error && <p className="error" role="alert">{error}</p>}
          {loading ? <p className="muted">Chargement…</p> : items.length === 0 ? <div className="notification-empty"><span aria-hidden="true">✧</span><p>Tout est calme pour le moment.</p></div> : (
            <div className="notification-list">
              {items.map((item) => (
                <button type="button" className={`notification-item ${item.readAt ? "" : "unread"}`} key={item.id} onClick={() => item.readAt ? undefined : void read(item.id)}>
                  <span className="notification-dot" aria-hidden="true" />
                  <span className="notification-copy"><strong>{item.title}</strong><span>{item.message}</span><time dateTime={item.createdAt}>{new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(item.createdAt))}</time></span>
                  {!item.readAt && <span className="sr-only">Non lue</span>}
                </button>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
