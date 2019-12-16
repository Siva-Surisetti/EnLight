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
import { BOOKS_CONSTANTS } from '../../constants/books_constants';

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
  message = BOOKS_CONSTANTS.PURCHASE_SUCCESSFUL;
  actionButtonLabel = BOOKS_CONSTANTS.OK;
  action = true;
  setAutoHide = true;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = BOOKS_CONSTANTS.CENTER;
  verticalPosition: MatSnackBarVerticalPosition = BOOKS_CONSTANTS.TOP;
  billing: BillingDetails = {};
  collection: CollectionItem = {};

  constructor(
    private booksFacade: BooksFacade,
    private routeService: RouteTrackerService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.addFormFieldValidations();
    this.subscribeToCartBooks();
    this.subscribeToSelectedBook();
    this.getPreviousURL();
  }

  private getPreviousURL() {
    this.previousUrl = this.routeService.getPreviousUrl();
  }

  private subscribeToSelectedBook() {
    this.booksFacade.selectedBook$.subscribe(book => {
      this.selectedBook = book;
    });
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
    this.displaySnackBar();
    this.prepareBillingAddressObject();

    this.addBooksToCollection();
    this.router.navigate([BOOKS_CONSTANTS.COLLECTION]);
  }

  private addBooksToCollection() {
    if (this.previousUrl === '/' + BOOKS_CONSTANTS.DETAIL) {
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
