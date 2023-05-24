import { TestBed } from '@angular/core/testing';

import { TestowyService } from './testowy.service';

describe('TestowyService', () => {
  let service: TestowyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestowyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
