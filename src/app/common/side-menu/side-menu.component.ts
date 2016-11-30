import {Component, OnInit} from '@angular/core';
import {ToolsService} from "../../service/tools.service";
import {Router} from "@angular/router";
declare var $:any;

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

    constructor(private tools:ToolsService, private router: Router) {
        router.events.subscribe((val) => {
            tools.setContentHeight();
        });
    }

    ngOnInit() {

    }


    ngAfterViewInit() {
        var self = this;
        self.tools.setContentHeight();
        self.sidebarEvent();

        $( window ).resize(function() {
            self.tools.setContentHeight();
        });
    }

    private sidebarEvent() : void {

        var $SIDEBAR_MENU = $('#sidebar-menu');
        var $MENU_TOGGLE = $('#menu_toggle');
        var $BODY = $('body');
        var self = this;

        $SIDEBAR_MENU.find('a').on('click', function(ev) {
            var $li = $(this).parent();

            if ($li.is('.active')) {
                $li.removeClass('active active-sm');
                $('ul:first', $li).slideUp(function() {
                    self.tools.setContentHeight();
                });
            } else {
                // prevent closing menu if we are on child menu
                if (!$li.parent().is('.child_menu')) {
                    $SIDEBAR_MENU.find('li').removeClass('active active-sm');
                    $SIDEBAR_MENU.find('li ul').slideUp();
                }

                $li.addClass('active');

                $('ul:first', $li).slideDown(function() {
                    self.tools.setContentHeight();
                });
            }
        });

        $MENU_TOGGLE.on('click', function() {
            if ($BODY.hasClass('nav-md')) {
                $SIDEBAR_MENU.find('li.active ul').hide();
                $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
            } else {
                $SIDEBAR_MENU.find('li.active-sm ul').show();
                $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
            }

            $BODY.toggleClass('nav-md nav-sm');

            self.tools.setContentHeight();
        });
    }


    // private setContentHeight() : void {
    //
    //     var leftColHeight = $('.left_col').eq(1).height();
    //     var bodyHeight = $('body').outerHeight();
    //
    //     // this.contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;
    //     setTimeout(_ => $('.right_col').css('min-height', bodyHeight < leftColHeight ? leftColHeight : bodyHeight));
    // }
}
