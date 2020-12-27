import { TestBed } from '@angular/core/testing';

import { BindDataService } from './bind-data.service';

describe('BindDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BindDataService = TestBed.get(BindDataService);
    expect(service).toBeTruthy();
  });
});
