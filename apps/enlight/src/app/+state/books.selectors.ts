import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BOOKS_FEATURE_KEY, BooksState } from './books.reducer';

// Lookup the 'Books' feature state managed by NgRx
const getBooksState = createFeatureSelector<BooksState>(BOOKS_FEATURE_KEY);

const getLoaded = createSelector(
  getBooksState,
  (state: BooksState) => state.loaded
);
const getError = createSelector(
  getBooksState,
  (state: BooksState) => state.error
);

const getAllBooks = createSelector(
  getBooksState,
  getLoaded,
  (state: BooksState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getBooksState,
  (state: BooksState) => state.selectedId
);

const getCartBooks = createSelector(
  getBooksState,
  getLoaded,
  (state: BooksState, isLoaded) => {
    return isLoaded ? state.cartItems : [];
  }
);

const getSelectedBooks = createSelector(
  getAllBooks,
  getSelectedId,
  (books, id) => {
    const result = books.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const booksQuery = {
  getLoaded,
  getError,
  getAllBooks,
  getSelectedBooks,
  getCartBooks
};
