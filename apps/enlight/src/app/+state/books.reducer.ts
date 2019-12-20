import { BooksAction, BooksActionTypes } from './books.actions';

export const BOOKS_FEATURE_KEY = 'books';

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
  searchKey?: any;
}

export interface BooksPartialState {
  readonly [BOOKS_FEATURE_KEY]: BooksState;
}

export const initialState: BooksState = {
  list: [],
  cartItems: [],
  collectionItems: [],
  loaded: false,
  searchKey: null
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
    case BooksActionTypes.BookSelected: {
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
    case BooksActionTypes.RemoveFromCart: {
      const cartItems = state.cartItems;
      const filteredCart = cartItems.filter((item: any) => {
        return item.id !== action.payload;
      });
      state = {
        ...state,
        cartItems: filteredCart
      };
      break;
    }
    case BooksActionTypes.AddSearchKey: {
      state = {
        ...state,
        searchKey: action.payload
      };
      break;
    }
  }
  return state;
}
