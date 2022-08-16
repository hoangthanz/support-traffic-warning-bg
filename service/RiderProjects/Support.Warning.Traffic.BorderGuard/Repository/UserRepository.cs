using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.Models.Identity;
using Support.Warning.Traffic.BorderGuard.ViewModels.Account;

namespace Support.Warning.Traffic.BorderGuard.Repository;

public class UserRepository: IUserRepository, IDisposable
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<ApplicationRole> _roleManager;
    private readonly  SupportWarningContext _context;
    private readonly string _userId;
    private readonly IMapper _mapper;
    private readonly IConfiguration _configuration;

    public UserRepository(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager, SupportWarningContext context, IMapper mapper, IConfiguration configuration)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _context = context;
        _mapper = mapper;
        _configuration = configuration;
    }


    public async Task<RespondLoginModel> Login(RequestLoginModel model, string ipAddress)
    {
        var user = await _userManager.FindByNameAsync(model.Username);
        if (null == user)
            return new RespondLoginModel
            {
                Token = null,
                Expiration = DateTime.Now,
            };
        var resultLogin = await _userManager.CheckPasswordAsync(user, model.Password);
        if (!resultLogin)
            return new RespondLoginModel
            {
                Token = null,
                Expiration = DateTime.Now,
            };
        var roles = await _userManager.GetRolesAsync(user);
        var token = await GenerateTokenJwtByUser(user);
        var claims = new List<string>();
        var userRoles = await _userManager.GetRolesAsync(user);
        foreach (var role in userRoles)
        {
            var roleData = await _roleManager.FindByNameAsync(role);
            var roleClaims = await _roleManager.GetClaimsAsync(roleData);
            claims.Add(roleData.Name);
            claims.AddRange(roleClaims.Select(claim => claim.Value));
        }
                
        return new RespondLoginModel
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            Expiration = token.ValidTo,
            ListClaims = claims
        };

    }
    
    
    
    private async Task<JwtSecurityToken> GenerateTokenJwtByUser(ApplicationUser user)
    {
        var authClaims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(ClaimTypes.Name, user.UserName),
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
        };

        var userRoles = await _userManager.GetRolesAsync(user);
        foreach (var role in userRoles)
        {
            var roleData = await _roleManager.FindByNameAsync(role);
        }
        authClaims.Add(new Claim(ClaimTypes.Role, "manyRole"));

        var index = 0;
        for (; index < userRoles.Count; index++)
        {
            var userRole = userRoles[index];
            authClaims.Add(new Claim(ClaimTypes.Role, userRole));
        }

        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is the secret phrase"));

        var token = new JwtSecurityToken(
            issuer: _configuration["JWT:ValidIssuer"],
            audience: _configuration["JWT:ValidAudience"],
            expires: DateTime.Now.AddHours(24),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

        return token;
    }

    

    public void Dispose()
    {
        _context.Dispose();
        GC.Collect(2, GCCollectionMode.Forced, true);
        GC.WaitForPendingFinalizers();
        GC.SuppressFinalize(this);
    }
}