# Codex Global Skills Backup

Snapshot date: 2026-07-15

Source directory: `C:\Users\marco.meza\.codex\skills`

This directory is a version-controlled backup of the Codex skills installed for the local Windows user. It is stored under `docs/backups` so Codex does not treat these copies as active project-local skills.

The snapshot includes all top-level skill directories, including `.system` and custom skills. Regenerable Python cache directories and `*.pyc` files are excluded.

To restore the snapshot, review the changes first and then copy the required skill directories into `%USERPROFILE%\.codex\skills`. Existing skills should not be overwritten without comparing their versions.

Third-party and system-managed files remain subject to their original licenses and terms. Preserve the license files included in their directories. Never add credentials, tokens, private keys, or environment-specific secrets to this backup.
