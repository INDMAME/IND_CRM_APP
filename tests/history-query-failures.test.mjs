import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

// Exercises the actual controller with isolated API and context dependencies.
test("history queries distinguish API failures from empty results and retain recovery", () => {
  const root = path.resolve(import.meta.dirname, "..");
  const fixture = mkdtempSync(path.join(tmpdir(), "ind-history-query-"));
  const sourceFiles = [
    "Web/Controllers/Visitas/HistorialController.cs",
    "Web/Controllers/System/BaseMvcController.cs",
    "App/Models/**/*.cs",
    "App/Services/ICrmApiClient.cs",
    "App/Services/ITokenSessionService.cs",
    "App/Services/IIndAuthContextService.cs",
    "App/Services/ApiClientDtos.cs",
    "App/Services/ApiException.cs",
    "App/Infrastructure/Localization/INDSharedResource.cs",
  ];
  const escapeXml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
  try {
    writeFileSync(path.join(fixture, "global.json"), readFileSync(path.join(root, "global.json")));
    writeFileSync(path.join(fixture, "HistoryQuery.csproj"), `<Project Sdk="Microsoft.NET.Sdk.Web">
      <PropertyGroup><TargetFramework>net10.0</TargetFramework><ImplicitUsings>enable</ImplicitUsings><Nullable>enable</Nullable></PropertyGroup>
      <ItemGroup>${sourceFiles.map((file) => `<Compile Include="${escapeXml(path.join(root, file))}" />`).join("")}</ItemGroup>
    </Project>`);
    writeFileSync(path.join(fixture, "Program.cs"), `
using System.Reflection;
using System.Text.Json;
using IND_CRM_APP.Controllers;
using IND_CRM_APP.Services;
using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Infrastructure.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging.Abstractions;

var verified = 0;
await CheckFailure(new() { Success = false, ErrorCode = "TIMEOUT", Message = "Private upstream detail", TraceId = "trace-timeout" });
await CheckFailure(new() { Success = false, ErrorCode = "VALIDATION_ERROR", Data = new[] { Row("1", "2026-09-09", "A") } });
await CheckFailure(null);

var empty = Create(new PagedApiResponse<ActivityDto> { Success = true });
var emptyResult = await empty.Controller.GetActivities(new());
CheckSuccess(emptyResult, 0, null);
Require(empty.Api.Calls == 1 && empty.Auth.Calls == 0, "Empty results must not retry");
verified++;

var recovery = Create(
    new PagedApiResponse<ActivityDto> { Success = false, ErrorCode = "AX_SESSION_ERROR" },
    new PagedApiResponse<ActivityDto> { Success = true, Items = new[] { Row("7", "2026-09-09", "A") } });
CheckSuccess(await recovery.Controller.GetActivities(new()), 1, "7");
Require(recovery.Api.Calls == 2 && recovery.Auth.Calls == 1 && recovery.Auth.ForceRefresh, "Recovery must refresh once");
verified++;

var exhausted = Create(
    new PagedApiResponse<ActivityDto> { Success = false, ErrorCode = "AX_SESSION_ERROR" },
    new PagedApiResponse<ActivityDto> { Success = false, ErrorCode = "AX_SESSION_ERROR", TraceId = "retry-trace" });
CheckError(await exhausted.Controller.GetActivities(new()), "AX_SESSION_ERROR", "retry-trace");
Require(exhausted.Api.Calls == 2 && exhausted.Auth.Calls == 1, "Failed recovery must stop after one retry");
verified++;

var rejectedRefresh = Create(new PagedApiResponse<ActivityDto> { Success = false, ErrorCode = "AX_COM_ERROR" });
rejectedRefresh.Auth.Success = false;
CheckError(await rejectedRefresh.Controller.GetActivities(new()), "AX_COM_ERROR", null);
Require(rejectedRefresh.Api.Calls == 1 && rejectedRefresh.Auth.Calls == 1, "Rejected refresh must not repeat the API call");
verified++;

var sorted = Create(new PagedApiResponse<ActivityDto> { Success = true, Items = new[] {
    Row("1", "2026-09-07", "A"), Row("2", "2026-09-09", "B"),
    Row("3", "2026-09-08", "A"), Row("4", "2026-09-08", "A") } });
CheckSuccess(await sorted.Controller.GetActivities(new() { accountNum = " A " }, page: 2, pageSize: 1), 3, "3");
Require(sorted.Api.Filter?.accountNum == "A", "Filter normalization changed");
verified++;
Console.WriteLine($"Verified {verified} history query cases.");

// Checks unsuccessful envelopes without letting their rows appear as valid results.
async Task CheckFailure(PagedApiResponse<ActivityDto>? response) {
    var scenario = Create(response);
    CheckError(await scenario.Controller.GetActivities(new()), response?.ErrorCode ?? "UPSTREAM_ERROR", response?.TraceId);
    Require(scenario.Api.Calls == 1 && scenario.Auth.Calls == 0, "Nonrecoverable failure must not retry");
    verified++;
}

// Builds one controller with a deterministic sequence of upstream responses.
static (HistorialController Controller, FakeApi Api, FakeAuth Auth) Create(params PagedApiResponse<ActivityDto>?[] responses) {
    var client = DispatchProxy.Create<ICrmApiClient, FakeApi>();
    var api = (FakeApi)(object)client;
    foreach (var response in responses) api.Responses.Enqueue(response);
    var authService = DispatchProxy.Create<IIndAuthContextService, FakeAuth>();
    var auth = (FakeAuth)(object)authService;
    return (new HistorialController(client, new FakeToken(), authService, NullLogger<HistorialController>.Instance, new FakeLocalizer()), api, auth);
}

// Validates the public error contract rather than private helper implementation.
static void CheckError(IActionResult result, string errorCode, string? traceId) {
    Require(result is ObjectResult { StatusCode: 502 }, "Expected HTTP 502");
    var json = JsonSerializer.SerializeToElement(((ObjectResult)result).Value);
    Require(!json.GetProperty("success").GetBoolean(), "Failure was reported as success");
    Require(json.GetProperty("errorCode").GetString() == errorCode, "Error code was lost");
    Require(json.GetProperty("traceId").GetString() == traceId, "Trace id was lost");
    Require(json.GetProperty("message").GetString() == "Localized API error", "Expected localized error");
    Require(!json.TryGetProperty("items", out _), "Failure must not masquerade as a result list");
}

// Ensures successful paging keeps the established total/items shape.
static void CheckSuccess(IActionResult result, int total, string? firstRecId) {
    Require(result is JsonResult { StatusCode: null or 200 }, "Expected successful JSON response");
    var json = JsonSerializer.SerializeToElement(((JsonResult)result).Value);
    Require(json.GetProperty("total").GetInt32() == total, "Unexpected total");
    var items = json.GetProperty("items");
    Require(firstRecId == null ? items.GetArrayLength() == 0 : items[0].GetProperty("RecId").GetString() == firstRecId, "Unexpected page contents");
}

static ActivityDto Row(string recId, string date, string account) => new() { RecId = recId, TransDate = date, AccountNum = account };
static void Require(bool condition, string message) { if (!condition) throw new Exception(message); }

// Implements only the API operation exercised by the controller action.
public class FakeApi : DispatchProxy {
    public Queue<PagedApiResponse<ActivityDto>?> Responses { get; } = new();
    public int Calls { get; private set; }
    public ActivitiesFilter? Filter { get; private set; }
    protected override object? Invoke(MethodInfo? method, object?[]? args) {
        if (method?.Name != "GetActivitiesAsync") throw new Exception("Unexpected API operation");
        Calls++;
        Filter = (ActivitiesFilter)args![1]!;
        return Task.FromResult(Responses.Dequeue()!);
    }
}

// Records whether recovery refreshes the context before a retry.
public class FakeAuth : DispatchProxy {
    public int Calls { get; private set; }
    public bool ForceRefresh { get; private set; }
    public bool Success { get; set; } = true;
    protected override object? Invoke(MethodInfo? method, object?[]? args) {
        if (method?.Name != "EnsureContextAsync") throw new Exception("Unexpected context operation");
        Calls++;
        ForceRefresh = (bool)args![0]!;
        return Task.FromResult(new IndAuthContextResult { Success = Success });
    }
}

// Provides a token without requiring an authenticated browser session.
public sealed class FakeToken : ITokenSessionService {
    public (string? Token, DateTime? ExpiresUtc) GetToken() => ("test-token", DateTime.UtcNow.AddHours(1));
    public void SetToken(string token, DateTime? expiresUtc = null) { }
    public void Clear() { }
}

// Supplies deterministic localized text for error contract assertions.
public sealed class FakeLocalizer : IStringLocalizer<INDSharedResource> {
    public LocalizedString this[string name] => new(name, name == "Api_RequestFailed" ? "Localized API error" : name);
    public LocalizedString this[string name, params object[] args] => this[name];
    public IEnumerable<LocalizedString> GetAllStrings(bool includeParentCultures) => Array.Empty<LocalizedString>();
}
`);
    const result = spawnSync("dotnet", ["run", "--project", path.join(fixture, "HistoryQuery.csproj")],
      { cwd: fixture, encoding: "utf8", timeout: 120000 });
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.match(result.stdout, /Verified 8 history query cases\./u);
  } finally {
    const resolved = path.resolve(fixture);
    assert.equal(path.dirname(resolved), path.resolve(tmpdir()));
    assert.ok(path.basename(resolved).startsWith("ind-history-query-"));
    rmSync(resolved, { recursive: true, force: true });
  }
});
