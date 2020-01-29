import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { SidenavToggleService } from '@workspace/libs/services';
import { BooksFacade } from '../../+state/books.facade';
import { BOOKS_CONSTANTS } from '../../constants/books_constants';

interface NavItem {
  desc: string;
  path: string;
  icon: string;
  badgeValue?: number;
}

@Component({
  selector: 'poc-ui-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @ViewChild('sideNav', { static: true }) public sidenav: MatSidenav;
  public appName = BOOKS_CONSTANTS.APP_NAME;

  public navigationList: NavItem[] = [
    {
      desc: BOOKS_CONSTANTS.SIDENAV.OPTION_SEARCH,
      path: '/' + BOOKS_CONSTANTS.HOME,
      icon: BOOKS_CONSTANTS.SIDENAV.ICON_SEARCH,
      badgeValue: null
    },
    {
      desc: BOOKS_CONSTANTS.SIDENAV.OPTION_CART,
      path: '/' + BOOKS_CONSTANTS.CART,
      icon: BOOKS_CONSTANTS.SIDENAV.ICON_CART,
      badgeValue: null
    },
    {
      desc: BOOKS_CONSTANTS.SIDENAV.OPTION_COLLECTION,
      path: '/' + BOOKS_CONSTANTS.COLLECTION,
      icon: BOOKS_CONSTANTS.SIDENAV.ICON_COLLECTION,
      badgeValue: null
    }
  ];

  constructor(
    private booksFacade: BooksFacade,
    private sideNavToggleService: SidenavToggleService
  ) {}

  ngOnInit() {
    this.sideNavToggleService.sideNavToggleSubject.subscribe(() => {
      this.sidenav.open();
    });

    this.booksFacade.cartBooks$.subscribe(books => {
      this.navigationList.forEach(list => {
        if (list['desc'] === BOOKS_CONSTANTS.SIDENAV.OPTION_CART)
          list['badgeValue'] = books.length === 0 ? null : books.length;
      });
      this.sideNavToggleService.toggle();
    });

    this.booksFacade.collectionBooks$.subscribe(books => {
      this.navigationList.forEach(list => {
        if (list['desc'] === BOOKS_CONSTANTS.SIDENAV.OPTION_COLLECTION)
          list['badgeValue'] = books.length === 0 ? null : books.length;
      });
      this.sideNavToggleService.toggle();
    });
  }
}
