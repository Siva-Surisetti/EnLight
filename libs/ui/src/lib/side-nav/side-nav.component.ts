import { Component, OnInit } from '@angular/core';

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
      icon: 'dashboard'
    },
    {
      desc: 'Cart',
      path: '/cart',
      icon: 'shopping_cart'
    },
    {
      desc: 'My Collection',
      path: '/collection',
      icon: 'library_books'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
