import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/user.data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-question',
  templateUrl: './welcome-question.component.html',
  styleUrls: ['./welcome-question.component.css']
})
export class WelcomeQuestionComponent implements OnInit {
  languageOptionSelected = false;
  languageTypeSelected:string = "";
  welcomeQuestion: string = "Which language you like?"; 
  isDisableSelection = false;


  constructor(private userDataService : UserDataService, private router: Router) { 
    this.userDataService = JSON.parse(localStorage.getItem('userDataService') || '{}');
  }

  ngOnInit(): void {
  }

  onLanguageSelected(languageSelected: any){
    this.isDisableSelection = true;
    this.languageOptionSelected = true;

    if(languageSelected){
      this.languageTypeSelected = languageSelected.value
      console.log(" Value is : ", languageSelected.value );
    }     

  }

  showQuestions(){
      this.userDataService.type = this.languageTypeSelected;

      //pushing answered question and answer in user's object
      this.userDataService.user.question.push(this.welcomeQuestion);
      this.userDataService.user.answers.push(this.languageTypeSelected);

      //storing in localstorage so that data remain after page refresh
      localStorage.setItem('userDataService', JSON.stringify(this.userDataService));

      this.router.navigateByUrl('/quiz');
  }

}
