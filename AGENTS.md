# Perfil de agente IND_CRM_APP

## Contexto técnico

- Proyecto: Aplicación web ASP.NET Core MVC con vistas Razor (server side rendering).
- Esta aplicación consume la API interna IND_CRM_API vía HTTP.
- La API IND_CRM_API está documentada con Swagger 2.0 (OpenAPI) y utiliza envoltorios estándar:
  - IND_CRM_API.Models.Responses.IndApiResponse<T> para operaciones de comando (login, create, update, delete, etc.).
  - IND_CRM_API.Models.Responses.IndPagedResponse<T> para listados y resultados paginados.
- La solución está organizada por módulos CRM: autenticación (auth), actividades (activities), cuentas (accounts), visitas (visits), sistema (system) y salud (health).
- La aplicación es interna: no hay requisitos de SEO público, pero sí de claridad, robustez y diseño moderno.

## Consumo de la API IND_CRM_API

- La fuente de verdad del contrato es el OpenAPI de IND_CRM_API (Swagger 2.0) y los DTOs de la propia API (LoginRequest, CreateActivityRequest, UpdateActivityRequest, CreateVisitaAsistenteRequest, etc.).
- Objetivo a largo plazo:
  - Usar un cliente C# tipado generado automáticamente desde el documento OpenAPI de IND_CRM_API (por ejemplo con NSwag o herramienta similar).
- Objetivo a corto plazo:
  - Encapsular todas las llamadas HTTP en un servicio limpio (por ejemplo IIndCrmApiClient) y dejar los controladores MVC libres de lógica HTTP de bajo nivel.
- Reglas importantes:
  - Los controladores NUNCA deben construir manualmente URLs, cabeceras ni parsear JSON.
  - Los controladores deben depender de interfaces de servicio (por ejemplo IIndCrmApiClient, IAuthService, ICrmActivitiesService, etc.).
  - Las llamadas a la API deben respetar la estructura de respuesta actual y el contrato JSON que ya usa la colección de Postman:
    - Para comandos: propiedades Success, Message, ErrorCode, Data, Errors, TraceId.
    - Para listados paginados: Success, Message, Total, Page, PageSize, Items, TraceId.
  - No inventar nuevos formatos de respuesta desde la web: la API manda el contrato, la web lo consume y lo mapea a modelos de vista.

## Contratos y envoltorios de respuesta

- Considerar las clases de la API como referencia:
  - IndApiResponse<T>:
    - Success (bool)
    - Message (string)
    - ErrorCode (string)
    - Data (T)
    - Errors (lista de errores de validación)
    - TraceId (string)
  - IndPagedResponse<T>:
    - Success (bool)
    - Message (string)
    - Total (int)
    - Page (int)
    - PageSize (int)
    - Items (lista de T)
    - TraceId (string)
- En la web:
  - Definir modelos de respuesta y DTOs que reflejen estos contratos (por ejemplo IndApiResult<TViewModel>, IndPagedResult<TViewModel>) si es necesario, o utilizar directamente los modelos generados a partir del OpenAPI cuando se genere el cliente tipado.
  - Siempre comprobar Success antes de usar datos de Data o Items.
  - Extraer Message y ErrorCode para mostrar información clara al usuario cuando haya errores.
  - Para listados (actividades, cuentas, contactos, etc.) utilizar Total, Page, PageSize e Items como base para paginación en la interfaz.

## Autenticación y tokens

- El flujo de autenticación se basa en:
  - POST /api/auth/login → devuelve IndApiResponse<object> con token JWT en Data o en campos definidos por la API.
  - POST /api/auth/refresh → renueva el token.
- La gestión del token JWT:
  - Debe concentrarse en un servicio específico (por ejemplo ITokenService o IAuthClient) y no dispersarse por todos los controladores.
  - Solo ese servicio debe encargarse de:
    - Guardar/recuperar el token de la sesión o cookies.
    - Añadir la cabecera Authorization: Bearer {token} a las peticiones HTTP hacia IND_CRM_API.
