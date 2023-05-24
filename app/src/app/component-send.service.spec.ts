import { TestBed } from '@angular/core/testing';

import { ComponentSendService } from './component-send.service';

describe('ComponentSendService', () => {
  let service: ComponentSendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentSendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
