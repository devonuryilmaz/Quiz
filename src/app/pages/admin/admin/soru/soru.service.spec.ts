import { TestBed } from '@angular/core/testing';

import { SoruService } from './soru.service';

describe('SoruService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoruService = TestBed.get(SoruService);
    expect(service).toBeTruthy();
  });
});
