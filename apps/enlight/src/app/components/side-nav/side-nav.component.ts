import { Component, OnInit, ViewChild } from '@angular/core';
import { BooksFacade } from '../../+state/books.facade';
import { MatSidenav } from '@angular/material';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'workspace-ui-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @ViewChild('sideNav', { static: true }) public sidenav: MatSidenav;

  public navigationList: Array<object> = [
    {
      desc: 'Search',
      path: '/home',
      icon: 'search',
      badgeValue: null
    },
    {
      desc: 'Cart',
      path: '/cart',
      icon: 'shopping_cart',
      badgeValue: null
    },
    {
      desc: 'My Collection',
      path: '/collection',
      icon: 'library_books',
      badgeValue: null
    }
  ];

  constructor(
    private booksFacade: BooksFacade,
    private sideNavService: SidenavService
  ) {}

  ngOnInit() {
    this.sideNavService.sideNavToggleSubject.subscribe(() => {
      this.sidenav.open();
    });
    this.booksFacade.cartBooks$.subscribe(books => {
      this.navigationList.forEach(list => {
        if (list['desc'] === 'Cart')
          list['badgeValue'] = books.length === 0 ? null : books.length;
      });
      this.sideNavService.toggle();
    });

    this.booksFacade.collectionBooks$.subscribe(books => {
      this.navigationList.forEach(list => {
        if (list['desc'] === 'My Collection')
          list['badgeValue'] = books.length === 0 ? null : books.length;
      });
      this.sideNavService.toggle();
    });
  }
}
