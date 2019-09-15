import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QuizComponent } from './quiz.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

const router =  {
  navigate: jasmine.createSpy('navigate')
};

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuizComponent,
      ],
      imports: [
        RouterTestingModule,
    ],
    providers: [{provide: Router, useValue: router}]
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

  it('should redirect to easyQuestionsComponent when user chooses easy difficulty', () => {
    fixture.detectChanges();
    spyOn(component, 'getEasyQuestions').and.callThrough();
    const button = fixture.debugElement.query(By.css('#easy')).nativeElement;
    fixture.detectChanges();

    button.click();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['easy']);
    expect(component.getEasyQuestions).toHaveBeenCalled();
  });

  it('should redirect to mediumQuestionsComponent when user chooses medium difficulty', () => {
    fixture.detectChanges();
    spyOn(component, 'getMediumQuestions').and.callThrough();
    const button = fixture.debugElement.query(By.css('#medium')).nativeElement;
    fixture.detectChanges();

    button.click();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['medium']);
    expect(component.getMediumQuestions).toHaveBeenCalled();
  });

  it('should redirect to hardQuestionsComponent when user chooses hard difficulty', () => {
    fixture.detectChanges();
    spyOn(component, 'getHardQuestions').and.callThrough();
    const button = fixture.debugElement.query(By.css('#hard')).nativeElement;
    fixture.detectChanges();

    button.click();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['hard']);
    expect(component.getHardQuestions).toHaveBeenCalled();
  });
});
