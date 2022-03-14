import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz } from './Model/quiz.model';
import { User } from './Model/user.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserDataService {

    user: User = new User;
    quiz: Quiz = new Quiz;
    type: string = "";
    beginnerScore:number = 0;
    intermediateScore:number = 0;

    constructor(private http: HttpClient) { }

    getUserData() {
        return this.user;
    }

    getQuestions() {
        return this.http.get('http://18.191.249.225:3000/questions/' + this.type).pipe(
            map((result: any) => {
              return result;
            })
          );
    }

    storeUserAnswersInDb(){
        this.http.post<any>('http://18.191.249.225:3000/saveAnswers', this.user).subscribe({
            next: data => {
              console.log("Success", data);
            },
            error: error => {
              console.error('There was an error!', error);
            }
        });
    }
}