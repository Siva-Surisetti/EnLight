import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { BooksPartialState } from './books.reducer';
import { booksQuery } from './books.selectors';
import { LoadBooks, BooksSelected, AddToCart } from './books.actions';

@Injectable()
export class BooksFacade {
  loaded$ = this.store.pipe(select(booksQuery.getLoaded));
  allBooks$ = this.store.pipe(select(booksQuery.getAllBooks));
  selectedBooks$ = this.store.pipe(select(booksQuery.getSelectedBooks));
  cartBooks$ = this.store.pipe(select(booksQuery.getCartBooks));

  constructor(private store: Store<BooksPartialState>) {}
  dispatchSearchKeyToStore(searchKey) {
    this.store.dispatch(new LoadBooks(searchKey));
  }
  dispatchSelectedIdToStore(selecedId) {
    this.store.dispatch(new BooksSelected(selecedId));
  }
  dispatchBookIdToCartStore(bookId) {
    this.store.dispatch(new AddToCart(bookId));
  }
}
