import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { EllipsisPipe, AddCommasPipe } from '@workspace/pipes';
import { DetailComponent } from './detail.component';
import { BooksFacade } from '../../+state/books.facade';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let booksFacade: BooksFacade;
  let router: Router;

  const fakeBooksFacade = {
    selectedBook$: of(null),
    cartBooks$: of({}, {}),
    collectionBooks$: of({}, {}),
    dispatchBooksToCartStore: function(arg) {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [StoreModule.forRoot({}), RouterTestingModule.withRoutes([])],
      declarations: [DetailComponent, EllipsisPipe, AddCommasPipe],
      providers: [{ provide: BooksFacade, useValue: fakeBooksFacade }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    booksFacade = TestBed.get(BooksFacade);
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component.selectedBook).toEqual(null);
  });

  describe('on addToCart call', () => {
    let routerNavigationSpy;
    let booksFacadeSpy;
    let book;
    beforeEach(() => {
      routerNavigationSpy = spyOn<any>(router, 'navigate');
      booksFacadeSpy = spyOn<any>(booksFacade, 'dispatchBooksToCartStore');
      book = { bookid: '123' };
    });

    it('should navigate to home page', () => {
      component.addToCart();
      expect(routerNavigationSpy).toHaveBeenCalledWith(['home']);
    });

    it('should dispatch selected book to cart store', () => {
      component.selectedBook = book;
      component.addToCart();
      expect(booksFacadeSpy).toHaveBeenCalledWith(book);
    });
  });

  describe('on purchaseBook call', () => {
    let routerNavigationSpy;

    beforeEach(() => {
      routerNavigationSpy = spyOn<any>(router, 'navigate');
    });

    it('should navigate to billing page', () => {
      component.purchaseBook();
      expect(routerNavigationSpy).toHaveBeenCalledWith(['billing']);
    });
  });

  describe('checkIfBookExistsInCart', () => {
    beforeEach(() => {
      component.selectedBook = { id: '123' };
      component.cartBooks = [{ id: '123' }, { id: '234' }];
    });

    it('should set bookExistsInCart property to true if selected book exists in cart', () => {
      component.checkIfBookExistsInCart();
      expect(component.bookExistsInCart).toBe(true);
    });
  });

  describe('checkIfBookExistsInCollection', () => {
    beforeEach(() => {
      component.selectedBook = { id: '123' };
      component.collectionBooks = [
        { bookInfo: { id: '123' } },
        { bookInfo: { id: '234' } }
      ];
    });

    it('should set bookExistsInCollection property to true if selected book exists in collection', () => {
      component.checkIfBookExistsInCollection();
      expect(component.bookExistsInCollection).toBe(true);
    });
  });
});
