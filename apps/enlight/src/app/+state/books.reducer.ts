import { BooksAction, BooksActionTypes } from './books.actions';

export const BOOKS_FEATURE_KEY = 'books';

/**
 * Interface for the 'Books' data used in
 *  - BooksState, and the reducer function
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface BooksState {
  list: Entity[];
  cartItems: Entity[];
  collectionItems: Entity[];
  selectedId?: string | number;
  loaded: boolean;
  error?: any;
  billingInfo?: any;
}

export interface BooksPartialState {
  readonly [BOOKS_FEATURE_KEY]: BooksState;
}

export const initialState: BooksState = {
  list: [],
  cartItems: [],
  collectionItems: [],
  loaded: false
};

export function reducer(
  state: BooksState = initialState,
  action: BooksAction
): BooksState {
  switch (action.type) {
    case BooksActionTypes.BooksLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }
    case BooksActionTypes.BooksSelected: {
      state = {
        ...state,
        selectedId: action.payload
      };
      break;
    }
    case BooksActionTypes.AddToCart: {
      state = {
        ...state,
        cartItems: [...state.cartItems, action.payload]
      };
      break;
    }
    case BooksActionTypes.AddToCollection: {
      state = {
        ...state,
        collectionItems: [...state.collectionItems, action.payload]
      };
      break;
    }
    case BooksActionTypes.ClearCart: {
      state = {
        ...state,
        cartItems: []
      };
      break;
    }
  }
  return state;
}
