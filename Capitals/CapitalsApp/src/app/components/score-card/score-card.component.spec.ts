import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { ScoreCardComponent } from './score-card.component';
import { Subscription, of } from 'rxjs';

export class ActivatedRouteMock {
  public paramMap = of({ score: 4 });
}

describe('ScoreCardComponent', () => {
  let component: ScoreCardComponent;
  let fixture: ComponentFixture<ScoreCardComponent>;
  let activatedRouteMock: ActivatedRouteMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreCardComponent],
      imports: [
        RouterTestingModule,
        FontAwesomeModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteMock,
        }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    activatedRouteMock = new ActivatedRouteMock();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a value from parent component through navigation and display HTML based on that value', () => {
    // arrange
    const route = activatedRouteMock.paramMap;
    const spy = spyOn(activatedRouteMock.paramMap, 'subscribe').and.callThrough();
    const content = fixture.debugElement.nativeElement;

    // act
    route.subscribe(
      (params) => {
        if (params === null) {
          component.yourScore = 'Oops, looks like you got here by accident. Take the quiz by clicking the button below.';
        } else if (params.score >= 0 && params.score <= 12) {
          component.score = params.score;
          component.yourScore = 'Your score is: ' + params.score.toString();
        } else {
          component.yourScore = 'Sorry. Something went wrong. Please click the button below to retake the test.';
        }
      });
    fixture.detectChanges();

    // assert
    expect(component.score).toEqual(4);
    expect(spy).toHaveBeenCalled();
    expect(component.yourScore).toEqual('Your score is: 4');
    expect(content.innerHTML).toContain(component.bad);
  });

  it('should the navigation fails or the user navigates to the page themselves, the appropriate HTML is displayed', () => {
    // arrange
    const route = activatedRouteMock.paramMap;
    const spy = spyOn(activatedRouteMock.paramMap, 'subscribe').and.callThrough();

    // act
    route.subscribe(
      (params) => {
        params = null;
        if (params === null) {
          component.yourScore = 'Oops, looks like you got here by accident. Take the quiz by clicking the button below.';
        } else if (params.score >= 0 && params.score <= 12) {
          component.score = params.score;
          component.yourScore = 'Your score is: ' + params.score.toString();
        } else {
          component.yourScore = 'Sorry. Something went wrong. Please click the button below to retake the test.';
        }
      });
    fixture.detectChanges();

    // assert
    expect(component.score).toBeUndefined();
    expect(spy).toHaveBeenCalled();
    expect(component.yourScore).toEqual('Oops, looks like you got here by accident. Take the quiz by clicking the button below.');
  });

  it('should the navigation fails or the user navigates to the page themselves, the appropriate HTML is displayed', () => {
    // arrange
    const route = activatedRouteMock.paramMap;
    const spy = spyOn(activatedRouteMock.paramMap, 'subscribe').and.callThrough();

    // act
    route.subscribe(
      (params) => {
        params.score = 101;
        if (params === null) {
          component.yourScore = 'Oops, looks like you got here by accident. Take the quiz by clicking the button below.';
        } else if (params.score >= 0 && params.score <= 12) {
          component.score = params.score;
          component.yourScore = 'Your score is: ' + params.score.toString();
        } else {
          component.yourScore = 'Sorry. Something went wrong. Please click the button below to retake the test.';
        }
      });
    fixture.detectChanges();

    // arrange
    expect(component.score).toBeUndefined();
    expect(spy).toHaveBeenCalled();
    expect(component.yourScore).toEqual('Sorry. Something went wrong. Please click the button below to retake the test.');
  });

  it('unsubscribes when destroyed', () => {
    // arrange
    component.subscription = new Subscription();
    spyOn(component.subscription, 'unsubscribe').and.callThrough();

    // act
    component.ngOnDestroy();

    // assert
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});
