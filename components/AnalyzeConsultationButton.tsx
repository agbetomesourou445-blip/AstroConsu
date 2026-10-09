"use client";
import { useState } from "react";
export function AnalyzeConsultationButton({ consultationId }: { consultationId: number }) {
  const [loading,setLoading]=useState(false), [message,setMessage]=useState("");
  async function run(){setLoading(true);setMessage("");const r=await fetch('/api/consultations/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({consultationId})});const d=await r.json();setLoading(false);setMessage(r.ok?d.analysis.content:(d.error||'Analyse impossible.'));}
  return <div><button className="button secondary" onClick={run} disabled={loading}>{loading?'Analyse IA...':'✨ Lancer l’analyse IA'}</button>{message&&<div className="premium"><p>{message}</p></div>}</div>;
}
