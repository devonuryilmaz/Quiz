import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeviyelerGazecastComponent } from './seviyeler-gazecast.component';

describe('SeviyelerGazecastComponent', () => {
  let component: SeviyelerGazecastComponent;
  let fixture: ComponentFixture<SeviyelerGazecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeviyelerGazecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeviyelerGazecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
