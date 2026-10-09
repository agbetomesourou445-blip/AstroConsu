"use client";

import { usePathname } from "next/navigation";

const angels = [
  { symbol: "🪽", name: "Michel", className: "angel angel-1" },
  { symbol: "👼", name: "Gabriel", className: "angel angel-2" },
  { symbol: "🪽", name: "Raphaël", className: "angel angel-3" },
  { symbol: "👼", name: "Uriel", className: "angel angel-4" },
  { symbol: "🪽", name: "Jophiel", className: "angel angel-5" },
  { symbol: "👼", name: "Métatron", className: "angel angel-6" },
];

export function CosmicBackground() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="cosmic-background" aria-hidden="true">
      <div className="cosmic-nebula nebula-one" />
      <div className="cosmic-nebula nebula-two" />
      <div className="cosmic-orbit orbit-one" />
      <div className="cosmic-orbit orbit-two" />
      <div className="cosmic-stars stars-one" />
      <div className="cosmic-stars stars-two" />
      {isHome && (
        <div className="angel-layer">
          {angels.map((angel) => (
            <div className={angel.className} key={angel.name} title={angel.name}>
              <span>{angel.symbol}</span>
              <i>{angel.name}</i>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
