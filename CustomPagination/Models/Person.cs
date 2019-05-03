using System;

namespace CustomPagination.Models
{
    public class Person
    {
        public string EID { get; set; }
        public string SSN { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PersonStatus { get; set; }
        public string StaffType { get; set; }
        public string Component { get; set; }
        public DateTime ArrivalDate { get; set; }
        public DateTime HRSeparationDate { get; set; }
        public string HRonDuty { get; set; }
        public string HRCategory { get; set; }
    }
}