import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeviyeComponent } from './seviye.component';

describe('SeviyeComponent', () => {
  let component: SeviyeComponent;
  let fixture: ComponentFixture<SeviyeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeviyeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeviyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
