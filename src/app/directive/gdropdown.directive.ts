import {Directive, HostListener} from '@angular/core';
declare var $:any;

@Directive({
    selector: '[gdropdown]'
})
export class GdropdownDirective {

    private isClicked = false;

    constructor() {
    }

    @HostListener('click', ['$event.target']) onClick(element) {

        if (this.isClicked) {
            $(element).closest('li').removeClass('open');
        }else{
            $(element).closest('li').addClass('open');
        }

        this.isClicked = !this.isClicked;
    }
}
