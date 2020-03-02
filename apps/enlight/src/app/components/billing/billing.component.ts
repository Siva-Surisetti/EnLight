import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material';
import { Router } from '@angular/router';

import { BOOKS_CONSTANTS, PATH_CONST, MSG_CONST } from '@workspace/constants';
import { RouteTrackerService } from '@workspace/libs/services';
import { BooksFacade } from '../../+state/books.facade';

interface BillingDetails {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
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
  purchaseStatusMessage = MSG_CONST.PURCHASE_SUCCESSFUL;
  actionButtonLabel = BOOKS_CONSTANTS.OK;
  autoHide = BOOKS_CONSTANTS.SNACK_BAR_DURATION;
  horizontalPosition = BOOKS_CONSTANTS.CENTER;
  verticalPosition = BOOKS_CONSTANTS.TOP;
  billing: BillingDetails = {};
  collection: CollectionItem = {};
  billingImagePath = PATH_CONST.BILLING_IMG;

  constructor(
    private booksFacade: BooksFacade,
    private routeService: RouteTrackerService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.addFormFieldValidations();
    this.subscribeToCartBooks();
    this.getPreviousURL();

    this.booksFacade.selectedBook$.subscribe(book => {
      this.selectedBook = book;
    });
  }

  private getPreviousURL() {
    this.previousUrl = this.routeService.getPreviousUrl();
  }

  private subscribeToCartBooks() {
    this.booksFacade.cartBooks$.subscribe(books => {
      this.cartBooks = books;
    });
  }

  private addFormFieldValidations() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      name: new FormControl('', { validators: [Validators.required] }),
      phone: new FormControl('', { validators: [Validators.required] }),
      address: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    this.showSnackBar();
    this.setBillingAddress();

    this.addBooksToCollection();
    this.router.navigate([PATH_CONST.COLLECTION]);
  }

  public addBooksToCollection() {
    if (this.previousUrl === '/' + PATH_CONST.DETAIL) {
      this.addSelectedBookToMyCollection();
    } else {
      this.addCartBooksToMyCollection();
      this.booksFacade.clearShoppingCart();
    }
  }

  public addCartBooksToMyCollection() {
    this.cartBooks.forEach(book => {
      const collection: CollectionItem = {};
      collection.bookInfo = book;
      collection.billingInfo = this.billing;
      this.booksFacade.dispatchBooksToCollection(collection);
    });
  }

  public addSelectedBookToMyCollection() {
    this.collection.bookInfo = this.selectedBook;
    this.collection.billingInfo = this.billing;
    this.booksFacade.dispatchBooksToCollection(this.collection);
  }

  public setBillingAddress() {
    this.billing.name = this.loginForm.value.name;
    this.billing.email = this.loginForm.value.email;
    this.billing.phone = this.loginForm.value.phone;
    this.billing.address = this.loginForm.value.address;
  }

  private showSnackBar() {
    const config = this.getSnackBarConfig();
    this.openSnackBar(config);
  }

  private openSnackBar(config: MatSnackBarConfig<any>) {
    this.snackBar.open(
      this.purchaseStatusMessage,
      this.actionButtonLabel,
      config
    );
  }

  public getSnackBarConfig() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = <MatSnackBarVerticalPosition>(
      this.verticalPosition
    );
    config.horizontalPosition = <MatSnackBarHorizontalPosition>(
      this.horizontalPosition
    );
    config.duration = this.autoHide;
    return config;
  }
}
