using CafeEmployee.Core.Models.DatabaseModels;

namespace CafeEmployee.Core.Models.ResultModels;

public class CafeEmployeeJoinModel
{
    public Employee Employee { get; set; }
    public Cafe? Cafe { get; set; }
    public DateTime EmployeeStartDate { get; set; }
}