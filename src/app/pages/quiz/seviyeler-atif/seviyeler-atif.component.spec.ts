import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeviyelerAtifComponent } from './seviyeler-atif.component';

describe('SeviyelerAtifComponent', () => {
  let component: SeviyelerAtifComponent;
  let fixture: ComponentFixture<SeviyelerAtifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeviyelerAtifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeviyelerAtifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
