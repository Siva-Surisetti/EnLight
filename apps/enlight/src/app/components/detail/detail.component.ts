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
  public cartBooks: any;
  public collectionBooks: any;
  public bookExistsInCart = false;
  public bookExistsInCollection = false;
  public bookAvailableInCartMessage = BOOKS_CONSTANTS.BOOK_AVAILABLE_IN_CART;
  public bookAvailableInCollectionMessage =
    BOOKS_CONSTANTS.BOOK_AVAILABLE_IN_COLLECTION;

  constructor(private booksFacade: BooksFacade, private router: Router) {}

  ngOnInit() {
    this.booksFacade.selectedBook$.subscribe(book => {
      this.selectedBook = book;
    });
    this.booksFacade.cartBooks$.subscribe(books => {
      this.cartBooks = books;
    });
    this.booksFacade.collectionBooks$.subscribe(books => {
      this.collectionBooks = books;
    });

    this.checkIfBookExistsInCart();

    this.checkIfBookExistsInCollection();
  }

  public checkIfBookExistsInCollection() {
    if (this.selectedBook && this.collectionBooks) {
      this.bookExistsInCollection = this.collectionBooks.some(book => {
        return book.bookInfo.id === this.selectedBook.id;
      });
    }
  }

  public checkIfBookExistsInCart() {
    if (this.selectedBook && this.cartBooks) {
      this.bookExistsInCart = this.cartBooks.some(book => {
        return book.id === this.selectedBook.id;
      });
    }
  }

  addToCart() {
    this.booksFacade.dispatchBooksToCartStore(this.selectedBook);
    this.router.navigate([BOOKS_CONSTANTS.HOME]);
  }

  purchaseBook() {
    this.router.navigate([BOOKS_CONSTANTS.BILLING]);
  }
}
