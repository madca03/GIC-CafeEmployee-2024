using CafeEmployee.Core.Models.ResultModels;
using MediatR;

namespace CafeEmployee.Core.Queries;

public class GetEmployeeDBQuery : IRequest<EmployeeFormDetailResultModel>
{
    public string EmployeeStringId { get; set; }
}