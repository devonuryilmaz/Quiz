import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacetofaceComponent } from './facetoface.component';

describe('FacetofaceComponent', () => {
  let component: FacetofaceComponent;
  let fixture: ComponentFixture<FacetofaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacetofaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetofaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
