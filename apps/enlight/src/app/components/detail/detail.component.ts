import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksFacade } from '../../+state/books.facade';

@Component({
  selector: 'poc-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public selectedBook: any;
  constructor(private booksFacade: BooksFacade, private router: Router) {
    this.booksFacade.selectedBooks$.subscribe(book => {
      this.selectedBook = book;
    });
  }

  ngOnInit() {}

  OnAddToCart() {
    this.booksFacade.dispatchBookIdToCartStore(this.selectedBook);
    this.router.navigate(['home']);
  }

  purchaseBook() {
    this.router.navigate(['billing']);
  }
}
