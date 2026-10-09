 "use client";
import { useEffect, useState } from "react";

type Consultation = { id:number; type:string; status:string; question:string; subject:string|null; user:{name:string|null;email:string}; messages:Array<{id:number;content:string;sender:{name:string|null;role:string};createdAt:string}> };

export default function ConsultantPage() {
  const [items, setItems] = useState<Consultation[]>([]);
  const [selected, setSelected] = useState<number|null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/consultant/consultations", {cache:"no-store"});
    const data = await res.json();
    if (!res.ok) return setError(data.error ?? "Accès refusé.");
    setItems(data.consultations);
  }
  useEffect(()=>{load()},[]);

  async function send() {
    if (!selected || !message.trim()) return;
    const res = await fetch("/api/consultations/messages", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({consultationId:selected,content:message})});
    if (!res.ok) { const d=await res.json(); setError(d.error ?? "Erreur."); return; }
    setMessage(""); await load();
  }

  return <div className="page">
    <span className="eyebrow">🧑‍💼 ESPACE CONSULTANT</span><h1>Mes consultations</h1>
    {error && <p className="error">{error}</p>}
    <div className="grid">
      {items.map(c=><article className="card" key={c.id}>
        <h2>#{c.id} · {c.type}</h2><p><strong>{c.user.name ?? c.user.email}</strong></p>
        <p>{c.question}</p><p>Statut : <strong>{c.status}</strong></p>
        <button className="button secondary" onClick={()=>setSelected(c.id)}>Ouvrir</button>
        {selected===c.id && <div className="premium">
          <h3>Conversation</h3>
          {c.messages.map(m=><p key={m.id}><strong>{m.sender.name ?? m.sender.role} :</strong> {m.content}</p>)}
          <textarea rows={4} value={message} onChange={e=>setMessage(e.target.value)} placeholder="Réponse au client..." />
          <button className="button primary" onClick={send}>Envoyer</button>
        </div>}
      </article>)}
    </div>
  </div>;
}
