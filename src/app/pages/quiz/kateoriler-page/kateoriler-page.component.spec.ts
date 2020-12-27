import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KateorilerPageComponent } from './kateoriler-page.component';

describe('KateorilerPageComponent', () => {
  let component: KateorilerPageComponent;
  let fixture: ComponentFixture<KateorilerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KateorilerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KateorilerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
