 "use client";
import { useState } from "react";

export function HumanRequestButton({ consultationId }: { consultationId:number }) {
  const [done,setDone]=useState(false);
  const [loading,setLoading]=useState(false);
  async function request(){
    setLoading(true);
    const r=await fetch("/api/consultations/request-human",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({consultationId})});
    setLoading(false);
    if(r.ok)setDone(true);
  }
  return <button className="button ghost" disabled={loading||done} onClick={request}>{done?"Demande envoyée ✓":loading?"Envoi...":"👤 Demander un consultant humain"}</button>;
}
