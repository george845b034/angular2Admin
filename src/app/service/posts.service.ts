import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PostsService {


    private _url: string = "http://reqres.in/api/users";

    constructor(private http:Http) {
    }

    getPostsList():Observable<any> {
        return this.http.get(this._url)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    addPosts(inFirstName:string, inLastName:string):Observable<any> {

        let bodyString = JSON.stringify({
            name: inFirstName,
            job: inLastName
        });
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers });

        return this.http.post(this._url, bodyString, options)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    updatePosts(inId:string ,inFirstName:string, inLastName:string):Observable<any> {

        let bodyString = JSON.stringify({
            name: inFirstName,
            job: inLastName
        });
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers });

        return this.http.put(this._url + '/' + inId, bodyString, options)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    detelePosts(inId:string):Observable<any> {

        return this.http.delete(this._url + '/' + inId)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    errorHandler(error: Response){
        console.error(error);
        return Observable.throw(error || "Server Error");
    }
}
