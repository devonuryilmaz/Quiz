import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtifKategoriComponent } from './atif-kategori.component';

describe('AtifKategoriComponent', () => {
  let component: AtifKategoriComponent;
  let fixture: ComponentFixture<AtifKategoriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtifKategoriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtifKategoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
