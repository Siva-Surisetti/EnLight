import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { BooksPartialState } from './books.reducer';
import { booksQuery } from './books.selectors';
import {
  LoadBooks,
  BookSelected,
  AddToCart,
  AddToCollection,
  ClearCart,
  AddSearchKey
} from './books.actions';

@Injectable()
export class BooksFacade {
  loaded$ = this.store.pipe(select(booksQuery.getLoaded));
  allBooks$ = this.store.pipe(select(booksQuery.getAllBooks));
  selectedBook$ = this.store.pipe(select(booksQuery.getSelectedBook));
  cartBooks$ = this.store.pipe(select(booksQuery.getCartBooks));
  collectionBooks$ = this.store.pipe(select(booksQuery.getCollectionBooks));
  selectedBookId$ = this.store.pipe(select(booksQuery.getSelectedId));

  constructor(private store: Store<BooksPartialState>) {}

  loadBooksToStore(searchKey) {
    this.dispatchSearchKeyToStore(searchKey);
    this.store.dispatch(new LoadBooks(searchKey));
  }
  dispatchSelectedIdToStore(selecedId) {
    this.store.dispatch(new BookSelected(selecedId));
  }
  dispatchBooksToCartStore(book) {
    this.store.dispatch(new AddToCart(book));
  }
  dispatchBooksToCollection(collectionItem) {
    this.store.dispatch(new AddToCollection(collectionItem));
  }
  clearShoppingCart() {
    this.store.dispatch(new ClearCart());
  }
  dispatchSearchKeyToStore(searchKey) {
    this.store.dispatch(new AddSearchKey(searchKey));
  }
}
