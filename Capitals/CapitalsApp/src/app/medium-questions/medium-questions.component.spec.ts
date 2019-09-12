import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumQuestionsComponent } from './medium-questions.component';

describe('MediumQuestionsComponent', () => {
  let component: MediumQuestionsComponent;
  let fixture: ComponentFixture<MediumQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediumQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediumQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
