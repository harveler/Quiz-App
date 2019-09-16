import { Component, OnInit, OnDestroy } from '@angular/core';
import { Question } from '../../models/questionmodel';
import { map } from 'rxjs/operators';
import { QuizService } from './../../services/quiz.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-questions-answers',
  templateUrl: './questions-answers.component.html',
  styleUrls: ['./questions-answers.component.css']
})

export class QuestionsAnswersComponent implements OnInit, OnDestroy {
  questions: Question[];

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

  quizServiceSubscription: Subscription;
  activatedRoutesubscription: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private quizService: QuizService) { }

  ngOnInit() {
    this.activatedRoutesubscription = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
      .subscribe(
        (params) => {
          if (params === null || params.difficulty === undefined) {
            this.router.navigate(['quiz']);
          } else {
            this.quizServiceSubscription = this.quizService.getQuestions(params.difficulty).subscribe(resultQuestions => {
              if (resultQuestions === null) {
                return;
              } else if (resultQuestions.length === 0) {
                alert('No questions were retrived from the database. Please try again.');
              } else {
                this.questions = resultQuestions;
                this.first = true;
              }
            });
          }
        },
        (error) => console.error('oops, an error!', error));
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

  ngOnDestroy(): void {
    this.quizServiceSubscription.unsubscribe();
    this.activatedRoutesubscription.unsubscribe();
  }

}
