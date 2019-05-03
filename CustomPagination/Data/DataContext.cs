using CustomPagination.Models;
using Microsoft.EntityFrameworkCore;

namespace CustomPagination.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options)
        {
            
        }
        
        public DbSet<Person> Persons { get; set; }
    }
}