import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GazeSeviyeComponent } from './gaze-seviye.component';

describe('GazeSeviyeComponent', () => {
  let component: GazeSeviyeComponent;
  let fixture: ComponentFixture<GazeSeviyeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GazeSeviyeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GazeSeviyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
