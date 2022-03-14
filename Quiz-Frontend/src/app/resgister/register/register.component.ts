import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/user.model';
import { UserDataService } from 'src/app/user.data.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  title = 'Quiz-Frontend';
  formdata: any;
  

  constructor(private userDataService : UserDataService, private router: Router) { 
  } 

  ngOnInit(): void {
    this.formdata = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required])
    });
  }

  //run after form submission
  saveUserInfo(data: any) {
    this.userDataService.user.email = data.email;
    this.userDataService.user.name = data.name;

    //storing in localstorage so that data remain after page refresh
    localStorage.setItem('userDataService', JSON.stringify(this.userDataService));

    this.router.navigateByUrl('/welcome');
    console.log("Entered User info: "+this.userDataService.user);
  }


}
