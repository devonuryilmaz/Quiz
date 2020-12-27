import { TestBed } from '@angular/core/testing';

import { OturumService } from './oturum.service';

describe('OturumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OturumService = TestBed.get(OturumService);
    expect(service).toBeTruthy();
  });
});
