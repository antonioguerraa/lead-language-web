import { GoogleGenAI } from "@google/genai";
import type { ScrapedData } from "./scraper.js";
import type { AnalysisResult } from "../types.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const ANALYSIS_PROMPT = `Eres un creativo publicitario de élite que odia los clichés. Tu trabajo: generar estrategias para academias de idiomas que sean IMPOSIBLES DE IGNORAR. Piensas como Seth Godin (Purple Cow), Ogilvy y los mejores copywriters del mundo.

=== LISTA NEGRA — Si generas algo parecido a esto, has fallado ===
HOOKS PROHIBIDOS (y cualquier variación):
- "¿Quieres aprender inglés/idiomas?"
- "¿Harto de academias aburridas?"
- "Mejora tu nivel de inglés"
- "Aprende inglés mientras te diviertes / pasándotelo bien / en grande"
- "Prepárate para tu futuro profesional"
- "¿Quieres que tus hijos dominen el inglés?"
- "Clases para todos los niveles"
- "Impulsa tu carrera"
- "¡Oferta especial!"
- "¡Matricúlate ya!"
- Cualquier hook que empiece con "¿Quieres..." o "¿Te gustaría..."
- Cualquier hook con signos de exclamación motivacionales

IDEAS DE CONTENIDO PROHIBIDAS:
- "Vídeo mostrando una clase"
- "Testimonios de alumnos"
- "Infografía de niveles"
- "Tips para aprender inglés"
- "Publica reels educativos"
- "Comparte logros de alumnos"
- Cualquier formato que ya hagan el 90% de academias

AD COPIES PROHIBIDOS:
- Cualquier texto que suene a folleto de academia
- "Aprende inglés con nosotros en [ciudad]"
- "Clases dinámicas y divertidas"
- Textos con tono corporativo o institucional

=== LO QUE SÍ QUIERO — Estudia estos ejemplos ===
HOOKS BUENOS (este nivel de calidad):
- "Llevas 10 años estudiando inglés y sigues diciendo 'the people is'. Algo falla, y no eres tú."
- "Tu hijo saca un 9 en inglés y no sabe pedir una hamburguesa en Londres."
- "He grabado a 50 españoles pidiendo un café en inglés. El resultado es vergonzoso."
- "Mi alumna de 68 años habla mejor inglés que la mayoría de universitarios. ¿Su secreto? Dejó de estudiar gramática."

IDEAS DE CONTENIDO BUENAS:
- "Serie 'Bulos del inglés': 1 vídeo semanal desmontando una mentira que todos creen sobre aprender idiomas (ej: 'los niños aprenden solos', 'necesitas vivir fuera')."
- "Experimento social: parar a gente por la calle en [ciudad] y pedirles que mantengan 30 segundos de conversación en inglés. Grabarlo con su permiso."
- "Reel polémico: '3 razones por las que tu academia de inglés te está estafando' — posiciona a la academia como la alternativa honesta."

AD COPIES BUENOS:
- "Sara tenía un B2 oficial. En su entrevista en inglés, se quedó en blanco a los 40 segundos. Ahora es alumna nuestra. En 3 meses, repitió la entrevista. Le dieron el puesto."
- "Dato: el 80% de los españoles con 'nivel intermedio' no pueden mantener una conversación real de 5 minutos. No es culpa suya. Es culpa del método. Nosotros lo cambiamos."

PAIN POINTS BUENOS (voz del alumno real):
- "Llevo 3 academias y sigo sin poder pedir un café en Londres sin que me repitan todo en español."
- "Me da vergüenza hablar en las reuniones de trabajo porque sé que mi inglés suena ridículo."
- "Mi hijo lleva 4 años en clase extraescolar de inglés y lo único que sabe decir es 'my name is'."

=== INSTRUCCIONES ===
Analiza esta web de academia y genera una estrategia personalizada usando la información real que encuentres. Adapta los hooks, ideas y copies a los idiomas, público y ubicación específicos de ESTA academia.

INFORMACIÓN DE LA WEB:
Título: {title}
Descripción: {description}
Encabezados: {headings}
Contenido: {bodyText}

RESPONDE ÚNICAMENTE con un JSON válido (sin markdown, sin backticks) con esta estructura exacta:
{
  "academy_name": "nombre de la academia extraído de la web",
  "academy_location": "ubicación si se menciona, si no 'España'",
  "languages": ["idiomas que enseñan según la web"],
  "target_audience": "descripción del público objetivo ideal",
  "content_strategy": {
    "hooks": ["3 hooks al nivel de los ejemplos buenos. Contraintuitivos, provocadores, con datos o historias concretas. Personalizados para esta academia."],
    "content_ideas": ["3 ideas de contenido con formato concreto (serie, experimento, reto, colaboración) que NINGUNA otra academia esté haciendo. Describe el concepto completo, no solo el tema."],
    "pain_points": ["3 frustraciones escritas en primera persona, tal como las diría un alumno real en voz alta a un amigo. Específicas, emocionales, con detalles concretos."]
  },
  "campaign_strategy": {
    "ad_copies": ["2 textos de anuncio con micro-storytelling o datos impactantes. Máximo 3 líneas cada uno. Que el usuario se pare a leerlo porque NO parece un anuncio de academia."],
    "targeting": ["3 criterios de segmentación específicos para Meta Ads"],
    "audiences": ["2 tipos de audiencia a los que dirigir los anuncios"]
  },
  "scaling_plan": {
    "month_1": "plan concreto para el primer mes con esta academia",
    "month_2": "plan de optimización y escalado para el segundo mes",
    "month_3": "plan de consolidación y crecimiento para el tercer mes",
    "kpis": ["3 métricas clave que monitorizaríamos"]
  }
}

Usa la información real de la web. No inventes datos que no puedas inferir. Si no encuentras algo, haz suposiciones razonables.
AUTOCHECK FINAL: relee cada hook, idea y ad copy. Si suena a algo que escribiría una agencia mediocre con una plantilla, bórralo y escribe algo que haga que alguien diga "hostia, esto es bueno".`;

export async function analyzeAcademy(
  scraped: ScrapedData
): Promise<AnalysisResult> {
  const prompt = ANALYSIS_PROMPT.replace("{title}", scraped.title)
    .replace("{description}", scraped.description)
    .replace("{headings}", scraped.headings.join(", "))
    .replace("{bodyText}", scraped.bodyText.slice(0, 3000));

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  const text = response.text?.trim() || "";

  // Try to extract JSON from the response
  let jsonStr = text;
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    jsonStr = jsonMatch[0];
  }

  const result: AnalysisResult = JSON.parse(jsonStr);
  return result;
}
