import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RouteTrackerService } from './route-tracker.service';

describe('RouteTrackerService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    })
  );

  it('should be created', () => {
    const service: RouteTrackerService = TestBed.get(RouteTrackerService);
    expect(service).toBeTruthy();
  });

  it('should return previous route/url when getPreviousUrl is called', () => {
    const service: RouteTrackerService = TestBed.get(RouteTrackerService);
    service.previousUrl = '/test';
    const returnUrl = service.getPreviousUrl();
    expect(returnUrl).toEqual('/test');
  });
});
