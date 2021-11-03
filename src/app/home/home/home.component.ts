import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/shared/home/home.service';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from 'src/app/shared/login/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  closeResult: string='';
  @ViewChild('f') contactForm = NgForm;
  country:any;
  name:any;
  phone:any;
  companyList:any = [];
  contactList:any = [];
  contactObj:any = {};


  title = 'ng-bootstrap-modal-demo';
  userTitle:any;
  contactObjectToModify : any;
  editMode : any;
  contactText : string ='';

  modalOptions:NgbModalOptions;
  constructor(private router:Router, private homeService : HomeService , private modalService: NgbModal, private loginService : LoginService) { 
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }
  

  ngOnInit(): void {
    this.homeService.getUsersAndContactList().subscribe( res => {
      let ListDetails = [];
      ListDetails = res;
      this.companyList = ListDetails[0];
      this.contactList = ListDetails[1];
    });
    this.userTitle=localStorage.getItem('UserName');
    
  }
  logoutFromApp(){
    localStorage.clear();
    this.router.navigateByUrl("/login");  

  }


  open(content:any,contactObj:any,value:string) {
    this.editMode = value;
    if(value == "edit"){
      this.contactText = 'Edit';

      this.contactObjectToModify = contactObj;
      this.country = contactObj.country;
      this.name = contactObj.name;
      this.phone = contactObj.phone;
    }
    else if(value == "add"){
      this.contactText = 'Add New';

      this.country = '';
      this.name = '';
      this.phone = '';
    }
    else if(value == "delete"){
      this.contactObjectToModify = contactObj;

    }
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  onAddContactPopup(contactData:any){
   if(this.editMode == 'edit'){
    this.contactObj = {
    companyId: this.contactObjectToModify.companyId,
    id: this.contactObjectToModify.id,
    country: contactData.form.value.country,
      name: contactData.form.value.name,
      phone:contactData.form.value.phone
    }
   }else if(this.editMode == 'add'){
    this.contactObj = {
      companyId: Math.floor((Math.random() * 10) + 1),
      id: Math.floor((Math.random() * 100) + 1),
      country: contactData.form.value.country,
      name: contactData.form.value.name,
      phone:contactData.form.value.phone
     
    }
   }
  
    this.homeService.addEditContactList(this.contactObj,this.editMode).subscribe( res => {
      if(this.editMode == 'edit'){
      this.contactList.filter( (response:any,index:number) =>{ 
        if(response.id == this.contactObj.id){
          this.contactList[index].name = this.contactObj.name;
          this.contactList[index].phone = this.contactObj.phone;
          this.contactList[index].country = this.contactObj.country;
        }
        })
      }
      else  if(this.editMode == 'add'){
        this.contactList.push(this.contactObj);
      }
      else if(this.editMode == 'delete'){
        this.contactList.filter( (response:any,index:number) =>{ 
          return (response.id != this.contactObj.id);      
        })

      }
    })


    this.modalService.dismissAll();
  }
  openModal(contactObjData:any){
   
      this.contactObj = {
        companyId: contactObjData.companyId,
        id: contactObjData.id,
        country: contactObjData.country,
        name: contactObjData.name,
        phone:contactObjData.phone
      }
    this.editMode = 'delete'
    this.homeService.addEditContactList(this.contactObj,this.editMode).subscribe( res => {
             
        this.contactList=this.contactList.filter( (response:any,index:number) =>{ 
          return (response.id != this.contactObj.id);
       
          return response;
        })

    })

  }

}
