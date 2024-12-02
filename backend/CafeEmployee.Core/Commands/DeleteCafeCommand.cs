using MediatR;

namespace CafeEmployee.Core.Commands;

public class DeleteCafeCommand : IRequest<bool>
{
    public int? Id { get; set; }
}