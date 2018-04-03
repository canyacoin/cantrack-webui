import { TestBed, inject } from '@angular/core/testing';

import { ContractDataService } from './contract-data.service';

describe('ContractDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractDataService]
    });
  });

  it('should be created', inject([ContractDataService], (service: ContractDataService) => {
    expect(service).toBeTruthy();
  }));
});
