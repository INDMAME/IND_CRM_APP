# Arquitectura técnica de IND_CRM_APP

## Plataforma y límites

- Aplicación ASP.NET Core MVC sobre .NET 10 con Razor y pequeñas islas React 19.
- `IND_CRM_APP` presenta la interfaz y adapta contratos; `IND_CRM_API` y AX mantienen datos, reglas de negocio y autorización definitiva.
- React no debe convertirse en una SPA ni asumir responsabilidades propias del servidor.

## Consumo de IND_CRM_API

- Usar los servicios existentes, especialmente `ICrmApiClient`; los controladores no construyen URLs, cabeceras ni parsean JSON manualmente.
- Respetar los envoltorios vigentes:
  - `IndApiResponse<T>`: `Success`, `Message`, `ErrorCode`, `Data`, `Errors`, `TraceId`.
  - `IndPagedResponse<T>`: `Success`, `Message`, `Total`, `Page`, `PageSize`, `Items`, `TraceId`.
- Una modificación contractual requiere revisar productor, consumidor, método HTTP, ruta, cabeceras, nombres, nulabilidad, enums, fechas, paginación y errores.
- Para un proxy local `/api/...`: constante de ruta en `ApiRoutes.cs`, acción `Api*` con verbo explícito, ruta explícita en `Program.cs` y respuesta compatible con el envoltorio. Comprobar el verbo esperado y el 405 del verbo incorrecto.
- Los catálogos enum procedentes de AX se consumen mediante el catálogo común; no duplicar listas ni renumerar valores.

## Identidad, empresa y autorización

- Microsoft Entra/OIDC autentica al usuario. El servidor conserva `INDWebContext` y la empresa elegida.
- Cada inicio OIDC recibe una generación protegida en la cookie y una sesión de datos independiente, aunque se autentique el mismo usuario. `AuthenticationSessionEvents` acepta el intento más reciente después de validar el protocolo; el estado protegido permite callbacks sin cookie de sesión. `AuthenticationSessionMiddleware` recupera identidad desde la cookie validada antes de consultar la API. El registro conserva cierres hasta la caducidad de autenticación, con un máximo de 10.000 familias; si se llena, rechaza nuevas admisiones temporalmente con 503 sin expulsar cierres vigentes. La caché de datos mantiene dos horas de inactividad y puede reconstruirse con una cookie válida. El registro vive en el proceso: tras reiniciar se conserva la recuperación previa desde cookies válidas, sin prometer revocación durable. Las respuestas obsoletas no pueden renovar la cookie, cambiar preferencias ni cerrar un inicio posterior.
- `ConcurrentSessionStore` conserva el formato y proveedor de sesión de ASP.NET Core. Coordina recarga, mezcla y guardado mediante bloqueos breves; las peticiones a la API continúan en paralelo. Dentro de una generación fusiona claves independientes, mantiene juntos los campos firmados y ordena las selecciones explícitas de empresa mediante una revisión reservada antes de consultar la API. El controlador confirma la mezcla y comprueba que su autenticación sigue vigente antes de guardar la preferencia. Esta coordinación corresponde al proveedor local de memoria y a un único proceso.
- `IndAuthContextService` reutiliza el contexto deserializado dentro de la petición y registra actividad como máximo cada 30 segundos; un cambio del JSON o su eliminación invalida esa lectura.
- `TokenRefreshMiddleware` intenta una renovación cuando el token se acerca a su caducidad. Un fallo de transporte o HTTP 408/429/500/502/503/504 conserva el token original solo si sigue vigente al terminar la espera, sin ampliar su caducidad ni repetir la llamada en bucle. Una denegación real, una respuesta sin token utilizable o la caducidad mantienen el rechazo de sesión. Una petición cancelada no modifica el token ni escribe una respuesta de cierre de sesión.
- `INDModuleAuthorizeFilter` y `INDModuleRegistry` controlan acceso a módulos.
- `AllowSelfManagement` pertenece a la empresa seleccionada y React lo recibe a través de `AuthProvider`/`useAuthContext()`.
- Para llamadas dependientes de empresa, resolver la empresa efectiva con la utilidad compartida de selección; una selección manual válida prevalece sobre la predeterminada.
- La visibilidad por registro utiliza `useModuleDataVisibility`, su servicio y utilidades compartidas. Una precarga confirmada, incluso vacía, sustituye el valor anterior; una precarga fallida o vacía sin confirmación elimina la caché anterior y vuelve a consultar. El propietario funcional preferido es `OwnerAxUserId`; `CanMutate` y la política del servidor deciden mutaciones.
- Si falta información de propietario, no asumir que el registro pertenece al usuario. La API y AX deben rechazar peticiones directas no autorizadas.

