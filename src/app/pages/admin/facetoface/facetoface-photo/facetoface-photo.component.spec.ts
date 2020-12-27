import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacetofacePhotoComponent } from './facetoface-photo.component';

describe('FacetofacePhotoComponent', () => {
  let component: FacetofacePhotoComponent;
  let fixture: ComponentFixture<FacetofacePhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacetofacePhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetofacePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
