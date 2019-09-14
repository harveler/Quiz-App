import { Component, OnInit } from '@angular/core';

import { QuizService } from '../../services/quiz.service';
import { IQuestion } from '../../models/questionmodel';

@Component({
  selector: 'app-hard-questions',
  templateUrl: './hard-questions.component.html',
  styleUrls: ['./hard-questions.component.css']
})
export class HardQuestionsComponent implements OnInit {
  questions: IQuestion[];

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizService.getHardQuestions().subscribe(
      (res) => this.questions = res,
      (error) => console.log(error)
    );
  }

}
