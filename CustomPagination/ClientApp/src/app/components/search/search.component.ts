import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSort, MatTableDataSource, Sort} from "@angular/material";
import {BasicSearchService} from "../../services/basic-search.service";

export interface Person {
  eid: string,
  name: string;
  personStatus: string;
  staffType: string;
  arrivalDate: string;
  hrSeparationDate: string;
  component: string;
  hrOnDuty: string;
  hrCategory: string;
  ssn: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  data: Person[] = [
    {
      eid: '',
      name: 'kjohn cha',
      personStatus: 'Active',
      staffType: 'Employee',
      arrivalDate: '10/05/2018',
      hrSeparationDate: '06/16/2019',
      component: 'VP-Res',
      hrOnDuty: '09/10/2018',
      hrCategory: 'Intern',
      ssn: ''
    },
    {
      eid: '',
      name: 'sRob Richards',
      personStatus: 'Active',
      staffType: 'Intern',
      arrivalDate: '10/25/2018',
      hrSeparationDate: '09/11/2019',
      component: 'WHO',
      hrOnDuty: '09/19/2018',
      hrCategory: 'EMP',
      ssn: ''
    },
    {
      eid: '',
      name: 'cdjoshua long',
      personStatus: 'Active',
      staffType: 'WHO Advance Associate',
      arrivalDate: '12/05/2018',
      hrSeparationDate: '05/11/2019',
      component: 'USTR',
      hrOnDuty: '09/09/2018',
      hrCategory: '',
      ssn: ''
    },
    {
      eid: '',
      name: 'djason vorhees',
      personStatus: 'Active',
      staffType: 'Employee',
      arrivalDate: '06/05/2018',
      hrSeparationDate: '',
      component: 'WHO',
      hrOnDuty: '',
      hrCategory: 'EMP',
      ssn: ''
    },
    {
      eid: '',
      name: 'emike myers',
      personStatus: 'Active',
      staffType: 'Intern',
      arrivalDate: '11/21/2018',
      hrSeparationDate: '05/21/2019',
      component: 'WHO',
      hrOnDuty: '10/09/2018',
      hrCategory: '',
      ssn: ''
    },
    {
      eid: '',
      name: 'ffreddy kruger',
      personStatus: 'Active',
      staffType: 'WHO Advance Associate',
      arrivalDate: '10/05/2018',
      hrSeparationDate: '05/11/2019',
      component: 'VP-Res',
      hrOnDuty: '09/09/2018',
      hrCategory: 'OGE',
      ssn: ''
    },
    {
      eid: '',
      name: 'gjohn chaing',
      personStatus: 'Active2',
      staffType: 'Employee',
      arrivalDate: '02/05/2018',
      hrSeparationDate: '',
      component: 'OVP',
      hrOnDuty: '09/29/2018',
      hrCategory: 'EMP',
      ssn: ''
    },
    {
      eid: '',
      name: 'hRob Richardsing',
      personStatus: 'Active2',
      staffType: 'Intern',
      arrivalDate: '11/25/2018',
      hrSeparationDate: '05/11/2019',
      component: 'WHO',
      hrOnDuty: '09/09/2018',
      hrCategory: 'EMP',
      ssn: ''
    },
    {
      eid: '',
      name: 'ijoshua longing',
      personStatus: 'Active2',
      staffType: 'WHO Advance Associate',
      arrivalDate: '12/13/2018',
      hrSeparationDate: '05/11/2019',
      component: 'OA',
      hrOnDuty: '09/09/2018',
      hrCategory: '',
      ssn: ''
    },
    {
      eid: '',
      name: 'jjason vorheesing',
      personStatus: 'Active2',
      staffType: 'Employee',
      arrivalDate: '10/05/2018',
      hrSeparationDate: '05/15/2019',
      component: 'WHO',
      hrOnDuty: '10/09/2018',
      hrCategory: 'OGE',
      ssn: ''
    },
    {
      eid: '',
      name: 'kmike myersing',
      personStatus: 'Active2',
      staffType: 'Intern',
      arrivalDate: '03/07/2018',
      hrSeparationDate: '',
      component: 'OA',
      hrOnDuty: '09/09/2018',
      hrCategory: 'EMP',
      ssn: ''
    },
    {
      eid: '',
      name: 'lfreddy krugering',
      personStatus: 'Active2',
      staffType: 'WHO Advance Associate',
      arrivalDate: '10/09/2018',
      hrSeparationDate: '03/11/2019',
      component: 'OVP',
      hrOnDuty: '',
      hrCategory: 'Intern',
      ssn: ''
    }

  ];

