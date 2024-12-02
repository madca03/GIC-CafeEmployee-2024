using CafeEmployee.Core.Models.DatabaseModels;
using MediatR;

namespace CafeEmployee.Core.Commands;

public class CreateCafeCommand : IRequest<Cafe>
{
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Location { get; set; } = null!;
    public string LogoFileName { get; set; }
    public byte[] LogoFileData { get; set; }
}