import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Person} from "../components/search/search.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BasicSearchService {

  searchResults: Person[];

  constructor(private http: HttpClient) { }

  doSearch(searchTerm: string): Observable<Person[]>{

    // const params = new HttpParams()
    //   .set('searchTerm', searchTerm);
    //
    // this.searchResults = this.http.get<Person[]>('api/basicsearch', {params: params, responseType: 'text'}).pipe(
    //   map((response: any) => {
    //     if( response != ''){
    //       this.searchResults = response;
    //     }
    //   })
    // );

    return this.http.get<Person[]>('api/basicsearch/' + searchTerm);
  }
}
