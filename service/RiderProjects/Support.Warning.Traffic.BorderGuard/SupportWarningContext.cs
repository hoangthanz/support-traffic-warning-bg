using Common.Service.Interfaces;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Support.Warning.Traffic.BorderGuard.Models.Business;
using Support.Warning.Traffic.BorderGuard.Models.Identity;

namespace Support.Warning.Traffic.BorderGuard;

public class SupportWarningContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
{
    public SupportWarningContext(DbContextOptions<SupportWarningContext> options) : base(options)
    {
    }

    public override DbSet<ApplicationRole> Roles { get; set; }
    public override DbSet<ApplicationUser> Users { get; set; }
    public DbSet<ExportImportType> ExportImportTypes { get; set; }
    public DbSet<VehicleType> VehicleTypes { get; set; }
    public DbSet<Vehicle> Vehicles { get; set; }
    public DbSet<Area> Areas { get; set; }
    public DbSet<Gate> Gates { get; set; }
    public DbSet<Station> Stations { get; set; }

    public override int SaveChanges()
    {
        var modified = ChangeTracker.Entries().Where(e => e.State is EntityState.Modified or EntityState.Added);
        foreach (var item in modified)
        {
            if (item.Entity is IDateTracking changedOrAddedItem)
            {
                if (item.State == EntityState.Added)
                {
                    changedOrAddedItem.CreatedDate = changedOrAddedItem.UpdatedDate = DateTime.Now;
                }
                else
                {
                    changedOrAddedItem.UpdatedDate = DateTime.Now;
                }
            }

            if (item is { Entity: ICheckTracking itemCheck, State: EntityState.Added })
            {
                itemCheck.IsDeleted = false;
            }
        }

        return base.SaveChanges();
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var modified = ChangeTracker.Entries().Where(e => e.State is EntityState.Modified or EntityState.Added);
        foreach (var item in modified)
        {
            if (item.Entity is IDateTracking changedOrAddedItem)
            {
                if (item.State == EntityState.Added)
                {
                    changedOrAddedItem.CreatedDate = changedOrAddedItem.UpdatedDate = DateTime.Now;
                }
                else
                {
                    changedOrAddedItem.UpdatedDate = DateTime.Now;
                }
            }

            if (item is { Entity: ICheckTracking itemCheck, State: EntityState.Added })
            {
                itemCheck.IsDeleted = false;
            }
        }

        return await base.SaveChangesAsync(cancellationToken);
    }
}