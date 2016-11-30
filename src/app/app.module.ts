import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {SideMenuComponent} from './common/side-menu/side-menu.component';
import { TopMenuComponent } from './common/top-menu/top-menu.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GdropdownDirective } from './directive/gdropdown.directive';
import {routing, appRoutingProviders} from "./app.routing";
import { LoginComponent } from './pages/login/login.component';
import { FooterComponent } from './common/footer/footer.component';
import { PagesComponent } from './pages/pages.component';
import {AuthGuardService} from "./service/auth-guard.service";
import {AuthService} from "./service/auth.service";
import { Dashboard2Component } from './pages/dashboard2/dashboard2.component';
import {ToolsService} from "./service/tools.service";

@NgModule({
    declarations: [
        AppComponent,
        SideMenuComponent,
        TopMenuComponent,
        DashboardComponent,
        GdropdownDirective,
        LoginComponent,
        FooterComponent,
        PagesComponent,
        Dashboard2Component
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing
    ],
    providers: [appRoutingProviders, AuthGuardService, AuthService, ToolsService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
