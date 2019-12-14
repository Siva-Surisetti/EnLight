import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BooksFacade } from '../../+state/books.facade';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material';
import { Router } from '@angular/router';
import { RouteTrackerService } from '@workspace/libs/services';

interface BillingDetails {
  name?: any;
  email?: any;
  phone?: any;
  address?: any;
}

interface CollectionItem {
  bookInfo?: any;
  billingInfo?: any;
}

@Component({
  selector: 'poc-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  cartBooks: any;
  loginForm: FormGroup;
  selectedBook: any;
  previousUrl: string;
  message = 'Your purchase is successful';
  actionButtonLabel = 'Ok';
  action = true;
  setAutoHide = true;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  billing: BillingDetails = {};
  collection: CollectionItem = {};

  constructor(
    private booksFacade: BooksFacade,
    private routeService: RouteTrackerService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      name: new FormControl('', { validators: [Validators.required] }),
      phone: new FormControl('', { validators: [Validators.required] }),
      address: new FormControl('', { validators: [Validators.required] })
    });

    this.booksFacade.cartBooks$.subscribe(books => {
      this.cartBooks = books;
    });

    this.booksFacade.selectedBook$.subscribe(book => {
      this.selectedBook = book;
    });
    this.previousUrl = this.routeService.getPreviousUrl();
  }

  onSubmit() {
    this.displaySnackBar();
    this.prepareBillingAddressObject();

    this.addBooksToCart();
    this.router.navigate(['collection']);
  }

  private addBooksToCart() {
    if (this.previousUrl === '/detail') {
      this.addSelectedBookToMyCollection();
    } else {
      this.addCartBooksToMyCollection();
      this.booksFacade.clearShoppingCart();
    }
  }

  private addCartBooksToMyCollection() {
    this.cartBooks.forEach(book => {
      this.collection = {};
      this.collection.bookInfo = book;
      this.collection.billingInfo = this.billing;
      this.booksFacade.dispatchBooksToCollection(this.collection);
    });
  }

  private addSelectedBookToMyCollection() {
    this.collection.bookInfo = this.selectedBook;
    this.collection.billingInfo = this.billing;
    this.booksFacade.dispatchBooksToCollection(this.collection);
  }

  private prepareBillingAddressObject() {
    this.billing.name = this.loginForm.value.name;
    this.billing.email = this.loginForm.value.email;
    this.billing.phone = this.loginForm.value.phone;
    this.billing.address = this.loginForm.value.address;
  }

  private displaySnackBar() {
    const config = this.prepareConfigObjectForSnackBar();
    this.openSnackBar(config);
  }

  private openSnackBar(config: MatSnackBarConfig<any>) {
    this.snackBar.open(
      this.message,
      this.action ? this.actionButtonLabel : undefined,
      config
    );
  }

  private prepareConfigObjectForSnackBar() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    return config;
  }
}
