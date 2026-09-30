# Metodología común para AX y XPO

## Propósito

Esta es la regla canónica para cualquier cambio de Axapta 3.0, X++, XPO o contrato entre AX, API y Web. Su contenido debe permanecer idéntico en `IND_CRM_API` e `IND_CRM_APP`.

## Propiedad y copias

- La fuente canónica de los XPO versionados es `IND_CRM_API/.codex/Axapta`.
- `IND_CRM_APP/.codex/Axapta` es un espejo de entrega. No se modifica de forma independiente.
- Antes de editar, se comparan nombres y hashes de los XPO versionados en ambos repositorios.
- Después de editar, se sincronizan únicamente los XPO afectados desde API hacia APP y se vuelve a comprobar la igualdad byte a byte.
- Los XPO locales excluidos de Git no forman parte del espejo y nunca se eliminan ni sobrescriben durante la sincronización.
- No se elige una versión por fecha o tamaño. Si existe divergencia, se revisan el método, sus consumidores y el historial antes de reconciliarla.

## Formato obligatorio

- Mantener codificación Windows-1252 compatible con Axapta 3.0.
- Mantener finales de línea CRLF.
- No añadir BOM UTF-8.
- Comprobar que cada bloque `SOURCE` tiene su `ENDSOURCE` correspondiente.
- No duplicar métodos, nodos AOT ni bloques `SOURCE`.
- Limitar cada edición al método u objeto necesario y revisar el diff completo del XPO.

## Compatibilidad X++ y AOT

- Usar únicamente sintaxis compatible con Axapta 3.0.
- Conservar `RunOn`, validaciones, permisos, transacciones y efectos laterales existentes salvo requisito explícito.
- Mantener llamadas HTTP, DLL, COM y correo fuera de `tts` siempre que sea posible. Deben ser `best-effort` cuando no formen parte de la transacción de negocio.
- En contratos `container`, conservar las posiciones existentes. Los campos compatibles se añaden al final y se leen comprobando `conLen`.
- No cambiar EDT, tabla, índice, relación o enum como efecto colateral de un cambio de método.
- Los objetos AOT/X++ nuevos usan el prefijo `IND`. Las clases nuevas de C# no usan ese prefijo.
- Los comentarios deben ser breves, ASCII y coherentes con la instrucción global activa. No se traducen ni reformatean comentarios históricos fuera del bloque modificado.
- Cuando corresponda una marca MMS, usar una sola marca en la unidad lógica modificada con fecha real y sin acumular un historial de marcas.

## Análisis previo

Antes de modificar un XPO:

1. Identificar el objeto, método y consumidores reales.
2. Revisar índices posicionales de entrada y salida, valores opcionales y compatibilidad anterior.
3. Revisar autorización, empresa, propietario, actor y relaciones de subordinación.
4. Revisar `ttsbegin`, `ttscommit`, `ttsabort` y llamadas externas.
5. Determinar si el cambio exige también modificaciones en API, APP o `IND_INTERNAL_API`.
6. Definir el orden de activación y una alternativa compatible si los componentes no se publican al mismo tiempo.

No se crean bitácoras Markdown fechadas por tarea. El estado temporal vive en el plan de trabajo y el historial permanente queda en Git. Solo se actualiza documentación temática vigente cuando cambia un contrato o una regla estable.

## Validación local

La validación mínima incluye:

1. Comparación del diff del método exacto.
2. Windows-1252, CRLF y ausencia de BOM.
3. Equilibrio de `SOURCE` y `ENDSOURCE`.
4. Ausencia de métodos o nodos duplicados.
5. Paridad de nombres y hashes entre API y APP.
6. Compilación y pruebas de API/APP afectadas.
7. Revisión de compatibilidad de contratos y orden de despliegue.

Desde `IND_CRM_API`, ejecutar `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/check-ax-xpo-parity.ps1`. El script toma como inventario solo los XPO rastreados de API, ignora archivos locales no rastreados de APP y valida formato, bloques y SHA-256 de todos los pares.

Estas comprobaciones demuestran integridad del artefacto, no activación en Axapta.

## Ambigüedad conocida del inventario

El inventario actual contiene `INDWebApp.xpo` e `INDWebAppTable.xpo`; ambos exportan la tabla AOT `INDWebApp`, pero sus propiedades e índices no coinciden. No se debe eliminar, renombrar ni elegir uno por fecha hasta comparar la tabla activa en AOT y SQL, sus índices y sus consumidores. Después de esa comprobación se conservará una sola exportación canónica y se sincronizará el espejo.

El comprobador automático valida inventario rastreado, formato y paridad entre repositorios. No determina cuál de dos exportaciones del mismo nodo AOT representa el runtime instalado; esa validación sigue siendo manual.

## Activación manual en Axapta

El cierre debe indicar exactamente:

- XPO que se deben importar.
- Orden de importación: EDT/enum, tabla, clase, formulario, menú y job, según las dependencias reales.
- Objetos y dependencias que se deben compilar.
- Si hace falta sincronizar el diccionario. Solo se requiere por cambios de tablas, campos, índices o relaciones.
- Si hace falta reiniciar AOS, cliente o caché y por qué.
- Casos funcionales que se deben probar, incluyendo empresa, permisos, propietario, responsable y subordinado cuando aplique.

Git, la compilación de C#, la publicación de API o IIS no importan, compilan, sincronizan ni prueban el XPO dentro de AX. No se puede declarar el cambio activo o validado de extremo a extremo sin evidencia del runtime de Axapta.

## Orden de publicación

- Si API o APP dependen de un contrato AX nuevo: AX → API → APP.
- Si el cambio es aditivo y compatible, se puede preparar API/APP antes, pero la función nueva no se considera disponible hasta activar AX.
- Si cambia un contrato público, actualizar código, DTO, OpenAPI, documentación y consumidores en la misma entrega coordinada.
- Un despliegue parcial debe informar qué rutas siguen usando compatibilidad anterior y qué funciones quedan pendientes.

## Criterio de cierre

Una tarea AX/XPO solo puede cerrarse cuando se ha informado:

- fuente canónica modificada y espejo sincronizado;
- lista exacta de XPO;
- validaciones locales ejecutadas;
- impacto contractual;
- orden de activación;
- validación manual de AX realizada o marcada expresamente como pendiente.
