import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyQuestionsComponent } from './easy-questions.component';

describe('EasyQuestionsComponent', () => {
  let component: EasyQuestionsComponent;
  let fixture: ComponentFixture<EasyQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EasyQuestionsComponent ]
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
});
