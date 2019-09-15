import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { IQuestion } from '../../models/questionmodel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions-answers',
  templateUrl: './questions-answers.component.html',
  styleUrls: ['./questions-answers.component.css']
})
export class QuestionsAnswersComponent implements OnInit, OnChanges {
  @Input() questions: IQuestion[];
  first = false;
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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['questions'].currentValue) {
      this.first = true;
    }
  }

  nextQuestion(previous: string, next: string) {
    this[previous] = !this[previous];
    this[next] = !this[next];
  }

  checkAnswer(quizAnswer: string, correctAnswer: string) {
    const check = (quizAnswer === correctAnswer) ? 1 : 0;
    this.updateScore(check);
    this.quizAnswer = undefined;
  }

  updateScore(check: number) {
    if (check === 1) {
      this.score++;
    }
  }

  submit() {
    this.router.navigateByUrl('/score', { state: { score: this.score } });
  }

}
