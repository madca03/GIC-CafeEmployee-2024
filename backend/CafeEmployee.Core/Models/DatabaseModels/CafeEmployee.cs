namespace CafeEmployee.Core.Models.DatabaseModels;

public partial class CafeEmployee
{
    public int Id { get; set; }
    public int EmployeeId { get; set; }

    public int CafeId { get; set; }

    public bool IsActive { get; set; }

    public DateTime EmployeeStartDate { get; set; }

    public DateTime? EmployeeEndDate { get; set; }

    public virtual Employee Employee { get; set; } = null!;
}
