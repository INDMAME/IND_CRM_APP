# Fluxo geral dos estados

<!-- Fonte: Manual App CRM 1.5.docx, secção 10.1. -->

<!-- Descrição funcional revista a partir da captura desta secção. -->

**Descrição funcional do diagrama:**

- O diagrama indica que as transições disponíveis dependem da configuração, do perfil e da ação.
- A partir de Rascunho, Solicitar aprovação passa para Aprovação solicitada; quando não é necessária aprovação, Aprovar passa para Aprovada.
- A partir de Aprovação solicitada, Anular pedido volta a Rascunho, Aprovar passa para Aprovada e Rejeitar passa para Rejeitada.
- A partir de Aprovada, Anular aprovação volta a Aprovação solicitada e Contabilizar no Axapta passa para Paga.
- A partir de Rejeitada, Passar a Rascunho volta a Rascunho e Anular rejeição volta a Aprovação solicitada.

![Captura de «Fluxo geral dos estados» relacionada com: A partir de Rejeitada, Passar a Rascunho volta a Rascunho e Anular rejeição volta a Aprovação solicitada.](../../../../assets/manual-1.5/image49.png)
