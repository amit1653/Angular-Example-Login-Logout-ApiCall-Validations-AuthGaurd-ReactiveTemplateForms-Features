import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators , FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home/home.component';
import { HomeService } from '../shared/home/home.service';
import { LoginService } from '../shared/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage = false;
  
 
  constructor(private fb : FormBuilder, private loginService : LoginService,private router : Router, 
    private homeService : HomeService){
  }
  loginDetailsForm = new FormGroup({});
  ngOnInit(): void {
    this.loginDetailsForm = this.fb.group({
      username: [null,
      [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,16}$'),
      ]],
      email: new FormControl(null, 
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])
      )
    });
  }
  // Login  form validation

get formData() { return this.loginDetailsForm.controls; }

onSubmitUserDetails(value:any){
    this.loginService.getUsersList().subscribe( (res) => {

    var userList:any =[];
    userList = res;
    var filteredUser = userList.filter( (response:any) =>{ 
      return (response.email == value.email);
    })
    if(filteredUser.length>0){
      var userName = filteredUser[0].firstName + " " + filteredUser[0].lastName;
      localStorage.setItem('UserName',userName)
      this.router.navigate(["/home"]);

    }
    else{
      this.errorMessage = true;
    }

    },
    error => {
      console.log("Error");

    })
}
}
