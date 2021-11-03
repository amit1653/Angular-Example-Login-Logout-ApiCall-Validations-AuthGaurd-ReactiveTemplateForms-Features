import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  

  // get contact and company details
  getUsersAndContactList(): Observable<any[]>{

    let getCompany=this.http.get('https://my-json-server.typicode.com/bokadedarvin/AngularDeveloperSample/companies')
    let getContact=this.http.get('https://my-json-server.typicode.com/bokadedarvin/AngularDeveloperSample/contacts')
    return forkJoin([getCompany, getContact]);
  
  }

// add,edit,delete api call
  addEditContactList(data:any,mode:string):Observable<any>{
    
    let addEditDelData:any;
    let userId = data.id;
    if(mode == 'edit'){
      addEditDelData=this.http.put('https://my-json-server.typicode.com/bokadedarvin/AngularDeveloperSample/contacts/'+userId,data);
    }else if(mode == 'add'){
      addEditDelData=this.http.post('https://my-json-server.typicode.com/bokadedarvin/AngularDeveloperSample/contacts',data);
    }else if(mode == 'delete'){
      addEditDelData=this.http.delete('https://my-json-server.typicode.com/bokadedarvin/AngularDeveloperSample/contacts/'+userId);
    }

   return addEditDelData;

     
  }


}
