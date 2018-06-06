import { Component, OnInit, Injector } from '@angular/core';
import { TransferState, makeStateKey, Title, Meta } from '@angular/platform-browser';

import { BaseComponent } from './common/commonComponent';

import * as jQuery from 'jquery';
declare var jquery: any;
declare var $: any;


const DOGS_KEY = makeStateKey('dogs');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {

  constructor(
    public titleService: Title,
    public metaService: Meta,
    inj : Injector,
    ) {
    super(inj)
  }

  ngOnInit() {
    this.titleService.setTitle('Angular 5');
    this.metaService.addTag({name: 'description', content: 'My home page description goes here.'});
  }
}
