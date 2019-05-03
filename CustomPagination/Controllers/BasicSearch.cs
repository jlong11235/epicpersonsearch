using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CustomPagination.Data;
using CustomPagination.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;

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

        [HttpGet("/api/basicsearch/{searchTerm}")]
        public async Task<IActionResult> SimpleSearch(string searchTerm)
        {
            if (searchTerm.Length == 0) return Ok();

            List<Person> searchResult = new List<Person>();

            string[] searchArray = searchTerm.Trim().Split(' ');
            if (searchArray.Length > 1)
            {
                //multiple search terms
                searchResult = await ComplexPersonSearch(searchArray);
                return Ok(searchResult);
            }

            //searchResult = await _repo.DoSearch(searchTerm);
            searchResult = await SimplePersonSearch(searchTerm);
            return Ok(searchResult);
        }

        private async Task<List<Person>> SimplePersonSearch(string searchTerm)
        {
            List<Person> personResults = new List<Person>();

            personResults.AddRange(await SearchAllBasicFields(searchTerm));

            return personResults;
        }

        private async Task<List<Person>> SearchAllBasicFields(string searchTerm)
        {
            List<Person> personResults = new List<Person>();
            personResults.AddRange(await _repo.PersonSearchInEpic4(searchTerm));
            personResults.AddRange(await _repo.PersonSearchInEpic3(searchTerm));
            return personResults.Distinct().ToList();
        }

        private async Task<List<Person>> ComplexPersonSearch(string[] searchTerms)
        {
            List<Person> personResults = new List<Person>();

            //search first last (note: assumes no name field only firstname and lastname fields)
            personResults.AddRange(await _repo.ComplexPersonSearchInEpic4(searchTerms));
            personResults.AddRange(await _repo.ComplexPersonSearchInEpic3(searchTerms));

            //search names that might include space (ie Mary Ann, etc)
            personResults.AddRange(await _repo.PersonSearchInEpic4(string.Join(" ", searchTerms)));
            personResults.AddRange(await _repo.PersonSearchInEpic3(string.Join(" ", searchTerms)));

            return personResults.Distinct().ToList();
        }
    }
}