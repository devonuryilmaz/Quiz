import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeviyelerPageComponent } from './seviyeler-page.component';

describe('SeviyelerPageComponent', () => {
  let component: SeviyelerPageComponent;
  let fixture: ComponentFixture<SeviyelerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeviyelerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeviyelerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
