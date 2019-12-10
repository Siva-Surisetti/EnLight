import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksFacade } from '../../+state/books.facade';

@Component({
  selector: 'workspace-detail',
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
  }

  purchaseBook() {
    // this.booksFacade.dispatchBooksToCollection(this.selectedBook);
    // this.booksFacade.dispatchBookIdToCartStore(this.selectedBook);
    this.router.navigate(['billing']);
  }
}
