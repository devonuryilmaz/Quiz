import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OturumUpdateComponent } from './oturum-update.component';

describe('OturumUpdateComponent', () => {
  let component: OturumUpdateComponent;
  let fixture: ComponentFixture<OturumUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OturumUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OturumUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