  searchTerm: string;
  dataSource: any;
  sortedData: any;

  //this link may have an entry in the environments file TODO update link location once i have access
  epic3xLink: string = 'https://epic-uat.apps.eop.gov/employee.aspx?employeeID=';
  //dataSource = new MatTableDataSource<Person>(this.data);

  //define the table and pagination options
  displayedColumns: string[] = ['name', 'personStatus', 'staffType', 'component', 'arrivalDate', 'hrSeparationDate',
    'hrOnDuty', 'hrCategory'];
  size = 5;
  pageIndex = 1;
  rangeStart = 0;
  rangeEnd = 0;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private searchService: BasicSearchService) { }

  ngOnInit() {
    //sets data from search
    //this.data = this.searchService.searchResults;
    this.searchTerm = this.searchService.searchTerm;
    this.sortedData = this.data.slice();
    this.dataSource = this.sortedData.slice(0, this.size);
    //this.dataSource = new MatTableDataSource<Person>(this.data.slice(0, this.size));
    this.dataSource.sort = this.sort;
    this.rangeStart = 1;
    this.rangeEnd = this.size;
  }

  //CACI-4533
  paginate(event: any) {
    this.pageIndex = event;
    //ranges are used for '1-5 of 12' display functionality and to track item ranges during sorting
    this.rangeStart = this.getStartRange(this.pageIndex);
    this.rangeEnd = this.getEndRange(this.pageIndex);

    this.dataSource = this.sortedData.slice(event * this.size - this.size, event * this.size);
    //this.dataSource = new MatTableDataSource<Person>(this.data.slice(event * this.size - this.size, event * this.size));
  }

  getStartRange(pageIndex: any){
    return (pageIndex * this.size - this.size) + 1;
  }

  getEndRange(pageIndex: any){
    let selectorEnd = pageIndex * this.size;
    return (selectorEnd > this.sortedData.length) ? this.sortedData.length : selectorEnd;
  }

  //CACI-4567
  sortData(sort: Sort){
    //get copy of data to save original non sort order for when sort is turned off
    const data = this.sortedData;
    if (!sort.active || sort.direction === ''){
      //set data if sort is set to off
      this.sortedData = this.data.slice();
      this.dataSource = this.sortedData.slice(this.getStartRange(this.pageIndex) - 1, this.getEndRange(this.pageIndex));
      return;
    }

    this.dataSource = this.sortedData.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active){
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'personStatus': return this.compare(a.personStatus, b.personStatus, isAsc);
        case 'staffType' : return this.compare(a.staffType, b.staffType, isAsc);
        case 'component' : return this.compare(a.component, b.component, isAsc);
        case 'arrivalDate' : return this.compare(a.arrivalDate, b.arrivalDate, isAsc);
        case 'hrSeparationDate' : return this.compare(a.hrSeparationDate, b.hrSeparationDate, isAsc);
        case 'hrOnDuty' : return this.compare(a.hrOnDuty, b.hrOnDuty, isAsc);
        case 'hrCategory' : return this.compare(a.hrCategory, b.hrCategory, isAsc);
        default: return 0;
      }
    }).slice(this.getStartRange(this.pageIndex) - 1, this.getEndRange(this.pageIndex));
  }

  compare(a: number | string, b: number | string, isAsc: boolean){
    return (a < b ? -1 : 1) * (isAsc? 1 : -1);
  }

}
