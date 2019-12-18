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
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allBooks$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        spyOn(httpWrapperService, 'get').and.returnValue(
          of({ body: { items: [] } })
        );
        facade.loadBooksToStore('angular');

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
  });
});
