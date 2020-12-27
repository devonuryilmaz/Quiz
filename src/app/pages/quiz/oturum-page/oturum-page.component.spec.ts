import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OturumPageComponent } from './oturum-page.component';

describe('OturumPageComponent', () => {
  let component: OturumPageComponent;
  let fixture: ComponentFixture<OturumPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OturumPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OturumPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
