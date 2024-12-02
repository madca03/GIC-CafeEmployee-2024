using CafeEmployee.Core.Models.DatabaseModels;
using MediatR;

namespace CafeEmployee.Core.Commands;

public class CreateEmployeeCommand : IRequest<Employee>
{
    public string Name { get; set; }
    public string EmailAddress { get; set; }
    public string PhoneNumber { get; set; }
    public string Gender { get; set; }
    public string CafeId { get; set; }
}