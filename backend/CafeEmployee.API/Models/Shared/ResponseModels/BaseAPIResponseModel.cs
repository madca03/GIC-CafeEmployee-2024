using System.Text.Json.Serialization;
using CafeEmployee.API.Constants;
using Newtonsoft.Json;

namespace CafeEmployee.API.Models.Shared.ResponseModels;

public class BaseAPIResponseModel
{
    [JsonProperty("statusCode")]
    [JsonPropertyName("statusCode")]
    public int StatusCode { get; set; }

    [JsonProperty("message")]
    [JsonPropertyName("message")]
    public string Message { get; set; }
    
    public BaseAPIResponseModel()
    {
        StatusCode = APIStatusCode.SUCCESS;
    }
}