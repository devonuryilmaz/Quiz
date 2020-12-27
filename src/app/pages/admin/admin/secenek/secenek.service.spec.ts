import { TestBed } from '@angular/core/testing';

import { SecenekService } from './secenek.service';

describe('SecenekService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecenekService = TestBed.get(SecenekService);
    expect(service).toBeTruthy();
  });
});
