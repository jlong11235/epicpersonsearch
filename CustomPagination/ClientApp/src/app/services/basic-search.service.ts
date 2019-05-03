import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Person} from "../components/search/search.component";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BasicSearchService {

  searchResults: Person[];

  constructor(private http: HttpClient) { }

  doSearch(searchTerm: string): Observable<Person[]>{
    return this.http.get<Person[]>('api/basicsearch/' + searchTerm).pipe(
      map((response: any) => {
        if(response != ''){
          return this.searchResults = response;
        }
      })
    );
  }
}
