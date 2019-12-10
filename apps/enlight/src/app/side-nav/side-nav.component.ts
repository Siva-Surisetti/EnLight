import { Component, OnInit } from '@angular/core';
import { BooksFacade } from '../+state/books.facade';

@Component({
  selector: 'workspace-ui-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  public navigationList: Array<object> = [
    {
      desc: 'Dashboard',
      path: '/home',
      icon: 'dashboard',
      badgeValue: null
    },
    {
      desc: 'Cart',
      path: '/cart',
      icon: 'shopping_cart',
      badgeValue: 2
    },
    {
      desc: 'My Collection',
      path: '/collection',
      icon: 'library_books',
      badgeValue: null
    }
  ];

  constructor(private booksFacade: BooksFacade) {}

  ngOnInit() {
    this.booksFacade.cartBooks$.subscribe(books => {
      this.navigationList.forEach(list => {
        if (list['desc'] === 'Cart')
          list['badgeValue'] = books.length === 0 ? null : books.length;
      });
    });

    this.booksFacade.collectionBooks$.subscribe(books => {
      this.navigationList.forEach(list => {
        if (list['desc'] === 'My Collection')
          list['badgeValue'] = books.length === 0 ? null : books.length;
      });
    });
  }
}
