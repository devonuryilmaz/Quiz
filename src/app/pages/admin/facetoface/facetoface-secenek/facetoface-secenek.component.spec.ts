import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacetofaceSecenekComponent } from './facetoface-secenek.component';

describe('FacetofaceSecenekComponent', () => {
  let component: FacetofaceSecenekComponent;
  let fixture: ComponentFixture<FacetofaceSecenekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacetofaceSecenekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetofaceSecenekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
