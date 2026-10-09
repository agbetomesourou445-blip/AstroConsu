 "use client";
import { useEffect, useState } from "react";

type Item = { id:number; type:string; status:string; humanRequested:boolean; user:{name:string|null;email:string}; assignedTo:{name:string|null;email:string}|null };

export default function AdminPage() {
  const [items,setItems]=useState<Item[]>([]);
  const [error,setError]=useState("");

  async function load(){const r=await fetch("/api/admin/consultations",{cache:"no-store"});const d=await r.json();if(!r.ok)return setError(d.error??"Accès refusé.");setItems(d.consultations);}
  useEffect(()=>{load()},[]);

  async function update(id:number, patch:Record<string,unknown>){
    const r=await fetch("/api/admin/consultations/manage",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({consultationId:id,...patch})});
    if(!r.ok){const d=await r.json();setError(d.error??"Erreur.");return;} await load();
  }

  return <div className="page"><span className="eyebrow">⚙️ ADMINISTRATION</span><h1>Supervision des consultations</h1><p><a className="learn" href="/admin/users">Gérer les utilisateurs</a> · <a className="learn" href="/admin/audit">Journal d’audit</a></p>
    {error&&<p className="error">{error}</p>}
    <div className="grid">{items.map(c=><article className="card" key={c.id}>
      <h2>#{c.id} · {c.type}</h2><p>{c.user.name??c.user.email}</p>
      <p>Statut : <strong>{c.status}</strong></p>
      <p>Consultant : {c.assignedTo?.name??"Non assigné"}</p>
      {c.humanRequested&&<p>🟢 Le client demande un accompagnement humain.</p>}
      <div className="actions">
        {c.status==="PAID"&&<button className="button secondary" onClick={()=>update(c.id,{status:"PROCESSING"})}>Passer en traitement</button>}
        {c.status==="PROCESSING"&&<button className="button secondary" onClick={()=>update(c.id,{status:"COMPLETED"})}>Terminer</button>}
      </div>
    </article>)}</div>
  </div>;
}
