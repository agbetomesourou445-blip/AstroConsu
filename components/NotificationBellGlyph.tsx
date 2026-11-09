"use client";

import { useEffect, useState } from "react";

// Keep the bell glyph consistent across platforms and readable for assistive tech.
export function NotificationBellGlyph() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return <span className="notification-bell" aria-hidden="true">{mounted ? "♧" : "♧"}</span>;
}
