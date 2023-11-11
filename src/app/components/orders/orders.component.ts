import { Component, OnInit } from '@angular/core';
import { OrderDTO } from 'src/api-client';
import { OrderService } from 'src/app/services/order.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  ordersList!: OrderDTO[];

  constructor(
    private ordersService: OrderService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.initOrdersList();
  }

  /* Init the orders list by fetching orders from the database */
  private initOrdersList(): void {
    this.ordersService.getOrders().subscribe({
      next: (data: OrderDTO[]) => {
        this.ordersList = data ? [...data] : [];
      },
      error: () => {
        this.ordersList = [];
        this.snackBarService.openSnackBar(
          'Could not fetch orders from database'
        );
      },
    });
  }
}
