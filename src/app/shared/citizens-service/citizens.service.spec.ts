import { TestBed } from '@angular/core/testing';

import { CitizensService } from './citizens.service';

describe('CitizensService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CitizensService = TestBed.get(CitizensService);
    expect(service).toBeTruthy();
  });
});
