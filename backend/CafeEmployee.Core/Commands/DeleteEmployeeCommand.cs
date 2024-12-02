using MediatR;

namespace CafeEmployee.Core.Commands;

public class DeleteEmployeeCommand : IRequest<bool>
{
    public string Id { get; set; }
}