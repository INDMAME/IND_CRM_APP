# Base documental del asistente CRM

Esta carpeta es la fuente canónica mantenible del asistente de ayuda. El archivo `docs/exports/Manual App CRM 1.5.docx` se conserva intacto como entrada histórica de la migración; la aplicación no debe leer ni indexar el DOCX en tiempo de ejecución.

La migración 1.5 comprobó 65 secciones lógicas. Se publican 60 temas con contenido útil. Los encabezados 3, 4, 6, 11 y 12 no tenían cuerpo propio y se mantienen únicamente como agrupación, evitando temas seleccionables vacíos.

## Estructura

```text
docs/crm-help/
├── knowledge.json                 # Versión, culturas y procedencia
├── navigation.json                # Orden y routeKey permitidos
├── assets/manual-1.5/             # Capturas copiadas sin transformación
├── localizations/{locale}.json    # Títulos, descripciones breves y respuestas rápidas
├── modules/{module}/module.json
├── modules/{module}/topics/{topic}/
│   ├── topic.json                 # Metadatos, aliases, relaciones y FAQ
│   └── content.{locale}.md        # Manual completo para cada cultura admitida
├── evals/                          # Casos de recuperación y respuesta
└── generated/                      # Bundle y reporte derivados
```

Los identificadores de módulo, tema, chunk, respuesta rápida y activo son estables. No deben cambiarse para corregir títulos o texto. Las relaciones siempre utilizan estos identificadores, nunca nombres de carpetas.

## Flujo de mantenimiento

1. Edite el `content.es-ES.md` canónico del tema existente o cree un tema completo con `topic.json`.
2. Actualice título, resumen, aliases, preguntas de ejemplo, relaciones y respuestas rápidas cuando corresponda. La descripción del menú debe explicar el contenido en un máximo de 120 caracteres.
3. Sincronice `localizations/{locale}.json` y `content.{locale}.md` para las seis culturas. Conserve los IDs, rutas de imágenes y hechos del original; no marque una traducción como revisada sin validación humana.
4. Actualice los hashes de contenido:

   ```powershell
   powershell -NoProfile -ExecutionPolicy Bypass -File scripts/crm-help/Update-CrmHelpContentHashes.ps1
   ```

5. Añada o ajuste casos realistas en `evals/retrieval-cases.json` y `evals/answer-cases.json`.
6. Valide sin producir un nuevo bundle:

   ```powershell
   powershell -NoProfile -ExecutionPolicy Bypass -File scripts/crm-help/Build-CrmHelpKnowledge.ps1 -ValidateOnly
   ```

7. Compile el bundle determinista:

   ```powershell
   powershell -NoProfile -ExecutionPolicy Bypass -File scripts/crm-help/Build-CrmHelpKnowledge.ps1
   ```

