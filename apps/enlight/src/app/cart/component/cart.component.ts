import { BooksFacade } from '../../+state/books.facade';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'workspace-app-cart',
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
