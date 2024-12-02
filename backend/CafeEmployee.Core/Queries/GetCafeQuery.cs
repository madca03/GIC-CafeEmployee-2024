using CafeEmployee.Core.Models.ResultModels;
using MediatR;

namespace CafeEmployee.Core.Queries;

public class GetCafeQuery : IRequest<IReadOnlyList<CafeResultModel>>
{
    public string Id { get; set; }
    public string Location { get; set; }
}