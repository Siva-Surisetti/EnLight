import { TestBed } from '@angular/core/testing';

import { SidenavToggleService } from './sidenav-toggle.service';

describe('SidenavToggleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SidenavToggleService = TestBed.get(SidenavToggleService);
    expect(service).toBeTruthy();
  });

  it('should emit null value by sideNavToggleSubject', () => {
    const service: SidenavToggleService = TestBed.get(SidenavToggleService);
    const subjectSpy = spyOn(service.sideNavToggleSubject, 'next');
    service.toggle();
    expect(subjectSpy).toHaveBeenCalledWith(null);
  });
});
