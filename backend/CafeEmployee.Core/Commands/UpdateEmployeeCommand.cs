using CafeEmployee.Core.Models.DatabaseModels;
using MediatR;

namespace CafeEmployee.Core.Commands;

public class UpdateEmployeeCommand : IRequest<Employee>
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string EmailAddress { get; set; }
    public string PhoneNumber { get; set; }
    public string Gender { get; set; }
    public string CafeId { get; set; }
}