import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { BooksEffects } from './books.effects';
import { LoadBooks, BooksLoaded } from './books.actions';

describe('BooksEffects', () => {
  let actions: Observable<any>;
  let effects: BooksEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        BooksEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(BooksEffects);
  });

  describe('loadBooks$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadBooks() });
      expect(effects.loadBooks$).toBeObservable(
        hot('-a-|', { a: new BooksLoaded([]) })
      );
    });
  });
});
