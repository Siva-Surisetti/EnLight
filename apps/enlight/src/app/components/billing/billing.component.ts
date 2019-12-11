import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BooksFacade } from '../../+state/books.facade';
import { RouteTrackerService } from '../../services/route-tracker.service';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material';
import { Router } from '@angular/router';

interface BillingDetails {
  name?: any;
  email?: any;
  phone?: any;
  address?: any;
}

@Component({
  selector: 'workspace-billing',
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

    this.booksFacade.selectedBooks$.subscribe(book => {
      this.selectedBook = book;
    });
    this.previousUrl = this.routeService.getPreviousUrl();
  }

  openDialog() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(
      this.message,
      this.action ? this.actionButtonLabel : undefined,
      config
    );
    debugger;
    this.billing.name = this.loginForm.value.name;
    this.billing.email = this.loginForm.value.email;
    this.billing.phone = this.loginForm.value.phone;
    this.billing.address = this.loginForm.value.address;

    this.booksFacade.dispatchBillingDetails(this.billing);

    if (this.previousUrl === '/detail') {
      this.booksFacade.dispatchBooksToCollection(this.selectedBook);
    } else {
      this.booksFacade.dispatchBooksToCollection(...this.cartBooks);
      this.booksFacade.clearShoppingCart();
    }
    this.router.navigate(['collection']);
  }
}
