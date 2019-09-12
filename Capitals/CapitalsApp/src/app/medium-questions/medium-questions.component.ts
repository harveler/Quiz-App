import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { IQuestion } from '../Models/questionmodel';

@Component({
  selector: 'app-medium-questions',
  templateUrl: './medium-questions.component.html',
  styleUrls: ['./medium-questions.component.css']
})
export class MediumQuestionsComponent implements OnInit {
  questions: IQuestion[];

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizService.getMediumQuestions().subscribe(
      (res) => this.questions = res,
      (error) => console.log(error)
    );
    console.log(this.questions);
 }

}
