import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule, MatCheckboxModule, MatSelectModule, MatSortModule, MatTableModule} from '@angular/material';
import { SearchComponent } from './components/search/search.component';
import { CustomPaginatorComponent } from './components/custom-paginator/custom-paginator.component';
import { PaginationControlsDirective } from './directives/pagination-controls.directive';
import { PaginatePipe } from './pipes/paginate.pipe';
import {PaginationService} from "./services/pagination.service";

export {PaginationControl} from './models/pagination-control';
export {PaginationService} from './services/pagination.service';
export {CustomPaginatorComponent} from './components/custom-paginator/custom-paginator.component';
export {PaginationControlsDirective} from './directives/pagination-controls.directive';
export {PaginatePipe} from './pipes/paginate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    SearchComponent,
    CustomPaginatorComponent,
    PaginationControlsDirective,
    PaginatePipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatSelectModule,
    MatSortModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'search', component: SearchComponent },
    ])
  ],
  providers: [PaginationService],
  bootstrap: [AppComponent],
  exports: [PaginatePipe, CustomPaginatorComponent, PaginationControlsDirective]
})
export class AppModule { }
