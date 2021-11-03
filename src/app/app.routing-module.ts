import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';

import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound/pagenotfound.component';
import { AuthgaurdService } from './shared/authgaurd/authgaurd.service';
const routes : Routes  = [
  { path: '', redirectTo: "/login", pathMatch: 'full' },  
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent, canActivate:[AuthgaurdService]},
  {path:'pagenotfound',component:PagenotfoundComponent},
  {path:'**', redirectTo:'/pagenotfound'},
]

@NgModule({
  
  imports: [   
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
