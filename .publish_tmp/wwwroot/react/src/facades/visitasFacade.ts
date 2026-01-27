export type VisitCreatePayload = Record<string, unknown>;
export type VisitCreateResult = {
  success: boolean;
  message?: string;
  data?: unknown;
};

// Placeholder facade for visitas operations.
export const visitasFacade = {
  createActivity: async (_payload: VisitCreatePayload): Promise<VisitCreateResult> => {
    throw new Error("visitasFacade.createActivity not implemented.");
  },
};
