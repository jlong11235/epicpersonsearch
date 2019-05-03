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
        private readonly DataContext _context3x;

        public EpicRepository(DataContext context4, DataContext context3x)
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
            return await _context4.Persons
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
                .Where(p => p.LastName.Contains(searchTerm) || p.FirstName.Contains(searchTerm) ||
                            p.EID.Contains(searchTerm) ||
                            p.SSN.Contains(searchTerm)).ToListAsync();
        }

        //separating out epic 3x and epic 4 searches so the 3x methods can easily be removed after full migration of data
        public async Task<List<Person>> PersonSearchInEpic3(string searchTerm)
        {
            return await _context3x.Persons.Where(p =>
                p.LastName.Contains(searchTerm) || p.FirstName.Contains(searchTerm) || p.EID.Contains(searchTerm) ||
                p.SSN.Contains(searchTerm)).ToListAsync();
        }

        public async Task<List<Person>> ComplexPersonSearchInEpic3(string[] searchTerms)
        {
            List<Person> personResult = new List<Person>();

            if (searchTerms.Length == 2)
            {
                //assume search format firstname lastname
                personResult.AddRange(await _context3x.Persons.Where<Person>(p =>
                    p.FirstName.ToLower().Contains(searchTerms[0])
                    && p.LastName.ToLower().Contains(searchTerms[1])).ToListAsync());
            }
            else
            {
                //group extra terms (ie Marry Ann Johnson)
                //group with first name
                string tmpFirst = string.Join(" ", searchTerms.Take(searchTerms.Length - 1));
                personResult.AddRange(await _context3x.Persons.Where(p => p.FirstName.ToLower().Contains(tmpFirst)
                                                                          && p.LastName.ToLower()
                                                                              .Contains(searchTerms[
                                                                                  searchTerms.Length - 1]))
                    .ToListAsync());

                //group with last name
                string tmpLast = string.Join(" ", searchTerms.Skip(1));
                personResult.AddRange(await _context3x.Persons.Where(p => p.FirstName.ToLower().Contains(searchTerms[0])
                                                                          && p.LastName.ToLower().Contains(tmpLast))
                    .ToListAsync());
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
                    .Where<Person>(p => p.FirstName.ToLower().Contains(searchTerms[0])
                                        && p.LastName.ToLower().Contains(searchTerms[1])).ToListAsync());
            }
            else
            {
                //group extra terms (ie Marry Ann Johnson)
                //group with first name
                string tmpFirst = string.Join(" ", searchTerms.Take(searchTerms.Length - 1));
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
                    .Where(p => p.FirstName.ToLower().Contains(tmpFirst)
                                && p.LastName.ToLower().Contains(searchTerms[searchTerms.Length - 1])).ToListAsync());

                //group with last name
                string tmpLast = string.Join(" ", searchTerms.Skip(1));
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
                    .Where(p => p.FirstName.ToLower().Contains(searchTerms[0])
                                && p.LastName.ToLower().Contains(tmpLast)).ToListAsync());
            }

            return personResult.Distinct().ToList();
        }
    }
}