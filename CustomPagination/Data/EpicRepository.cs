using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CustomPagination.Models;
using Microsoft.EntityFrameworkCore;

namespace CustomPagination.Data
{
    public class EpicRepository : IEpicRepository
    {
        private readonly DataContext _context;

        public EpicRepository(DataContext context)
        {
            _context = context;
        }
        
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<List<Person>> DoSearch(string searchTerm)
        {
            //this just handles the simple one term search
            return await _context.Persons.Where(p =>
                p.LastName.Contains(searchTerm) || p.FirstName.Contains(searchTerm) || p.EID.Contains(searchTerm) ||
                p.SSN.Contains(searchTerm)).ToListAsync();
        }
    }
}