import { QuizService } from '../../services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { IQuestion } from '../../models/questionmodel';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-easy-questions',
  templateUrl: './easy-questions.component.html',
  styleUrls: ['./easy-questions.component.css']
})
export class EasyQuestionsComponent implements OnInit {
  questions: IQuestion[];

  constructor(private quizService: QuizService, private route: ActivatedRoute) {  }

  ngOnInit() {
    this.quizService.getEasyQuestions().subscribe(
      (res) => {
        this.questions = res;
        console.log(res);
      },
      (error) => console.log(error)
    );
  }

}
