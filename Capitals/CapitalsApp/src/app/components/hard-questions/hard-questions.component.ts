import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { QuizService } from '../../services/quiz.service';
import { IQuestion } from '../../models/questionmodel';

@Component({
  selector: 'app-hard-questions',
  templateUrl: './hard-questions.component.html',
  styleUrls: ['./hard-questions.component.css']
})
export class HardQuestionsComponent implements OnInit, OnDestroy {
  questions: IQuestion[];
  subscription: Subscription;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.subscription = this.quizService.getHardQuestions().subscribe(
      (res) => this.questions = res,
      (error) => console.log(error)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
