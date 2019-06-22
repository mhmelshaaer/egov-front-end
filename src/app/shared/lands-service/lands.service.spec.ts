import { TestBed } from '@angular/core/testing';

import { LandsService } from './lands.service';

describe('LandsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LandsService = TestBed.get(LandsService);
    expect(service).toBeTruthy();
  });
});
