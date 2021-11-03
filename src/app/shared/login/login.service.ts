import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  getUsersList(){
    return this.http.get('https://my-json-server.typicode.com/bokadedarvin/AngularDeveloperSample/users');
  }
}
