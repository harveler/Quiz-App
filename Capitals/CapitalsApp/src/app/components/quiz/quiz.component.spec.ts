import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DummyComponent } from 'src/app/testing/mock.components.specs';
import { QuizComponent } from './quiz.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const router = {
  navigateByUrl: jasmine.createSpy('navigateByUrl')
};

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuizComponent,
        DummyComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'questions', component: DummyComponent, pathMatch: 'full' },
        ]),
      ],
      providers: [ { provide: Router, useValue: router}],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to questionsComponent when user chooses difficulty', () => {
    // arrange
    fixture.detectChanges();
    spyOn(component, 'getQuestions').and.callThrough();
    const button = fixture.debugElement.query(By.css('#easy')).nativeElement;

    // act
    fixture.detectChanges();
    button.click();
    fixture.detectChanges();

    // assert
    expect(router.navigateByUrl).toHaveBeenCalledWith('questions', { state: { difficulty: 1 } });
    expect(component.getQuestions).toHaveBeenCalled();
  });
});
