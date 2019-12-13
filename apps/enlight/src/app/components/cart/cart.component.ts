import { Component, OnInit } from '@angular/core';
import { BooksFacade } from '../../+state/books.facade';
import { Router } from '@angular/router';

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

  proceedToPurchase() {
    this.router.navigate(['billing']);
  }

  onBookSelect(bookId) {
    this.booksFacade.dispatchSelectedIdToStore(bookId);
    this.router.navigate(['detail']);
  }
}
