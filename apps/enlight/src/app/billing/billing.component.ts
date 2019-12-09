import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { PurchaseConfirmationComponent } from '../purchase-confirmation/purchase-confirmation.component';
@Component({
  selector: 'workspace-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      name: new FormControl('', { validators: [Validators.required] }),
      phone: new FormControl('', { validators: [Validators.required] }),
      address: new FormControl('', { validators: [Validators.required] })
    });
  }

  openDialog() {
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