8. Para una publicación conjunta, genere directamente la copia que consume la API mediante el parámetro `-OutputPath`; no mantenga una segunda fuente editable:

   ```powershell
   powershell -NoProfile -ExecutionPolicy Bypass -File scripts/crm-help/Build-CrmHelpKnowledge.ps1 `
     -OutputPath C:\INDProjects\IND_CRM_API\Knowledge\crm-help.bundle.json
   ```

9. Ejecute el runner de recuperación de la API y revise Top-1, Recall@5, ambigüedades y consultas no documentadas antes de publicar.

`generated/crm-help.bundle.json` y `generated/validation-report.json` son derivados. No se editan a mano y deben corresponder al mismo cambio de las fuentes canónicas.

## Reglas editoriales

- `es-ES` sigue siendo la fuente factual canónica. Las otras culturas contienen una versión completa y estática para lectura, pero no deben introducir permisos, estados, rutas, límites ni resultados que no existan en español.
- Los metadatos, contenidos y respuestas rápidas de `eu-ES`, `en`, `pt`, `it` y `zh-Hans` se mantienen como `machine-draft` hasta revisión lingüística humana. La API debe proyectar la cultura solicitada de forma completa o usar el fallback español, nunca mezclar idiomas dentro de un tema.
- Una respuesta rápida debe ser breve, declarar `sourceChunkIds` estables y conservar el significado de la fuente española en cada cultura.
- No se inventan permisos, estados, rutas, límites ni resultados. Si la documentación no responde una pregunta, el resultado esperado es `notDocumented`.
- Un tema `published` debe producir al menos un chunk textual útil. Un encabezado de navegación sin cuerpo pertenece al módulo, no al catálogo de temas.
- Las capturas importadas conservan los bytes del DOCX. Para sustituir una imagen, cree un activo versionado, añada descripción funcional revisada y actualice su SHA-256; no recomprima el original.

## Navegación segura

`routeKey` es una clave lógica, no una URL. El único registro permitido actualmente es:

- `home`
- `visits.history`
- `expenses.sheets`
- `expenses.tickets`

La APP resuelve estas claves a rutas autorizadas. El compilador falla si un tema utiliza otra clave; una sección sin destino verificado mantiene `routeKey: null`.

## Traducciones y búsqueda

La migración reproducible guarda los títulos de búsqueda traducidos en `scripts/crm-help/resources/topic-search-overrides.json`. Las localizaciones de presentación y lectura se versionan en `localizations/{locale}.json` y `content.{locale}.md`. `Import-CrmHelpManualV15.ps1` es una herramienta de migración de una sola versión, protegida por el SHA-256 del DOCX. No debe ejecutarse durante el mantenimiento normal porque `-Force` vuelve a generar los temas 1.5 y puede reemplazar cambios editoriales.

Las nuevas consultas reales deben incorporarse como aliases o casos de evaluación únicamente después de redacción y revisión humana. Las métricas agregadas orientan la prioridad editorial, pero nunca modifican automáticamente la documentación.

## Evaluación generativa previa a publicación

`evals/answer-cases.json` está diseñado para el runner generativo de pre-release, no para alimentar respuestas en producción. Cada caso declara `responseLocale`, `expectedResolution`, `expectedTopicIds`, `sourceChunkIds`, hechos que deben estar presentes y afirmaciones que no deben aparecer. Los casos `notDocumented` mantienen vacías las referencias documentales y comprueban que el modelo no complete procedimientos ausentes.

Debe ejecutarse este corpus después de la evaluación de recuperación y antes de cada publicación que cambie documentación, modelo, prompt o política de contexto. Un resultado estructural correcto no basta: una persona debe revisar el significado de la respuesta, sus citas y el idioma solicitado.

Los hechos esperados en `eu-ES`, `en`, `pt`, `it` y `zh-Hans` son borradores generados con IA y requieren validación lingüística humana antes de convertirse en criterio bloqueante de producción. La fuente factual sigue siendo el chunk español indicado. La definición reproducible de estos casos se conserva en `scripts/crm-help/resources/answer-cases.json`; el importador 1.5 la valida y la copia sin generar hechos nuevos.

El runner pre-release de la API exige un origen explícito, el corpus y un directorio de salida. Antes de utilizar credenciales, valide offline los parámetros y los 15 casos; `-ValidateOnly` no lee el token ni realiza peticiones de red:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass `
  -File C:\INDProjects\IND_CRM_API\scripts\test-help-answer-evals.ps1 `
  -ApiBaseUrl https://dev.insertec.biz:2083 `
  -CasesPath C:\INDProjects\IND_CRM_APP\docs\crm-help\evals\answer-cases.json `
  -OutputDirectory C:\INDData\CRMHelpAnswerEvals `
  -ValidateOnly
```

Para la ejecución autenticada, el bearer debe existir previamente en una variable de entorno del proceso. El runner no acepta el valor como parámetro, no lo imprime y no lo guarda en los reportes:

```powershell
# INDCRM_HELP_EVAL_BEARER_TOKEN must already exist in this process environment.
powershell -NoProfile -ExecutionPolicy Bypass `
  -File C:\INDProjects\IND_CRM_API\scripts\test-help-answer-evals.ps1 `
  -ApiBaseUrl https://dev.insertec.biz:2083 `
  -CasesPath C:\INDProjects\IND_CRM_APP\docs\crm-help\evals\answer-cases.json `
  -OutputDirectory C:\INDData\CRMHelpAnswerEvals `
  -TokenEnvironmentVariable INDCRM_HELP_EVAL_BEARER_TOKEN
```

Use `-CaseId answer-en-common-ui.active-company` para ejecutar un único caso. Cada request lleva un `clientInteractionId` nuevo y se envía secuencialmente al endpoint directo `/api/ia/service/help/ask`. El proceso devuelve un código distinto de cero si falla HTTP, el envelope, la resolución, el locale o las fuentes esperadas.

Los JSON/HTML generados proyectan la respuesta sin guardar el token de autenticación ni `FeedbackToken`. Muestran `requiredFacts` y `forbiddenClaims` junto a la respuesta para revisión, pero no intentan decidir por coincidencia de texto si el significado es correcto. La exactitud factual, las afirmaciones prohibidas, la correspondencia semántica de las citas y la calidad de cada traducción siguen requiriendo aprobación humana.

## Validaciones del compilador

El compilador comprueba, entre otros puntos:

- hash y presencia del DOCX de migración, contenidos y activos;
- JSON válido, IDs únicos y orden coherente entre módulos y navegación;
- temas publicados con título, descripción breve, contenido completo, respuestas rápidas y chunks en todas las culturas;
- correspondencia de IDs y referencias de imagen entre la fuente española y cada localización;
- referencias de temas, activos, respuestas rápidas y casos de evaluación;
- `routeKey` incluido en el registro permitido;
- arrays JSON estables aun cuando tengan cero o un elemento;
- salida UTF-8 y orden determinista, sin marcas de tiempo.

El reporte válido debe mostrar cero errores. La comprobación estructural no sustituye la revisión editorial de traducciones, descripciones de capturas ni respuestas generadas.
