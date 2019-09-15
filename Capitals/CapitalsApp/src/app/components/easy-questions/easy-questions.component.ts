import { QuizService } from '../../services/quiz.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IQuestion } from '../../models/questionmodel';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { throwToolbarMixedModesError } from '@angular/material';

@Component({
  selector: 'app-easy-questions',
  templateUrl: './easy-questions.component.html',
  styleUrls: ['./easy-questions.component.css']
})
export class EasyQuestionsComponent implements OnInit, OnDestroy {
  questions: IQuestion[];
  subscription: Subscription;

  constructor(private quizService: QuizService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.quizService.getEasyQuestions().subscribe(
      (res) => {
        if (res !== null) {
          this.questions = res;
        } else {
          console.log('No questions found. Please try again later.');
        }},
      (error) => console.log(error)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
