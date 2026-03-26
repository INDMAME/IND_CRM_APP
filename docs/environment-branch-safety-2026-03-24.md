# Environment And Branch Safety

Date: 2026-03-26

## Goal

- Keep the tracked files identical between `DEV` and `PROD`.
- Resolve environment-specific values on each machine instead of in git.
- Block accidental publish from the wrong branch to the wrong server.

## Shared environment contract

The web app now follows the same machine-level environment pattern already used by `IND_CRM_API`.

Required shared variables:

- `IND_ENV`
- `INDCRM_BASE_URL`

Required web host variable:

- `ASPNETCORE_ENVIRONMENT`

Existing web-only secrets that stay outside git:

- `CRM_TENANT_ID`
- `CRM_CLIENT_ID`
- `CRM_CLIENT_SECRET`
- `CRM_AUTHORITY`
- `USER_DEFAULT`
- `USER_PASS_DEFAULT`
- `AZURE_BLOB_CONNECTION_STRING`

Optional compatibility override:

- `ApiSettings__BaseUrl`

`ApiSettings__BaseUrl` still works, but the preferred shared variable is `INDCRM_BASE_URL` so both `IND_CRM_APP` and `IND_CRM_API` can point to the same target environment without branch-specific files.

## Resolution order in IND_CRM_APP

`IND_CRM_APP` resolves the CRM API base URL in this order:

1. `ApiSettings__BaseUrl`
2. `INDCRM_BASE_URL`
3. `ApiSettings:BaseUrl` from `appsettings.json`

The tracked `appsettings.json` now keeps `ApiSettings:BaseUrl` empty on purpose. This prevents a push to `DEV` or `PROD` from carrying a live API target in git.

## Local development safety

`launchSettings.json` and `.vscode/launch.json` now inherit the machine-level environment instead of pinning local values.

This means local `dotnet run`, Visual Studio, VS Code, and IIS Express sessions use the machine variables that are already configured for the current environment.

Playwright also defaults to `https://dev.insertec.biz:7702` unless `IND_E2E_BASE_URL` is provided explicitly.

## Publish guard

`publish.ps1` now blocks publish when:

- `IND_ENV` is missing and no explicit `-TargetEnvironment` was passed.
- `ASPNETCORE_ENVIRONMENT` is missing on the target machine.
- `ASPNETCORE_ENVIRONMENT` does not match the publish target (`Development` for `DEV`, `Production` for `PROD`).
- The current branch does not map to `DEV` or `PROD`.
- The current branch and target environment do not match.
- No effective API base URL is configured on the machine.

The script accepts `main` as `PROD` for compatibility, but the preferred branch naming remains `DEV` and `PROD`.

Emergency override:

- `-AllowBranchEnvironmentMismatch`

Use that switch only for deliberate one-off recovery cases.

## API inventory cross-check

`IND_CRM_API` already externalizes its environment-critical settings through machine variables. The key environment variables confirmed in the API project are:

- `IND_ENV`
- `INDCRM_AX_CONFIG_FILE`
- `INDCRM_BASE_URL`
- `INDCRM_PUBLIC_HOST`
- `INDCRM_PUBLIC_IP`
- `INDCRM_PUBLIC_PORT`
- `INDCRM_CORS_ENABLED`
- `INDCRM_CORS_ALLOWED_ORIGINS`
- `INDCRM_JWT_ISSUER`
- `INDCRM_JWT_AUDIENCE`
- `JWT_SECRET_KEY`
- `OPENAI_API_KEY`
- `AZURE_BLOB_CONNECTION_STRING`
- `AZURE_BLOB_CONTAINER`
- `AZURE_BLOB_ENVIRONMENT_SEGMENT`
- `AZURE_DOCS_IA_KEY`
- `AZURE_DOCS_IA_ENDPOINT`
- `AZURE_DOCS_IA_MODEL`

Reference inventory:

- `C:\INDProjects\GitHub Projects\IND_CRM_API\IND_CRM_API\docs\ENVIRONMENT_CONFIGURATION_INVENTORY.md`
