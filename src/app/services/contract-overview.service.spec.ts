import { TestBed } from '@angular/core/testing';

import { ContractOverviewService } from './contract-overview.service';

describe('ContractOverviewService', () => {
  let service: ContractOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
