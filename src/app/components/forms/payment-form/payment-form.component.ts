import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BuyerDTO, IdOrder, OrderDTO } from 'src/api-client';
import { CartService } from 'src/app/services/cart.service';
import { FormatDateService } from 'src/app/services/format-date.service';
import { OrderService } from 'src/app/services/order.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

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
    private snackBarService: SnackBarService,
    private formatDateService: FormatDateService,
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

  public onCheckout(): void {
    const order = {
      articles: [
        ...this.cartService.getArticles().map((element) => element.product),
      ],
      date: this.formatDateService.formatDate('fr-FR'),
      isFinalized: true,
      client: JSON.parse(
        localStorage.getItem('auth-data') as string
      ) as BuyerDTO,
    } as OrderDTO;
    this.orderService.createOrder(order).subscribe({
      next: (idOrder: IdOrder) => {
        this.cartService.clearCart();
        this.router
          .navigate(['/orders'])
          .then(() =>
            this.snackBarService.openSnackBar('Order passed with success')
          );
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
