import { map } from 'rxjs/internal/operators/map';
import { BooksFacade } from '../../+state/books.facade';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'workspace-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public selectedBook: any;
  constructor(private booksFacade: BooksFacade) {
    this.booksFacade.selectedBooks$.subscribe(book => {
      this.selectedBook = book;
    });
  }

  ngOnInit() {}

  OnAddToCart() {
    this.booksFacade.dispatchBookIdToCartStore(this.selectedBook);
  }
}
