using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Common.Service.Models.Respond;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Support.Warning.Traffic.BorderGuard.Contracts;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.Models.Identity;
using Support.Warning.Traffic.BorderGuard.ViewModels.Account;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Permissions;

namespace Support.Warning.Traffic.BorderGuard.Repository;

public class UserRepository : RepositoryBase<ApplicationUser>, IUserRepository, IDisposable
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<ApplicationRole> _roleManager;
    private readonly SupportWarningContext _context;
    private readonly string _userId;
    private readonly IMapper _mapper;
    private readonly IConfiguration _configuration;

    public UserRepository(UserManager<ApplicationUser> userManager,
        RoleManager<ApplicationRole> roleManager,
        SupportWarningContext context,
        IMapper mapper,
        IConfiguration configuration) : base(context)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _context = context;
        _mapper = mapper;
        _configuration = configuration;
    }

    public async Task<RespondLoginModel> Login(RequestLoginModel model)
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

    public async Task<RespondApi<ApplicationUser>> Register(RegisterModel model)
    {
        try
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (null != user)
            {
                return new RespondApi<ApplicationUser>()
                {
                    Result = ResultRespond.Failed,
                    Message = "Tài khoản trùng tên",
                    Data = null,
                    Code = "00"
                };
            }

            var newUser = new ApplicationUser
            {
                UserName = model.UserName,
                PhoneNumber = model.Phone,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now,
                Status = true,
                IsDeleted = false,
                IsActive = true,
            };

            var result = await _userManager.CreateAsync(newUser, model.Password);
            if (!result.Succeeded)
            {
                string errors = "";
                foreach (var error in result.Errors)
                {
                    if (error.Code == "PasswordRequiresNonAlphanumeric")
                    {
                        errors += "Mật khẩu phải có ký tự đặc biệt, ";
                    }

                    if (error.Code == "PasswordRequiresDigit")
                    {
                        errors += "Mật khẩu phải có ký tự số, ";
                    }

                    if (error.Code == "PasswordRequiresUpper")
                    {
                        errors += "Mật khẩu phải có ký tự in hoa";
                    }
                }

                return new RespondApi<ApplicationUser>()
                {
                    Result = ResultRespond.Failed,
                    Message = $"{errors}",
                    Data = null,
                    Code = "00"
                };
            }

            var userDb = await _userManager.FindByNameAsync(model.UserName);

            return new RespondApi<ApplicationUser>()
            {
                Result = ResultRespond.Succeeded,
                Message = "Tạo tài khoản thành công",
                Data = userDb,
                Code = "00"
            };
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task<RespondApi<List<UserViewModel>>> GetUserOfGate(int gateId)
    {
        try
        {
            var user = await _context.Users
                .Where(x => x.GateId == gateId)
                .ToListAsync();

            var userView = _mapper.Map<List<UserViewModel>>(user);

            foreach (var u in userView)
            {
                u.RoleName = 
            }
            
            
            return new RespondApi<List<UserViewModel>>()
            {
                Code = "00",
                Data = user,
                Message = "Lấy danh sách người dùng thành công",
                Result = ResultRespond.Succeeded
            };
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task<RespondApi<List<IdentityUserClaim<int>>>> GetUserClaims(int userId)
    {
        try
        {
            var user = await _context.UserClaims
                .Where(x => x.UserId == userId)
                .ToListAsync();

            return new RespondApi<List<IdentityUserClaim<int>>>()
            {
                Code = "00",
                Data = user,
                Message = "Lấy danh sách người dùng thành công",
                Result = ResultRespond.Succeeded
            };
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task<RespondApi<List<IdentityUserClaim<int>>>> SetUserClaims(SetClaimUser claimUser)
    {
        try
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == claimUser.UserId);
            if (null == user)
                return new RespondApi<List<IdentityUserClaim<int>>>()
                {
                    Code = "00",
                    Data = null,
                    Message = "Không tìm thấy người dùng",
                    Result = ResultRespond.Failed
                };

            var claims = await _userManager.GetClaimsAsync(user);
            await _userManager.RemoveClaimsAsync(user, claims);
            foreach (var claim in claimUser.Claims)
            {
                await _userManager.AddClaimsAsync(user,
                    claimUser.Claims.Select(x => new Claim(ClaimTypes.Authentication, claim)));
            }

            return new RespondApi<List<IdentityUserClaim<int>>>()
            {
                Code = "00",
                Data = null,
                Message = "Cập nhật quyền người dùng thành công",
                Result = ResultRespond.Succeeded
            };
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
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

        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("hoangthanz123456"));

        var token = new JwtSecurityToken(
            issuer: "thanhoangz",
            audience: "thanhoangz",
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