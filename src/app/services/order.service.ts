import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IdOrder, OrderDTO, OrdersService } from 'src/api-client';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private ordersApiService: OrdersService) {}

  /**
   * Create a new order in the database
   * @param order to save in the databse
   * @returns an obserable containing the id of the order created
   */
  public createOrder(order: OrderDTO): Observable<IdOrder> {
    return this.ordersApiService.createOrder(order);
  }

  /**
   * Delete an order in the database
   * @param id of the order to delete
   */
  public deleteOrder(id: number): Observable<any> {
    return this.ordersApiService.deleteOrder(id);
  }

  /**
   * Find an order by id
   * @param id the id of the order to find
   * @returns an observable of order
   */
  public getOrder(id: number): Observable<OrderDTO> {
    return this.ordersApiService.getOrder(id);
  }

  /**
   * Retrieve all orders from the database
   * @returns an observable of orders
   */
  public getOrders(): Observable<OrderDTO[]> {
    return this.ordersApiService.getOrders();
  }

  /**
   * Update an order in the database
   * @param order the order to update
   */
  public updateOrder(order: OrderDTO): Observable<any> {
    return this.ordersApiService.updateOrder(order);
  }
}