- Los controladores no deben manipular directamente el token, solo pedir al servicio autenticado que haga las llamadas necesarias.

## UI y sistema de diseño

- Mantener ASP.NET Core MVC con Razor; NO migrar a SPA completa ni reescribir en React.
- Objetivo de diseño:
  - Layout estándar moderno, claro y consistente para todos los módulos CRM.
  - Tipografía, colores y espaciados definidos de forma centralizada.
- Reutilización:
  - Crear parciales/componentes Razor reutilizables para:
    - Layout general (cabecera, menú, contenido).
    - Tarjetas de información (cards) para bloques tipo “Datos desde Axapta 3.0…” y resúmenes CRM.
    - Cabeceras de página (page headers).
    - Botones principales (botón de acción primaria).
  - Sustituir HTML duplicado en vistas por estos componentes comunes.
- Tailwind CSS (preparación):
  - Usar un único punto de entrada CSS donde más adelante se pueda compilar Tailwind (por ejemplo un archivo base en wwwroot).
  - Introducir utilidades y clases de diseño de forma progresiva, sin romper el estilo actual.
  - No introducir frameworks JS complejos si no aportan un beneficio claro.

## Documentación y estilo de código

- Comentarios y docstrings:
  - Deben ser en inglés sencillo y sin acentos ni caracteres especiales (solo ASCII).
  - Explicar brevemente:
    - Qué hace cada controlador y cada acción pública.
    - Qué hace cada servicio que llama a IND_CRM_API.
    - Qué representa cada componente de UI compartido (layout, card, header, botón).
- Cualquier DTO o modelo de vista nuevo:
  - Debe tener un nombre claro en inglés.
  - Preferiblemente reflejar el significado funcional (por ejemplo CrmActivityViewModel, CrmAccountListItemViewModel).
- No introducir caracteres especiales en el código C# ni en los comentarios del código:
  - Evitar tildes, eñes y símbolos no ASCII dentro de archivos .cs, .cshtml y similares.

## Forma de trabajo con Codex

- Refactorizaciones:
  - Siempre preferir cambios pequeños y enfocados frente a grandes reescrituras.
  - Mantener las rutas MVC y modelos de vista actuales salvo que exista una razón clara (bug o inconsistencia grave).
- Lógica de vistas:
  - Mantener las vistas Razor lo más ligeras posible.
  - Lógica de negocio o reglas de integración deben vivir en servicios o helpers.
- Manejo de errores:
  - Cuando se cambie la forma de llamar a la API, explicar claramente cómo se transforman los errores de IndApiResponse / IndPagedResponse en mensajes para el usuario.
  - No ocultar completamente los errores técnicos, pero presentar información adecuada al contexto (usuario interno).
- Dependencias:
  - Evitar añadir nuevas dependencias de frontend o backend salvo que reduzcan claramente la complejidad.
  - Cualquier librería nueva debe ir acompañada de un comentario en inglés sencillo justificando su uso.

  ## Regla Anti-Regresión Crítica (Fechas, Calendarios y API)

Codex debe aplicar esta regla en toda modificación que afecte a vistas, scripts o lógica de filtros:

- Nunca alterar la inicialización de componentes interactivos (calendarios, datepickers, dropdowns) sin validar su funcionamiento completo.
- Toda modificación en filtros de fecha debe comprobar:
  1) Que el calendario sigue desplegando correctamente.
  2) Que los eventos onChange, click, blur y validaciones continúan operativos.
  3) Que las llamadas a IND_CRM_API mantienen exactamente el formato esperado.
  4) Que no se rompe ningún binding Razor, ViewModel o helper HTML.
- Si una mejora visual, estructural o de lógica implica riesgo en un calendario o filtro:
  - Codex debe avisar expresamente y ofrecer una alternativa sin impacto.
- Ningún cambio se acepta si altera el flujo de filtrado actual.
- Prioridad absoluta: cero regresiones en componentes de fecha y componentes dependientes de la API.
