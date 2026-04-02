using Microsoft.AspNetCore.Mvc;
using ToDo.Models;
using ToDo.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace ToDo.Controllers;

[ApiController]
[Route("[controller]")]
public class ActivitiesController : ControllerBase
{
    private readonly ILogger<ActivitiesController> _logger;

    public ActivitiesController(ILogger<ActivitiesController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    [Authorize(Roles = "user")]
    public IActionResult Post([FromBody] DTOs.Activity data)
    {
        var db = new ToDoDbContext();

        var a = new Models.Activity();
        a.UserId = Convert.ToUInt32(User.Identity.Name);
        a.Name = data.Name;
        a.When = data.When;
        db.Activity.Add(a);
        db.SaveChanges();

        return Ok(new {id=a.Id});
    }

    [HttpGet]
    [Authorize(Roles = "user")]
    public IActionResult Get()
    {
        var db = new ToDoDbContext();

        var activities = from x in db.Activity
            where x.UserId == Convert.ToUInt32(User.Identity.Name)
            orderby x.When
            select new
            {
                id = x.Id,
                name = x.Name,
                when = x.When
            };

        if (!activities.Any()) return NoContent();

        return Ok(activities);
    }

    [HttpGet]
    [Route("{id}")]
    [Authorize(Roles = "user")]
    public IActionResult Get(uint id)
    {
        var db = new ToDoDbContext();

        var activity = (from x in db.Activity
            where x.UserId == Convert.ToUInt32(User.Identity.Name) && x.Id == id
            select new
            {
                name = x.Name,
                when = x.When
            }).FirstOrDefault();

        if (activity == null) return NotFound();

        return Ok(activity);
    }

    [HttpPut]
    [Route("{id}")]
    [Authorize(Roles = "user")]
    public IActionResult Put(uint id, [FromBody] DTOs.Activity data)
    {
        var db = new ToDoDbContext();

        var activity = (from x in db.Activity
            where x.UserId == Convert.ToUInt32(User.Identity.Name) && x.Id == id
            select x
        ).FirstOrDefault();

        if (activity == null) return NotFound();

        activity.Name = data.Name;
        activity.When = data.When;

        db.SaveChanges();

        return Ok();
    }

    [HttpDelete]
    [Route("{id}")]
    [Authorize(Roles = "user")]
    public IActionResult Delete(uint id)
    {
        var db = new ToDoDbContext();

        var activity = (from x in db.Activity
            where x.UserId == Convert.ToUInt32(User.Identity.Name) && x.Id == id
            select x
        ).FirstOrDefault();

        if (activity == null) return NotFound();

        db.Activity.Remove(activity);
        db.SaveChanges();
        
        return Ok();
    }
}