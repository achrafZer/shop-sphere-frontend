import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductDTO } from 'src/api-client';
import { CartArticle } from '../models/cart-article';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private snackBar: MatSnackBar,
    private productService: ProductService
  ) {}

  public addProduct(product: ProductDTO) {
    if (!product.quantity) {
      this.openSnackBar('This product is not available');
      return;
    }
    let article = this.getArticles().find(
      (element) => element.product.id === product.id
    );
    if (article) {
      this.addArticle(article);
    } else {
      this.addArticle({ product: { ...product }, qte: 1 } as CartArticle);
    }
  }

  public removeProduct(product: ProductDTO): void {
    let article = this.getArticles()!.find(
      (element) => element.product.id === product.id
    );
    if (article) this.removeArticle(article);
  }

  public getArticles(): CartArticle[] {
    const data = localStorage.getItem('auth-cart') as string;
    if (data) {
      const parseData = JSON.parse(data) as CartArticle[];
      return parseData;
    }
    return [] as CartArticle[];
  }

  public getTotalPrice() {
    return this.getArticles().reduce(
      (accumulator, article) =>
        accumulator + article.qte * article.product.price,
      0
    );
  }

  public clearCart(): void {
    localStorage.setItem('auth-cart', JSON.stringify([]));
  }

  private addArticle(article: CartArticle): void {
    const articles = this.getArticles();
    const index = articles.findIndex(
      (element) => element.product.id === article.product.id
    );
    article = structuredClone(article) as CartArticle;
    let clonedArticles = structuredClone(articles);
    article.product.quantity--;
    if (index !== -1) {
      article.qte++;
      clonedArticles.splice(index, 1, article);
    } else {
      clonedArticles.push(article);
    }
    this.productService.updateProduct(article.product).subscribe();
    localStorage.setItem('auth-cart', JSON.stringify([...clonedArticles]));
  }

  private removeArticle(article: CartArticle): void {
    const articles = this.getArticles();
    const index = articles.findIndex(
      (element) => element.product.id === article.product.id
    );
    article = structuredClone(article);
    let clonedArticles = structuredClone(articles);
    article.product.quantity++;
    if (article.qte === 1) clonedArticles.splice(index, 1);
    else {
      article.qte--;
      clonedArticles.splice(index, 1, article);
    }
    this.productService.updateProduct(article.product).subscribe();
    localStorage.setItem('auth-cart', JSON.stringify([...clonedArticles]));
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'close', {
      duration: 3000,
    });
  }
}
