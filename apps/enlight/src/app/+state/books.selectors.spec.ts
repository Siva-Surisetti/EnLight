import { Entity, BooksState } from './books.reducer';
import { booksQuery } from './books.selectors';

describe('Books Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getBooksId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createBooks = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      books: {
        list: [
          createBooks('PRODUCT-AAA'),
          createBooks('PRODUCT-BBB'),
          createBooks('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('Books Selectors', () => {
    it('getAllBooks() should return the list of Books', () => {
      const results = booksQuery.getAllBooks(storeState);
      const selId = getBooksId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedBooks() should return the selected Entity', () => {
      const result = booksQuery.getSelectedBook(storeState);
      const selId = getBooksId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = booksQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = booksQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
