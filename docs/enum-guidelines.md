# CRM enum-like lists guidelines

Goal: keep all enum-like dropdown lists consistent and stable across the app.

## When adding a new list
1. Add a method to `Services/Enums/IINDCrmEnumLocalizer.cs` named `Get<Name>Items()`.
2. Implement it in `Services/Enums/INDCrmEnumLocalizer.cs` using localized resource keys.
3. Add the same list to `Services/Enums/CrmEnumHelper.cs` (legacy fallback, English text).
4. Add all `Enum_<Name>_<ValueKey>` entries to every resource file:
   - `Resources/Infrastructure/Localization/INDSharedResource.resx`
   - `Resources/Infrastructure/Localization/INDSharedResource.es-ES.resx`
   - `Resources/Infrastructure/Localization/INDSharedResource.en.resx`
   - `Resources/Infrastructure/Localization/INDSharedResource.eu-ES.resx`
   - `Resources/Infrastructure/Localization/INDSharedResource.it.resx`
   - `Resources/Infrastructure/Localization/INDSharedResource.pt.resx`
   - `Resources/Infrastructure/Localization/INDSharedResource.zh-Hans.resx`

## Naming rules
- Method name: `Get<Name>Items()`.
- Resource keys: `Enum_<Name>_<ValueKey>`.
- Keep `Enum_None` for the 0 value when applicable.

## Value rules
- Use string numeric values, e.g. `"0"`, `"1"`.
- Do not renumber existing values.
- If there is a gap, keep it (example: `14` is valid even if `9..13` do not exist).
- Order should follow numeric value unless AX requires a specific display order.

## Example: GastoType
Values are fixed and must not change:
- 0: None
- 1: Peaje
- 2: Parking
- 3: Km
- 4: Desayuno
- 5: Comida
- 6: Cena
- 7: Hotel
- 8: Varios
- 14: Taxi
