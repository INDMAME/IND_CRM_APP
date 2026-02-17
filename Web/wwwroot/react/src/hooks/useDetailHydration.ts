import { useCallback, useEffect } from "react";
import { fetchJson } from "../services/apiService.ts";
import { indT } from "../utils/indI18n.ts";

type OptionLike = {
  value?: string | number;
  Value?: string | number;
  text?: string;
  Text?: string;
};

type ActivityDetailRecord = Record<string, unknown>;

type ActivityDetailResponse = {
  success?: boolean;
  message?: string;
  data?: ActivityDetailRecord | null;
  Success?: boolean;
  Message?: string;
  Data?: ActivityDetailRecord | null;
};

const isResponseSuccess = (response: ActivityDetailResponse): boolean => {
  return response.success === true || response.Success === true;
};

const getResponseMessage = (response: ActivityDetailResponse): string => {
  const raw = response.message ?? response.Message;
  return typeof raw === "string" ? raw.trim() : "";
};

const getResponseData = (response: ActivityDetailResponse): ActivityDetailRecord | null => {
  const data = response.data ?? response.Data;
  return data && typeof data === "object" ? data : null;
};

const asRecord = (value: unknown): Record<string, unknown> | null => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
};

type UseDetailHydrationArgs = {
  actividadId: string;
  shouldHydrate: boolean;
  visitTypes: OptionLike[];
  asistenteTipos: OptionLike[];
  defaultVisitType: string;
  initialAsistente: string;
  normalizeDateToInput: (value: string) => string;
  matchOptionValue: (options: OptionLike[], raw: unknown) => string;
  applyDraftValues: () => void;
  applyTextEditorValues: () => void;
  setStatus: (value: string) => void;
  setIsHydrating: (value: boolean) => void;
  setTransDate: (value: string) => void;
  setVisitType: (value: string) => void;
  setAsistenteTipo: (value: string) => void;
  setDescription: (value: string) => void;
  setComentarios: (value: string) => void;
  setAntecedentes: (value: string) => void;
  setConclusiones: (value: string) => void;
};

// Keeps detail hydration orchestration outside the page component.
export const useDetailHydration = ({
  actividadId,
  shouldHydrate,
  visitTypes,
  asistenteTipos,
  defaultVisitType,
  initialAsistente,
  normalizeDateToInput,
  matchOptionValue,
  applyDraftValues,
  applyTextEditorValues,
  setStatus,
  setIsHydrating,
  setTransDate,
  setVisitType,
  setAsistenteTipo,
  setDescription,
  setComentarios,
  setAntecedentes,
  setConclusiones,
}: UseDetailHydrationArgs) => {
  const hydrateFromApi = useCallback(async () => {
    if (!actividadId) return;
    setIsHydrating(true);
    try {
      const res = await fetchJson<ActivityDetailResponse>(`/Visitas/GetActivityByCode?code=${encodeURIComponent(actividadId)}`);
      const responseData = getResponseData(res);

      if (!isResponseSuccess(res) || !responseData) {
        setStatus(getResponseMessage(res) || indT("Visits_Detail_LoadActivityFailed", "Failed to load activity details."));
        return;
      }

      const rawDate = String(responseData.transDate ?? responseData.TransDate ?? "");
      setTransDate(normalizeDateToInput(rawDate));

      const rawVisitType = String(
        responseData.tipoVisita ?? responseData.TipoVisita ?? responseData.visitType ?? responseData.VisitType ?? ""
      );
      setVisitType(matchOptionValue(visitTypes, rawVisitType) || defaultVisitType);

      const asistentesList = responseData.asistentes ?? responseData.Asistentes;
      const firstAsistente = Array.isArray(asistentesList) && asistentesList.length ? asRecord(asistentesList[0]) : null;
      const rawAsistenteTipo = String(
        responseData.asistenteTipo ??
          responseData.AsistenteTipo ??
          firstAsistente?.asistenteTipo ??
          firstAsistente?.AsistenteTipo ??
          ""
      );
      const normalizedAsistenteTipo = matchOptionValue(asistenteTipos, rawAsistenteTipo);
      setAsistenteTipo(normalizedAsistenteTipo || initialAsistente);
      setDescription(String(responseData.description ?? responseData.Description ?? ""));
      setComentarios(String(responseData.comentarios ?? responseData.Comentarios ?? ""));
      setAntecedentes(String(responseData.antecedentes ?? responseData.Antecedentes ?? ""));
      setConclusiones(String(responseData.conclusiones ?? responseData.Conclusiones ?? ""));
    } catch {
      // Keep previous UI behavior on hydration errors.
    } finally {
      setIsHydrating(false);
      applyDraftValues();
      applyTextEditorValues();
    }
  }, [
    actividadId,
    applyDraftValues,
    applyTextEditorValues,
    asistenteTipos,
    defaultVisitType,
    initialAsistente,
    matchOptionValue,
    normalizeDateToInput,
    setAntecedentes,
    setAsistenteTipo,
    setComentarios,
    setConclusiones,
    setDescription,
    setIsHydrating,
    setStatus,
    setTransDate,
    setVisitType,
    visitTypes,
  ]);

  useEffect(() => {
    if (shouldHydrate) {
      hydrateFromApi();
      return;
    }
    applyDraftValues();
    applyTextEditorValues();
  }, [applyDraftValues, applyTextEditorValues, hydrateFromApi, shouldHydrate]);
};
