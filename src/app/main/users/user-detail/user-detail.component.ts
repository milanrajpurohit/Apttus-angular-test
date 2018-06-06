import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent extends BaseComponent implements OnInit {
  // Initialisation of variables
  public isNew: boolean; // Flag to determine API for add and edit
  public submitted: boolean; // Button to validate the form
  public user: any = {}; // Assign User Information
  public aggrementId: any; // Assign Agreement ID
  public showLoader: boolean; // Show/hide loader
  constructor(inj: Injector) {
    super(inj);
    this.activatedRoute.params.subscribe(params => {
      // Condition for Add and Edit of User
      if (params['id'] === 'new') {
        this.isNew = true;
        this.user = {};
      } else {
        this.aggrementId = params['id'];
        this.getAggrementById(this.aggrementId);
      }

    });
  }

  ngOnInit() {
  }
  // Method of submitting the form
  submitForm(form) {

    if (form.valid) {

      if (this.isNew) {
        // Calling API to save the agreement
        this.commonService.callApi('agreement', this.user, 'post').then(success => {
          if (success.status === 1) {
            this.popToast('success', success.message)
            this.router.navigate(['/main/users/user-list']);
          } else {
            this.popToast('error', success.message);
          }
        });

      } else {
        // Calling API to update the agreement
        this.commonService.callApi('agreement/' + this.aggrementId + '/update', this.user, 'post').then(success => {

          this.popToast('success', success.message)
          if (success.status === 1) {
            this.router.navigate(['main/users']);
          } else {
            this.popToast('error', success.message);
          }

        });

      }

    }

  }
  // Calling API to get specific agreement
  getAggrementById(aggrementId) {
    this.commonService.callApi('agreement/' + this.aggrementId, '', 'get').then(success => {
      if (success.status === 1) {
        this.user = success.data;
      } else {
        this.popToast('error', success.message);
      }
    });
  }
  // Binding start date
  public onDate(event): void {
    this.user.startDate = event;
  }
  // Binding end date
  public onDateSecond(event): void {
    this.user.endDate = event;
  }
  // Status changes on event
  onChange(event) {
    this.user.status = event.target.value;

  }
}
