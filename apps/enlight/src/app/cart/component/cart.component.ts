import { BooksFacade } from 'apps/enlight/src/app/+state/books.facade';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public cartBooks$: any;

  constructor(private booksFacade: BooksFacade) {
    this.cartBooks$ = this.booksFacade.cartBooks$;
  }

  ngOnInit() {}
}
