export {};

declare global {
  type IndNavigationGuardOptions = {
    active?: boolean;
    message?: string;
    block?: boolean;
  };

  interface Window {
    __IND_I18N__?: Record<string, string>;
    __IND_MODULE_ACCESS__?: Record<string, number>;
    __IND_SELECTED_COMPANY__?: string;
    __IND_ALLOW_SELF_MANAGEMENT__?: boolean;
    __IND_API_TOKEN__?: string;
    __IND_ENTRA_OID__?: string;
    __IND_APP_CODE__?: string;
    __IND_EXPENSE_STRICT_API__?: boolean | string;
    __IND_PERMISSION_I18N__?: { title?: string; message?: string; ok?: string };
    __IND_NAV_GUARD_I18N__?: { activeProcessMessage?: string };
    __IND_AUDIO_RECORDER_TESTS__?: boolean;
    __VISIT_TYPES__?: Array<{ value?: string; Value?: string }>;
    __CONTACT_METHODS__?: Array<{ value?: string; Value?: string; text?: string; Text?: string }>;
    __ASISTENTE_TIPOS__?: Array<{ value?: string; Value?: string }>;
    __EXPENSE_GASTO_TYPES__?: Array<{ value?: string; Value?: string; text?: string; Text?: string }>;
    __ACTIVITY_DETAIL__?: Record<string, unknown>;
    __EXPENSE_SHEET_ID__?: string;
    __EXPENSE_SHEET_MODE__?: string;
    __EXPENSE_ACTING_USER_ID__?: string;
    __EXPENSE_LINE_ID__?: string;
    __EXPENSE_LINE_MODE__?: string;
    __EXPENSE_TICKET_FILE_ID__?: string;
    __EXPENSE_TICKET_LINE_ID__?: string;
    __indAllowHistoryOnce?: (fallbackUrl?: string) => void;
    __indSetNavigationGuard?: (activeOrOptions?: boolean | IndNavigationGuardOptions, message?: string) => void;
    __indClearNavigationGuard?: () => void;
    __indBypassNavigationGuardOnce?: () => void;
    __indConfirmNavigation?: () => boolean;
    __indRequestNavigation?: (action?: (() => void) | null, message?: string) => boolean;
    __indShowGlobalSpinner?: (message?: string) => void;
    __indHideGlobalSpinner?: () => void;
    IND?: {
      showPermissionModal?: (opts?: Record<string, unknown>) => void;
      flashActionMark?: (payload: { type: string; durationMs: number }) => void;
    };
    webkitAudioContext?: typeof AudioContext;
  }

  interface GlobalThis {
    __IND_I18N__?: Record<string, string>;
    __IND_MODULE_ACCESS__?: Record<string, number>;
    __IND_SELECTED_COMPANY__?: string;
    __IND_ALLOW_SELF_MANAGEMENT__?: boolean;
    __IND_API_TOKEN__?: string;
    __IND_ENTRA_OID__?: string;
    __IND_APP_CODE__?: string;
    __IND_EXPENSE_STRICT_API__?: boolean | string;
  }
}
