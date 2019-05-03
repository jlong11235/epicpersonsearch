using CustomPagination.Models;
using Microsoft.EntityFrameworkCore;

namespace CustomPagination.Data
{
    public class DataContext3x : DbContext
    {
        public DataContext3x(DbContextOptions<DataContext> options) : base (options)
        {
            
        }
        
        public DbSet<Person> Persons { get; set; }
    }
}