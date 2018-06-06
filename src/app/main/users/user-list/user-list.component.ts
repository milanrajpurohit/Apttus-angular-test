import { Component, OnInit, Injector, ViewChild, Renderer2, Inject } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DOCUMENT } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';

class DataTablesResponse {
  data: any[];
  recordsTotal: number;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends BaseComponent  implements OnInit {

  myControl: FormControl = new FormControl();
  filteredOptions: Observable<string[]>;
  constructor(inj: Injector, private _renderer2: Renderer2, @Inject(DOCUMENT) private _document) {
    super(inj);
  }
  // Initialisation of variables
  public options: Array<any> = [];
  public userArr: Array<any> = [];
  public fieldArray: Array<any> = [];
  public Status: Array<any> = [
    {value: 'Active'},
    {value: 'Renewed'},
    {value: 'Ammended'}
  ];
  public columns: Array<any> = [
    {value: 'name'},
    {value: 'startDate'},
    {value: 'value'},
    {value: 'status'},
  ];
  public condition: Array<any> = [
    {value: 'contains'},
    {value: 'eq'},
    {value: 'gte'},
    {value: 'lte'},
    {value: 'ne'},
  ];

  public dtTrigger: Subject<any> = new Subject();

  public pageSizeValue = 10; // Number of items per page to show.
  public showDatePicker: boolean;
  public showDropdown: boolean;
  public showTextFiled: boolean;
  public showIntField: boolean;
  public filterObject: any = {};
  public columnName: any;
  public filterArray: any = [];
  public final: any = [
  {
    'columnId': '',
    'name': '',
    'operator': '',
    'value': ''
  }];
  public searchText: any;
  public sortField = {

  };
  ngOnInit() {
    // To get the agreement listing
    this.getAggrementListing();
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(val => this.filter(val))
      );
  }
  // Filter for lowercase
  filter(val: string): string[] {
    return this.options[0].filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }
  // API to delete the agreement
  deleteAgreement(aggrement) {
    const agreementId = aggrement._id;
    this.swal({
      title: 'Are you sure?',
      text: 'Want to delete this user?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText : 'No',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if ( result.value ) {
        this.commonService.callApi('agreement/' + agreementId + '/delete', '', 'post').then(success => {
          if (success.status === 1) {
            this.popToast('success', success.message);
            this.getAggrementListing();
          } else {
            this.popToast('error', success.message);
          }
        });
      }
    });
  }
  // API to Get agreement listing
  getAggrementListing() {

    this.commonService.callApi('agreements', '', 'get').then(success => {
      if (success.status === 1) {
        this.userArr = success.data
        const result = this.userArr.map(a => a.name);
        this.options.push(result);
      } else {
        this.popToast('error', success.message);
      }
    });
  }
  onSorted(e) {
    this.sortField = {
      sortField : e.sortColumn,
      direction : e.sortDirection,
      objectName : e.objectName
    };
  }
  onSelectChanged(event) {
    for ( let i = 0; i < 4; i++) {
      if (event[i]) {
        this.final[i].name = event[i];
      } else {
        this.final[i] = {};
      }
    }
    this.columnName = event;

}
// Callback function for change event
onSelectChangedCondition(event, index) {
  this.final[index].operator = event;
  let flag = false;
  if (this.final.length > 0) {
    for (let i = 0; i < this.final.length; i++) {
      if (this.final[i].name && this.final[i].operator && this.final[i].value) {
        flag = true;
      }
    }
  }
  if (flag) {
    this.filterData(this.final);
  }
}
// Callback function for status change
onStatusChange(event, id) {
  this.final[id].value = event.target.value
  let flag = false;
  if (this.final.length > 0) {
    for (let i = 0; i < this.final.length; i++) {
      if (this.final[i].name && this.final[i].operator && this.final[i].value) {
        flag = true;
      }
    }
  }
  if (flag) {
    this.filterData(this.final);
  }
}
// Callback function for autocomplete
getNames(event) {
  let flag = false;
  if (this.final.length > 0) {
    for (let i = 0; i < this.final.length; i++) {
      if (this.final[i].name && this.final[i].operator && this.final[i].value) {
        flag = true;
      }
    }
  }
  if (flag) {
    this.filterData(this.final);
  }
}
// Callback datepicker change event
public onDate(event): void {
  let flag = false;

  if (this.final.length > 0) {
    for ( let i = 0; i < this.final.length; i++) {
      if (this.final[i].name && this.final[i].operator && this.final[i].value) {
        flag = true;
      }
    }
  }
  if (flag) {
    this.filterData(this.final);
  }
}
filterData(data) {

}
  // Calling API to filter the agreements results
  applyFilter(data) {
    this.commonService.callApi('agreement/search', data, 'post').then(success => {
      if (success.status === 1) {
        this.userArr = success.data
        const result = this.userArr.map(a => a.name);
        this.options.push(result);
      } else {
        this.popToast('error', success.message);
      }
    });
  }
}
