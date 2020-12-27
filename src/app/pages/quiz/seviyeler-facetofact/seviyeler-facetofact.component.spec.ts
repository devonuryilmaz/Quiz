import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeviyelerFacetofactComponent } from './seviyeler-facetofact.component';

describe('SeviyelerFacetofactComponent', () => {
  let component: SeviyelerFacetofactComponent;
  let fixture: ComponentFixture<SeviyelerFacetofactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeviyelerFacetofactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeviyelerFacetofactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
