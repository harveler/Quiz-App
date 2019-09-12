import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardQuestionsComponent } from './hard-questions.component';

describe('HardQuestionsComponent', () => {
  let component: HardQuestionsComponent;
  let fixture: ComponentFixture<HardQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
