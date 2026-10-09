"use client";

import { useEffect, useState } from "react";
import {
  isLocale,
  localeFlags,
  localeLabels,
  supportedLocales,
  translations,
  type Locale,
} from "@/lib/i18n";

const COOKIE_NAME = "astroconsu_locale";

function readLocale(): Locale {
  if (typeof document === "undefined") return "fr";
  const value = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`))
    ?.split("=")[1];
  return value && isLocale(decodeURIComponent(value)) ? decodeURIComponent(value) : "fr";
}

export function LanguageSelector() {
  const [locale, setLocale] = useState<Locale>("fr");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setLocale(readLocale());
  }, []);

  const t = translations[locale];

  function save() {
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(locale)}; Path=/; Max-Age=31536000; SameSite=Lax`;
    document.documentElement.lang = locale;
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  return (
    <section className="container" style={{ maxWidth: 760, paddingTop: 48, paddingBottom: 48 }}>
      <div className="card">
        <p className="muted">{t.language}</p>
        <h1>{t.languageTitle}</h1>
        <p>{t.languageDescription}</p>

        <div style={{ display: "grid", gap: 12, marginTop: 24 }}>
          {supportedLocales.map((item) => {
            const active = item === locale;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setLocale(item)}
                aria-pressed={active}
                className={`button ${active ? "primary" : "secondary"}`}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}
              >
                <span>{localeFlags[item]} {localeLabels[item]}</span>
                <span aria-hidden="true">{active ? "✓" : ""}</span>
              </button>
            );
          })}
        </div>

        <button type="button" className="button primary" onClick={save} style={{ marginTop: 24 }}>
          {t.saveLanguage}
        </button>

        <p className="muted" style={{ marginTop: 16 }}>
          {saved ? "✓ " : ""}{t.languageHelp}
        </p>
      </div>
    </section>
  );
}
