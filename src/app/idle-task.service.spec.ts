import { TestBed, inject } from '@angular/core/testing';

import { IdleTaskService } from './idle-task.service';

describe('IdleTaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdleTaskService]
    });
  });

  it('should be created', inject([IdleTaskService], (service: IdleTaskService) => {
    expect(service).toBeTruthy();
  }));
});
