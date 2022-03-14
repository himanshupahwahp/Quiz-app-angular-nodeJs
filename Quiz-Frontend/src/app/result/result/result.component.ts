import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/user.data.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  beginnerScore: number = 0;
  intermediateScore: number = 0;

  constructor(private userDataService : UserDataService, private router: Router) { 
    this.userDataService = JSON.parse(localStorage.getItem('userDataService') || '{}');
    this.beginnerScore = this.userDataService.beginnerScore;
    this.intermediateScore = this.userDataService.intermediateScore;
    if(!this.beginnerScore)
      this.beginnerScore = 0;
    if(!this.intermediateScore)
      this.intermediateScore = 0;  
  }

  ngOnInit(): void {
  }

}
