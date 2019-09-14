import { QuizService } from '../../services/quiz.service';
import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatRadioButton } from '@angular/material';
import { IQuestion } from '../../models/questionmodel';

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
  quizAnswer: string;
  score: number;

  constructor(private quizService: QuizService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
  }

  log(value) {
    console.log(value);
  }

  nextQuestion(previous: string, next: string, quizAnswer: string) {
    this.checkAnswer(quizAnswer);
    this[previous] = !this[previous] ;
    this[next] = !this[next];
    this.quizAnswer = undefined;
  }

  checkAnswer(quizAnswer: string) {
    this.updateScore();
  }

  updateScore() {
    if (true) {
      return this.score += 1;
    }
    return null;
  }

  submit() {
    console.log('Hooray, you\'re done');
  }

}
