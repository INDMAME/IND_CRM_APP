# IND_CRM_APP agent profile

## Tech constraints

- Project is ASP.NET Core MVC using Razor views (server side rendering).
- This app consumes the internal IND_CRM_API via HTTP.
- Do NOT migrate to a full SPA or rewrite the app in React.
- Keep the current .NET runtime and hosting model unchanged.

## API consumption

- Long term goal: use a typed C# client generated from IND_CRM_API OpenAPI.
- Short term: wrap HttpClient calls in a clean service interface (for example IIndCrmApiClient).
- Controllers must call services, not build raw HTTP requests or parse JSON manually.
- Preserve existing routes and view models unless there is a clear bug.

## UI and design system

- Define reusable Razor partials/components for layout, cards, page headers, and primary buttons.
- Move repeated HTML fragments into shared components instead of copy paste.
- Prepare for Tailwind CSS integration:
  - Use a single main stylesheet entry where Tailwind can be compiled later.
  - Start with utility classes and shared CSS without breaking the current look.
- Keep the layout clean and modern, but avoid complex JS frameworks.

## Documentation and style

- All comments and docstrings must be in simple English without accents or special characters.
- Avoid any non ASCII characters in code or comments.
- Document controllers, services, and shared UI components with short English summaries.
- Explain what each action does, especially when it calls IND_CRM_API.

## Working style

- Always prefer small, focused refactors over big rewrites.
- Keep view logic thin: heavy logic belongs in services or helpers.
- When changing API usage, clearly explain how errors are handled and surfaced in the UI.
- Avoid introducing new frontend dependencies unless they clearly reduce complexity.