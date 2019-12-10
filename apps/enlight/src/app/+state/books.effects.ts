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
import { map } from 'rxjs/internal/operators/map';
import { HttpWrapperService } from '@workspace/libs/services';
import { HOME_CONSTANTS } from '../constants/googleapi';

@Injectable()
export class BooksEffects {
  public defaultHeaders: HttpHeaders = new HttpHeaders();

  loadBooks$ = createEffect(() =>
    this.dataPersistence.fetch(BooksActionTypes.LoadBooks, {
      run: (action: LoadBooks, state: BooksPartialState) => {
        let URL = HOME_CONSTANTS.URL;
        URL = URL + action.payload;
        return this.httpWrapperService
          .get(URL, this.defaultHeaders, {}, {})
          .pipe(
            map(response => {
              this.booksData = response.body.items;
              return new BooksLoaded(this.booksData);
            })
          );
      },

      onError: (action: LoadBooks, error) => {
        console.error('Error', error);
        return new BooksLoadError(error);
      }
    })
  );
  public booksData: any;

  constructor(
    private dataPersistence: DataPersistence<BooksPartialState>,
    private httpWrapperService: HttpWrapperService
  ) {
    this.defaultHeaders.append(
      'Content-Type',
      'application/json; charset=utf-8'
    );
  }
}
