import { TestBed } from '@angular/core/testing';

import { EngineeringOfficesService } from './engineering-offices.service';

describe('EngineeringOfficesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EngineeringOfficesService = TestBed.get(EngineeringOfficesService);
    expect(service).toBeTruthy();
  });
});
