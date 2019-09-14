import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { IQuestion } from '../../models/questionmodel';

@Component({
  selector: 'app-medium-questions',
  templateUrl: './medium-questions.component.html',
  styleUrls: ['./medium-questions.component.css']
})
export class MediumQuestionsComponent implements OnInit, OnDestroy {
  questions: IQuestion[];
  subscription: Subscription;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.subscription = this.quizService.getMediumQuestions().subscribe(
      (res) => this.questions = res,
      (error) => console.log(error)
    );
    console.log(this.questions);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
