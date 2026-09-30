# Entornos y publicación

## Objetivo

Este documento describe cómo `IND_CRM_APP` separa DEV y PROD, resuelve sus direcciones y bloquea publicaciones accidentales. Los valores propios de cada máquina se mantienen fuera de Git.

## Contrato de configuración

Variables compartidas:

- `IND_ENV`: admite `DEV` o `PROD`.
- `ApiSettings__BaseUrl`: dirección principal de `IND_CRM_API` para ASP.NET Core.
- `INDCRM_BASE_URL`: alternativa compartida para la dirección de `IND_CRM_API`.
- `ASPNETCORE_ENVIRONMENT`: `Development` en DEV y `Production` en PROD.

Variables del extremo web publicado:

- `INDCRM_WEB_BASE_URL`
- `INDCRM_WEB_PUBLIC_HOST`
- `INDCRM_WEB_PUBLIC_PORT`

Valores esperados por el guard de publicación:

| Entorno | Web | API | `ASPNETCORE_ENVIRONMENT` |
| --- | --- | --- | --- |
| DEV | `https://dev.insertec.biz:2053` | `https://dev.insertec.biz:2083` | `Development` |
| PROD | `https://crm.insertec.biz:7702` | `https://crm.insertec.biz:7776` | `Production` |

Las credenciales, secretos, cadenas de conexión y valores de proveedor se configuran en la máquina o en su almacén de secretos. No se documentan valores secretos en este repositorio.

## Resolución de la dirección del API

`ApiClientService` resuelve la dirección en este orden:

1. `ApiSettings:BaseUrl`. ASP.NET Core proyecta aquí la variable `ApiSettings__BaseUrl`.
2. `INDCRM_BASE_URL`.

Si ninguna contiene una dirección válida, la aplicación falla de forma explícita. El valor versionado en `appsettings.json` permanece vacío para impedir que una publicación apunte por accidente a otro entorno.

## Guard de publicación

`publish.ps1`:

1. Obtiene el destino desde `-TargetEnvironment` o `IND_ENV`.
2. Comprueba la rama Git actual. `DEV` corresponde a DEV; `PROD` y `main` corresponden a PROD.
3. Bloquea una diferencia entre rama y destino, salvo uso deliberado de `-AllowBranchEnvironmentMismatch`.
4. Comprueba `ASPNETCORE_ENVIRONMENT`, las direcciones HTTPS del API y de la web, el host y el puerto.
5. Ejecuta la compilación y la copia a IIS.
6. Reinicia IIS cuando `-RestartIis` está habilitado, que es el valor predeterminado.

Que el script reconozca `main` como equivalente técnico de PROD no autoriza trabajo, commits o pushes directos sobre esa rama. La promoción a producción sigue el flujo protegido definido en las reglas del repositorio.

`-AllowBranchEnvironmentMismatch` existe solo para recuperaciones deliberadas. No debe utilizarse para saltarse una configuración incorrecta.

## Herramientas locales

Playwright obtiene su dirección base en este orden:

1. `IND_E2E_BASE_URL`.
2. `INDCRM_WEB_BASE_URL`.
3. El valor conocido de `IND_ENV`.

La tarea de VS Code que libera puertos utiliza `INDCRM_WEB_PUBLIC_PORT` y, si falta, aplica el puerto conocido del entorno.

## Fuentes de implementación

- `App/Services/ApiClientService.cs`: resolución del API.
- `publish.ps1`: guard, compilación, copia y reinicio de IIS.
- `playwright.config.js`: dirección de las pruebas funcionales.
- `.vscode/tasks.json`: selección del puerto web local.
- `appsettings.json`: estructura no operativa versionada.

Una modificación de estas fuentes exige revisar este documento; la implementación es la fuente final de verdad.
