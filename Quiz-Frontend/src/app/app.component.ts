import { Component } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './Model/user.model';
import {UserDataService} from './user.data.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Quiz-Frontend';
  formdata: any;
  user: User;
  Registered = true;
  

  constructor(private userDataService : UserDataService, private router: Router) { 
    this.user=this.userDataService.getUserData(); 
  } 

  ngOnInit(): void {
    this.formdata = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required])
    });
  }

  //run after form submission
  saveUserInfo(data: any) {
    this.user.email = data.email;
    this.user.name = data.name;
    this.Registered = false;
    this.router.navigateByUrl('/welcome');
    console.log(this.user);
  }

}
