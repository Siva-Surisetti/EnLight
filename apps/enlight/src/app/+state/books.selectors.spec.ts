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
    it('should return the list of Books with getAllBooks() call', () => {
      const results = booksQuery.getAllBooks(storeState);
      const selId = getBooksId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('should return the selected Entity with getSelectedBooks() call', () => {
      const result = booksQuery.getSelectedBook(storeState);
      const selId = getBooksId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("should return the current 'loaded' status with getLoaded() call", () => {
      const result = booksQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("should return the current 'error' storeState with getError() call", () => {
      const result = booksQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
