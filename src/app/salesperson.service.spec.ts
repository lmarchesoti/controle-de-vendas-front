import { TestBed } from '@angular/core/testing';

import { SalespersonService } from './salesperson.service';

describe('SalespersonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalespersonService = TestBed.get(SalespersonService);
    expect(service).toBeTruthy();
  });
});
