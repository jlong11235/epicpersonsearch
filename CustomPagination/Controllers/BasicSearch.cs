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

            // not needed because there is a display name field so search against
            // decided to still search by firstname and lastname instead of the just displayname to catch 
            //searches like 'josh long' will find 'joshua long', it makes the search a little more robust
            string[] searchArray = searchTerm.Trim().Split(' ');
            if (searchArray.Length > 1)
            {
                //multiple search terms
                searchResult = await ComplexPersonSearch(searchArray);
                return Ok(searchResult);
            }

            //searchResult = await _repo.DoSearch(searchTerm);
            searchResult = await SearchAllBasicFields(searchTerm);
//            searchResult = await SimplePersonSearch(searchTerm);
            return Ok(searchResult);
        }

        //since join code was moved to repository this method became redundant. 
//        private async Task<List<Person>> SimplePersonSearch(string searchTerm)
//        {
//            List<Person> personResults = new List<Person>();
//
//            personResults.AddRange(await SearchAllBasicFields(searchTerm));
//
//            return personResults;
//        }

        private async Task<List<Person>> SearchAllBasicFields(string searchTerm)
        {
            List<Person> personResults = new List<Person>();
            personResults.AddRange(await _repo.PersonSearchInEpic4(searchTerm));
            personResults.AddRange(await _repo.PersonSearchInEpic3(searchTerm));
            return personResults.Distinct().ToList();
        }

        //no longer needed because there is a display name field to search against
        // decided to still search by firstname and lastname instead of the just displayname to catch 
        //searches like 'josh long' will find 'joshua long', it makes the search a little more robust
        private async Task<List<Person>> ComplexPersonSearch(string[] searchTerms)
        {
            List<Person> personResults = new List<Person>();

            //search first last
            personResults.AddRange(await _repo.ComplexPersonSearchInEpic4(searchTerms));
            personResults.AddRange(await _repo.ComplexPersonSearchInEpic3(searchTerms));

            //search names that might include space (ie Mary Ann, etc)
            personResults.AddRange(await _repo.PersonSearchInEpic4(string.Join(" ", searchTerms)));
            personResults.AddRange(await _repo.PersonSearchInEpic3(string.Join(" ", searchTerms)));

            return personResults.Distinct().ToList();
        }
    }
}