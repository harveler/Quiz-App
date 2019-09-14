import { QuizService } from '../../services/quiz.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatRadioButton } from '@angular/material';
import { IQuestion } from '../../models/questionmodel';

@Component({
  selector: 'app-questions-answers',
  templateUrl: './questions-answers.component.html',
  styleUrls: ['./questions-answers.component.css']
})
export class QuestionsAnswersComponent implements OnInit {
  @Input() questions: IQuestion[];
  currentQuestion: IQuestion;
  id: number;
  capital: string;
  lastQuestion = false;
  firstQuestion = false;
  optionsArray = [1, 2, 3, 4];
  randomizedArray: [];

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    // this.randomizedArray = this.shuffle(this.optionsArray);
    // for(let question in this.questions) {
    //   for(let option in question) {

    //   }
    // }
  }

  log(value) {
    console.log(value);
  }

  nextQuestion() {
    for (let i = 2; i <= 12; i++) {
      this.id = i;
      this.currentQuestion = this.questions[i - 1];
      if (i === 12) {
        this.lastQuestion = true;
      }
    }
  }

  getFirstQuestion() {
    for (let i = 1; i <= 12; i++) {
      this.id = i;
      this.currentQuestion = this.questions[i];
      if (i === 12) {
        this.lastQuestion = true;
      } else if (i === 1) {
        this.firstQuestion = true;
      }
    }
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  generateRandomOrder() {
    const number1 = this.randomNumber();
    const number2 = this.randomNumber();
  }

  randomNumber() {
    return Math.floor(Math.random() * 3);
  }

  submit() {
    console.log('Hooray, you\'re done');
  }

}
