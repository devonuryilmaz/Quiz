import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacetofaceSeviyeComponent } from './facetoface-seviye.component';

describe('FacetofaceSeviyeComponent', () => {
  let component: FacetofaceSeviyeComponent;
  let fixture: ComponentFixture<FacetofaceSeviyeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacetofaceSeviyeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetofaceSeviyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
