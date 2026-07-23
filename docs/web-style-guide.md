# Guia visual de IND CRM

Esta guia resume la identidad visual utilizada actualmente en la aplicacion web. Los valores se han obtenido de la configuracion de Tailwind, el layout compartido y los estilos fuente del frontend.

## Identidad principal

| Elemento | Valor | Uso habitual |
| --- | --- | --- |
| Color primario | `#00296B` | Topbar, sidebar, botones principales, enlaces y elementos activos |
| Primario hover | `#001F4D` | Hover y degradado de botones |
| Primario activo alternativo | `#244C82` | Opcion activa del menu lateral |
| Texto corporativo | `#00296BE0` | Texto general, etiquetas, valores editables e iconos |
| Texto sobre primario | `#FFFFFF` | Texto e iconos sobre fondos azules |
| Fuente | `Montserrat, sans-serif` | Toda la aplicacion |
| Pesos cargados | `400`, `500`, `600`, `700` | Texto normal, medio, semibold y bold |
| Iconos | Heroicons | Iconografia predeterminada, con SVG compatibles en zonas antiguas |
| Framework visual | Tailwind CSS 4 | Utilidades, componentes y diseno responsive |

## Paleta neutral

| Color | Valor | Uso habitual |
| --- | --- | --- |
| Fondo general | `#F5F6F7` o `slate-100` | Fondo de las paginas |
| Fondo de tarjetas | `#FFFFFF` | Formularios, tarjetas, modales y desplegables |
| Fondo suave | `#F8FAFC` | Cabeceras internas y zonas secundarias |
| Fondo de solo lectura | `#F1F5F9` | Campos deshabilitados o no editables |
| Bordes | `#E2E8F0` | Inputs, tarjetas, divisores y modales |
| Bordes secundarios | `#CBD5E1` | Separadores y controles inactivos |
| Texto secundario | `#64748B` | Valores de solo lectura y texto auxiliar |
| Texto tenue | `#94A3B8` | Placeholders, etiquetas deshabilitadas y metadatos |
| Texto claro | `#E2E8F0` | Texto sobre botones oscuros o inactivos |

## Colores de estado

| Estado | Color | Valor |
| --- | --- | --- |
| Correcto | Verde | `#10B981` o `#22C55E` |
| Advertencia | Ambar | `#F59E0B` |
| Error | Rojo | `#EF4444` |
| Error oscuro | Rojo oscuro | `#B91C1C` |
| Estado neutral | Gris | `#94A3B8` o `#64748B` |

Los colores de estado se utilizan principalmente en historicos, validaciones e indicadores. No sustituyen al azul corporativo como color principal.

## Tipografia y componentes

| Propiedad | Estandar actual |
| --- | --- |
| Texto normal | Generalmente `14px` a `16px`, peso `400` |
| Etiquetas | Generalmente `14px`, peso `500` o `600` |
| Botones | Aproximadamente `14px`, peso `600` |
| Titulo principal | Tamano responsive entre `22px` y `40px` |
| Subtitulos de cabecera | Tamano responsive entre `12px` y `20px` |
| Radio de controles | Principalmente `12px` (`rounded-xl`) |
| Radio de tarjetas y modales | Principalmente `16px` (`rounded-2xl`) |
| Boton corporativo especial | Radio de `5px`, degradado de `#00296B` a `#001F4D` |
| Espaciado de boton normal | `16px` horizontal y `8px` vertical |
| Icono estandar | `16 x 16px` |
| Iconos de topbar | `24 x 24px`, trazo `1.5` |
| Sombras | Suaves en tarjetas y mas marcadas en modales y desplegables |

## Contrato visual de campos

| Estado del campo | Etiqueta | Valor | Fondo y borde |
| --- | --- | --- | --- |
| Edicion | `#00296BE0` | `#00296BE0` | Blanco con borde `#E2E8F0` |
| Solo lectura | `#00296BE0` | `#64748B` | Fondo `#F1F5F9` y borde `#E2E8F0` |
| Placeholder o deshabilitado | Segun contexto | `#94A3B8` | Fondo neutro suave |

## Fuentes de implementacion

- `tailwind.config.js`: registra `primary` y la familia `Montserrat`.
- `Web/Assets/tailwind.input.css`: define los tokens principales y utilidades base.
- `Web/wwwroot/css/layout.css`: contiene los estilos del layout, topbar y sidebar.
- `Web/wwwroot/css/input.css`: contiene los contratos visuales de inputs y componentes comunes.
- `Web/Views/Shared/_Layout.cshtml`: carga Montserrat desde Google Fonts con pesos `400`, `500`, `600` y `700`.
- `docs/color-inventory.md`: inventario tecnico detallado de todos los colores encontrados en el codigo fuente.

## Estandar para nuevos componentes

Los nuevos componentes deben mantener la combinacion **Montserrat + Tailwind CSS + Heroicons + `#00296B`**, respetando los componentes compartidos y el ritmo de espaciado existente.
