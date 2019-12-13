import { TestBed } from '@angular/core/testing';

import { SidenavToggleService } from './sidenav-toggle.service';

describe('SidenavToggleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SidenavToggleService = TestBed.get(SidenavToggleService);
    expect(service).toBeTruthy();
  });
});
