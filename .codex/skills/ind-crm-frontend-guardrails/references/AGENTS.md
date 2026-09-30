# Reglas generales de IND_CRM_APP

## Alcance y precedencia

Estas reglas se aplican a todo el repositorio. Los detalles viven en los documentos temáticos indicados en `.codex/README.md`; no deben copiarse aquí.

Cuando dos reglas locales no coincidan, se comprueba el código, la configuración y el flujo que se ejecutan actualmente. Se conserva ese comportamiento salvo que el usuario pida cambiarlo o sea un defecto demostrado.

## Principios de trabajo

- Antes de un cambio importante, presentar un plan breve con alcance, propietarios actuales, riesgos y validación.
- Preferir cambios pequeños, defensivos y reversibles. No ampliar un archivo monolítico si una unidad enfocada ya posee la responsabilidad.
- Leer el diff y el estado de Git antes de editar. No sobrescribir ni limpiar trabajo ajeno.
- Reutilizar rutas, servicios, componentes y contratos existentes antes de crear otros.
- No añadir dependencias sin una necesidad clara y una justificación breve.
- No ocultar errores ni debilitar pruebas para obtener un resultado verde.
- Si una decisión cambia de forma material arquitectura, experiencia, contrato de datos o seguridad y no puede deducirse del proyecto, pedir la decisión concreta.

## Arquitectura no negociable

- ASP.NET Core MVC y Razor son la base; React se utiliza como islas, no como SPA.
- El código servidor se ubica en `App/`; controladores y vistas en `Web/`; la fuente frontend en `Web/wwwroot/react/src`.
- Tailwind es el sistema de estilos. No se añade Bootstrap, jQuery ni otra dependencia nueva sobre el legado existente.
- Los controladores MVC se mantienen delgados y consumen `IND_CRM_API` mediante servicios, sin construir URLs, cabeceras o JSON de forma ad hoc.
- La API y AX autorizan las operaciones. Ocultar controles en la interfaz es solo una protección adicional.
- Las reglas detalladas están en `TECH_SPECS.md`, `UI_GUIDE.md`, `COMPONENT_CONTRACTS.md` y `PROJECT_STRUCTURE.md`.

## Seguridad, configuración y datos

- Nunca versionar contraseñas, tokens, claves, secretos, cadenas de conexión ni valores privados de entorno.
- Reutilizar las claves de configuración y su orden de resolución en DEV y PROD; solo cambia el valor externo.
- No confiar en identificadores de usuario, empresa, propietario o permisos enviados por el navegador cuando el servidor dispone del contexto firmado.
- Cualquier estado sensible del navegador debe aislarse por usuario Entra y empresa. Los datos de negocio se refrescan desde la API según su flujo; una caché de interfaz nunca sustituye la autorización ni la consulta vigente.
- Las reglas de AX/XPO son comunes a ambos proyectos y se encuentran exclusivamente en `AX_XPO_WORKFLOW.md`.

## Idioma y documentación

- La documentación del proyecto se escribe en español.
- Por la política activa superior del repositorio, los comentarios nuevos de código y los mensajes de commit se escriben en inglés simple y ASCII. Los textos visibles para el usuario se localizan y no se introducen como comentarios.
- No crear bitácoras Markdown, prompts temporales, inventarios fechados ni documentos de cierre por tarea. Git conserva el historial.
- Los textos visibles deben usar los recursos de localización de todas las culturas soportadas.

## Git, publicación y producción

- El trabajo normal se realiza en `DEV`. No cambiar a `PROD`/`main` ni publicar allí por inferencia.
- Un commit o push exige petición explícita del usuario. Un despliegue IIS también exige petición explícita.
- `publica`, `publica la web` o `publica en IIS` significa publicar la web local con `publish.ps1`; no significa promover a producción.
- Solo `merge a prod` o `merge DEV a PROD` autoriza promoción. Debe hacerse mediante PR numerada `DEV` → `PROD`, comprobaciones requeridas y auto-merge. Nunca usar push o merge directo como alternativa.
- Si la promoción protegida queda bloqueada, informar y detenerse.

## Cierre

- Aplicar la lista proporcional de `QUALITY_CHECKLIST.md`.
- Revisar el diff final, el impacto contractual y los límites de validación externa.
- No afirmar que una publicación web/API ha importado, compilado o activado cambios en AX.
