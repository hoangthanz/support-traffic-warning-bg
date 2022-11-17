using Microsoft.AspNetCore.Identity;
using Support.Warning.Traffic.BorderGuard.Models.Identity;

namespace Support.Warning.Traffic.BorderGuard.Settings;

public class StartupSetting
{
    public static void CreateAdminRoles(IServiceProvider serviceProvider, SupportWarningContext context)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
        var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

        Task<bool> hasAdminRole = roleManager.RoleExistsAsync(DefaultApplication.Administrator.Name);
        hasAdminRole.Wait();

        if (!hasAdminRole.Result)
        {
            Task<IdentityResult> roleResult = roleManager.CreateAsync(DefaultApplication.Administrator);
            roleResult.Wait();
        }

        Task<ApplicationUser> userExists = userManager.FindByNameAsync(DefaultApplication.Administrator.Name);
        userExists.Wait();
        if (userExists.Result == null)
        {
            ApplicationUser administrator = new ApplicationUser
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = DefaultApplication.Administrator.Name,
                DisplayName = DefaultApplication.Administrator.Name,
                IsActive = true,
            };

            Task<IdentityResult> newUser = userManager.CreateAsync(administrator, DefaultApplication.AdminPass);
            newUser.Wait();

            if (newUser.Result.Succeeded)
            {
                Task<IdentityResult> newUserRole = userManager.AddToRoleAsync(administrator, DefaultApplication.Administrator.Name);
                newUserRole.Wait();
            }
        }
    }
}