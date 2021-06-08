import { TestBed } from '@angular/core/testing';

import { TskService } from './tsk.service';

describe('TskService', () => {
  let service: TskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
