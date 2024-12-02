using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace CafeEmployee.API.Models.Cafe.RequestModels;

public class GetCafeRequestModel
{
    [JsonProperty("location")]
    [JsonPropertyName("location")]
    public string Location { get; set; }

    [JsonProperty("id")]
    [JsonPropertyName("id")]
    public int? Id { get; set; }
}