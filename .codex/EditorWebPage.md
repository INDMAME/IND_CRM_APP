# Pagina de edicion (TextEditorReact)

## Scope and hierarchy
- Scope: TextEditorReact page behavior and integration.
- If conflict: system > `.codex/AGENTS.md` > `.codex/permisos-contexto.md` > this doc.

## Proposito
- Pantalla dedicada para editar campos largos (comentarios, antecedentes, conclusiones).
- Incluye dictado de voz y animacion de tipeo al recibir transcripcion.

## Entradas (data attributes y query)
- `data-field-id`: identificador estable del campo (obligatorio).
- `data-field-label`: titulo a mostrar en topbar.
- `data-field-value`: texto inicial.
- `data-return-url`: URL local de retorno.
- `data-read-only`: `true/1` para modo solo lectura.
- `data-allow-edit`: `true/false` si el usuario puede editar.
- `data-edit-mode-key`: clave de sesion opcional (ej: `ind_visit_edit_x`).

Query params soportados:
- `readOnly` / `readonly`
- `allowEdit` / `canEdit`
- `editModeKey`

## Almacenamiento en sessionStorage
- `ind_texteditor_{fieldId}`: valor actual del texto.
- `ind_texteditor_{fieldId}_returnUrl`: URL de retorno (si el caller la guarda).
- `editModeKey`: se marca `true` cuando el usuario habilita edicion.

Regla de carga:
- Si existe `ind_texteditor_{fieldId}`, ese valor tiene prioridad sobre `data-field-value`.

## Navegacion y guardado
- Boton Back:
  - Guarda borrador en sessionStorage.
  - Si hay `returnUrl`, redirige directo.
  - Si no, usa history con `window.__indAllowHistoryOnce`.
- Boton Save:
  - Guarda texto en sessionStorage.
  - Vuelve por `returnUrl` o history.

## Modo lectura vs edicion
- `allowEdit` controla si se puede editar.
- Si `allowEdit` es false, se ocultan acciones de edicion y microfono.
- Si `data-read-only` o query readOnly, inicia en solo lectura.
- Al activar edicion:
  - Se cambia a editable.
  - Se marca `editModeKey` en sessionStorage si aplica.

## Transcripcion de audio
- Componente: `AudioRecorderMinimal`.
- POST a `/Visitas/TranscribeSpeech`.
- FormData:
  - `languageId=auto`
  - `audioFile` (wav)
  - `returnUrl` (si existe)
- Headers:
  - `Accept: application/json`
  - `X-Requested-With: XMLHttpRequest`
  - `RequestVerificationToken` (csrf)
- Respuesta esperada:
  - `{ success: true, data: "<texto>" }`
- En exito:
  - Reemplaza el textarea con animacion tipo "tecleo".
  - Cierra el grabador.
- En error:
  - Muestra mensaje y no toca el texto.

## Permisos
- El filtro global requiere `View` para `/TextEditorReact/*`.
- El caller debe enviar `allowEdit` segun el modulo origen.

## Guia de integracion
1) Definir `fieldId` estable por campo.
2) Antes de navegar:
   - Guardar texto actual en `ind_texteditor_{fieldId}`.
   - Guardar `returnUrl` en `ind_texteditor_{fieldId}_returnUrl` si no se pasa por query.
3) Construir la pagina con:
   - `data-field-id`, `data-field-label`, `data-field-value`, `data-return-url`.
   - `data-allow-edit` segun permisos (ej: `VISITAS_HISTORIAL >= Edit`).
4) Al regresar:
   - Leer `ind_texteditor_{fieldId}` para actualizar el UI del modulo origen.

## Reglas de seguridad y UX
- No pasar textos grandes en query string.
- `returnUrl` debe ser local (empieza con `/`).
- Mantener modo lectura cuando el usuario solo tiene permiso View.

## Last updated
- 2026-01-21
