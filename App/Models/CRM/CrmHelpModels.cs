using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.CRM
{
    /// <summary>
    /// Represents the localized CRM help catalog returned by the API.
    /// </summary>
    public class CrmHelpCatalogDto
    {
        public string KnowledgeVersion { get; set; } = string.Empty;
        public string DefaultLocale { get; set; } = "es-ES";
        public string ResponseLocale { get; set; } = "es-ES";
        public List<CrmHelpModuleDto> Modules { get; set; } = new();
    }

    /// <summary>
    /// Groups related help topics in the catalog.
    /// </summary>
    public class CrmHelpModuleDto
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Order { get; set; }
        public List<CrmHelpTopicSummaryDto> Topics { get; set; } = new();
    }

    /// <summary>
    /// Describes one selectable help topic without loading its full content.
    /// </summary>
    public class CrmHelpTopicSummaryDto
    {
        public string Id { get; set; } = string.Empty;
        public string ModuleId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public string RouteKey { get; set; } = string.Empty;
        public bool HasQuickAnswers { get; set; }
    }

    /// <summary>
    /// Contains the complete content for one CRM help topic.
    /// </summary>
    public class CrmHelpTopicDto
    {
        public string Id { get; set; } = string.Empty;
        public string ModuleId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public string RouteKey { get; set; } = string.Empty;
        public List<string> PrerequisiteTopicIds { get; set; } = new();
        public List<string> RelatedTopicIds { get; set; } = new();
        public List<CrmHelpChunkDto> Chunks { get; set; } = new();
        public List<CrmHelpQuickAnswerDto> QuickAnswers { get; set; } = new();
        public string KnowledgeVersion { get; set; } = string.Empty;
        public string ResponseLocale { get; set; } = "es-ES";
    }

    /// <summary>
    /// Provides one citable section of a help topic.
    /// </summary>
    public class CrmHelpChunkDto
    {
        public string Id { get; set; } = string.Empty;
        public string Heading { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
        public List<string> ImageRefs { get; set; } = new();
    }

    /// <summary>
    /// Provides one editorially reviewed answer for a common question.
    /// </summary>
    public class CrmHelpQuickAnswerDto
    {
        public string Id { get; set; } = string.Empty;
        public string Question { get; set; } = string.Empty;
        public string Answer { get; set; } = string.Empty;
        public List<string> SourceChunkIds { get; set; } = new();
    }

    /// <summary>
    /// Carries one bounded conversational turn to the help endpoint.
    /// </summary>
    public class CrmHelpHistoryMessage
    {
        [JsonPropertyName("role")]
        public string Role { get; set; } = string.Empty;

        [JsonPropertyName("content")]
        public string Content { get; set; } = string.Empty;
    }

    /// <summary>
    /// Requests a grounded answer from the CRM help assistant.
    /// </summary>
    public class CrmHelpAskRequest
    {
        [JsonPropertyName("question")]
        public string Question { get; set; } = string.Empty;

        [JsonPropertyName("responseLocale")]
        public string ResponseLocale { get; set; } = "es-ES";

        [JsonPropertyName("selectedTopicId")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? SelectedTopicId { get; set; }

        [JsonPropertyName("history")]
        public List<CrmHelpHistoryMessage> History { get; set; } = new();

        [JsonPropertyName("clientInteractionId")]
        public string ClientInteractionId { get; set; } = string.Empty;
    }

    /// <summary>
    /// Contains a grounded answer or the next resolution step for a help request.
    /// </summary>
    public class CrmHelpAskResponseData
    {
        public string InteractionId { get; set; } = string.Empty;
        public string Resolution { get; set; } = string.Empty;
        public string Answer { get; set; } = string.Empty;
        public List<CrmHelpCandidateDto> Candidates { get; set; } = new();
        public List<CrmHelpSourceDto> Sources { get; set; } = new();
        public List<CrmHelpActionDto> Actions { get; set; } = new();
        public string KnowledgeVersion { get; set; } = string.Empty;
        public string ResponseLocale { get; set; } = "es-ES";
        public string FeedbackToken { get; set; } = string.Empty;
        public bool QuickAnswerUsed { get; set; }
        public string Model { get; set; } = string.Empty;
    }

    /// <summary>
    /// Identifies one likely topic when a question is ambiguous.
    /// </summary>
    public class CrmHelpCandidateDto
    {
        public string TopicId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public double Score { get; set; }
    }

    /// <summary>
    /// Identifies one topic chunk used to support an answer.
    /// </summary>
    public class CrmHelpSourceDto
    {
        public string TopicId { get; set; } = string.Empty;
        public string TopicTitle { get; set; } = string.Empty;
        public string ChunkId { get; set; } = string.Empty;
        public string Heading { get; set; } = string.Empty;
    }

    /// <summary>
    /// Describes a server-suggested action that the APP must resolve locally.
    /// </summary>
    public class CrmHelpActionDto
    {
        public string Type { get; set; } = string.Empty;
        public string RouteKey { get; set; } = string.Empty;
        public string Label { get; set; } = string.Empty;
    }

    /// <summary>
    /// Submits user feedback for one signed help interaction.
    /// </summary>
    public class CrmHelpFeedbackRequest
    {
        [JsonPropertyName("feedbackToken")]
        public string FeedbackToken { get; set; } = string.Empty;

        [JsonPropertyName("helpful")]
        public bool Helpful { get; set; }

        [JsonPropertyName("reason")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Reason { get; set; }

        [JsonPropertyName("comment")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Comment { get; set; }
    }

    /// <summary>
    /// Confirms that feedback was accepted by the API.
    /// </summary>
    public class CrmHelpFeedbackResponseData
    {
        public bool Accepted { get; set; }
    }
}
