import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacetoFactSoruComponent } from './faceto-fact-soru.component';

describe('FacetoFactSoruComponent', () => {
  let component: FacetoFactSoruComponent;
  let fixture: ComponentFixture<FacetoFactSoruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacetoFactSoruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetoFactSoruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
