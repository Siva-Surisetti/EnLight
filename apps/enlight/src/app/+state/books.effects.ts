import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { BooksPartialState } from './books.reducer';
import {
  LoadBooks,
  BooksLoaded,
  BooksLoadError,
  BooksActionTypes
} from './books.actions';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpWrapperService } from '@workspace/libs/services';
import { BOOKS_CONSTANTS } from '../constants/books_constants';

@Injectable()
export class BooksEffects {
  public defaultHeaders: HttpHeaders = new HttpHeaders();

  constructor(
    private dataPersistence: DataPersistence<BooksPartialState>,
    private httpWrapperService: HttpWrapperService
  ) {
    this.defaultHeaders.append(
      'Content-Type',
      'application/json; charset=utf-8'
    );
  }

  loadBooks$ = createEffect(() =>
    this.dataPersistence.fetch(BooksActionTypes.LoadBooks, {
      run: (action: LoadBooks, state: BooksPartialState) => {
        let URL = 'http://localhost:3333/api/search';
        // URL = URL + action.payload;
        return this.httpWrapperService
          .get(URL, this.defaultHeaders, action.payload, {})
          .pipe(
            map(response => {
              this.booksData = response.body.items;
              return new BooksLoaded(this.booksData);
            })
          );
      },

      onError: (action: LoadBooks, error) => {
        return new BooksLoadError(error);
      }
    })
  );
  public booksData: any;
}
