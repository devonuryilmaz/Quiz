import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GazeSecenekComponent } from './gaze-secenek.component';

describe('GazeSecenekComponent', () => {
  let component: GazeSecenekComponent;
  let fixture: ComponentFixture<GazeSecenekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GazeSecenekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GazeSecenekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
