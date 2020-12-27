import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtifSoruComponent } from './atif-soru.component';

describe('AtifSoruComponent', () => {
  let component: AtifSoruComponent;
  let fixture: ComponentFixture<AtifSoruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtifSoruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtifSoruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
