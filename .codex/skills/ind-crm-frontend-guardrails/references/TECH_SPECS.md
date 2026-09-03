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
- `INDModuleAuthorizeFilter` y `INDModuleRegistry` controlan acceso a módulos.
- `AllowSelfManagement` pertenece a la empresa seleccionada y React lo recibe a través de `AuthProvider`/`useAuthContext()`.
- Para llamadas dependientes de empresa, resolver la empresa efectiva con la utilidad compartida de selección; una selección manual válida prevalece sobre la predeterminada.
- La visibilidad por registro utiliza `useModuleDataVisibility`, su servicio y utilidades compartidas. El propietario funcional preferido es `OwnerAxUserId`; `CanMutate` y la política del servidor deciden mutaciones.
- Si falta información de propietario, no asumir que el registro pertenece al usuario. La API y AX deben rechazar peticiones directas no autorizadas.

## Datos del navegador y frescura

- El alcance canónico de estado sensible se construye con `browserStorageScope.ts`: versión + OID de Entra + empresa seleccionada.
- No usar claves globales ni solo una clave padre para listas de subordinados, permisos, hojas o tickets.
- Una caché válida puede pintar primero para reducir espera, pero los flujos que exigen actualidad vuelven a consultar la API. Si el refresco falla, solo se conserva el valor previo cuando el comportamiento actual lo contempla y nunca se eleva un permiso.
- La caché del navegador no sustituye sesiones, permisos, validación ni datos actuales de la API.
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
