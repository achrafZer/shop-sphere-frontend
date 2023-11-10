import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderDTO } from 'src/api-client';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent implements OnInit {
  paymentForm!: FormGroup;
  amount!: number;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.paymentForm = this.formBuilder.group({
      cardHolder: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expDate: ['', Validators.required],
      code: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.amount = this.cartService.getTotalPrice();
  }

  public onSubmit(): void {
    const date = new Date();
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    } as Intl.DateTimeFormatOptions;
    const formattedDate = date.toLocaleDateString('fr-FR', options);
    const order = {
      articles: [
        ...this.cartService.getArticles().map((element) => element.product),
      ],
      date: formattedDate,
      isFinalized: true,
      client: JSON.parse(localStorage.getItem('auth-data')!),
    } as OrderDTO;
    this.orderService.createOrder(order).subscribe((data) => console.log(data));
    this.cartService.clearCart();
    this.router.navigate(['/orders']);
  }
}
