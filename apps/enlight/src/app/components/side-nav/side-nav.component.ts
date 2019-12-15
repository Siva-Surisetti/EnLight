import { Component, OnInit, ViewChild } from '@angular/core';
import { BooksFacade } from '../../+state/books.facade';
import { MatSidenav } from '@angular/material';
import { SidenavToggleService } from '@workspace/libs/services';
import { BOOKS_CONSTANTS } from '../../constants/books_constants';

@Component({
  selector: 'poc-ui-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @ViewChild('sideNav', { static: true }) public sidenav: MatSidenav;

  public navigationList: Array<object> = [
    {
      desc: BOOKS_CONSTANTS.SIDENAV_OPTION_SEARCH,
      path: '/' + BOOKS_CONSTANTS.HOME,
      icon: BOOKS_CONSTANTS.SIDENAV_ICON_SEARCH,
      badgeValue: null
    },
    {
      desc: BOOKS_CONSTANTS.SIDENAV_OPTION_CART,
      path: '/' + BOOKS_CONSTANTS.CART,
      icon: BOOKS_CONSTANTS.SIDENAV_ICON_CART,
      badgeValue: null
    },
    {
      desc: BOOKS_CONSTANTS.SIDENAV_OPTION_COLLECTION,
      path: '/' + BOOKS_CONSTANTS.COLLECTION,
      icon: BOOKS_CONSTANTS.SIDENAV_ICON_COLLECTION,
      badgeValue: null
    }
  ];

  constructor(
    private booksFacade: BooksFacade,
    private sideNavToggleService: SidenavToggleService
  ) {}

  ngOnInit() {
    this.openSideNavWhenBooksAddedToCartOrCollection();
    this.showBadgeWhenBooksAddedToCart();
    this.showBadgeWhenBooksAddedToCollection();
  }

  private showBadgeWhenBooksAddedToCollection() {
    this.booksFacade.collectionBooks$.subscribe(books => {
      this.navigationList.forEach(list => {
        if (list['desc'] === BOOKS_CONSTANTS.SIDENAV_OPTION_COLLECTION)
          list['badgeValue'] = books.length === 0 ? null : books.length;
      });
      this.sideNavToggleService.toggle();
    });
  }

  private showBadgeWhenBooksAddedToCart() {
    this.booksFacade.cartBooks$.subscribe(books => {
      this.navigationList.forEach(list => {
        if (list['desc'] === BOOKS_CONSTANTS.SIDENAV_OPTION_CART)
          list['badgeValue'] = books.length === 0 ? null : books.length;
      });
      this.sideNavToggleService.toggle();
    });
  }

  private openSideNavWhenBooksAddedToCartOrCollection() {
    this.sideNavToggleService.sideNavToggleSubject.subscribe(() => {
      this.sidenav.open();
    });
  }
}
