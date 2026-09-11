# Contratos de componentes compartidos

Este catálogo define responsabilidades estables. Los detalles visuales pertenecen a `UI_GUIDE.md` y los permisos/caché a `TECH_SPECS.md`.

## Infraestructura de página

### `VisitasPageProviders`

- Ruta: `Web/wwwroot/react/src/components/commons/VisitasPageProviders.tsx`.
- Compone una sola vez `I18nProvider` y `AuthProvider` en la entrada de la isla.
- No duplicar providers dentro de formularios.

### `AppErrorBoundary`

- Ruta: `Web/wwwroot/react/src/components/commons/AppErrorBoundary.tsx`.
- Envuelve la raíz compleja de una isla, recibe mensaje localizado y registra el detalle técnico.
- No crear un boundary por campo.

### `AuthContext`

- Ruta: `Web/wwwroot/react/src/context/AuthContext.tsx`.
- Expone permisos de módulo, empresa seleccionada y `allowSelfManagement`.
- Las acciones sensibles leen este contexto; no infieren permisos desde flags locales.
- La carga inicial de Gastos puede hidratar caché aislada, pero vuelve a refrescar el contexto mediante la API.

## Controles comunes

### `FilterButton` y `ActionButton`

- Rutas bajo `components/commons/`.
- Presentacionales y controlados por props: etiqueta localizada, estado, evento, clase y accesibilidad.
- El propietario de página decide negocio, carga y permisos.

### `CompactPagination` y `RecordNavigator`

- Reciben etiquetas localizadas, posición, estados deshabilitados y callbacks.
- No consultan datos, rutas ni stores; la navegación pertenece al hook o contenedor.

### `ExpenseSectionDivider`

- Ruta: `pages/gastos/components/ExpenseSectionDivider.tsx`.
- Título centrado con líneas laterales, `headingLevel` accesible y variantes de separación.
- Permanece sin fondo, marco o forma de píldora; la etiqueta se localiza.

### `VisitNarrativeFields`

- Ruta: `components/visitas/VisitNarrativeFields.tsx`.
- Renderiza campos narrativos repetidos mediante valores, etiquetas y handlers recibidos.
- No llama a API ni controla navegación.

## Asistente compartido

### `AssistantChatShell`

- Ruta: `components/commons/chat/AssistantChatShell.tsx`.
- Es la única carcasa visual común: launcher, overlay, panel, mensajes, estado vacío, avisos, reintento, acciones rápidas y compositor.
- Es presentacional: no conoce endpoints, prompts, stores ni DTO específicos.
- Mantiene el avatar en cabecera antes de la primera respuesta y en los mensajes del asistente después.
- Mantiene el comportamiento común del compositor multilínea, espera, envío y deshabilitado.

### `assistantChatTypes`

- Ruta: `components/commons/chat/assistantChatTypes.ts`.
- Es el contrato base de mensajes y acciones rápidas. Los módulos pueden ampliar su estado, no redefinir tipos paralelos.

### Adaptación por módulo

- Un hook local posee prompts, ciclo de petición, reintentos, captura de contexto y validación de negocio.
- Un adaptador pequeño transforma estado y textos localizados a las props de `AssistantChatShell`.
- Gastos es la implementación de referencia en `pages/gastos/list/ExpenseSheetsAssistant.tsx` y `useExpenseSheetsAssistant.ts`.
- No bifurcar la carcasa por diferencias de texto o lógica; solo una decisión explícita del sistema visual justifica cambiarla.

## Contrato de componentes tipo campo

- Propiedades mínimas: etiqueta localizada, valor, cambio opcional y `readOnly`/`disabled` o un `mode` equivalente.
- El componente aplica localmente los colores de etiqueta y valor definidos en `UI_GUIDE.md`.
- Un selector remoto, enum filtrable y select fijo son contratos distintos; no añadir flags hasta convertir un único componente en tres comportamientos difíciles de mantener.
- El estado, caché, llamadas y validación empresarial pertenecen al hook/servicio del módulo.

## Regla de extracción

Un componente se comparte cuando dos módulos necesitan el mismo contrato, accesibilidad y comportamiento. Si solo coincide la apariencia, se comparte la primitiva visual y se conserva la lógica dentro de cada módulo.
