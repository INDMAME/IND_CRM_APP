# Flusso generale degli stati

<!-- Fonte: Manual App CRM 1.5.docx, sezione 10.1. -->

<!-- Descrizione funzionale verificata a partire dalla schermata di questa sezione. -->

**Descrizione funzionale del diagramma:**

- Il diagramma indica che le transizioni disponibili dipendono dalla configurazione, dal profilo e dall'azione.
- Da Bozza, Richiedi approvazione porta ad Approvazione richiesta; quando l'approvazione non è necessaria, Approva porta ad Approvata.
- Da Approvazione richiesta, Annulla richiesta riporta a Bozza, Approva porta ad Approvata e Rifiuta porta a Rifiutata.
- Da Approvata, Annulla approvazione riporta ad Approvazione richiesta e Contabilizza in Axapta porta a Pagata.
- Da Rifiutata, Passa a Bozza riporta a Bozza e Annulla rifiuto riporta ad Approvazione richiesta.

![Schermata di «Flusso generale degli stati» relativa a: Da Rifiutata, Passa a Bozza riporta a Bozza e Annulla rifiuto riporta ad Approvazione richiesta.](../../../../assets/manual-1.5/image49.png)
