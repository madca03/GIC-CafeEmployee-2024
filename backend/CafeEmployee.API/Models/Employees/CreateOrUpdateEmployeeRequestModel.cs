using System.ComponentModel.DataAnnotations;

namespace CafeEmployee.API.Models.Employees;

public class CreateOrUpdateEmployeeRequestModel
{
    [Required]
    public string Name { get; set; }
    
    [Required]
    public string EmailAddress { get; set; }
    
    [Required]
    public string PhoneNumber { get; set; }
    
    [Required]
    public string Gender { get; set; }
    
    [Required]
    public string CafeId { get; set; }
}