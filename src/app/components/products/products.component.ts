import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/api-client';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productsList!: ProductDTO[];
  errorMessage!: string;

  constructor(private productsService: ProductService) {}

  ngOnInit(): void {
    this.initProductsList();
  }

  /* Init the products list by fetching products from the database */
  private initProductsList(): void {
    this.productsService.getProducts().subscribe({
      next: (data: ProductDTO[]) => {
        this.productsList = [...data];
      },
      error: () => {
        this.errorMessage = 'Could not fetch products from database';
      },
    });
  }
}
