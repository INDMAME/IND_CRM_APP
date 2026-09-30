namespace IND_CRM_APP.Infrastructure.Security.Auth;

// Marks read-only error rendering actions that do not need API or company context.
[AttributeUsage(AttributeTargets.Method)]
public sealed class IndErrorEndpointAttribute : Attribute
{
}
