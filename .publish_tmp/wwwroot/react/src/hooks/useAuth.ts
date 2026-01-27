import { useAuthContext } from "../context/AuthContext.tsx";

export const useAuth = () => {
  return useAuthContext();
};
