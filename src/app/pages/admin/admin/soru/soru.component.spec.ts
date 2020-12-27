import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoruComponent } from './soru.component';

describe('SoruComponent', () => {
  let component: SoruComponent;
  let fixture: ComponentFixture<SoruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
