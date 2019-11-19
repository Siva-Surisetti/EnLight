import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  private navigationList: Array<string> = ['Home', 'Cart', 'My Collection'];

  constructor() {}

  ngOnInit() {}
}
