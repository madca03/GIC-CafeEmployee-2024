using Microsoft.EntityFrameworkCore;

namespace CafeEmployee.Repository.Context;

public class AppSlaveDBContext : AppMasterDBContext
{
    public AppSlaveDBContext(DbContextOptions<AppSlaveDBContext> options) : base(options)
    {
        ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
    }
}