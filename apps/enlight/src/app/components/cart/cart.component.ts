import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PATH_CONST } from '@workspace/constants';
import { BooksFacade } from '../../+state/books.facade';

@Component({
  selector: 'poc-app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public cartBooks: any;

  constructor(private booksFacade: BooksFacade, private router: Router) {}

  ngOnInit() {
    this.booksFacade.cartBooks$.subscribe(books => {
      this.cartBooks = books;
    });
  }

  onPurchase() {
    this.router.navigate([PATH_CONST.BILLING]);
  }

  onBookSelect(bookId) {
    this.booksFacade.dispatchSelectedIdToStore(bookId);
    this.router.navigate([PATH_CONST.DETAIL]);
  }

  removeFromCart(bookId, event) {
    this.booksFacade.removeFromCart(bookId);
    event.stopPropagation();
  }
}
