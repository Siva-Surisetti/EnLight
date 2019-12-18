import { TestBed, async } from '@angular/core/testing';

import { Observable, of } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { BooksEffects } from './books.effects';
import { LoadBooks, BooksLoaded } from './books.actions';
import { HttpWrapperService, LoggerService } from '@workspace/libs/services';
import { HttpClientModule } from '@angular/common/http';

describe('BooksEffects', () => {
  let actions: Observable<any>;
  let effects: BooksEffects;
  let httpWrapperService: HttpWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientModule
      ],
      providers: [
        BooksEffects,
        DataPersistence,
        HttpWrapperService,
        LoggerService,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(BooksEffects);
    httpWrapperService = TestBed.get(HttpWrapperService);
  });

  describe('loadBooks$', () => {
    it('should work', () => {
      spyOn(httpWrapperService, 'get').and.returnValue(
        of({ body: { items: [] } })
      );
      actions = hot('-a-|', { a: new LoadBooks('test') });
      expect(effects.loadBooks$).toBeObservable(
        hot('-a-|', { a: new BooksLoaded([]) })
      );
    });
  });
});
