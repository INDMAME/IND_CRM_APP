# Publicación Word del manual CRM

Los procedimientos se editan en los temas españoles de `../modules`. Esta carpeta mantiene únicamente el orden de publicación, la introducción específica del Word y los criterios editoriales. No copie los procedimientos a una segunda fuente editable.

## Fuentes y exclusiones

- `publication.json`: edición documental, capítulos, selección de pilotos, capturas y hash del original aprobado.
- `introduction.es-ES.md`: acceso, convenciones y seguridad para el documento completo.
- `editorial.es-ES.md`: estructura, plantillas, diseño y control de dudas funcionales.
- Base Word: copia del usuario guardada el 24 de julio de 2026, revisión interna 16. SHA-256 `8B0E4300A94F7B3BD43E423EF4EF4FD6753FE8C2BE2643E9A148061CE7906A05`.

El documento Word de julio del repositorio sigue siendo la entrada histórica de la ayuda. La base del 24 de julio se conserva por separado en el paquete de fuentes del entregable. El exportador exige el hash correcto antes de usarla.

La sección 8.7 del original se extrae literalmente en la edición consolidada. El tema canónico de divisas no se modifica: su redacción evolucionó antes de esta revisión y no se utiliza para reemplazar el bloque congelado del Word. Los párrafos económicos incluidos en otros temas ampliados también se conservan. No añadir reglas empresariales sin validación funcional.

## Generación de un entregable

El exportador necesita Python y `python-docx==1.2.0`, exclusivamente como herramientas de autoría. Se recomienda un entorno virtual temporal. No son dependencias de la aplicación CRM.

Desde la raíz del repositorio, usando el Python de ese entorno:

```powershell
python scripts/crm-help/Export-CrmHelpWord.py `
  --baseline "RUTA\Manual App CRM 1.5 R16.docx" `
  --output "RUTA\Manual App CRM 2.0 V05.docx" `
  --stage complete --revision V05
```

Las etapas admitidas son `structure`, `pilots` y `complete`. La fecha de portada y propiedades procede de `publicationDate` en `publication.json`; revísela junto a la versión en cada entrega. La ruta de salida no puede existir. Para una nueva entrega, incremente el sufijo Vnn; no reutilice un nombre distribuido.

El exportador genera DOCX y un manifiesto con hashes de las fuentes, encabezados, imágenes y texto congelado. Produce títulos jerárquicos, listas nativas, tablas de datos, imágenes en línea con texto alternativo, índice real con enlaces y numeración de página. El índice inicial es navegable y no inventa números de página.

## Renderizado y comprobación

Abra una copia en Word o en un renderizador compatible. Actualice el índice en memoria y exporte PDF para comprobar portada, tablas, saltos, imágenes, pies y enlaces. Si se usa un documento temporal renderizado para actualizar la caché del índice, utilice `Refresh-CrmHelpWordToc.py` para trasladar únicamente páginas y tabulaciones al documento generado; no sustituya el paquete completo por una conversión.

Antes de entregar:

1. Verifique XML, relaciones, tablas, listas, títulos y destinos del índice.
2. Compruebe que las imágenes insertadas conservan el hash del original.
3. Compruebe que la sección congelada conserva exactamente sus párrafos.
4. Renderice de nuevo la copia definitiva y contraste sus páginas con el índice.
5. Guarde el informe de validación, el PDF y un paquete de las fuentes junto al entregable versionado.

La validación visual con LibreOffice es compatible y útil, pero no acredita que todas las instalaciones de Microsoft Word produzcan la misma paginación. La prueba funcional en la aplicación y las decisiones empresariales pendientes se registran por separado.

## Ayuda integrada

Después de editar los temas, actualice versiones y hashes, sincronice respuestas rápidas y evaluaciones y ejecute el flujo de validación del README principal. Conserve estables los identificadores. Las pruebas de recuperación usan un clone temporal limpio de la API; no necesitan desplegarla ni modificar registros de negocio.
