import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { BooksFacade } from '../../+state/books.facade';
import { PurchaseConfirmationComponent } from '../purchase-confirmation/purchase-confirmation.component';
import { RouteTrackerService } from '../../services/route-tracker.service';

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

  constructor(
    private dialog: MatDialog,
    private booksFacade: BooksFacade,
    private routeService: RouteTrackerService
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
    if (this.previousUrl === '/detail') {
      this.booksFacade.dispatchBooksToCollection(this.selectedBook);
    } else {
      this.booksFacade.dispatchBooksToCollection(...this.cartBooks);
      this.booksFacade.clearShoppingCart();
    }

    this.dialog.open(PurchaseConfirmationComponent, {
      data: {
        message: 'Your purchase is successful',
        buttonText: {
          cancel: 'Done'
        }
      }
    });
  }
}
