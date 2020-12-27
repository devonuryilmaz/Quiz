import { TestBed } from '@angular/core/testing';

import { KategoriService } from './kategori.service';

describe('KategoriService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KategoriService = TestBed.get(KategoriService);
    expect(service).toBeTruthy();
  });
});
