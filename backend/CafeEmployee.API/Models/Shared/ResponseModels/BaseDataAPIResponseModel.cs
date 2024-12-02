using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace CafeEmployee.API.Models.Shared.ResponseModels;

public class BaseDataAPIResponseModel : BaseAPIResponseModel
{
    public BaseDataAPIResponseModel()
    {
        
    }

    public BaseDataAPIResponseModel(object data)
    {
        Data = data;
    }
    
    [JsonProperty("data")]
    [JsonPropertyName("data")]
    public object Data { get; set; }
}