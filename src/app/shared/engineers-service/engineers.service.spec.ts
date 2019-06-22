import { TestBed } from '@angular/core/testing';

import { EngineersService } from './engineers.service';

describe('EngineersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EngineersService = TestBed.get(EngineersService);
    expect(service).toBeTruthy();
  });
});
