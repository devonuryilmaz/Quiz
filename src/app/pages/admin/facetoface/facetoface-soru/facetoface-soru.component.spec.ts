import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacetofaceSoruComponent } from './facetoface-soru.component';

describe('FacetofaceSoruComponent', () => {
  let component: FacetofaceSoruComponent;
  let fixture: ComponentFixture<FacetofaceSoruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacetofaceSoruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetofaceSoruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
