using System.ComponentModel.DataAnnotations;

namespace CafeEmployee.API.Models.Cafe.RequestModels;

public class CreateOrUpdateCafeRequestModel
{
    [Required]
    public string Name { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public string Location { get; set; }

    public string Logo { get; set; }
}