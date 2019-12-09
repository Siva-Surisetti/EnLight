import { Action } from '@ngrx/store';
import { Entity } from './books.reducer';

export enum BooksActionTypes {
  LoadBooks = '[Books] Load Books',
  BooksLoaded = '[Books] Books Loaded',
  BooksLoadError = '[Books] Books Load Error',
  BooksSelected = '[Books] Books Selected',
  AddToCart = '[Books] Add Books to Cart',
  AddToCollection = '[Books] Add Books to Collection'
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

export class BooksSelected implements Action {
  readonly type = BooksActionTypes.BooksSelected;
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

export type BooksAction =
  | LoadBooks
  | BooksLoaded
  | BooksLoadError
  | BooksSelected
  | AddToCart
  | AddToCollection;

export const fromBooksActions = {
  LoadBooks,
  BooksLoaded,
  BooksLoadError,
  BooksSelected,
  AddToCart,
  AddToCollection
};
