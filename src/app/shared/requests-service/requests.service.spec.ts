import { TestBed } from '@angular/core/testing';

import { RequestsService } from './requests.service';

describe('TransactionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestsService = TestBed.get(RequestsService);
    expect(service).toBeTruthy();
  });
});
