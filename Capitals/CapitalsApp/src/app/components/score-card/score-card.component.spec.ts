import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ScoreCardComponent } from './score-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Subscription, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

export class ActivatedRouteMock {
  public paramMap = of({ score: 4});
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
    const route = activatedRouteMock.paramMap;
    const spy = spyOn(activatedRouteMock.paramMap, 'subscribe').and.callThrough();

    const content = fixture.debugElement.nativeElement;
    route.subscribe(res => {
      if (res === null) {
        component.yourScore = 'Oops, looks like you got here by accident. Take the quiz by clicking the button below.';
      } else if (res.score >= 0 && res.score <= 12) {
        component.score = res.score;
        component.yourScore = 'Your score is: ' + res.score.toString();
      } else {
        component.yourScore = 'Sorry. Something went wrong. Please click the button below to retake the test.';
      }});

    fixture.detectChanges();

    expect(component.score).toEqual(4);
    expect(spy).toHaveBeenCalled();
    expect(component.yourScore).toEqual('Your score is: 4');
    expect(content.innerHTML).toContain(component.bad);
  });

  it('should the navigation fails or the user navigates to the page themselves, the appropriate HTML is displayed', () => {
    const route = activatedRouteMock.paramMap;
    const spy = spyOn(activatedRouteMock.paramMap, 'subscribe').and.callThrough();

    route.subscribe(res => {
      res = null;
      if (res === null) {
        component.yourScore = 'Oops, looks like you got here by accident. Take the quiz by clicking the button below.';
      } else if (res.score >= 0 && res.score <= 12) {
        component.score = res.score;
        component.yourScore = 'Your score is: ' + res.score.toString();
      } else {
        component.yourScore = 'Sorry. Something went wrong. Please click the button below to retake the test.';
      }});

    fixture.detectChanges();

    expect(component.score).toBeUndefined();
    expect(spy).toHaveBeenCalled();
    expect(component.yourScore).toEqual('Oops, looks like you got here by accident. Take the quiz by clicking the button below.');
  });

  it('should the navigation fails or the user navigates to the page themselves, the appropriate HTML is displayed', () => {
    const route = activatedRouteMock.paramMap;
    const spy = spyOn(activatedRouteMock.paramMap, 'subscribe').and.callThrough();

    route.subscribe(res => {
      res.score = 101;
      if (res === null) {
        component.yourScore = 'Oops, looks like you got here by accident. Take the quiz by clicking the button below.';
      } else if (res.score >= 0 && res.score <= 12) {
        component.score = res.score;
        component.yourScore = 'Your score is: ' + res.score.toString();
      } else {
        component.yourScore = 'Sorry. Something went wrong. Please click the button below to retake the test.';
      }});

    fixture.detectChanges();

    expect(component.score).toBeUndefined();
    expect(spy).toHaveBeenCalled();
    expect(component.yourScore).toEqual('Sorry. Something went wrong. Please click the button below to retake the test.');
  });

  it('unsubscribes when destroyed', () => {
    component.subscription = new Subscription();
    spyOn(component.subscription, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();

    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});
