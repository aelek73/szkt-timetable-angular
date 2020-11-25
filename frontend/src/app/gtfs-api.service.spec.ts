import { TestBed } from '@angular/core/testing';

import { GtfsApiService } from './gtfs-api.service';

describe('GtfsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GtfsApiService = TestBed.get(GtfsApiService);
    expect(service).toBeTruthy();
  });
});
