using System.Threading.Tasks;
using CustomPagination.Data;
using Microsoft.AspNetCore.Mvc;

namespace CustomPagination.Controllers
{
    [Route("api/[controller]")]
    public class BasicSearch : Controller
    {
        private readonly IEpicRepository _repo;
        public BasicSearch(IEpicRepository repo)
        {
            _repo = repo;
        }

        public async Task<IActionResult> SimpleSearch(string searchTerm)
        {
            var searchResult = await _repo.DoSearch(searchTerm);
            return Ok(searchResult);
        }
    }
}