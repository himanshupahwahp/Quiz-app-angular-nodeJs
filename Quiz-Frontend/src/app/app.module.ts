import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { WelcomeQuestionComponent } from './welcome-question/welcome-question/welcome-question.component';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './questions/questions/questions.component';
import { ResultComponent } from './result/result/result.component';
import { RegisterComponent } from './resgister/register/register.component';


const appRoutes: Routes = [
  { path: 'welcome', component: WelcomeQuestionComponent },
  { path: 'quiz', component: QuestionsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'result', component: ResultComponent },
  // { path: 'App', component: AppComponent },
  { path: '', redirectTo: 'register', pathMatch: 'prefix' }
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeQuestionComponent,
    QuestionsComponent,
    ResultComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
