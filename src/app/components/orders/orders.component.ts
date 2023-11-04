import { Component, OnInit } from '@angular/core';
import { OrderDTO } from 'src/api-client';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  ordersList!: OrderDTO[];
  errorMessage!: string;

  constructor(private ordersService: OrderService) {}

  ngOnInit(): void {
    this.initOrdersList();
  }

  /* Init the orders list by fetching orders from the database */
  private initOrdersList(): void {
    this.ordersService.getOrders().subscribe({
      next: (data: OrderDTO[]) => {
        this.ordersList = [...data];
      },
      error: () => {
        this.errorMessage = 'Could not fetch orders from database';
      },
    });
  }
}
