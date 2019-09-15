import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuestionsAnswersComponent } from './../questions-answers/questions-answers.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { MatRadioModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ShufflePipe } from 'src/app/pipes/shuffle.pipe';
import { HardQuestionsComponent } from './hard-questions.component';
import { Subscription, of } from 'rxjs';
import { IQuestion } from 'src/app/models/questionmodel';
import { QuizService } from 'src/app/services/quiz.service';

const testData: IQuestion[] = [
  {
    countryName: 'Berzerkistan',
    options: [{
      capitalName: 'Bmzklfrpz City',
      firstOption: 'Ragpo',
      secondOption: 'Raza',
      thirdOption: 'Citate Di Ravello'
    }],
  },
  {
    countryName: 'Glovania',
    options: [{
      capitalName: 'Ragpo',
      firstOption: 'Bmzklfrpz City',
      secondOption: 'Raza',
      thirdOption: 'Citate Di Ravello'
    }],
  },
  {
    countryName: 'Medici',
    options: [{
      capitalName: 'Citate Di Ravello',
      firstOption: 'Bmzklfrpz City',
      secondOption: 'Raza',
      thirdOption: 'Ragpo'
    }],
  }
];

const QuizServiceStub = jasmine.createSpyObj('QuizService', {
  getHardQuestions: of(testData),
});

describe('HardQuestionsComponent', () => {
  let component: HardQuestionsComponent;
  let fixture: ComponentFixture<HardQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HardQuestionsComponent,
        QuestionsAnswersComponent,
        ShufflePipe,
      ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        MatButtonModule,
        MatRadioModule,
        RouterTestingModule
      ],
      providers: [{provide: QuizService, useValue: QuizServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return IQuestion[] when component is initialized', () => {
    fixture.detectChanges();
    expect(component.questions.length).toEqual(3);
    expect(component.questions[0].countryName).toEqual('Berzerkistan');
    expect(QuizServiceStub.getHardQuestions).toHaveBeenCalled();
  });

  it('unsubscribes when destroyed', () => {
    fixture.detectChanges();
    component.subscription = new Subscription();
    spyOn(component.subscription, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();

    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});
