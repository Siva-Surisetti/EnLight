import { Component, OnInit } from '@angular/core';
import { BooksFacade } from '../../+state/books.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'poc-app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  collectionItems: any;
  constructor(private booksFacade: BooksFacade, private router: Router) {}

  ngOnInit() {
    this.booksFacade.collectionBooks$.subscribe(collectionItem => {
      this.collectionItems = collectionItem;
    });
  }

  onBookSelect(bookId) {
    this.booksFacade.dispatchSelectedIdToStore(bookId);
    this.router.navigate(['detail']);
  }
}