## Datos del navegador y frescura

- El alcance canónico de estado sensible se construye con `browserStorageScope.ts`: versión + OID de Entra + empresa seleccionada.
- No usar claves globales ni solo una clave padre para listas de subordinados, permisos, hojas o tickets.
- Una caché válida puede pintar primero para reducir espera, pero los flujos que exigen actualidad vuelven a consultar la API. Si el refresco falla, solo se conserva el valor previo cuando el comportamiento actual lo contempla y nunca se eleva un permiso.
- La caché del navegador no sustituye sesiones, permisos, validación ni datos actuales de la API.
- Los helpers de `sessionExpiry.ts` guardan valor y caducidad conjuntamente, aceptan lectura del formato anterior y notifican si una escritura falla. El editor conserva el texto y bloquea el regreso si no puede guardar los valores necesarios. El actor de Gastos vive en memoria mientras su contexto de identidad, empresa y revisión siga activo, incluso si el almacenamiento no está disponible; la persistencia mantiene su caducidad de 12 horas para recuperarlo tras navegar. Un contexto invalidado bloquea las peticiones de Gastos antes de construir cabeceras, sin sustituir el actor por el usuario propio. Si no puede recuperarse el mismo actor, la navegación se detiene con un aviso; el usuario propio no necesita un override cuando se confirma su eliminación. Una hoja ya creada conserva su identificador para reintentar abrirla sin repetir el alta. Las limpiezas automáticas eliminan estados vencidos; no expulsan borradores vigentes para liberar cuota.
- En cierre de sesión, cambio de identidad o contexto inválido se limpian o invalidan los ámbitos correspondientes.
- Los recursos fijos versionados —CSS, JavaScript, fuentes, iconos, imágenes decorativas y ayuda generada— pueden llevar caché larga. HTML autenticado, respuestas API y documentos/imágenes de tickets no se convierten en recursos estáticos reutilizables.

## Localización

- Culturas soportadas: `es-ES` por defecto, euskera, inglés, portugués, italiano y chino simplificado.
- Razor usa `IStringLocalizer<INDSharedResource>` y los `.resx` compartidos.
- React/TypeScript consume el diccionario `window.__IND_I18N__` mediante `indT`.
- Toda clave visible se añade a todas las culturas en el mismo cambio. Los datos de negocio devueltos por la API no se traducen.

## Frontend y compilación

- Tailwind 4 se compila desde `Web/wwwroot/css/input.css`; el estilo vigente mantiene todos los radios `sm` a `2xl` en 5 px.
- esbuild genera entradas ESM y chunks desde `Web/wwwroot/react/src`; no editar las salidas.
- `Web/wwwroot` es el origen canónico. `publish.ps1` refleja su contenido en el directorio raíz `wwwroot` antes de publicar.
- La carga diferida y la paralelización se usan cuando preservan contratos; evitar cascadas de llamadas, listeners duplicados y estado espejo creado por efectos.
- No introducir dependencias ni service workers para resolver problemas que ya cubren el versionado y las cabeceras de recursos estáticos.

## Configuración

- Reutilizar las claves actuales para URL de API y URL pública; no fijar valores operativos o secretos en el repositorio.
- DEV y PROD mantienen el mismo nombre y orden de resolución de claves.
- Los valores públicos de entorno pueden documentarse una sola vez en la guía operativa correspondiente; credenciales y secretos nunca.
