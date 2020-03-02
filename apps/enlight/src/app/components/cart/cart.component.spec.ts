import { Router } from '@angular/router';
import { MatCardTitle } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { EllipsisPipe, AddCommasPipe } from '@workspace/pipes';
import { BooksFacade } from '../../+state/books.facade';
import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let router: Router;
  let booksFacade: BooksFacade;

  const fakeBooksFacade = {
    cartBooks$: of({}),
    dispatchSelectedIdToStore: function(arg) {},
    removeFromCart: function(id) {}
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [StoreModule.forRoot({}), RouterTestingModule.withRoutes([])],
      declarations: [CartComponent, MatCardTitle, EllipsisPipe, AddCommasPipe],
      providers: [{ provide: BooksFacade, useValue: fakeBooksFacade }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    booksFacade = TestBed.get(BooksFacade);
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component.cartBooks).toEqual({});
  });

  describe('proceedToPurchase', () => {
    it('should navigate to billing page', () => {
      const routerNavigationSpy = spyOn<any>(router, 'navigate');
      component.onPurchase();
      expect(routerNavigationSpy).toHaveBeenCalledWith(['billing']);
    });
  });

  describe('onBookSelect', () => {
    let routerNavigationSpy;
    let booksFacadeSpy;
    let id;
    beforeEach(() => {
      routerNavigationSpy = spyOn<any>(router, 'navigate');
      booksFacadeSpy = spyOn<any>(booksFacade, 'dispatchSelectedIdToStore');
      id = '1';
    });

    it('should navigate to detail page', () => {
      component.onBookSelect(id);
      expect(routerNavigationSpy).toHaveBeenCalledWith(['detail']);
    });

    it('should dispatch selected id to store', () => {
      component.onBookSelect(id);
      expect(booksFacadeSpy).toHaveBeenCalledWith(id);
    });

    it('should remove selected item from cart', () => {
      const removeFromCartSpy = spyOn<any>(booksFacade, 'removeFromCart');
      const eventMock = { stopPropagation: function() {} };
      component.removeFromCart(id, eventMock);
      expect(removeFromCartSpy).toHaveBeenCalledWith(id);
    });
  });
});
