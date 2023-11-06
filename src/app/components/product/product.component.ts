import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDTO } from 'src/api-client';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product!: ProductDTO;
  errorMessage!: string;

  constructor(
    private productsService: ProductService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.initProduct();
  }

  private initProduct(): void {
    const id = +this.route.snapshot.params['id'];
    this.productsService.getProduct(id).subscribe({
      next: (data: ProductDTO) => {
        this.product = data;
      },
      error: (error) => {
        this.errorMessage = 'Could not get the order';
      },
    });
  }

  public onGoBackButtonClick(): void {
    this.location.back();
  }
}
