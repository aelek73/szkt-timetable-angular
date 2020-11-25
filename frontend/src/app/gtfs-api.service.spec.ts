import { TestBed } from '@angular/core/testing';

import { GTFSAPIService } from './gtfs-api.service';

describe('GtfsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GTFSAPIService = TestBed.get(GTFSAPIService);
    expect(service).toBeTruthy();
  });
});
