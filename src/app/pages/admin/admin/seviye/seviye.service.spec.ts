import { TestBed } from '@angular/core/testing';

import { SeviyeService } from './seviye.service';

describe('SeviyeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeviyeService = TestBed.get(SeviyeService);
    expect(service).toBeTruthy();
  });
});
