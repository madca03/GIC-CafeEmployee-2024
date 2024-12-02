namespace CafeEmployee.Core.Models.DatabaseModels;

public partial class Employee
{
    public int Id { get; set; }

    public string EmployeeStringId { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string EmailAddress { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public bool Gender { get; set; }
}
