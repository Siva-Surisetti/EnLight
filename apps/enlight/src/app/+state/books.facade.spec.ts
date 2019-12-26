import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { BooksEffects } from './books.effects';
import { BooksFacade } from './books.facade';

import { booksQuery } from './books.selectors';
import { LoadBooks, BooksLoaded } from './books.actions';
import { BooksState, Entity, initialState, reducer } from './books.reducer';
import { HttpWrapperService, LoggerService } from '@workspace/libs/services';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

interface TestSchema {
  books: BooksState;
}

describe('BooksFacade', () => {
  let facade: BooksFacade;
  let store: Store<TestSchema>;
  let createBooks;
  let httpWrapperService: HttpWrapperService;

  beforeEach(() => {
    createBooks = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('books', reducer, { initialState }),
          EffectsModule.forFeature([BooksEffects])
        ],
        providers: [BooksFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
          HttpClientModule
        ],
        providers: [HttpWrapperService, LoggerService]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(BooksFacade);
      httpWrapperService = TestBed.get(HttpWrapperService);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('should return empty list with loaded == true with loadBooksToStore() call', async done => {
      try {
        let list = await readFirst(facade.allBooks$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        spyOn(httpWrapperService, 'get').and.returnValue(
          of({ body: { items: [] } })
        );
        facade.loadBooksToStore('test');

        list = await readFirst(facade.allBooks$);
        isLoaded = await readFirst(facade.loaded$);
        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `BooksLoaded` to manually submit list for state management
     */
    it('should return the loaded list; and loaded flag == true using allBooks$', async done => {
      try {
        let list = await readFirst(facade.allBooks$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          new BooksLoaded([createBooks('AAA'), createBooks('BBB')])
        );

        list = await readFirst(facade.allBooks$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should dispatch id to store with dispatchSelectedIdToStore() call', async done => {
      try {
        facade.dispatchSelectedIdToStore('123');
        const id = await readFirst(facade.selectedBookId$);
        expect(id).toBe('123');
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should dispatch all cart books to store with dispatchBooksToCartStore() call', async done => {
      try {
        store.dispatch(
          new BooksLoaded([createBooks('AAA'), createBooks('BBB')])
        );
        facade.dispatchBooksToCartStore(createBooks('AAA'));
        const cartBooks = await readFirst(facade.cartBooks$);
        expect(cartBooks).toMatchObject([createBooks('AAA')]);
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should dispatch all collection books to store with dispatchBooksToCollection() call', async done => {
      try {
        store.dispatch(
          new BooksLoaded([createBooks('AAA'), createBooks('BBB')])
        );
        facade.dispatchBooksToCollection(createBooks('AAA'));
        const collectionBooks = await readFirst(facade.collectionBooks$);
        expect(collectionBooks).toMatchObject([createBooks('AAA')]);
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should clear all cart elements with clearCart() call', async done => {
      try {
        store.dispatch(
          new BooksLoaded([createBooks('AAA'), createBooks('BBB')])
        );
        facade.dispatchBooksToCartStore(createBooks('AAA'));
        const cartBooksBeforeRemoving = await readFirst(facade.cartBooks$);
        expect(cartBooksBeforeRemoving).toMatchObject([createBooks('AAA')]);
        facade.clearShoppingCart();
        const cartBooksAfterRemoving = await readFirst(facade.cartBooks$);
        expect(cartBooksAfterRemoving).toMatchObject([]);
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('removeFromCart() should remove selected cart elements', async done => {
      try {
        store.dispatch(new BooksLoaded([createBooks('AAA')]));
        facade.dispatchBooksToCartStore(createBooks('AAA'));
        const cartBooksBeforeClearing = await readFirst(facade.cartBooks$);
        expect(cartBooksBeforeClearing).toMatchObject([createBooks('AAA')]);
        facade.removeFromCart('AAA');
        const cartBooksAfterClearing = await readFirst(facade.cartBooks$);
        expect(cartBooksAfterClearing).toMatchObject([]);
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should return empty if books are not loaded to store with cartBooks$', async done => {
      try {
        facade.dispatchBooksToCartStore(createBooks('AAA'));
        const cartBooks = await readFirst(facade.cartBooks$);
        expect(cartBooks).toMatchObject([]);
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should return empty if books are not loaded to store with collectionBooks$ ', async done => {
      try {
        facade.dispatchBooksToCollection(createBooks('AAA'));
        const collectionBooks = await readFirst(facade.collectionBooks$);
        expect(collectionBooks).toMatchObject([]);
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should return undefined if no book selected is saved to store with getSelectedBook() call', async done => {
      try {
        const book = await readFirst(facade.selectedBook$);
        expect(book).toBe(undefined);
        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
