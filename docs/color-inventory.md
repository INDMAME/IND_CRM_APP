# Color inventory (source)

Generated from source files in `Web/` and project root. Excludes generated assets in `Web/wwwroot/js`, top-level `wwwroot`, and `Web/wwwroot/css/tailwind.css`.

## Read-only color contract (high priority)
- Labels: #00296be0 (always, read or edit).
- Values: edit = #00296be0, read = #64748b.
- Background/border: #f1f5f9 / #e2e8f0, placeholder #94a3b8.
- Apply per-component (do not rely on global overrides alone).

| Color | Usage (file:line) | Context |
| --- | --- | --- |
| `#001a3f` | `Web/wwwroot/css/Historial.css:17` | .crm-btn:active -> .crm-btn:active { transform: translateY(1px); box-shadow: inset 0 3px 8px rgba(0,0,0,0.18); background: #001a3f; color: #ffffff !important; } |
| `#001f4d` | `Web/Assets/tailwind.input.css:28` | ::file-selector-button -> @apply bg-(--color-primary) text-white font-semibold rounded-xl px-4 py-2 shadow-xs hover:bg-[#001f4d]; |
|  | `Web/wwwroot/css/Historial.css:16` | .crm-btn:hover -> .crm-btn:hover { background: #001f4d; } |
|  | `Web/wwwroot/css/Historial.css:21` | .crm-btn:focus:active -> .crm-btn:focus:active { background: #001f4d; color: #ffffff !important; border-color: #001f4d; box-shadow: none; } |
| `#00296b` | `tailwind.config.js:12` | primary: "#00296b", |
|  | `Web/Assets/tailwind.input.css:4` | --color-primary: #00296b; |
|  | `Web/Assets/tailwind.input.css:33` | :root -> --color-primary: #00296b; |
| `#00296be0` | `Web/wwwroot/css/Historial.css:77` | .history-filter-summary -> color: #00296be0; |
|  | `Web/wwwroot/css/Historial.css:145` | .filter-card .drp-label -> color: #00296be0; |
|  | `Web/wwwroot/css/Historial.css:151` | .filter-card .drp-value -> color: #00296be0; |
| `#00a4ef` | `Web/Views/Auth/Login.cshtml:71` | <rect x="4" y="26" width="18" height="18" fill="#00a4ef"></rect> |
| `#64748b` | `Web/wwwroot/css/visitas.css:51` | .drp.drp-readonly .drp-value -> .drp.drp-readonly .drp-value { color: #64748b; } |
| `#6b7280` | `Web/wwwroot/css/technical-info.css:11` | .tech-info strong -> color: #6b7280; |
| `#7fba00` | `Web/Views/Auth/Login.cshtml:70` | <rect x="26" y="4" width="18" height="18" fill="#7fba00"></rect> |
| `#8aa5ffbd` | `Web/wwwroot/react/src/components/commons/QuickFilterSlider.tsx:54` | color={isActive ? "#8aa5ffbd" : "#8aa5ffe3"} |
| `#8aa5ffe3` | `Web/wwwroot/react/src/pages/visitas/historial/HistoryPage.tsx:1349` | color="#8aa5ffe3" |
|  | `Web/wwwroot/react/src/pages/visitas/historial/HistoryPage.tsx:1365` | color="#8aa5ffe3" |
|  | `Web/wwwroot/react/src/components/commons/QuickFilterSlider.tsx:54` | color={isActive ? "#8aa5ffbd" : "#8aa5ffe3"} |
| `#94a3b8` | `Web/wwwroot/css/Historial.css:357` | .drp-label -> .drp-label { font-size: 12px; letter-spacing: 1px; font-weight: 700; text-transform: uppercase; color: #94a3b8; } |
|  | `Web/wwwroot/css/Historial.css:370` | .drp-clear -> color: #94a3b8; |
|  | `Web/wwwroot/css/Historial.css:400` | .drp-weekdays -> .drp-weekdays { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .5px; color: #94a3b8; padding: 10px 14px 6px; } |
| `#9aa8b8` | `Web/wwwroot/css/technical-info.css:4` | .tech-info -> color: #9aa8b8; |
|  | `Web/wwwroot/css/technical-info.css:24` | .tech-badge -> color: #9aa8b8 !important; |
| `#cbd5e1` | `Web/wwwroot/css/Historial.css:315` | .timeline-empty:empty::after -> border: 1px dashed #cbd5e1; |
|  | `Web/wwwroot/css/Historial.css:361` | .drp-separator -> .drp-separator { align-items: center; justify-content: center; color: #cbd5e1; padding: 0 6px; font-size: 18px; } |
|  | `Web/wwwroot/css/Historial.css:406` | .drp-day.disabled -> .drp-day.disabled { color: #cbd5e1; cursor: not-allowed; } |
| `#d5e3ff` | `Web/wwwroot/css/Historial.css:327` | .drp -> border: 1px solid #d5e3ff; |
|  | `Web/wwwroot/css/visitas.css:28` | .drp -> border: 1px solid #d5e3ff; |
| `#e2e8f0` | `Web/wwwroot/css/Historial.css:30` | .timeline-card -> border: 1px solid #e2e8f0; |
|  | `Web/wwwroot/css/Historial.css:180` | .filter-card .drp-popover -> border: 1px solid #e2e8f0; |
|  | `Web/wwwroot/css/Historial.css:187` | .filter-card .drp-head -> border-bottom: 1px solid #e2e8f0; |
| `#eef2ff` | `Web/wwwroot/css/Historial.css:355` | .drp-section.active -> .drp-section.active { background: #eef2ff; box-shadow: 0 0 0 1px rgba(0,41,107,0.25); } |
| `#ef4444` | `Web/wwwroot/css/Historial.css:380` | .drp-clear:hover -> .drp-clear:hover { background: #fee2e2; color: #ef4444; } |
| `#f1f5f9` | `Web/wwwroot/css/Historial.css:368` | .drp-clear -> background: #f1f5f9; |
|  | `Web/wwwroot/css/visitas.css:46` | .drp.drp-readonly -> background: #f1f5f9; |
| `#f25022` | `Web/Views/Auth/Login.cshtml:69` | <rect x="4" y="4" width="18" height="18" fill="#f25022"></rect> |
| `#f5f6f7` | `Web/wwwroot/css/layout.css:16` | body -> background-color: #f5f6f7; |
| `#f8fafc` | `Web/wwwroot/css/Historial.css:186` | .filter-card .drp-head -> background: #f8fafc; |
|  | `Web/wwwroot/css/Historial.css:314` | .timeline-empty:empty::after -> background: #f8fafc; |
|  | `Web/wwwroot/css/Historial.css:395` | .drp-head -> .drp-head { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; border-bottom: 1px solid #e2e8f0; background: #f8fafc; } |
| `#fee2e2` | `Web/wwwroot/css/Historial.css:380` | .drp-clear:hover -> .drp-clear:hover { background: #fee2e2; color: #ef4444; } |
| `#ffb900` | `Web/Views/Auth/Login.cshtml:72` | <rect x="26" y="26" width="18" height="18" fill="#ffb900"></rect> |
| `#fff` | `Web/wwwroot/css/Historial.css:5` | .crm-filter-box -> background: #fff; |
|  | `Web/wwwroot/css/layout.css:99` | .topbar -> color: #fff; |
|  | `Web/wwwroot/css/layout.css:132` | #topbarTitle -> color: #fff; |
| `#ffffff` | `Web/wwwroot/css/Historial.css:15` | .crm-btn -> .crm-btn { background: #00296b; color: #ffffff !important; font-weight: 600; transition: transform 0.08s ease, box-shadow 0.15s ease, background 0.15s ease; } |
|  | `Web/wwwroot/css/Historial.css:17` | .crm-btn:active -> .crm-btn:active { transform: translateY(1px); box-shadow: inset 0 3px 8px rgba(0,0,0,0.18); background: #001a3f; color: #ffffff !important; } |
|  | `Web/wwwroot/css/Historial.css:18` | .crm-btn:focus -> .crm-btn:focus { color: #ffffff; box-shadow: 0 0 0 0.2rem rgba(0,41,107,0.25); } |
| `rgba(0,0,0,0.08)` | `Web/wwwroot/css/Historial.css:8` | .crm-filter-box -> box-shadow: 0 4px 12px rgba(0,0,0,0.08); |
|  | `Web/wwwroot/css/Historial.css:330` | .drp -> box-shadow: 0 6px 18px rgba(0,0,0,0.08); |
|  | `Web/wwwroot/css/visitas.css:31` | .drp -> box-shadow: 0 6px 18px rgba(0,0,0,0.08); |
| `rgba(0,0,0,0.10)` | `Web/wwwroot/css/Historial.css:343` | .drp:hover -> .drp:hover { border-color: rgba(0,41,107,0.28); box-shadow: 0 12px 24px rgba(0,0,0,0.10); transform: translateY(-1px); } |
|  | `Web/wwwroot/css/visitas.css:44` | .drp:hover -> .drp:hover { border-color: rgba(0,41,107,0.28); box-shadow: 0 12px 24px rgba(0,0,0,0.10); transform: translateY(-1px); } |
| `rgba(0,0,0,0.15)` | `Web/wwwroot/css/layout.css:319` | .user-chip:hover -> box-shadow: 0 10px 20px rgba(0,0,0,0.15); |
|  | `Web/Views/Shared/_IndActionMark.cshtml:67` | <div class="hidden text-emerald-600 text-rose-600 text-amber-500 drop-shadow-[0_18px_24px_rgba(0,0,0,0.15)]"></div> |
| `rgba(0,0,0,0.16)` | `Web/wwwroot/css/Historial.css:181` | .filter-card .drp-popover -> box-shadow: 0 18px 44px rgba(0,0,0,0.16); |
|  | `Web/wwwroot/css/Historial.css:390` | .drp-popover -> box-shadow: 0 18px 44px rgba(0,0,0,0.16); |
|  | `Web/wwwroot/css/visitas.css:78` | .drp-popover -> box-shadow: 0 18px 44px rgba(0,0,0,0.16); |
| `rgba(0,0,0,0.18)` | `Web/wwwroot/css/Historial.css:17` | .crm-btn:active -> .crm-btn:active { transform: translateY(1px); box-shadow: inset 0 3px 8px rgba(0,0,0,0.18); background: #001a3f; color: #ffffff !important; } |
| `rgba(0,0,0,0.22)` | `Web/wwwroot/css/layout.css:346` | .user-menu -> background: rgba(0, 0, 0, 0.22); |
| `rgba(0,0,0,0.25)` | `Web/wwwroot/css/layout.css:189` | .topbar-btn -> box-shadow: 0 6px 18px rgba(0,0,0,0.25); |
|  | `Web/wwwroot/css/layout.css:233` | .hamburger -> box-shadow: 0 6px 18px rgba(0,0,0,0.25); |
| `rgba(0,0,0,0.28)` | `Web/wwwroot/css/Historial.css:444` | .timeline-tooltip -> box-shadow: 0 14px 34px rgba(0,0,0,0.28); |
|  | `Web/wwwroot/css/layout.css:151` | .ind-preview-tooltip -> box-shadow: 0 14px 34px rgba(0,0,0,0.28); |
| `rgba(0,0,0,0.45)` | `Web/wwwroot/css/layout.css:285` | .overlay -> background-color: rgba(0, 0, 0, 0.45); |
| `rgba(0,41,107,0.04)` | `Web/wwwroot/react/src/pages/system/AudioRecorderMinimal.tsx:1213` | backgroundColor: wavUrl ? "rgba(0, 41, 107, 0.06)" : "rgba(0, 41, 107, 0.04)", |
|  | `Web/wwwroot/react/src/pages/system/AudioRecorderMinimal.tsx:1239` | backgroundColor: canRecord ? "rgba(0, 41, 107, 0.06)" : "rgba(0, 41, 107, 0.04)", |
|  | `Web/wwwroot/react/src/pages/system/AudioRecorderMinimal.tsx:1270` | backgroundColor: isRecording ? "rgba(0, 41, 107, 0.06)" : "rgba(0, 41, 107, 0.04)", |
| `rgba(0,41,107,0.05)` | `Web/wwwroot/css/Historial.css:133` | .filter-card .drp-section -> background: rgba(0, 41, 107, 0.05); |
|  | `Web/wwwroot/css/Historial.css:235` | .filter-card .drp-day:hover:not(.disabled):not(.empty) -> background: rgba(0,41,107,0.05); |
|  | `Web/wwwroot/css/Historial.css:404` | .drp-day:hover:not(.disabled):not(.empty) -> .drp-day:hover:not(.disabled):not(.empty) { background: rgba(0,41,107,0.05); } |
| `rgba(0,41,107,0.06)` | `Web/wwwroot/css/Historial.css:225` | .filter-card .drp-status -> background: rgba(0,41,107,0.06); |
|  | `Web/wwwroot/css/Historial.css:415` | .drp-status -> .drp-status { background: rgba(0,41,107,0.06); color: #00296be0; font-size: 12px; padding: 10px 14px; border-top: 1px solid #e2e8f0; text-align: center; font-weight: 600; } |
|  | `Web/wwwroot/css/visitas.css:104` | .drp-status -> .drp-status { background: rgba(0,41,107,0.06); color: #00296be0; font-size: 12px; padding: 10px 14px; border-top: 1px solid #e2e8f0; text-align: center; font-weight: 600; } |
| `rgba(0,41,107,0.08)` | `Web/wwwroot/react/src/pages/system/AudioRecorderMinimal.tsx:1157` | backgroundImage: "radial-gradient(900px circle at 20% 20%, rgba(0, 41, 107, 0.08), transparent 60%)", |
|  | `Web/wwwroot/react/src/pages/system/AudioRecorderMinimal.tsx:1241` | ? "0 0 0 7px rgba(0, 41, 107, 0.08), 0 14px 34px rgba(0, 41, 107, 0.14)" |
|  | `Web/wwwroot/react/src/pages/system/AudioRecorderMinimal.tsx:1242` | : "0 10px 22px rgba(0, 41, 107, 0.08)", |
| `rgba(0,41,107,0.12)` | `Web/wwwroot/css/Historial.css:231` | .filter-card .drp-nav:hover -> background: rgba(0,41,107,0.12); |
|  | `Web/wwwroot/css/Historial.css:398` | .drp-nav:hover -> .drp-nav:hover { background: rgba(0,41,107,0.12); transform: translateY(-1px); } |
|  | `Web/wwwroot/css/visitas.css:87` | .drp-nav:hover -> .drp-nav:hover { background: rgba(0,41,107,0.12); transform: translateY(-1px); } |
| `rgba(0,41,107,0.14)` | `Web/wwwroot/react/src/pages/system/AudioRecorderMinimal.tsx:1241` | ? "0 0 0 7px rgba(0, 41, 107, 0.08), 0 14px 34px rgba(0, 41, 107, 0.14)" |
| `rgba(0,41,107,0.16)` | `Web/wwwroot/react/src/pages/visitas/historial/HistoryLegacy.ts:524` | const PIXEL_COLORS = ["rgba(0, 41, 107, 0.08)", "rgba(0, 41, 107, 0.16)", "rgba(0, 41, 107, 0.26)"]; |
|  | `Web/wwwroot/react/src/pages/visitas/historial/HistoryTable.tsx:38` | const PIXEL_COLORS = ["rgba(0, 41, 107, 0.08)", "rgba(0, 41, 107, 0.16)", "rgba(0, 41, 107, 0.26)"]; |
| `rgba(0,41,107,0.18)` | `Web/wwwroot/css/Historial.css:245` | .filter-card .drp-day.hover-range -> background: rgba(0, 41, 107, 0.18); |
|  | `Web/wwwroot/css/Historial.css:413` | .drp-day.hover-range -> .drp-day.hover-range { background: rgba(0, 41, 107, 0.18); color: #00296be0; border-radius: 8px; } |
|  | `Web/wwwroot/css/visitas.css:102` | .drp-day.hover-range -> .drp-day.hover-range { background: rgba(0, 41, 107, 0.18); color: #00296be0; border-radius: 8px; } |
| `rgba(0,41,107,0.22)` | `Web/wwwroot/css/input.css:318` | .ind-quick-slider__item.is-active:hover:not(:disabled) -> box-shadow: 0 12px 22px rgba(0, 41, 107, 0.22); |
|  | `Web/wwwroot/react/src/pages/system/AudioRecorderMinimal.tsx:1212` | borderColor: wavUrl ? "rgba(0, 41, 107, 0.22)" : "rgba(0, 41, 107, 0.18)", |
|  | `Web/wwwroot/react/src/pages/system/AudioRecorderMinimal.tsx:1269` | borderColor: isRecording ? "rgba(0, 41, 107, 0.22)" : "rgba(0, 41, 107, 0.18)", |
| `rgba(0,41,107,0.25)` | `Web/wwwroot/css/Historial.css:18` | .crm-btn:focus -> .crm-btn:focus { color: #ffffff; box-shadow: 0 0 0 0.2rem rgba(0,41,107,0.25); } |
|  | `Web/wwwroot/css/Historial.css:254` | .filter-card .drp-day.end -> box-shadow: 0 6px 12px rgba(0,41,107,0.25); |
|  | `Web/wwwroot/css/Historial.css:267` | .timeline-card--clickable:hover -> .timeline-card--clickable:hover { border-color: rgba(0, 41, 107, 0.25); } |
| `rgba(0,41,107,0.26)` | `Web/wwwroot/react/src/pages/visitas/historial/HistoryLegacy.ts:524` | const PIXEL_COLORS = ["rgba(0, 41, 107, 0.08)", "rgba(0, 41, 107, 0.16)", "rgba(0, 41, 107, 0.26)"]; |
|  | `Web/wwwroot/react/src/pages/visitas/historial/HistoryTable.tsx:38` | const PIXEL_COLORS = ["rgba(0, 41, 107, 0.08)", "rgba(0, 41, 107, 0.16)", "rgba(0, 41, 107, 0.26)"]; |
| `rgba(0,41,107,0.28)` | `Web/wwwroot/css/Historial.css:137` | .filter-card .drp-section.active -> background: rgba(0, 41, 107, 0.28); |
|  | `Web/wwwroot/css/Historial.css:239` | .filter-card .drp-day.in-range -> background: rgba(0, 41, 107, 0.28); |
|  | `Web/wwwroot/css/Historial.css:343` | .drp:hover -> .drp:hover { border-color: rgba(0,41,107,0.28); box-shadow: 0 12px 24px rgba(0,0,0,0.10); transform: translateY(-1px); } |
| `rgba(0,41,107,0.35)` | `Web/wwwroot/css/Historial.css:258` | .filter-card .drp-day.today -> border: 1px dashed rgba(0,41,107,0.35); |
|  | `Web/wwwroot/css/Historial.css:412` | .drp-day.today -> .drp-day.today { border: 1px dashed rgba(0,41,107,0.35); } |
|  | `Web/wwwroot/css/visitas.css:101` | .drp-day.today -> .drp-day.today { border: 1px dashed rgba(0,41,107,0.35); } |
| `rgba(0,41,107,0.65)` | `Web/wwwroot/react/src/components/commons/StarBorder.tsx:19` | color = "rgba(0, 41, 107, 0.65)", |
| `rgba(15,23,42,0.08)` | `Web/wwwroot/css/Historial.css:31` | .timeline-card -> box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08); |
| `rgba(15,23,42,0.12)` | `Web/wwwroot/css/Historial.css:265` | .timeline-card:hover -> .timeline-card:hover { transform: translateY(-1px); box-shadow: 0 16px 30px rgba(15, 23, 42, 0.12); } |
| `rgba(15,23,42,0.14)` | `Web/wwwroot/css/input.css:309` | .ind-quick-slider__item:hover:not(:disabled) -> box-shadow: 0 10px 18px rgba(15, 23, 42, 0.14); |
| `rgba(15,23,42,0.16)` | `Web/wwwroot/css/input.css:314` | .ind-quick-slider__item:active:not(:disabled) -> box-shadow: inset 0 3px 8px rgba(15, 23, 42, 0.16); |
| `rgba(15,23,42,0.18)` | `Web/wwwroot/css/layout.css:484` | .ind-global-loading__panel -> box-shadow: 0 18px 36px rgba(15, 23, 42, 0.18); |
| `rgba(15,23,42,0.96)` | `Web/wwwroot/css/Historial.css:441` | .timeline-tooltip -> background: rgba(15, 23, 42, 0.96); |
|  | `Web/wwwroot/css/layout.css:148` | .ind-preview-tooltip -> background: rgba(15, 23, 42, 0.96); |
| `rgba(2,24,60,0.35)` | `Web/Views/Auth/Login.cshtml:32` | box-shadow: 0 22px 45px rgba(2, 24, 60, 0.35); |
| `rgba(248,250,252,0.55)` | `Web/wwwroot/css/Historial.css:276` | .timeline-date-panel -> background: rgba(248, 250, 252, 0.55); |
| `rgba(248,250,252,0.88)` | `Web/wwwroot/css/layout.css:465` | .ind-global-loading -> background: rgba(248, 250, 252, 0.88); |
| `rgba(255,255,255,0.06)` | `Web/Views/Auth/Login.cshtml:25` | linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), |
|  | `Web/Views/Auth/Login.cshtml:26` | linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px); |
| `rgba(255,255,255,0.08)` | `Web/wwwroot/css/layout.css:320` | .user-chip:hover -> background: rgba(255, 255, 255, 0.08); |
| `rgba(255,255,255,0.10)` | `Web/wwwroot/css/layout.css:178` | .topbar-btn -> background: rgba(255,255,255,0.10); |
| `rgba(255,255,255,0.12)` | `Web/wwwroot/css/layout.css:383` | .user-menu-item:hover -> background: rgba(255, 255, 255, 0.12); |
| `rgba(255,255,255,0.15)` | `Web/wwwroot/css/layout.css:81` | .sidebar a:hover -> background-color: rgba(255, 255, 255, 0.15); |
|  | `Web/wwwroot/css/layout.css:348` | .user-menu -> border: 1px solid rgba(255, 255, 255, 0.15); |
| `rgba(255,255,255,0.18)` | `Web/wwwroot/css/layout.css:193` | .topbar-btn:hover:not(:disabled) -> background: rgba(255,255,255,0.18); |
| `rgba(255,255,255,0.92)` | `Web/wwwroot/css/layout.css:483` | .ind-global-loading__panel -> background: rgba(255, 255, 255, 0.92); |
