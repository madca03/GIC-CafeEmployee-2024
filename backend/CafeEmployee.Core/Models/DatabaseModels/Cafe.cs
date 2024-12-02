namespace CafeEmployee.Core.Models.DatabaseModels;

public partial class Cafe
{
    public int Id { get; set; }

    public string CafeStringId { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string? Logo { get; set; }
    public string? LogoFileName { get; set; }

    public byte[]? LogoFileData { get; set; }
    public string Location { get; set; } = null!;
}
