import {Injectable} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import {Http, Response} from "@angular/http";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

enum urlProtocol {
    login = <any>"membercheck",
    register = <any>"memberupdate"
}

@Injectable()
export class AuthService {

    constructor(private http:Http) {
    }

    private _url: string = "http://ibcuat.syntrend.com.tw/MemberService/api/";

    isLoggedIn: boolean = false;
    redirectUrl: string;

    login(inAccount:string, inPassword:string): Observable<boolean> {

        return this.http.get(this._url + urlProtocol.login + '/' + inAccount + '/' + inPassword)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    register(inAccount:string, inPassword:string) {

        return this.http.get(this._url + urlProtocol.register + '/' + inAccount + '/' + inPassword)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    logout(): void {
        this.isLoggedIn = false;
    }

    errorHandler(error: Response){
        console.error(error);
        return Observable.throw(error || "Server Error");
    }
}
