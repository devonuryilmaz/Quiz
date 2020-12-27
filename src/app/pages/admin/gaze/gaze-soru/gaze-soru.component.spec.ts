import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GazeSoruComponent } from './gaze-soru.component';

describe('GazeSoruComponent', () => {
  let component: GazeSoruComponent;
  let fixture: ComponentFixture<GazeSoruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GazeSoruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GazeSoruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
