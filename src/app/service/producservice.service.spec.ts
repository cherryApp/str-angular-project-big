import { TestBed } from '@angular/core/testing';
import { ProducserviceService } from './producservice.service';

describe('ProducserviceService', () => {
  let service: ProducserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProducserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
