using MediatR;

namespace CafeEmployee.Core.Commands;

public class DeleteCafeCommand : IRequest<bool>
{
    public string Id { get; set; }
}