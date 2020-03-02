import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { BooksPartialState } from './books.reducer';
import {
  LoadBooks,
  BooksLoaded,
  BooksLoadError,
  BooksActionTypes
} from './books.actions';
import { HttpWrapperService } from '@workspace/libs/services';
import { SERVER_CONST, ROUTE_CONST } from '@workspace/constants';

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
        const URL =
          'http://' +
          SERVER_CONST.HOST +
          ':' +
          SERVER_CONST.PORT +
          ROUTE_CONST.SEARCH;
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
