using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Text;
using System.Security.Cryptography;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using ToDo.Models;
using ToDo.DTOs;

namespace ToDo.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly ILogger<UsersController> _logger;

    public UsersController(ILogger<UsersController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    public IActionResult Post([FromBody] DTOs.Login data)
    {
        var db = new ToDoDbContext();

        // Check if username already exists
        var existing = db.User.FirstOrDefault(x => x.UserName == data.UserName);
        if (existing != null) return Conflict("Username already exists");

        // Generate salt + hash
        string salt = Convert.ToBase64String(RandomNumberGenerator.GetBytes(128 / 8));
        string hash = Convert.ToBase64String(
            KeyDerivation.Pbkdf2(
                password: data.Password,
                salt: Convert.FromBase64String(salt),
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8
            )
        );

        var user = new User
        {
            UserName = data.UserName,
            Salt = salt,
            HashPassword = hash
        };

        db.User.Add(user);
        db.SaveChanges();

        return Ok();
    }
}