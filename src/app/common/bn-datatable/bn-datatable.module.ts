import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule,ModalModule,SortableModule } from 'ngx-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SortService } from './sortService';
import  { SortPipe, SearchFilter, SortableTableDirective, SortableColumnComponent } from './bn-datatable.component'

@NgModule({
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    SortableModule.forRoot(),
    NgSelectModule
  ],
  declarations: [
  	SortableColumnComponent,
  	SortableTableDirective,
  	SortPipe, 
    SearchFilter
  ],
  providers:[
  	SortService
  ],
  exports : [
    SortableColumnComponent,
    SortableTableDirective,
    SortPipe,
    SearchFilter,
    CommonModule,
    PaginationModule,
    ModalModule,
    SortableModule,
    NgSelectModule
  ]
})
export class BnDatatableModule { }
