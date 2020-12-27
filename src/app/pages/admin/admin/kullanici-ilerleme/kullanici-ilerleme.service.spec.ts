import { TestBed } from '@angular/core/testing';

import { KullaniciIlerlemeService } from './kullanici-ilerleme.service';

describe('KullaniciIlerlemeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KullaniciIlerlemeService = TestBed.get(KullaniciIlerlemeService);
    expect(service).toBeTruthy();
  });
});
