 "use client";
import { useEffect, useState } from "react";

type Notification = { id:number; type:string; title:string; message:string; readAt:string|null; createdAt:string };

export function Notifications() {
  const [items,setItems]=useState<Notification[]>([]);
  const [open,setOpen]=useState(false);

  async function load() {
    const res=await fetch("/api/notifications",{cache:"no-store"});
    if(res.ok){const d=await res.json();setItems(d.notifications);}
  }
  useEffect(()=>{load()},[]);

  async function read(id:number){
    await fetch("/api/notifications",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id})});
    await load();
  }

  const unread=items.filter(x=>!x.readAt).length;

  return <div className="notification-box">
    <button className="button ghost" onClick={()=>setOpen(!open)}>🔔 {unread ? `(${unread})` : ""}</button>
    {open && <div className="notification-panel">
      <h3>Notifications</h3>
      {items.length===0 ? <p>Aucune notification.</p> : items.map(n=><button className={`notification-item ${n.readAt?"":"unread"}`} key={n.id} onClick={()=>read(n.id)}>
        <strong>{n.title}</strong><span>{n.message}</span>
      </button>)}
    </div>}
  </div>;
}
