import { TestBed } from '@angular/core/testing';

import { RouteTrackerService } from './route-tracker.service';

describe('RouteTrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteTrackerService = TestBed.get(RouteTrackerService);
    expect(service).toBeTruthy();
  });
});
