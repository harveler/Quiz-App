import { Component, OnInit, Input } from '@angular/core';
import { MatRadioButton } from '@angular/material';

@Component({
  selector: 'app-questions-answers',
  templateUrl: './questions-answers.component.html',
  styleUrls: ['./questions-answers.component.css']
})
export class QuestionsAnswersComponent implements OnInit {
  @Input() difficulty: string;
  country = 'Fake Country';

  constructor() { }

  ngOnInit() {
  }

}
