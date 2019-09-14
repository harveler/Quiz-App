import { QuizService } from '../../services/quiz.service';
import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatRadioButton } from '@angular/material';
import { IQuestion } from '../../models/questionmodel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions-answers',
  templateUrl: './questions-answers.component.html',
  styleUrls: ['./questions-answers.component.css']
})
export class QuestionsAnswersComponent implements OnInit {
  @Input() questions: IQuestion[];
  first = true;
  second = false;
  third = false;
  fourth = false;
  fifth = false;
  sixth = false;
  seventh = false;
  eighth = false;
  nineth = false;
  tenth = false;
  eleventh = false;
  twelfth = false;
  score = 0;
  quizAnswer: string;

  constructor(private router: Router, private ref: ChangeDetectorRef) { }

  ngOnInit() {
  }

  log(value) {
    console.log(value);
  }

  nextQuestion(previous: string, next: string) {
    this[previous] = !this[previous] ;
    this[next] = !this[next];
  }

  checkAnswer(quizAnswer: string, correctAnswer: string) {
    console.log(quizAnswer + ' ' + correctAnswer);
    const check = (quizAnswer === correctAnswer) ? 1 : 0;
    console.log(check);
    this.updateScore(check);
    this.quizAnswer = undefined;
  }

  updateScore(check: number) {
    if (check) {
      this.score++;
    }
  }

  submit() {
    console.log(this.score);
    console.log('Hooray, you\'re done');
    this.router.navigateByUrl('/score', { state: { score: this.score } });
  }

}
