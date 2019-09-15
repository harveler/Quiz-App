import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  chosenDifficulty = false;
  difficulty: number;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  getEasyQuestions() {
    this.difficulty = 1;
    this.router.navigate(['easy']);
  }

  getMediumQuestions() {
    this.difficulty = 2;
    this.router.navigate(['medium']);
  }

  getHardQuestions() {
    this.difficulty = 3;
    this.router.navigate(['hard']);
  }
}
