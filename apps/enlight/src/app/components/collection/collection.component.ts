import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PATH_CONST } from '@workspace/constants';
import { BooksFacade } from '../../+state/books.facade';

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
    this.router.navigate([PATH_CONST.DETAIL]);
  }
}
