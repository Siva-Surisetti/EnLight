import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { SIDENAV_CONST, APP_CONSTANTS, PATH_CONST } from '@workspace/constants';
import { SidenavToggleService } from '@workspace/libs/services';
import { BooksFacade } from '../../+state/books.facade';

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
  public appName = APP_CONSTANTS.APP_NAME;

  public navigationList: NavItem[] = [
    {
      desc: SIDENAV_CONST.OPTION_SEARCH,
      path: '/' + PATH_CONST.HOME,
      icon: SIDENAV_CONST.ICON_SEARCH,
      badgeValue: null
    },
    {
      desc: SIDENAV_CONST.OPTION_CART,
      path: '/' + PATH_CONST.CART,
      icon: SIDENAV_CONST.ICON_CART,
      badgeValue: null
    },
    {
      desc: SIDENAV_CONST.OPTION_COLLECTION,
      path: '/' + PATH_CONST.COLLECTION,
      icon: SIDENAV_CONST.ICON_COLLECTION,
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
        if (list['desc'] === SIDENAV_CONST.OPTION_CART)
          list['badgeValue'] = books.length === 0 ? null : books.length;
      });
      this.sideNavToggleService.toggle();
    });

    this.booksFacade.collectionBooks$.subscribe(books => {
      this.navigationList.forEach(list => {
        if (list['desc'] === SIDENAV_CONST.OPTION_COLLECTION)
          list['badgeValue'] = books.length === 0 ? null : books.length;
      });
      this.sideNavToggleService.toggle();
    });
  }
}
