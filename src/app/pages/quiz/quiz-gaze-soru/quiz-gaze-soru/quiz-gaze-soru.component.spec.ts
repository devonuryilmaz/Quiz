import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizGazeSoruComponent } from './quiz-gaze-soru.component';

describe('QuizGazeSoruComponent', () => {
  let component: QuizGazeSoruComponent;
  let fixture: ComponentFixture<QuizGazeSoruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizGazeSoruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizGazeSoruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
