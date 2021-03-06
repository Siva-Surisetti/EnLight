import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenav, MatSidenavModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SIDENAV_CONST } from '@workspace/constants';
import { SidenavToggleService } from '@workspace/libs/services';
import { SideNavComponent } from './side-nav.component';
import { BooksFacade } from '../../+state/books.facade';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;
  let sideNav: MatSidenav;

  const fakeBooksFacade = {
    cartBooks$: new Observable(ob => {
      ob.next([]);
    }),
    collectionBooks$: new Observable(ob => {
      ob.next([]);
    })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        StoreModule.forRoot({}),
        RouterTestingModule,
        MatSidenavModule,
        BrowserAnimationsModule
      ],
      declarations: [SideNavComponent],
      providers: [
        { provide: BooksFacade, useValue: fakeBooksFacade },
        SidenavToggleService,
        MatSidenav
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    sideNav = fixture.debugElement.query(By.directive(MatSidenav))
      .componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update cart badge value to 2 when there are two books in cart', () => {
    spyOn(sideNav, 'open');
    component['booksFacade'].cartBooks$ = new Observable(ob => {
      ob.next([{}, {}]);
    });
    component['showBadgeWhenBooksAddedToCart']();
    component.navigationList.forEach(list => {
      if (list['desc'] === SIDENAV_CONST.OPTION_CART)
        expect(list['badgeValue']).toEqual(2);
    });
  });
  it('should update collection badge value to 2 when there are two books in collection', () => {
    spyOn(sideNav, 'open');
    component['booksFacade'].collectionBooks$ = new Observable(ob => {
      ob.next([{}, {}]);
    });
    component['showBadgeWhenBooksAddedToCollection']();
    component.navigationList.forEach(list => {
      if (list['desc'] === SIDENAV_CONST.OPTION_COLLECTION)
        expect(list['badgeValue']).toEqual(2);
    });
  });
});
