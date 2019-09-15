import { QuizService } from './../../services/quiz.service';
import { Subscription, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuestionsAnswersComponent } from './../questions-answers/questions-answers.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EasyQuestionsComponent } from './easy-questions.component';
import { MatRadioModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ShufflePipe } from 'src/app/pipes/shuffle.pipe';
import { IQuestion } from 'src/app/models/questionmodel';

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
  getEasyQuestions: of(testData),
});

describe('EasyQuestionsComponent', () => {
  let component: EasyQuestionsComponent;
  let fixture: ComponentFixture<EasyQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EasyQuestionsComponent,
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
    fixture = TestBed.createComponent(EasyQuestionsComponent);
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
    expect(QuizServiceStub.getEasyQuestions).toHaveBeenCalled();
  });

  it('unsubscribes when destroyed', () => {
    fixture.detectChanges();
    component.subscription = new Subscription();
    spyOn(component.subscription, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();

    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});
