import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingComponent } from './billing.component';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { BooksFacade } from '../../+state/books.facade';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule, MatSnackBar } from '@angular/material';
import { RouteTrackerService } from '@workspace/libs/services';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
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
        MatSnackBarModule
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
  describe('onSubmit funnctionality', () => {
    it('should open snackbar when page is submitted', () => {
      const snackbarOpenspy = spyOn(snackBar, 'open');
      spyOn<any>(component, 'prepareBillingAddressObject');
      spyOn<any>(component, 'addBooksToCollection');
      spyOn<any>(router, 'navigate');
      component.onSubmit();
      expect(snackbarOpenspy).toHaveBeenCalled();
    });
    it('snackbar should be opened with no action', () => {
      const snackbarOpenspy = spyOn(snackBar, 'open');
      component.action = undefined;
      spyOn<any>(component, 'prepareBillingAddressObject');
      spyOn<any>(component, 'addBooksToCollection');
      spyOn<any>(router, 'navigate');
      component.onSubmit();
      expect(snackbarOpenspy).toHaveBeenCalled();
    });
    it('snackbar should be opened with autohide false', () => {
      const snackbarOpenspy = spyOn(snackBar, 'open');
      component.setAutoHide = false;
      spyOn<any>(component, 'prepareBillingAddressObject');
      spyOn<any>(component, 'addBooksToCollection');
      spyOn<any>(router, 'navigate');
      component.onSubmit();
      expect(snackbarOpenspy).toHaveBeenCalled();
    });
  });
  describe('addBooksToCollection funnctionality', () => {
    it('should add selected book collection when previousUrl is details', () => {
      const addSelectedBookToMyCollectionspy = spyOn<any>(
        component,
        'addSelectedBookToMyCollection'
      );
      component.previousUrl = '/' + BOOKS_CONSTANTS.DETAIL;
      component['addBooksToCollection']();
      expect(addSelectedBookToMyCollectionspy).toHaveBeenCalled();
    });
    it('should add cart books to collection when previousUrl is not details', () => {
      const addCartBooksToMyCollectionspy = spyOn<any>(
        component,
        'addCartBooksToMyCollection'
      );
      component.previousUrl = '/' + BOOKS_CONSTANTS.COLLECTION;
      component['addBooksToCollection']();
      expect(addCartBooksToMyCollectionspy).toHaveBeenCalled();
    });
  });

  describe('addCartBooksToMyCollection funnctionality', () => {
    it('for sample cartbooks array', () => {
      const sampleBook = { bookId: 1 };
      component.cartBooks = [sampleBook];
      component['addCartBooksToMyCollection']();
      expect(component.collection.bookInfo).toEqual(sampleBook);
    });
  });
  describe('addSelectedBookToMyCollection funnctionality', () => {
    it('when previousUrl is details', () => {
      const sampleBook = { bookId: 1 };
      component.selectedBook = sampleBook;
      component['addSelectedBookToMyCollection']();
      expect(component.collection.bookInfo).toEqual(sampleBook);
    });
  });
  describe('addSelectedBookToMyCollection funnctionality', () => {
    it('for sample selected book', () => {
      const sampleBook = { bookId: 1 };
      component.selectedBook = sampleBook;
      component['addSelectedBookToMyCollection']();
      expect(component.collection.bookInfo).toEqual(sampleBook);
    });
  });
  describe('prepareBillingAddressObject funnctionality', () => {
    it('for sample name', () => {
      const sampleName = 'TmobileCustomer';
      component.loginForm.value.name = sampleName;
      component['prepareBillingAddressObject']();
      expect(component.billing.name).toEqual(sampleName);
    });
  });
});
