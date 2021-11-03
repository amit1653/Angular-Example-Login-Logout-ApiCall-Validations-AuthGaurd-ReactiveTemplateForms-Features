import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthgaurdService implements CanActivate {

  constructor( private router: Router) {}  
  canActivate(): boolean {  
      if (localStorage.getItem("UserName") == undefined) {  
          this.router.navigateByUrl("/login");  
      }  
      return true;  
  } 
  
}
