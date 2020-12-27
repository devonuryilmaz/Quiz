import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KullaniciIlerlemeComponent } from './kullanici-ilerleme.component';

describe('KullaniciIlerlemeComponent', () => {
  let component: KullaniciIlerlemeComponent;
  let fixture: ComponentFixture<KullaniciIlerlemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KullaniciIlerlemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KullaniciIlerlemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
