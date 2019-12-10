import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { BooksFacade } from '../../+state/books.facade';
import { PurchaseConfirmationComponent } from '../purchase-confirmation/purchase-confirmation.component';
@Component({
  selector: 'workspace-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  cartBooks: any;
  loginForm: FormGroup;

  constructor(private dialog: MatDialog, private booksFacade: BooksFacade) {}

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
  }

  openDialog() {
    this.booksFacade.dispatchBooksToCollection(...this.cartBooks);
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
