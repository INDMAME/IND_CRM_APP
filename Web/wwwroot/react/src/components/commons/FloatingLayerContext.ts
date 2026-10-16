import { createContext, useContext } from "react";

// Keeps floating controls inside a modal while preserving the default page host.
export const FloatingLayerContext = createContext<HTMLElement | null | undefined>(undefined);

// Resolves the active overlay host without changing controls outside a modal.
export const useFloatingLayerHost = () => useContext(FloatingLayerContext);

// Recognizes a mounting modal before its DOM host has been assigned.
export const useFloatingLayerActive = () => useContext(FloatingLayerContext) !== undefined;
