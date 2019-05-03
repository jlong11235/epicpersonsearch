using System.Collections.Generic;
using System.Threading.Tasks;
using CustomPagination.Models;

namespace CustomPagination.Data
{
    public interface IEpicRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;

        Task<List<Person>> PersonSearchInEpic4(string searchTerm);
        Task<List<Person>> PersonSearchInEpic3(string searchTerm);
        Task<List<Person>> ComplexPersonSearchInEpic3(string[] searchTerms);
        Task<List<Person>> ComplexPersonSearchInEpic4(string[] searchTerms);
    }
}