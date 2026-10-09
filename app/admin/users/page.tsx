 "use client";
import { useEffect, useState } from "react";

type User={id:number;name:string|null;email:string;role:string;createdAt:string};

export default function AdminUsers(){
 const [users,setUsers]=useState<User[]>([]); const [error,setError]=useState("");
 async function load(){const r=await fetch("/api/admin/users",{cache:"no-store"});const d=await r.json();if(!r.ok)return setError(d.error??"Accès refusé.");setUsers(d.users)}
 async function role(id:number,role:string){const r=await fetch("/api/admin/users",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:id,role})});if(!r.ok){const d=await r.json();setError(d.error??"Erreur.");return}await load()}
 useEffect(()=>{load()},[]);
 return <div className="page"><span className="eyebrow">👥 UTILISATEURS</span><h1>Gestion des comptes</h1>{error&&<p className="error">{error}</p>}
 <div className="grid">{users.map(u=><article className="card" key={u.id}><h3>{u.name??"Sans nom"}</h3><p>{u.email}</p><p>Rôle : <strong>{u.role}</strong></p><select value={u.role} onChange={e=>role(u.id,e.target.value)}><option>USER</option><option>CONSULTANT</option><option>ADMIN</option></select></article>)}</div></div>
}
