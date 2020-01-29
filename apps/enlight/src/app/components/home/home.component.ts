import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BooksFacade } from '../../+state/books.facade';
import { BOOKS_CONSTANTS } from '../../constants/books_constants';

@Component({
  selector: 'poc-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public booksRecords$: any;
  public searchInputData: any;

  constructor(private booksFacade: BooksFacade, private router: Router) {}

  ngOnInit() {
    this.booksRecords$ = this.booksFacade.allBooks$;
  }

  onBookSelect(bookId) {
    this.booksFacade.dispatchSelectedIdToStore(bookId);
    this.router.navigate([BOOKS_CONSTANTS.DETAIL]);
  }

  onSearch(searchKey) {
    this.booksFacade.loadBooksToStore(searchKey);
  }
}
