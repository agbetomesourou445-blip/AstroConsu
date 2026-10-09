export const supportedLocales = ["fr", "en", "es", "pt"] as const;
export type Locale = (typeof supportedLocales)[number];

export const localeLabels: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
  pt: "Português",
};

export const localeFlags: Record<Locale, string> = {
  fr: "🇫🇷",
  en: "🇬🇧",
  es: "🇪🇸",
  pt: "🇵🇹",
};

export const translations = {
  fr: {
    language: "Langue",
    languageTitle: "Choisir la langue",
    languageDescription: "Sélectionnez la langue que vous souhaitez utiliser sur AstroConsu.",
    saveLanguage: "Enregistrer la langue",
    selected: "Langue sélectionnée",
    home: "Accueil",
    dreams: "Rêves",
    consultations: "Consultations",
    tarot: "Tarot",
    archangels: "Archanges",
    mirrorHours: "Heures miroir",
    astrology: "Astrologie",
    mySpace: "Mon espace",
    languageHelp: "Vous pourrez modifier cette préférence à tout moment.",
  },
  en: {
    language: "Language",
    languageTitle: "Choose your language",
    languageDescription: "Select the language you want to use on AstroConsu.",
    saveLanguage: "Save language",
    selected: "Selected language",
    home: "Home",
    dreams: "Dreams",
    consultations: "Consultations",
    tarot: "Tarot",
    archangels: "Archangels",
    mirrorHours: "Mirror hours",
    astrology: "Astrology",
    mySpace: "My space",
    languageHelp: "You can change this preference at any time.",
  },
  es: {
    language: "Idioma",
    languageTitle: "Elegir idioma",
    languageDescription: "Selecciona el idioma que deseas utilizar en AstroConsu.",
    saveLanguage: "Guardar idioma",
    selected: "Idioma seleccionado",
    home: "Inicio",
    dreams: "Sueños",
    consultations: "Consultas",
    tarot: "Tarot",
    archangels: "Arcángeles",
    mirrorHours: "Horas espejo",
    astrology: "Astrología",
    mySpace: "Mi espacio",
    languageHelp: "Puedes cambiar esta preferencia en cualquier momento.",
  },
  pt: {
    language: "Idioma",
    languageTitle: "Escolher idioma",
    languageDescription: "Selecione o idioma que deseja utilizar no AstroConsu.",
    saveLanguage: "Guardar idioma",
    selected: "Idioma selecionado",
    home: "Início",
    dreams: "Sonhos",
    consultations: "Consultas",
    tarot: "Tarô",
    archangels: "Arcanjos",
    mirrorHours: "Horas espelho",
    astrology: "Astrologia",
    mySpace: "Meu espaço",
    languageHelp: "Você pode alterar esta preferência a qualquer momento.",
  },
} as const;

export function isLocale(value: string): value is Locale {
  return (supportedLocales as readonly string[]).includes(value);
}
