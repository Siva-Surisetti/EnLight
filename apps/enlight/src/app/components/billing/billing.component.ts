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
  autoHide = 2000;
  horizontalPosition = BOOKS_CONSTANTS.CENTER;
  verticalPosition = BOOKS_CONSTANTS.TOP;
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

  public addBooksToCollection() {
    if (this.previousUrl === '/' + BOOKS_CONSTANTS.DETAIL) {
      this.addSelectedBookToMyCollection();
    } else {
      this.addCartBooksToMyCollection();
      this.booksFacade.clearShoppingCart();
    }
  }

  public addCartBooksToMyCollection() {
    this.cartBooks.forEach(book => {
      this.collection = {};
      this.collection.bookInfo = book;
      this.collection.billingInfo = this.billing;
      this.booksFacade.dispatchBooksToCollection(this.collection);
    });
  }

  public addSelectedBookToMyCollection() {
    this.collection.bookInfo = this.selectedBook;
    this.collection.billingInfo = this.billing;
    this.booksFacade.dispatchBooksToCollection(this.collection);
  }

  public prepareBillingAddressObject() {
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
    this.snackBar.open(this.message, this.actionButtonLabel, config);
  }

  public prepareConfigObjectForSnackBar() {
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
