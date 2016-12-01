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
    registerForm: FormGroup;
    isError = false;
    errorMessage = "";

    constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        $('body').removeAttr('class');
        $('body').addClass('login');

        this.loginForm = this.formBuilder.group({
            account: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });


        this.registerForm = this.formBuilder.group({
            account: ['', [Validators.required, Validators.minLength(6)]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onLogin() {
        this.authService.login(this.loginForm.value.account, this.loginForm.value.password).subscribe(( resData )=>{

            if (resData["returnMsgNo"] == "1" ){
                this.authService.isLoggedIn = true;
                this.router.navigate(["/dashboard"]);
            }else{
                this.isError = true;
                this.errorMessage = resData["returnMsg"];
            }
        });
    }

    onRegister() {
        this.authService.register(this.registerForm.value.account, this.registerForm.value.password).subscribe(( resData )=>{

            if (resData["returnMsgNo"] == "1" ){
                $('#register').css('animation-name', 'fadeOutLeft');
                $('.login_form').css({'animation-name': 'fadeInLeft', 'animation-delay':'.1s'});
                this.router.navigate(["/login"], {fragment: 'signin'});
            }else{
                this.isError = true;
                this.errorMessage = resData["returnMsg"];
            }
        });
    }

    onChangeLogin() {
        this.isError = false;
    }
}
