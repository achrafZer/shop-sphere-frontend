import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductDTO } from 'src/api-client';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productsList!: ProductDTO[];
  errorMessage!: string;

  constructor(
    private productsService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

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
        this.errorMessage = 'toto';
        this.openSnackBar('Could not fetch products from database');
      },
    });
  }

  public addToCart(product: ProductDTO) {
    this.cartService.addProduct(product);
    const updatedProductsList = this.productsList.map((p) =>
      p.id === product.id
        ? { ...p, quantity: p.quantity > 0 ? p.quantity - 1 : p.quantity }
        : p
    );
    this.productsList = [...updatedProductsList];
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'close', {
      duration: 3000,
    });
  }
}
