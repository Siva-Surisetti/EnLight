import { Component, OnInit } from '@angular/core';
import { BooksFacade } from '../+state/books.facade';

@Component({
  selector: 'workspace-app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  collectionBooks: any;
  constructor(private booksFacade: BooksFacade) {}

  ngOnInit() {
    this.booksFacade.collectionBooks$.subscribe(books => {
      this.collectionBooks = books;
    });
  }
}
