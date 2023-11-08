import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent {
  paymentForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.paymentForm = this.formBuilder.group({
      cardHolder: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expDate: ['', Validators.required],
      code: ['', Validators.required],
    });
  }

  public onSubmit(): void {}
}
