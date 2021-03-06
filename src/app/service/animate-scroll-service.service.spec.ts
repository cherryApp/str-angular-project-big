import { TestBed } from '@angular/core/testing';

import { AnimateScrollServiceService } from './animate-scroll-service.service';

describe('AnimateScrollServiceService', () => {
  let service: AnimateScrollServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimateScrollServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
