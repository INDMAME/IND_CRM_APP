# Prompt para trasladar el hotfix de propiedad de gastos a DEV

Trabaja exclusivamente sobre el DEV actual de IND_CRM_APP. Conserva sus desarrollos y cambios locales. No publiques IIS, no hagas merge DEV/PROD, no hagas push y no modifiques API/Axapta sin explicar una necesidad demostrada y obtener autorizacion adicional.

## Referencia, no sustitucion de DEV

Revisa el diff de la rama local `hotfix/iis-release16-expense-company-owner-20260930` contra su base realmente desplegada en IIS, Release 16 `a63146e7d1f6e023c512485bc834309ffd570323`. El worktree de referencia es el directorio hermano `IND_CRM_APP_IIS_release16_hotfix_company_owner`. No copies GastosController.cs completo, no reemplaces archivos de DEV por los de PROD y no hagas un cherry-pick ciego. Transfiere solo la correccion de identidad y sus pruebas, adaptandolas al diseno actual de DEV. No portes el cambio del script de publicacion como parte de este arreglo funcional.

La rama basada en Release 17 (`hotfix/prod-expense-company-owner-20260930`) fue descartada por instruccion del usuario y NO debe usarse como referencia ni desplegarse. El hotfix operativo conserva Release 16 y cambia solo el ensamblado web; no incorpora Release 17 ni DEV.

## Incidente y causa

JML no podia agregar lineas a su hoja HG000289 (IST France - Septiembre), con HER como company seleccionada. El guard web devolvia acceso denegado antes de enviar la escritura al API. El detalle tenia UserId CRM JML y la resolucion OwnerAxUserId JMLF; el guard colapsaba ambas identidades en un solo campo, dando prioridad a AX. La misma persona puede tener distintos identificadores CRM por company. No hardcodees JML, JMLF, HER, RSI ni el numero de hoja.

El origen de JMLF observado es la resolucion de propietario AX del detalle; no se debe presentar como comprobado un registro maestro concreto sin consultarlo. La correccion no requiere modificar ese dato ni desactivar controles.

## Regla aprobada por negocio

- El propietario puede operar sobre su hoja y sus lineas solo cuando lo permiten las validaciones y el estado actuales.
- El responsable solo puede ejecutar las transiciones ya permitidas del proceso de aprobacion sobre subordinados autorizados de la company activa. No puede crear, editar o borrar sus lineas, borrar sus hojas ni modificar datos de cabecera ajenos aprovechando una aprobacion.
- Conserva sin cambios semanticos la matriz de estados, allowSelfManagement, validaciones monetarias/cambio/divisa/fechas/tickets, restricciones por Voucher o pagado, permisos de modulo, alcance jerarquico y auditoria del aprobador real.

## Implementacion conservadora

1. Lee las instrucciones/skills locales y revisa primero como DEV obtiene company, contexto, propietario, caches y permisos. Define un plan pequeno y los archivos afectados antes de editar.
2. Conserva por separado OwnerCrmUserId (UserId del detalle) y OwnerAxUserId. Compara CRM contra CRM de la company seleccionada; si ambos existen, esa comparacion es autoritativa, incluso si los AX coinciden. Solo usa AX contra AX cuando falta una pareja CRM comparable. Nunca compares un CRM con un AX ni uses axUserIdOverride para demostrar que la hoja es propia.
3. Usa exactamente la company de la peticion upstream y su entrada autorizada del contexto. No uses la primera company como fallback de autorizacion. Ante company ausente/incoherente, propietario desconocido o fallo upstream, deniega la mutacion; una lectura 200 no prueba propiedad.
4. Para el responsable, coteja el propietario con subordinados de esa misma company usando identidades tipadas. Mantiene la separacion entre propietario objetivo y actor real de aprobacion. Conserva la sanitizacion de los campos de cabecera en transiciones de estado.
5. Revisa las utilidades React de identidad en DEV, donde el codigo puede haber evolucionado: consume los campos correctos, no confundas propietario con filtro/override y no amplifiques permisos. Reutiliza resolveEffectiveCompanyId y el AuthContext de la company activa. No cambies UI, filtros, calendario, importes ni contratos sin necesidad demostrada.
6. No amplifiques el hotfix con refactors generales, cambios de dependencias o alteraciones API/AX. Si DEV ya resuelve una parte correctamente, conserva esa implementacion y agrega la regresion.

## Pruebas requeridas

Adapta las regresiones del hotfix al harness actual de DEV y prueba el codigo real, no una copia de su algoritmo:

- Mismo CRM de company con AX diferente: propietario puede guardar linea en borrador.
- Una persona con distintos CRM en dos companies: se usa exclusivamente la seleccionada; cambiar company no reutiliza identidad/alcance anterior.
- CRM distinto aunque AX coincida; colision textual CRM/AX; propietario desconocido; company ausente o incoherente: nunca se convierten en propietario por fallback.
- Responsable de subordinado: aprobar/rechazar y las restantes transiciones existentes funcionan; lineas y borrado permanecen bloqueados. Un tercero fuera de su jerarquia permanece bloqueado.
- La aprobacion no modifica descripcion, proyecto, divisa, cambio, reembolsable ni voucher y conserva el actor real; solo los campos propios del proceso se envian segun contrato vigente.
- Pagadas/Voucher asignado y estados no editables siguen bloqueados, con y sin allowSelfManagement.
- Fallo upstream o detalle que no corresponde al ID solicitado no autoriza escritura; no relajes verificaciones adicionales que ya existan en DEV.
- Valida todos los puntos de entrada de mutacion (agregar, editar, borrar y vincular lineas/tickets, actualizar cabecera y borrar hoja), respetando lo que DEV ya proteja.

Ejecuta las regresiones, tipos, builds .NET/React, localizacion y React Doctor exigidos por el proyecto. Reporta por separado fallos heredados y los introducidos. No confundas pruebas locales con una prueba autenticada real de JML ni ejecutes escrituras sobre gastos reales para probar.

Al finalizar entrega: causa confirmada, diff pequeno aplicado a DEV, validaciones conservadas, pruebas con resultados, riesgos pendientes y pasos de comprobacion funcional. No despliegues ni promociones DEV a PROD.
