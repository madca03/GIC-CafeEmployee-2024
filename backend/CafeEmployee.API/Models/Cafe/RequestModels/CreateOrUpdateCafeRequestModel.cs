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

    public IFormFile Logo { get; set; }
}