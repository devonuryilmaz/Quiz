import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GazeComponent } from './gaze.component';

describe('GazeComponent', () => {
  let component: GazeComponent;
  let fixture: ComponentFixture<GazeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GazeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
