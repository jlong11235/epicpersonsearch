import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSort, MatTableDataSource, Sort} from "@angular/material";

export interface Person {
  name: string;
  personStatus: string;
  staffType: string;
  arrivalDate: string;
  hrSeparationDate: string;
  component: string;
  hrOnDuty: string;
  hrCategory: string;
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
      name: 'ajohn cha',
      personStatus: 'Active',
      staffType: 'Employee',
      arrivalDate: '10/05/2018',
      hrSeparationDate: '05/11/2019',
      component: 'WHO',
      hrOnDuty: '09/09/2018',
      hrCategory: 'EMP'
    },
    {
      name: 'bRob Richards',
      personStatus: 'Active',
      staffType: 'Intern',
      arrivalDate: '10/05/2018',
      hrSeparationDate: '05/11/2019',
      component: 'WHO',
      hrOnDuty: '09/09/2018',
      hrCategory: 'EMP'
    },
    {
      name: 'cjoshua long',
      personStatus: 'Active',
      staffType: 'WHO Advance Associate',
      arrivalDate: '10/05/2018',
      hrSeparationDate: '05/11/2019',
      component: 'WHO',
      hrOnDuty: '09/09/2018',
      hrCategory: 'EMP'
    },
    {
      name: 'djason vorhees',
      personStatus: 'Active',
      staffType: 'Employee',
      arrivalDate: '10/05/2018',
      hrSeparationDate: '05/11/2019',
      component: 'WHO',
      hrOnDuty: '09/09/2018',
      hrCategory: 'EMP'
    },
    {
      name: 'emike myers',
      personStatus: 'Active',
      staffType: 'Intern',
      arrivalDate: '10/05/2018',
      hrSeparationDate: '05/11/2019',
      component: 'WHO',
      hrOnDuty: '09/09/2018',
      hrCategory: 'EMP'
    },
    {
      name: 'ffreddy kruger',
      personStatus: 'Active',
      staffType: 'WHO Advance Associate',
      arrivalDate: '10/05/2018',
      hrSeparationDate: '05/11/2019',
      component: 'WHO',
      hrOnDuty: '09/09/2018',
      hrCategory: 'EMP'
    },

    {
      name: 'gjohn chaing',
      personStatus: 'Active2',
      staffType: 'Employee',
      arrivalDate: '10/05/2018',
      hrSeparationDate: '05/11/2019',
      component: 'WHO',
      hrOnDuty: '09/09/2018',
      hrCategory: 'EMP'
    },
    {
      name: 'hRob Richardsing',
      personStatus: 'Active2',
      staffType: 'Intern',
      arrivalDate: '10/05/2018',
      hrSeparationDate: '05/11/2019',
      component: 'WHO',
      hrOnDuty: '09/09/2018',
      hrCategory: 'EMP'
    },
    {
      name: 'ijoshua longing',
      personStatus: 'Active2',
      staffType: 'WHO Advance Associate',
      arrivalDate: '10/05/2018',
      hrSeparationDate: '05/11/2019',
      component: 'WHO',
      hrOnDuty: '09/09/2018',
      hrCategory: 'EMP'
    },
    {
      name: 'jjason vorheesing',
      personStatus: 'Active2',
      staffType: 'Employee',
      arrivalDate: '10/05/2018',
      hrSeparationDate: '05/11/2019',
      component: 'WHO',
      hrOnDuty: '09/09/2018',
      hrCategory: 'EMP'
    },
    {
      name: 'kmike myersing',
      personStatus: 'Active2',
      staffType: 'Intern',
      arrivalDate: '10/05/2018',
      hrSeparationDate: '05/11/2019',
      component: 'WHO',
      hrOnDuty: '09/09/2018',
      hrCategory: 'EMP'
    },
    {
      name: 'lfreddy krugering',
      personStatus: 'Active2',
      staffType: 'WHO Advance Associate',
      arrivalDate: '10/05/2018',
      hrSeparationDate: '05/11/2019',
      component: 'WHO',
      hrOnDuty: '09/09/2018',
      hrCategory: 'EMP'
    }

  ];

  searchTerm: string = 'Default';
  dataSource: any;
  //dataSource = new MatTableDataSource<Person>(this.data);

  displayedColumns: string[] = ['name', 'personStatus', 'staffType', 'component', 'arrivalDate', 'hrSeparationDate',
    'hrOnDuty', 'hrCategory'];
  size = 2;
  pageIndex = 1;
  rangeStart = 0;
  rangeEnd = 0;

  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.dataSource = this.data.slice(0, this.size);
    //this.dataSource = new MatTableDataSource<Person>(this.data.slice(0, this.size));
    this.dataSource.sort = this.sort;
    this.rangeStart = 1;
    this.rangeEnd = this.size;
  }

  //CACI-4533
  paginate(event: any) {
    this.pageIndex = event;
    //ranges are used for '1-5 of 12' functionality and to track item ranges during sorting
    this.rangeStart = this.getStartRange(this.pageIndex);
    this.rangeEnd = this.getEndRange(this.pageIndex);

    this.dataSource = this.data.slice(event * this.size - this.size, event * this.size);
    //this.dataSource = new MatTableDataSource<Person>(this.data.slice(event * this.size - this.size, event * this.size));
  }

  getStartRange(pageIndex: any){
    return (pageIndex * this.size - this.size) + 1;
  }

  getEndRange(pageIndex: any){
    let selectorEnd = pageIndex * this.size;
    return (selectorEnd > this.data.length) ? this.data.length : selectorEnd;
  }

  //CACI-4567
  sortData(sort: Sort){
    //get copy of data to save original non sort
    const data = this.data.slice();
    if (!sort.active || sort.direction === ''){
      //set data if sort is set to off
      this.dataSource = this.data.slice(this.getStartRange(this.pageIndex) - 1, this.getEndRange(this.pageIndex));
      return;
    }

    this.dataSource = data.sort((a, b) => {
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
