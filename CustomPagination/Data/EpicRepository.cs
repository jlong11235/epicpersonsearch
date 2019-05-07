using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CustomPagination.Models;
using Microsoft.EntityFrameworkCore;

namespace CustomPagination.Data
{
    public class EpicRepository : IEpicRepository
    {
        private readonly DataContext _context4;
        private readonly DataContext3x _context3x;

        public EpicRepository(DataContext context4, DataContext3x context3x)
        {
            _context4 = context4;
            _context3x = context3x;
        }

        public void Add<T>(T entity) where T : class
        {
            _context4.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context4.Remove(entity);
        }

        public async Task<List<Person>> PersonSearchInEpic4(string searchTerm)
        {
            //might pull from tbl_person_directory and not tbl_person (might not be able to person directory
            //because it might only contain active users
            return await _context4.Persons
                    //.Include(p => p.Component)
                .Join(_context3x.Persons,//.Include(p3 => p3.Component) //load the component info with the person info
                    p4 => p4.EID,
                    p3 => p3.EID,
                    (p4, p3) => new Person()
                    {
                        EID = p4.EID,
                        SSN = p4.SSN,
                        LastName = p4.LastName,
                        FirstName = p4.FirstName,
                        PersonStatus = p3.PersonStatus,
                        StaffType = p3.StaffType,
                        Component = p3.Component,
                        ArrivalDate = p3.ArrivalDate,
                        HRSeparationDate = p3.HRSeparationDate,
                        HRonDuty = p3.HRonDuty,
                        HRCategory = p3.HRCategory
                    })
//                .Where(p => p.LastName.Contains(searchTerm) ||
//                            p.FirstName.Contains(searchTerm) ||
//                            p.EID.Contains(searchTerm) ||
//                            p.SSN.Contains(searchTerm)).ToListAsync();
//                .Where(p => p.DisplayName.Contains(searchTerm) ||
//                            p.EID.Contains(searchTerm) ||
//                            p.SSN.Contains(searchTerm)).ToListAsync();
                .Where(p => (p.FirstName + " " + p.LastName).Contains(searchTerm) ||
                            p.EID.Contains(searchTerm) ||
                            p.SSN.Contains(searchTerm)).ToListAsync();
        }

        //separating out epic 3x and epic 4 searches so the 3x methods can easily be removed after full migration of data
        public async Task<List<Person>> PersonSearchInEpic3(string searchTerm)
        {
            return await _context3x.Persons.Where(p =>
                (p.FirstName + " " + p.LastName).Contains(searchTerm) || p.EID.Contains(searchTerm) ||
                p.SSN.Contains(searchTerm)).ToListAsync();
//            return await _context3x.Persons.Where(p =>
//                p.DisplayName.Contains(searchTerm) || p.EID.Contains(searchTerm) ||
//                p.SSN.Contains(searchTerm)).ToListAsync();
//            return await _context3x.Persons.Where(p =>
//                p.LastName.Contains(searchTerm) || p.FirstName.Contains(searchTerm) || p.EID.Contains(searchTerm) ||
//                p.SSN.Contains(searchTerm)).ToListAsync();
        }

        //since there is a display name field these are no longer needed
        public async Task<List<Person>> ComplexPersonSearchInEpic3(string[] searchTerms)
        {
            List<Person> personResult = new List<Person>();

            if (searchTerms.Length == 2)
            {
                //decided to still check both firstname and lastname to catch things like 'josh long' finds 'joshua long'
                //assume search format firstname lastname
                personResult.AddRange(await _context3x.Persons.Where<Person>(p =>
                    p.FirstName.Contains(searchTerms[0])
                    && p.LastName.Contains(searchTerms[1])).ToListAsync());
            }
            else
            {
//                //group extra terms (ie Marry Ann Johnson)
//                //group with first name
//                string tmpFirst = string.Join(" ", searchTerms.Take(searchTerms.Length - 1));
//                personResult.AddRange(await _context3x.Persons.Where(p =>
//                        p.FirstName.Contains(tmpFirst)
//                        && p.LastName
//                            .Contains(searchTerms[
//                                searchTerms.Length - 1]))
//                    .ToListAsync());
//
//                //group with last name
//                string tmpLast = string.Join(" ", searchTerms.Skip(1));
//                personResult.AddRange(await _context3x.Persons.Where(p =>
//                        p.FirstName.Contains(searchTerms[0])
//                        && p.LastName.Contains(tmpLast))
//                    .ToListAsync());
                
                personResult.AddRange(await PersonSearchInEpic3(string.Join(" ", searchTerms)));
            }

            return personResult.Distinct().ToList();
        }

