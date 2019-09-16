// components
import { DummyComponent } from 'src/app/testing/mock.components.specs';
import { QuestionsAnswersComponent } from './questions-answers.component';
import { ScoreCardComponent } from '../score-card/score-card.component';
// modules
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatButtonModule, MatRadioModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
// pipes
import { ShufflePipe } from 'src/app/pipes/shuffle.pipe';
// models
import { Question } from 'src/app/models/questionmodel';
import { Subscription } from 'rxjs';

const testData: Question[] = [
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

const router = {
  navigateByUrl: jasmine.createSpy('navigateByUrl')
};

describe('QuestionsAnswersComponent', () => {
  let component: QuestionsAnswersComponent;
  let fixture: ComponentFixture<QuestionsAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DummyComponent,
        QuestionsAnswersComponent,
        ScoreCardComponent,
        ShufflePipe,
      ],
      imports: [
        FontAwesomeModule,
        FormsModule,
        HttpClientTestingModule,
        MatButtonModule,
        MatRadioModule,
        RouterTestingModule.withRoutes([
          { path: 'score', component: DummyComponent, pathMatch: 'full' },
          { path: 'quiz', component: DummyComponent, pathMatch: 'full' },
        ]),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsAnswersComponent);
    component = fixture.componentInstance;
    component.questions = testData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display next questions if user clicks on the NEXT button', () => {
    // arrange
    component.first = true;
    component.quizAnswer = 'Bmzklfrpz City';
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    const template = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    // act
    button.click();
    fixture.detectChanges();

    // assert
    expect(template.innerHTML).toContain('Glovania');
    expect(component.first).toBeFalsy();
    expect(component.second).toBeTruthy();
  });

  it('should update score if the answer is correct', () => {
    // arrange
    component.quizAnswer = 'Bmzklfrpz City';
    fixture.detectChanges();

    // act
    component.checkAnswer(component.quizAnswer, 'Bmzklfrpz City');
    fixture.detectChanges();

    // assert
    expect(component.score).toEqual(1);
  });

  it('should navigate to score component and pass on the score on submit', () => {
    // arrange
    component.score = 0;
    const spy = spyOn(component, 'submit').and.callFake(() => router.navigateByUrl('/score', { state: { score: component.score } }));

    // act
    component.submit();
    fixture.detectChanges();

    // assert
    expect(spy).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/score', { state: { score: 0 } });
  });

  it('unsubscribes when destroyed', () => {
    component.activatedRoutesubscription = new Subscription();
    component.quizServiceSubscription = new Subscription();

    spyOn(component.activatedRoutesubscription, 'unsubscribe').and.callThrough();
    spyOn(component.quizServiceSubscription, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();

    expect(component.activatedRoutesubscription.unsubscribe).toHaveBeenCalled();
    expect(component.quizServiceSubscription.unsubscribe).toHaveBeenCalled();
  });
});
