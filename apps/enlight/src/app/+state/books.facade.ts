import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { BooksPartialState } from './books.reducer';
import { booksQuery } from './books.selectors';
import {
  LoadBooks,
  BooksSelected,
  AddToCart,
  AddToCollection,
  ClearCart,
  UpdateBillingInfo
} from './books.actions';

@Injectable()
export class BooksFacade {
  loaded$ = this.store.pipe(select(booksQuery.getLoaded));
  allBooks$ = this.store.pipe(select(booksQuery.getAllBooks));
  selectedBooks$ = this.store.pipe(select(booksQuery.getSelectedBooks));
  cartBooks$ = this.store.pipe(select(booksQuery.getCartBooks));
  collectionBooks$ = this.store.pipe(select(booksQuery.getCollectionBooks));

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
  dispatchBooksToCollection(collectionItem) {
    this.store.dispatch(new AddToCollection(collectionItem));
  }
  dispatchBillingDetails(details) {
    this.store.dispatch(new UpdateBillingInfo(details));
  }
  clearShoppingCart() {
    this.store.dispatch(new ClearCart());
  }
}
