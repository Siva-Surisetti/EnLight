import { Component, OnInit } from '@angular/core';
import { BooksFacade } from '../../+state/books.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'workspace-app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  collectionBooks: any;
  constructor(private booksFacade: BooksFacade, private router: Router) {}

  ngOnInit() {
    this.booksFacade.collectionBooks$.subscribe(collectionItem => {
      this.collectionBooks = collectionItem;
    });
  }

  onBookSelect(bookId) {
    this.booksFacade.dispatchSelectedIdToStore(bookId);
    this.router.navigate(['detail']);
  }
}
