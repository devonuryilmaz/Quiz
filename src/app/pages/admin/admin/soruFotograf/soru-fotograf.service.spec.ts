import { TestBed } from '@angular/core/testing';

import { SoruFotografService } from './soru-fotograf.service';

describe('SoruFotografService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoruFotografService = TestBed.get(SoruFotografService);
    expect(service).toBeTruthy();
  });
});
