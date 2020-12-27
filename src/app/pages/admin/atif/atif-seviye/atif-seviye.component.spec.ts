import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtifSeviyeComponent } from './atif-seviye.component';

describe('AtifSeviyeComponent', () => {
  let component: AtifSeviyeComponent;
  let fixture: ComponentFixture<AtifSeviyeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtifSeviyeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtifSeviyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
