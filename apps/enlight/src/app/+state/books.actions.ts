import { Action } from '@ngrx/store';
import { Entity } from './books.reducer';

export enum BooksActionTypes {
  LoadBooks = '[Books] Load Books',
  BooksLoaded = '[Books] Books Loaded',
  BooksLoadError = '[Books] Books Load Error',
  BookSelected = '[Books] Book Selected',
  AddToCart = '[Books] Add Books to Cart',
  AddToCollection = '[Books] Add Books to Collection',
  ClearCart = '[Books] Clear Cart',
  RemoveFromCart = '[Books] Remove From Cart',
  AddSearchKey = '[Books] Add Search Key to Story'
}

export class LoadBooks implements Action {
  readonly type = BooksActionTypes.LoadBooks;
  constructor(public payload: any) {}
}

export class BooksLoadError implements Action {
  readonly type = BooksActionTypes.BooksLoadError;
  constructor(public payload: any) {}
}

export class BooksLoaded implements Action {
  readonly type = BooksActionTypes.BooksLoaded;
  constructor(public payload: Entity[]) {}
}

export class BookSelected implements Action {
  readonly type = BooksActionTypes.BookSelected;
  constructor(public payload: string) {}
}

export class AddToCart implements Action {
  readonly type = BooksActionTypes.AddToCart;
  constructor(public payload: any) {}
}

export class AddToCollection implements Action {
  readonly type = BooksActionTypes.AddToCollection;
  constructor(public payload: any) {}
}

export class ClearCart implements Action {
  readonly type = BooksActionTypes.ClearCart;
  constructor() {}
}

export class RemoveFromCart implements Action {
  readonly type = BooksActionTypes.RemoveFromCart;
  constructor(public payload: string) {}
}

export class AddSearchKey implements Action {
  readonly type = BooksActionTypes.AddSearchKey;
  constructor(public payload: any) {}
}

export type BooksAction =
  | LoadBooks
  | BooksLoaded
  | BooksLoadError
  | BookSelected
  | AddToCart
  | AddToCollection
  | ClearCart
  | RemoveFromCart
  | AddSearchKey;

export const fromBooksActions = {
  LoadBooks,
  BooksLoaded,
  BooksLoadError,
  BookSelected,
  AddToCart,
  AddToCollection,
  ClearCart,
  RemoveFromCart,
  AddSearchKey
};
