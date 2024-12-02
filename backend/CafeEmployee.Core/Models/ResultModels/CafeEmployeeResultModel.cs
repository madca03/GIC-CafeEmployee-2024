namespace CafeEmployee.Core.Models.ResultModels;

public class CafeEmployeeResultModel
{
    public string EmployeeStringId { get; set; }
    public string Name { get; set; }
    public string EmailAddress { get; set; }
    public string PhoneNumber { get; set; }
    public int DaysWorked { get; set; }
    public string? Cafe { get; set; }
}