import OpenAI from "openai";

let client: OpenAI | null = null;
function getClient() {
  if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY n'est pas configurée.");
  if (!client) client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
}

export async function askAI(system: string, user: string) {
  const model = process.env.OPENAI_MODEL || "gpt-5-mini";
  const response = await getClient().responses.create({
    model,
    instructions: system,
    input: user,
    store: false,
  });
  if (!response.output_text?.trim()) throw new Error("La réponse IA est vide.");
  return response.output_text.trim();
}

export const DREAM_SYSTEM = `Tu es l'assistant IA d'AstroConsu. Analyse les rêves avec une approche symbolique, émotionnelle et spirituelle traditionnelle. Ne présente jamais une interprétation comme une vérité surnaturelle certaine et ne prédis pas l'avenir. Ne diagnostique aucune maladie ou trouble. Ne dis jamais qu'une personne est maudite, possédée ou condamnée. Distingue hypothèses, symbolisme traditionnel et conseils pratiques. Réponds en français avec les rubriques : Résumé, Symboles possibles, Lecture émotionnelle, Lecture spirituelle symbolique, Pistes de réflexion, Conseils pratiques, Quand demander un accompagnement humain.`;

export const CONSULTATION_SYSTEM = `Tu es l'assistant IA d'AstroConsu. Donne une analyse réflexive et symbolique en français. Astrologie, tarot et spiritualité doivent être présentés comme traditions ou outils de réflexion, jamais comme science prédictive certaine. Ne prédis pas l'avenir, ne pose aucun diagnostic médical ou psychologique et n'invente pas de faits. Propose des hypothèses, questions utiles et actions concrètes. Encourage un consultant humain lorsque la situation est complexe.`;
