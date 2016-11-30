import {Injectable} from '@angular/core';
declare var $:any;

@Injectable()
export class ToolsService {

    constructor() {
    }


    public setContentHeight() : void {

        var leftColHeight = $('.left_col').eq(1).height();
        var bodyHeight = $('body').outerHeight();

        setTimeout(_ => $('.right_col').css('min-height', bodyHeight < leftColHeight ? leftColHeight : bodyHeight));
    }
}
