import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksFacade } from '../../+state/books.facade';
import { BOOKS_CONSTANTS } from '../../constants/books_constants';

@Component({
  selector: 'poc-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public selectedBook: any;
  constructor(private booksFacade: BooksFacade, private router: Router) {}

  ngOnInit() {
    this.booksFacade.selectedBook$.subscribe(book => {
      this.selectedBook = book;
    });
  }

  addToCart() {
    this.booksFacade.dispatchBooksToCartStore(this.selectedBook);
    this.router.navigate([BOOKS_CONSTANTS.HOME]);
  }

  purchaseBook() {
    this.router.navigate([BOOKS_CONSTANTS.BILLING]);
  }
}
