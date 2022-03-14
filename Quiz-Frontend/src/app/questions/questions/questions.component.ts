import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/Model/quiz.model';
import { UserDataService } from 'src/app/user.data.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  quiz: Quiz[] = [];
  currentQuestionIndex: number = 0;
  enableNextButton = false;
  answer: string = "";
  optionStatus = null;
  totalBeginnerQuestion: number = 0;
  totalIntermediateQuestion: number = 0;
  tempUserDataService: UserDataService;


  constructor(private userDataService: UserDataService, private router: Router, private http: HttpClient) {
    this.tempUserDataService = JSON.parse(localStorage.getItem('userDataService') || '{}');
    this.userDataService.user = this.tempUserDataService.user;
    this.userDataService.type = this.tempUserDataService.type;
    this.userDataService.getQuestions()
      .subscribe(questions => {
        this.quiz = questions;
        console.log("Questions: " + JSON.stringify(this.quiz));
      });


  }

  ngOnInit(): void {
  }

  onOptionSelected(optionSelected: any) {
    this.enableNextButton = true;
    this.answer = optionSelected;
    console.log("Selected" + optionSelected);

  }

  nextStep() {

    //given answer
    console.log("User Anser: " + this.answer);

    //pushing answered question and answer in user's object
    this.userDataService.user.question.push(this.quiz[this.currentQuestionIndex].question);
    this.userDataService.user.answers.push(this.answer);

    //counting total questions in each category
    this.increaseCateogryQuestionCount();

    //check answer
    if (this.quiz[this.currentQuestionIndex].answer == this.answer) {

      //increasing score on correct answer
      if (this.quiz[this.currentQuestionIndex].category == "Beginner")
        this.userDataService.beginnerScore++;

      if (this.quiz[this.currentQuestionIndex].category == "Intermediate")
        this.userDataService.intermediateScore++;

      this.answer = "";
    }

    //next question
    this.currentQuestionIndex++;

    //show result
    if (this.quiz.length == this.currentQuestionIndex) {
      //storing answered questions and answers in db
      this.userDataService.storeUserAnswersInDb();

      //calculating percentage score
      this.userDataService.beginnerScore = (this.userDataService.beginnerScore / this.totalBeginnerQuestion) * 100;
      this.userDataService.intermediateScore = (this.userDataService.intermediateScore / this.totalIntermediateQuestion) * 100;
      localStorage.setItem('userDataService', JSON.stringify(this.userDataService));
      this.router.navigateByUrl('/result');
    }

    //deselect all the options
    this.enableNextButton = false;
    this.optionStatus = null;

  }

  increaseCateogryQuestionCount(){
    //counting different category questions
    if (this.quiz[this.currentQuestionIndex].category == "Beginner")
    this.totalBeginnerQuestion++;

  if (this.quiz[this.currentQuestionIndex].category == "Intermediate")
    this.totalIntermediateQuestion++;
  }

}
