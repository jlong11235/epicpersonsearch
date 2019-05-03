using System.Collections.Generic;
using System.Threading.Tasks;
using CustomPagination.Models;

namespace CustomPagination.Data
{
    public interface IEpicRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;

        Task<List<Person>> DoSearch(string searchTerm);
    }
}