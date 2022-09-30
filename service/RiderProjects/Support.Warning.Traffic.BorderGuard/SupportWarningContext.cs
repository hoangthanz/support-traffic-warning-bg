using Common.Service.Interfaces;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Support.Warning.Traffic.BorderGuard.Models.Business;
using Support.Warning.Traffic.BorderGuard.Models.Identity;
using Support.Warning.Traffic.BorderGuard.Models.Region;

namespace Support.Warning.Traffic.BorderGuard;

public class SupportWarningContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
{
    public SupportWarningContext(DbContextOptions<SupportWarningContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<wards>().HasKey(x => x.code);
        builder.Entity<provinces>().HasKey(x => x.code);
        builder.Entity<districts>().HasKey(x => x.code);
        foreach (var entityType in builder.Model.GetEntityTypes())
        {
            var tableName = entityType.GetTableName();
            if (tableName != null && tableName.StartsWith("AspNet"))
            {
                entityType.SetTableName(tableName.Substring(6));
            }
        }
    }

    public override DbSet<ApplicationRole> Roles { get; set; }
    public override DbSet<ApplicationUser> Users { get; set; }
    public DbSet<ExportImportType> ExportImportTypes { get; set; }
    public DbSet<VehicleType> VehicleTypes { get; set; }
    public DbSet<Vehicle> Vehicles { get; set; }
    public DbSet<Area> Areas { get; set; }
    public DbSet<Gate> Gates { get; set; }
    public DbSet<Station> Stations { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public DbSet<Level> Levels { get; set; }
    public DbSet<GateLevel> GateLevels { get; set; }

    public DbSet<VehicleDetail> VehicleDetails { get; set; }
    public DbSet<VehicleRegistrationPaper> VehicleRegistrationPapers { get; set; }
    public DbSet<VehicleRegistrationPaperDetail> VehicleRegistrationPaperDetails { get; set; }
    // data of provinces vn

    public DbSet<administrative_regions> administrative_regions { get; set; }
    public DbSet<administrative_units> administrative_units { get; set; }
    public DbSet<districts> districts { get; set; }
    public DbSet<provinces> provinces { get; set; }
    public DbSet<wards> wards { get; set; }

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