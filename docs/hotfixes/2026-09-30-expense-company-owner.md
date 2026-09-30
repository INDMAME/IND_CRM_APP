# Hotfix de propiedad de hojas de gastos sobre IIS Release 16

## Alcance aprobado

La base es la version REAL de IIS: `a63146e7d1f6e023c512485bc834309ffd570323`, Release 16. El usuario prohibio incorporar Release 17 o DEV. La preparacion anterior sobre `origin/PROD` fue descartada y no se desplego.

Rama: `hotfix/iis-release16-expense-company-owner-20260930`.

El unico cambio funcional esta en `Web/Controllers/Gastos/GastosController.cs`: identidades CRM y AX separadas, comparacion del CRM de la company activa, fallback AX solo entre campos AX, denegacion ante identidad/company desconocida y alcance de subordinados tipado. Se comprueba exito e ID exacto del detalle antes de autorizar una escritura. El override no demuestra propiedad.

La matriz de estados, validaciones de cabecera, sanitizacion de transiciones, calculos y bloqueo por pagado/Voucher se mantienen iguales a Release 16. El propietario conserva las operaciones permitidas por estado. El responsable conserva solo las transiciones existentes sobre subordinados autorizados, sin editar lineas ni borrar hojas ajenas. No hay cambios de API, Axapta, React, localizacion, dependencias o configuracion.

## Validacion reproducible

```powershell
dotnet build -v minimal
npm run test:gastos:company-owner
npm run test:gastos:currency
npm run check:types
npm run check:resx:encoding
npm run check:localization:keys
npm run check:react-doctor
powershell -NoProfile -File tests/publish-live-hotfix-gate.test.ps1
```

La regresion original se reprodujo contra el ensamblado sin parche de Release 16: JML se clasificaba erroneamente como usuario ajeno al colapsar UserId CRM JML y OwnerAxUserId JMLF. El harness durable valida 50 escenarios: guard real, compania exacta, identidades tipadas, subordinados, aprobador, sanitizacion y las 20 celdas de la matriz de estados con sus transiciones. No se han realizado escrituras de prueba sobre gastos reales. Una prueba local no sustituye el reintento autenticado de JML.

## Publicacion selectiva

El modo hotfix de `publish.ps1` exige el commit y SHA256 de la DLL actualmente desplegada, comprueba su coincidencia y la ascendencia de la rama. No usa `origin/PROD` como base. Si IIS cambia antes de la copia, el proceso se bloquea.

El paquete se compila, pero solo se sustituyen `IND_CRM_APP.dll` y `IND_CRM_APP.pdb`. Los archivos de dependencias y runtime deben coincidir exactamente con IIS antes de publicar. No se hace mirror del sitio: frontend, configuracion, bibliotecas, recursos y logs existentes permanecen en su sitio.

Valores verificados antes del hotfix:

- DLL ProductVersion: `1.0.0+a63146e7d1f6e023c512485bc834309ffd570323`.
- DLL SHA256: `3606071415AD01B1143AC7F7A3C763D8715016F9CC83B02F0E373FF698CEFEAD`.
- Copia de recuperacion: `C:\INDDeployBackups\IND_CRM_APP\20260930-company-owner-before`.
- Copia verificada: 1158 archivos, excluyendo Logs que se conservan en IIS.

Comando para la primera aplicacion, desde esta rama limpia y con sus cambios confirmados:

```powershell
.\publish.ps1 -TargetEnvironment PROD -DeployedHotfixBaseCommit a63146e7d1f6e023c512485bc834309ffd570323 -DeployedHotfixBaseSha256 3606071415AD01B1143AC7F7A3C763D8715016F9CC83B02F0E373FF698CEFEAD
```

El mismo comando debe ser rechazado si IIS ya no contiene esa DLL base, incluido despues de aplicar el hotfix. No cambiar los valores para forzar una republicacion sin volver a verificar la base.

## Recuperacion

Si fuera necesaria, detener IIS, restaurar UNICAMENTE `IND_CRM_APP.dll` y `IND_CRM_APP.pdb` de la copia anterior en el directorio canonico `C:\inetpub\wwwroot\IND_CRM_APP`, y arrancar IIS en un bloque finally. Verificar despues el hash anterior y la salud HTTP. No hacer un mirror completo ni borrar logs/configuracion para revertir este hotfix.

## Traslado a DEV

Usar `docs/prompts/2026-09-30-dev-expense-company-owner.md`. Adaptar solo el arreglo funcional y sus pruebas al DEV avanzado, sin reemplazar archivos completos ni trasladar este procedimiento de despliegue como parte del arreglo de identidad.
