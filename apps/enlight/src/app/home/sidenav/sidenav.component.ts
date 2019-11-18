import { Component, OnInit } from '@angular/core';
declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  {
    path: '/books-purchased',
    title: 'Books Purchased',
    icon: 'book',
    class: ''
  },
  {
    path: '/cart',
    title: 'Cart',
    icon: 'add_shopping_cart',
    class: ''
  }
];
@Component({
  selector: 'workspace-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
