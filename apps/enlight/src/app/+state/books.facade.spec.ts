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
    it('loadBooksToStore() should return empty list with loaded == true', async done => {
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
    it('allBooks$ should return the loaded list; and loaded flag == true', async done => {
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

    it('dispatchSelectedIdToStore() should dispatch id to store', async done => {
      try {
        facade.dispatchSelectedIdToStore('123');
        const id = await readFirst(facade.selectedBookId$);
        expect(id).toBe('123');
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('dispatchBooksToCartStore() should dispatch all cart books to store', async done => {
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

    it('dispatchBooksToCollection() should dispatch all collection books to store', async done => {
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

    it('clearCart() should clear all cart elements', async done => {
      try {
        store.dispatch(
          new BooksLoaded([createBooks('AAA'), createBooks('BBB')])
        );
        facade.dispatchBooksToCartStore(createBooks('AAA'));
        const cartBooksBeforeClearing = await readFirst(facade.cartBooks$);
        expect(cartBooksBeforeClearing).toMatchObject([createBooks('AAA')]);
        facade.clearShoppingCart();
        const cartBooksAfterClearing = await readFirst(facade.cartBooks$);
        expect(cartBooksAfterClearing).toMatchObject([]);
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('cartBooks$ should return empty if books are not loaded to store', async done => {
      try {
        facade.dispatchBooksToCartStore(createBooks('AAA'));
        const cartBooks = await readFirst(facade.cartBooks$);
        expect(cartBooks).toMatchObject([]);
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('collectionBooks$ should return empty if books are not loaded to store', async done => {
      try {
        facade.dispatchBooksToCollection(createBooks('AAA'));
        const collectionBooks = await readFirst(facade.collectionBooks$);
        expect(collectionBooks).toMatchObject([]);
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('getSelectedBook() should return undefined if no book selected is saved to store', async done => {
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
