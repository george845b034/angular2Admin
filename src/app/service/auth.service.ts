import {Injectable} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import {Http, Response} from "@angular/http";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

    constructor(private http:Http) {
    }

    private _url: string = "http://ibcuat.syntrend.com.tw/MemberService/api/membercheck";
    isLoggedIn: boolean = false;
    redirectUrl: string;

    public login(inAccount:string, inPassword:string): Observable<boolean> {

        return this.http.get(this._url + '/' + inAccount + '/' + inPassword)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

        // return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
    }

    public logout(): void {
        this.isLoggedIn = false;
    }

    errorHandler(error: Response){
        console.error(error);
        return Observable.throw(error || "Server Error");
    }
}
