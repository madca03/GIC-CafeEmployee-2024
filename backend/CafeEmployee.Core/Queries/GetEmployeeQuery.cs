using CafeEmployee.Core.Models.ResultModels;
using MediatR;

namespace CafeEmployee.Core.Queries;

public class GetEmployeeQuery : IRequest<IReadOnlyList<CafeEmployeeResultModel>>
{
    public string CafeId { get; set; }
    public string EmployeeStringId { get; set; }
}