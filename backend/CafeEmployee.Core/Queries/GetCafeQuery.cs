using CafeEmployee.Core.Models.DatabaseModels;
using MediatR;

namespace CafeEmployee.Core.Queries;

public class GetCafeQuery : IRequest<IReadOnlyList<Cafe>>
{
    public int? Id { get; set; }
    public string Location { get; set; }
}