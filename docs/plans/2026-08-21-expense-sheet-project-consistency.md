# Expense sheet project consistency

## Objective

Keep the expense-sheet header project and line projects consistent without ever persisting the configured mixed-project marker as a line project. Preserve an intentional blank line project.

## Invariants

- The value in `PurchParameters.INDProjIdVarious` is a reserved header marker, never a line project.
- A new line uses only the eligible header project. A blank, mixed, missing, closed, or non-chargeable header project leaves the new line blank.
- The selected row and the latest persisted line never determine the new-line project.
- Create requests distinguish an omitted project from an explicitly blank project.
- Updating a line to a blank project keeps it blank.
- Updating another line field with `projIdProvided=false` preserves the project currently stored by AX, so a stale editor cannot restore an older value.
- Direct table `insert`/`update` paths reject new ineligible projects on both headers and lines, while unchanged historical values remain compatible. Controlled aggregate and propagation paths use `doUpdate()` after validating their derived target.
- After line create, update, or delete, AX recalculates the header from every live line:
  - no lines or all blank: blank header;
  - one common real project: that project;
  - any combination of different values, including real plus blank: the configured mixed marker.
- A confirmed header project change uses the dedicated propagation operation to update the header and every line in one AX transaction. Blank is allowed; the mixed marker is not propagated.
- The generic header update validates and stores header fields but never propagates projects by itself.
- Ordinary header and status saves carry an explicit `projIdProvided=false` marker, so a stale client cannot overwrite or propagate a project changed by another session.

## Contracts

- Line create adds the optional `projIdProvided` flag. Older clients remain compatible: a non-empty legacy project is explicit, while an empty legacy value keeps the historical inherit behavior.
- Line update appends `projIdProvided` at AX position 17, after the existing optional fields. For an older client with an empty project, AX tries only the eligible header default and otherwise preserves the stored line project.
- Expense-sheet detail appends `DefaultLineProjId` without moving existing AX container positions. This value is the eligible header project or blank.
- The existing project propagation endpoint accepts an optional target project. Calls without a target keep the legacy behavior.
- Header update appends `projIdProvided` after the existing optional fields. New clients always send it; legacy clients without the position retain their explicit-project behavior.

## Mixed marker migration

`CRMHojaGastosTable::migrateVariousProjectMarker(old, new)` changes only headers in the current company whose project equals the old non-empty marker. It does not touch lines or project assignments.

The complete `PurchParameters` export is included. Its `update()` hook validates changed raw marker values, normalizes whitespace, rejects blank or real-project markers, and migrates matching headers in the same transaction as `super()`. `validateField()` provides immediate form feedback, while `update()` remains the definitive guard for non-form callers.

The hook deliberately adds no marker validation or migration when the raw value has not changed. This avoids changing unrelated update behavior during rollout; field metadata and form validation can still require the value. Configure the marker in every company before activating mixed-project recalculation.

## Validation

- Static contract and XPO regression tests.
- TypeScript and .NET builds.
- XPO Windows-1252, CRLF, and `SOURCE`/`ENDSOURCE` checks.
- AX import, compile, database synchronization when required, and runtime tests in the target company.

## Activation order

Deploy and activate the AX XPO changes first, then the API contract, and finally the web application. The new API and web clients send intent flags that older XPO code does not understand.

## Known activation boundaries

- The marker validation and migration are source-complete but are not active until the individual XPOs are imported, compiled, synchronized where required, and tested in AX.
- The copied project bundles under `.codex/Axapta/INDMMS_*` are historical snapshots and are not the import source for this change; use the corrected individual XPOs.
- API/IIS deployment does not activate AX code or prove transaction behavior in the target AOS/company.
