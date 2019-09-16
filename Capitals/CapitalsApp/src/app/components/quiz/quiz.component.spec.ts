import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QuizComponent } from './quiz.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DummyComponent } from 'src/app/testing/mock.components.specs';

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
    fixture.detectChanges();
    spyOn(component, 'getQuestions').and.callThrough();
    const button = fixture.debugElement.query(By.css('#easy')).nativeElement;
    fixture.detectChanges();

    button.click();
    fixture.detectChanges();

    expect(router.navigateByUrl).toHaveBeenCalledWith('questions', { state: { difficulty: 1 } });
    expect(component.getQuestions).toHaveBeenCalled();
  });
});
