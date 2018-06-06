import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from './../common/commonComponent';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html'
})
export class MainComponent extends BaseComponent implements  OnInit {
    constructor(inj: Injector) {
        super(inj);
    }
    public admin: any = {};
    public sidebar = $('.sidebar');
    public imageData: any;
    ngOnInit() {
        $('[data-toggle="offcanvas"]').on('click', function() {
            $('.sidebar-offcanvas').toggleClass('active');
        });
    }
}
