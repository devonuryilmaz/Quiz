import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OturumListComponent } from './oturum-list.component';

describe('OturumListComponent', () => {
  let component: OturumListComponent;
  let fixture: ComponentFixture<OturumListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OturumListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OturumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
