 "use client";
import { useEffect, useState } from "react";
type Log={id:number;action:string;entityType:string;entityId:number|null;createdAt:string;actor:{name:string|null;email:string;role:string}|null};
export default function AuditPage(){
 const [logs,setLogs]=useState<Log[]>([]);const [error,setError]=useState("");
 useEffect(()=>{fetch("/api/admin/audit",{cache:"no-store"}).then(async r=>{const d=await r.json();if(!r.ok)return setError(d.error??"Accès refusé.");setLogs(d.logs)})},[]);
 return <div className="page"><span className="eyebrow">🛡️ JOURNAL D'AUDIT</span><h1>Activité administrative</h1>{error&&<p className="error">{error}</p>}<div className="card">{logs.map(l=><p key={l.id}><strong>{l.action}</strong> · {l.entityType} #{l.entityId??"-"} · {l.actor?.email??"système"} · {new Date(l.createdAt).toLocaleString("fr-FR")}</p>)}</div></div>
}
