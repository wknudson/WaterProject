using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WaterController : ControllerBase
    {
        private WaterDbContext _waterContext;
        public WaterController(WaterDbContext temp) 
        {
            _waterContext = temp;
        }

        [HttpGet ("AllProjects")]
        public IActionResult GetProjects(int pageNumber = 1,int pageSize = 10)
        {
            var something =  _waterContext.Projects.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

            var totalNumProjects = _waterContext.Projects.Count();

            var someObject = new
            {
                TotalNumProjects = totalNumProjects,
                Projects = something
            };

            return Ok(someObject);

        } 

        [HttpGet ("FunctionalProjects")]
        public IEnumerable<Project> GetFunctionalProjects()
        {
            return _waterContext.Projects.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
        }
    }
}
