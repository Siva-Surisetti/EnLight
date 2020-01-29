import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';

import { RouteTrackerService } from '@workspace/libs/services';
import { BillingComponent } from './billing.component';
import { BooksFacade } from '../../+state/books.facade';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BOOKS_CONSTANTS } from '../../constants/books_constants';

describe('BillingComponent', () => {
  let component: BillingComponent;
  let fixture: ComponentFixture<BillingComponent>;
  let booksFacade: BooksFacade;
  let routeService: RouteTrackerService;
  let snackBar: MatSnackBar;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        StoreModule.forRoot({}),
        RouterTestingModule.withRoutes([]),
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      declarations: [BillingComponent],
      providers: [
        {
          provide: BooksFacade,
          useValue: {
            selectedBook$: new Observable(ob => {
              ob.next({
                storeId: 1234
              });
            }),
            cartBooks$: new Observable(ob => {
              ob.next({
                storeId: 1234
              });
            }),
            clearShoppingCart: function() {},
            dispatchBooksToCollection: function(arg) {}
          }
        },
        {
          provide: RouteTrackerService,
          useValue: {
            getPreviousUrl: res => {}
          }
        },
        MatSnackBar
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    booksFacade = TestBed.get(BooksFacade);
    booksFacade.selectedBook$ = of({});
    routeService = TestBed.get(RouteTrackerService);
    snackBar = TestBed.get(MatSnackBar);
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    let routerNavigationSpy;
    beforeEach(() => {
      spyOn<any>(component, 'prepareBillingAddressObject');
      spyOn<any>(component, 'addBooksToCollection');
      routerNavigationSpy = spyOn<any>(router, 'navigate');
    });

    it("should open snackbar with title 'Your purchase is successful'", () => {
      const snackbarOpenspy = spyOn(snackBar, 'open');
      component.onSubmit();
      expect(snackbarOpenspy).toHaveBeenCalledWith(
        'Your purchase is successful',
        expect.anything(),
        expect.anything()
      );
    });

    it("should open snackbar with action 'Ok'", () => {
      const snackbarOpenspy = spyOn(snackBar, 'open');

      component.onSubmit();
      expect(snackbarOpenspy).toHaveBeenCalledWith(
        expect.anything(),
        'Ok',
        expect.anything()
      );
    });

    it('should navigate to collections page', () => {
      component.onSubmit();
      expect(routerNavigationSpy).toHaveBeenCalledWith(['collection']);
    });
  });

  describe('prepareConfigObjectForSnackBar', () => {
    it("should display snackbar at verticalPosition 'top'", () => {
      const config = component.getSnackBarConfig();
      expect(config.verticalPosition).toEqual('top');
    });

    it("should display snackbar at horizontalPosition 'center'", () => {
      const config = component.getSnackBarConfig();
      expect(config.horizontalPosition).toEqual('center');
    });

    it('should display snackbar for a duration of 2 seconds', () => {
      const config = component.getSnackBarConfig();
      expect(config.duration).toEqual(2000);
    });
  });

  describe('prepareBillingAddressObject', () => {
    it('should prepare billing address based on form field inputs', () => {
      component.loginForm.value.name = 'TestName';
      component.loginForm.value.email = 'TestEmail';
      component.loginForm.value.phone = '12345';
      component.loginForm.value.address = 'TestAddress';

      component.setBillingAddress();
      expect(component.billing).toEqual({
        name: 'TestName',
        email: 'TestEmail',
        phone: '12345',
        address: 'TestAddress'
      });
    });
  });

  describe('addBooksToCollection', () => {
    it('should call addSelectedBookToMyCollection when previousUrl is details', () => {
      const addSelectedBookToMyCollectionspy = spyOn<any>(
        component,
        'addSelectedBookToMyCollection'
      );
      component.previousUrl = '/' + BOOKS_CONSTANTS.DETAIL;
      component.addBooksToCollection();
      expect(addSelectedBookToMyCollectionspy).toHaveBeenCalled();
    });

    it('should call addCartBooksToMyCollection when previousUrl is not details', () => {
      const addCartBooksToMyCollectionspy = spyOn<any>(
        component,
        'addCartBooksToMyCollection'
      );
      component.previousUrl = '/' + BOOKS_CONSTANTS.COLLECTION;
      component.addBooksToCollection();
      expect(addCartBooksToMyCollectionspy).toHaveBeenCalled();
    });
  });

  describe('addSelectedBookToMyCollection', () => {
    it('should dispatch selected book to ngrx store', () => {
      const dispatchBooksToCollectionSpy = spyOn<any>(
        booksFacade,
        'dispatchBooksToCollection'
      );
      const sampleBook = { bookId: 1 };
      component.selectedBook = sampleBook;
      component.addSelectedBookToMyCollection();
      expect(dispatchBooksToCollectionSpy).toHaveBeenCalledWith({
        billingInfo: {},
        bookInfo: sampleBook
      });
    });
  });

  describe('addCartBooksToMyCollection', () => {
    it('should dispatch cart books to ngrx store', () => {
      const dispatchBooksToCollectionSpy = spyOn<any>(
        booksFacade,
        'dispatchBooksToCollection'
      );
      const sampleBook = { bookId: 1 };
      component.cartBooks = [sampleBook];
      component.addCartBooksToMyCollection();
      expect(dispatchBooksToCollectionSpy).toHaveBeenCalledWith({
        billingInfo: {},
        bookInfo: sampleBook
      });
    });
  });
});
