using CafeEmployee.Core.Models.DatabaseModels;
using Microsoft.EntityFrameworkCore;

namespace CafeEmployee.Repository.Context;

public partial class AppMasterDBContext : DbContext
{
    public AppMasterDBContext(DbContextOptions<AppMasterDBContext> options) : base(options) { }
    
    protected AppMasterDBContext(DbContextOptions options) : base(options) { }

    public virtual DbSet<Cafe> Cafe { get; set; }
    public virtual DbSet<Employee> Employee { get; set; }
    public virtual DbSet<Core.Models.DatabaseModels.CafeEmployee> CafeEmployee { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cafe>(entity =>
        {
            entity.HasIndex(e => e.Location, "IX_Cafe_Location");

            entity.HasIndex(e => e.CafeStringId, "UQ_Cafe_CafeId").IsUnique();

            entity.Property(e => e.CafeStringId).HasMaxLength(50);
            entity.Property(e => e.Description).HasMaxLength(256);
            entity.Property(e => e.Location).HasMaxLength(100);
            entity.Property(e => e.Logo).HasMaxLength(500);
            entity.Property(e => e.LogoFileName).HasMaxLength(100);
            entity.Property(e => e.Name).HasMaxLength(10);
        });

        modelBuilder.Entity<Core.Models.DatabaseModels.CafeEmployee>(entity =>
        {
            entity.HasIndex(e => e.EmployeeId, "UQ_CafeEmployee_EmployeeId").IsUnique();
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasIndex(e => e.EmployeeStringId, "UQ_Employee_EmployeeId").IsUnique();

            entity.Property(e => e.EmailAddress).HasMaxLength(50);
            entity.Property(e => e.EmployeeStringId).HasMaxLength(50);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.PhoneNumber).HasMaxLength(8);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
