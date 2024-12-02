using CafeEmployee.Core.Models.DatabaseModels;
using MediatR;

namespace CafeEmployee.Core.Commands;

public class UpdateCafeCommand : IRequest<Cafe>
{
    public int? Id { get; set; }
    public string? Name { get; set; }
    public string Description { get; set; }
    public string Location { get; set; }
    public string Logo { get; set; }
}