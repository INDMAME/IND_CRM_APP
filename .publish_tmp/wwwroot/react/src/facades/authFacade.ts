export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResult = {
  success: boolean;
  message?: string;
};

// Placeholder facade for auth flows (login/logout/refresh).
export const authFacade = {
  login: async (_payload: LoginPayload): Promise<LoginResult> => {
    throw new Error("authFacade.login not implemented.");
  },
};
