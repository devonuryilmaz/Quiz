import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SorularPageComponent } from './sorular-page.component';

describe('SorularPageComponent', () => {
  let component: SorularPageComponent;
  let fixture: ComponentFixture<SorularPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SorularPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SorularPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
