import { QuizService } from './../services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { IQuestion } from '../Models/questionmodel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-easy-questions',
  templateUrl: './easy-questions.component.html',
  styleUrls: ['./easy-questions.component.css']
})
export class EasyQuestionsComponent implements OnInit {
  questions: IQuestion[];

  constructor(private quizService: QuizService, private route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.quizService.getEasyQuestions().subscribe(
        (res) => this.questions = res,
        (error) => console.log(error)
      );
      console.log(this.questions);
    });
  }

  ngOnInit() {
    console.log('Hello');
    this.quizService.getEasyQuestions().subscribe(
      (res) => this.questions = res,
      (error) => console.log(error)
    );
    console.log(this.questions);
  }
}
