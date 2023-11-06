import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDTO } from 'src/api-client';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  order!: OrderDTO;
  errorMessage!: string;

  constructor(
    private ordersService: OrderService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.initOrder();
  }

  private initOrder(): void {
    const id = +this.route.snapshot.params['id'];
    this.ordersService.getOrder(id).subscribe({
      next: (data: OrderDTO) => {
        this.order = data;
      },
      error: () => {
        this.errorMessage = 'Could not get the order';
      },
    });
  }

  public onGoBackButtonClick(): void {
    this.location.back();
  }
}
