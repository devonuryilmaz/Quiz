import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaporUserComponent } from './rapor-user.component';

describe('RaporUserComponent', () => {
  let component: RaporUserComponent;
  let fixture: ComponentFixture<RaporUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaporUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaporUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
