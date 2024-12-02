namespace CafeEmployee.Core.Models.ResultModels;

public class CafeResultModel
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int Employees { get; set; }
    public byte[] Logo { get; set; }
    public string Location { get; set; }
}