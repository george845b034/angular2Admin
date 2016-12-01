/**
 * Created by george.cc.chang on 2016/11/24.
 */
import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {PagesComponent} from "./pages/pages.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {AuthGuardService} from "./service/auth-guard.service";
import {Dashboard2Component} from "./pages/dashboard2/dashboard2.component";
import {PostsComponent} from "./pages/posts/posts.component";


const appRoutes: Routes = [
    {path: '', redirectTo: 'pages', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'pages', component: PagesComponent,
        // canLoad: [AuthGuardService],
        // canActivate: [AuthGuardService],
        children: [
        {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        {path: 'dashboard', component: DashboardComponent},
        {path: 'dashboard2', component: Dashboard2Component},
        {path: 'posts', component: PostsComponent}
    ]},
    {path: '**', redirectTo: 'pages'},
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);