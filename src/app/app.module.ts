import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatPaginatorModule, MatSlideToggleModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule,MatInputModule,MatAutocompleteModule} from '@angular/material';


// Plugins
import {SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider} from "angular5-social-login";
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from 'ng2-ckeditor'; //1. https://github.com/chymz/ng2-ckeditor //2. https://ckeditor.com/ckeditor-4/download/
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { PaginationModule } from 'ngx-bootstrap';
import  { BnDatatableModule } from './common/bn-datatable/bn-datatable.module'
import { ImageCropperModule } from 'ngx-image-cropper';

// Common
import { BaseComponent } from './common/commonComponent';
import { CommonService } from './common/common.service'

import { ErrorMessages } from './common/errorMessages';

// public pages
// main pages
import { MainComponent } from './main/main.component';
//User management
import { UsersComponent } from './main/users/users.component';
import { UserListComponent } from './main/users/user-list/user-list.component';
import { UserDetailComponent } from './main/users/user-detail/user-detail.component';

//CMS Management

//************************************************************************************************//
// @Purpose : Social Media Login//
//************************************************************************************************//
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider("147316885915455")
    },
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider("125303558418-4j016lhttq89o8mic0dn8lkahf5tkhp4.apps.googleusercontent.com")
    },
    ]
    );
  return config;
}
//************************************************************************************************//

@NgModule({
  declarations: [
  AppComponent,
  MainComponent,
  BaseComponent,
  UsersComponent, UserListComponent, UserDetailComponent,
  ],
  imports: [
  BnDatatableModule,
  NgSelectModule,
  PaginationModule.forRoot(),
  MatPaginatorModule, MatSlideToggleModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule,MatInputModule,MatAutocompleteModule,
  LoadingBarHttpClientModule,
  SweetAlert2Module.forRoot(),
  BrowserAnimationsModule,        
  CKEditorModule,
  SocialLoginModule,
  FormsModule,
  ReactiveFormsModule,
  BrowserModule.withServerTransition({ appId: 'universal-demo-v5' }),
  HttpClientModule,
  BrowserTransferStateModule,
  ImageCropperModule,
  RouterModule.forRoot([
    { path: '', component: MainComponent, pathMatch : 'full' },
    { path: 'main', component: MainComponent, children : [
    { path: '', redirectTo : 'users', pathMatch : 'full'},
    { path: 'users', component: UsersComponent, children : [
    { path: '', redirectTo : 'user-list', pathMatch : 'full'},
    { path: 'user-list', component: UserListComponent, pathMatch : 'full' },
    { path: 'user-detail/:id', component: UserDetailComponent, pathMatch : 'full'}
    ]},
    ] },
    { path: '**', redirectTo: '/', pathMatch : 'full' }
    ])
  ],
  providers: [
  CommonService, ErrorMessages,MatDatepickerModule,
  {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
