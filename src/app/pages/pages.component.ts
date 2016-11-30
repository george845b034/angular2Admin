import {Component, OnInit} from '@angular/core';
declare var $:any;

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        $('body').removeAttr('class');
        $('body').addClass('nav-md');
    }

}
