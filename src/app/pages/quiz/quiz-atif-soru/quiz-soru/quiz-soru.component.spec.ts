import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSoruComponent } from './quiz-soru.component';

describe('QuizSoruComponent', () => {
  let component: QuizSoruComponent;
  let fixture: ComponentFixture<QuizSoruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizSoruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizSoruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
