# Egoeren fluxu orokorra

<!-- Iturria: Manual App CRM 1.5.docx, 10.1 atala. -->

<!-- Atal honetako pantaila-argazkitik berrikusitako deskribapen funtzionala. -->

**Diagramaren deskribapen funtzionala:**

- Diagramak adierazten du erabilgarri dauden trantsizioak konfigurazioaren, profilaren eta ekintzaren araberakoak direla.
- Borrador egoeratik, Solicitar aprobación ekintzak Aprobación solicitada egoerara eramaten du; onarpenik behar ez denean, Aprobar ekintzak Aprobada egoerara eramaten du.
- Aprobación solicitada egoeratik, Deshacer solicitud ekintzak Borrador egoerara itzultzen du, Aprobar ekintzak Aprobada egoerara eramaten du eta Rechazar ekintzak Rechazada egoerara.
- Aprobada egoeratik, Deshacer aprobación ekintzak Aprobación solicitada egoerara itzultzen du, eta Contabilizar en Axapta ekintzak Pagada egoerara eramaten du.
- Rechazada egoeratik, Pasar a Borrador ekintzak Borrador egoerara itzultzen du, eta Deshacer rechazo ekintzak Aprobación solicitada egoerara.

![«Egoeren fluxu orokorra» ataleko pantaila-argazkia, honekin lotua: Rechazada egoeratik, Pasar a Borrador ekintzak Borrador egoerara itzultzen du, eta Deshacer rechazo ekintzak Aprobación solicitada egoerara.](../../../../assets/manual-1.5/image49.png)
