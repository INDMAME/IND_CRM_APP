import type { HelpResolution, HelpResponseLocale } from "./helpTypes.ts";

type HelpResolutionCopy = Record<HelpResolution, string>;

// Response fallbacks follow responseLocale; UI chrome remains exclusively RESX-driven.
const RESPONSE_COPY: Record<HelpResponseLocale, HelpResolutionCopy> = {
  "es-ES": {
    answered: "No hay una respuesta disponible para esta consulta.",
    needsSelection: "Elige el tema más cercano para que pueda responder con precisión.",
    notDocumented: "Esta información todavía no está documentada.",
  },
  "eu-ES": {
    answered: "Ez dago erantzunik erabilgarri kontsulta honetarako.",
    needsSelection: "Aukeratu gairik hurbilena zehaztasunez erantzun ahal izateko.",
    notDocumented: "Informazio hau oraindik ez dago dokumentatuta.",
  },
  en: {
    answered: "No answer is available for this question.",
    needsSelection: "Choose the closest topic so I can answer precisely.",
    notDocumented: "This information is not documented yet.",
  },
  pt: {
    answered: "Não existe uma resposta disponível para esta pergunta.",
    needsSelection: "Escolha o tema mais próximo para que eu possa responder com precisão.",
    notDocumented: "Esta informação ainda não está documentada.",
  },
  it: {
    answered: "Non è disponibile una risposta per questa domanda.",
    needsSelection: "Scegli l'argomento più vicino così potrò rispondere con precisione.",
    notDocumented: "Questa informazione non è ancora documentata.",
  },
  "zh-Hans": {
    answered: "此问题暂无可用答案。",
    needsSelection: "请选择最接近的主题，以便我准确回答。",
    notDocumented: "此信息尚未记录在文档中。",
  },
};

// Returns one deterministic response fallback in the explicitly selected language.
export const getHelpResolutionFallback = (
  responseLocale: HelpResponseLocale,
  resolution: HelpResolution
): string => RESPONSE_COPY[responseLocale][resolution];