        public async Task<List<Person>> ComplexPersonSearchInEpic4(string[] searchTerms)
        {
            List<Person> personResult = new List<Person>();

            if (searchTerms.Length == 2)
            {
                //assume search format firstname lastname
                personResult.AddRange(await _context4.Persons
                    .Join(_context3x.Persons,
                        p4 => p4.EID,
                        p3 => p3.EID,
                        (p4, p3) => new Person()
                        {
                            EID = p4.EID,
                            SSN = p4.SSN,
                            LastName = p4.LastName,
                            FirstName = p4.FirstName,
                            PersonStatus = p3.PersonStatus,
                            StaffType = p3.StaffType,
                            Component = p3.Component,
                            ArrivalDate = p3.ArrivalDate,
                            HRSeparationDate = p3.HRSeparationDate,
                            HRonDuty = p3.HRonDuty,
                            HRCategory = p3.HRCategory
                        })
                    .Where<Person>(p => p.FirstName.Contains(searchTerms[0])
                                        && p.LastName.Contains(searchTerms[1])).ToListAsync());
            }
            else
            {
//                //group extra terms (ie Marry Ann Johnson)
//                //group with first name
//                string tmpFirst = string.Join(" ", searchTerms.Take(searchTerms.Length - 1));
//                personResult.AddRange(await _context4.Persons
//                    .Join(_context3x.Persons,
//                        p4 => p4.EID,
//                        p3 => p3.EID,
//                        (p4, p3) => new Person()
//                        {
//                            EID = p4.EID,
//                            SSN = p4.SSN,
//                            LastName = p4.LastName,
//                            FirstName = p4.FirstName,
//                            PersonStatus = p3.PersonStatus,
//                            StaffType = p3.StaffType,
//                            Component = p3.Component,
//                            ArrivalDate = p3.ArrivalDate,
//                            HRSeparationDate = p3.HRSeparationDate,
//                            HRonDuty = p3.HRonDuty,
//                            HRCategory = p3.HRCategory
//                        })
//                    .Where(p => p.FirstName.Contains(tmpFirst)
//                                && p.LastName.Contains(searchTerms[searchTerms.Length - 1]))
//                    .ToListAsync());
//
//                //group with last name
//                string tmpLast = string.Join(" ", searchTerms.Skip(1));
//                personResult.AddRange(await _context4.Persons
//                    .Join(_context3x.Persons,
//                        p4 => p4.EID,
//                        p3 => p3.EID,
//                        (p4, p3) => new Person()
//                        {
//                            EID = p4.EID,
//                            SSN = p4.SSN,
//                            LastName = p4.LastName,
//                            FirstName = p4.FirstName,
//                            PersonStatus = p3.PersonStatus,
//                            StaffType = p3.StaffType,
//                            Component = p3.Component,
//                            ArrivalDate = p3.ArrivalDate,
//                            HRSeparationDate = p3.HRSeparationDate,
//                            HRonDuty = p3.HRonDuty,
//                            HRCategory = p3.HRCategory
//                        })
//                    .Where(p => p.FirstName.Contains(searchTerms[0])
//                                && p.LastName.Contains(tmpLast)).ToListAsync());
                personResult.AddRange(await PersonSearchInEpic4(string.Join(" ", searchTerms)));
            }

            return personResult.Distinct().ToList();
        }
    }
}