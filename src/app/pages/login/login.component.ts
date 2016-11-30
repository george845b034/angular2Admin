import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
declare var $:any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    isError = false;

    constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        $('body').removeAttr('class');
        $('body').addClass('login');

        this.loginForm = this.formBuilder.group({
            account: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    public onLogin() {
        console.log(this.loginForm.value);
        this.authService.login(this.loginForm.value.account, this.loginForm.value.password).subscribe(( resData )=>{
            console.log(resData);
        //
        //     let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard' ;
        //
        //     this.router.navigate([redirect]);
        });
    }
}
