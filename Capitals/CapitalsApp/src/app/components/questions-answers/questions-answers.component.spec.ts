import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QuestionsAnswersComponent } from './questions-answers.component';
import { MatButtonModule, MatRadioModule } from '@angular/material';
import { ShufflePipe } from 'src/app/pipes/shuffle.pipe';
import { IQuestion } from 'src/app/models/questionmodel';
import { By } from '@angular/platform-browser';
import { text } from '@fortawesome/fontawesome-svg-core';
import { SimpleChange, ChangeDetectionStrategy } from '@angular/core';
import { ScoreCardComponent } from '../score-card/score-card.component';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DummyScoreCardComponent } from 'src/app/testing/mock.components.specs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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

describe('QuestionsAnswersComponent', () => {
  let component: QuestionsAnswersComponent;
  let fixture: ComponentFixture<QuestionsAnswersComponent>;

  const router = {
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DummyScoreCardComponent,
        QuestionsAnswersComponent,
        ScoreCardComponent,
        ShufflePipe,
      ],
      imports: [
        HttpClientTestingModule,
        FontAwesomeModule,
        FormsModule,
        MatButtonModule,
        MatRadioModule,
        RouterTestingModule.withRoutes([
          { path: 'score', component: DummyScoreCardComponent, pathMatch: 'full' },
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
    component.ngOnChanges({
      questions: new SimpleChange(false, true, true)
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display next questions if user clicks on the NEXT button', () => {
    component.quizAnswer = 'Bmzklfrpz City';
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    const content = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    button.click();
    fixture.detectChanges();

    expect(content.innerHTML).toContain('Glovania');
    expect(component.first).toBeFalsy();
    expect(component.second).toBeTruthy();
  });

  it('should update score if the answer is correct', () => {
    component.quizAnswer = 'Bmzklfrpz City';
    fixture.detectChanges();
    component.checkAnswer(component.quizAnswer, 'Bmzklfrpz City');
    fixture.detectChanges();

    expect(component.score).toEqual(1);
  });

  it('should navigate to score component and pass on the score on submit', () => {
    component.score = 0;
    const spy = spyOn(component, 'submit').and.callFake(() => router.navigateByUrl('/score', { state: { score: component.score } }));
    component.submit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/score', { state: { score: 0 } });
  });
});
